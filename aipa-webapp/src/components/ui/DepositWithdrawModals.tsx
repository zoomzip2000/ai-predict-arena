"use client";

import React, { useState, useEffect } from "react";
import { Copy, CheckCircle, Warning, Key, ClipboardText } from "@phosphor-icons/react";
import Modal from "./Modal";
import Button from "./Button";
import { Input } from "./FormControl";
import { generateAddressQrMethod, borrowPaymentAddressMethod } from "../../api/wallet";

// Helper to copy text to clipboard
const copyToClipboard = (text: string) => {
  if (typeof window !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text);
  }
};

// 1. UsdtDepositModal
interface UsdtDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSubmitted: () => void;
  code: string;
}

export function UsdtDepositModal({ isOpen, onClose, onPaymentSubmitted, code }: UsdtDepositModalProps) {
  const [address, setAddress] = useState<string>("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 mins in seconds
  const [isTimeExpired, setIsTimeExpired] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fetch dynamic address and QR code
      const fetchDepositData = async () => {
        try {
          const res = await borrowPaymentAddressMethod(code);
          if (res?.status === 200 || res?.status === 201) {
            setAddress(res.data.address);
            
            // Calculate time left from backend finishTransactionTime if available
            if (res.data.finishTransactionTime) {
              const diffMs = new Date(res.data.finishTransactionTime).getTime() - Date.now();
              setTimeLeft(Math.max(0, Math.floor(diffMs / 1000)));
            }
          }
          const qrRes = await generateAddressQrMethod();
          if (qrRes?.data) {
            setQrCode(qrRes.data);
          }
        } catch (e) {
          console.error("Error fetching deposit data:", e);
        }
      };
      fetchDepositData();
    }
  }, [isOpen, code]);

  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeExpired(true);
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [isOpen, timeLeft]);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Депозит USDT на адрес кошелька" maxWidth="500px">
      <div className="flex flex-col gap-4 text-center">
        <p className={`text-sm ${isTimeExpired ? "text-danger" : "text-text-secondary"}`}>
          {isTimeExpired 
            ? "Обратите внимание! Время жизни ордера истекло. Если вы уже сделали перевод, нажмите 'Оплата совершена'"
            : "Адрес активен 60 минут. Если вы не успеваете за отведенное время, закройте окно и начните заново."
          }
        </p>

        {/* Timer UI */}
        <div className="flex justify-center items-center gap-2">
          <span className={`text-2xl font-bold mono-data px-4 py-2 card-inset rounded ${isTimeExpired ? "text-danger" : "text-secondary"}`}>
            {formatTime(timeLeft)}
          </span>
        </div>

        {/* QR Code Container */}
        <div className="flex justify-center py-4">
          <div className="card-inset p-3 rounded-lg bg-bg-light" style={{ width: "132px", height: "132px" }}>
            {qrCode ? (
              <img
                src={`data:image/png;base64,${qrCode}`}
                alt="USDT TRC20 QR Code"
                width={108}
                height={108}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted text-[10px]">
                Генерация QR...
              </div>
            )}
          </div>
        </div>

        {/* Wallet Address Copy Block */}
        <div className="card-inset p-4 rounded text-left">
          <div className="text-xs text-text-muted uppercase font-bold mb-1">Адрес USDT TRC-20</div>
          <div className="flex items-center gap-2">
            <span className="mono-data text-xs select-all text-text-primary break-all flex-1">{address || "Загрузка..."}</span>
            <button 
              onClick={() => copyToClipboard(address)}
              className="btn btn-primary btn-icon active border border-nm-border"
              title="Копировать адрес"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Instructions Warning Alert Boxes */}
        <div className="flex flex-col gap-2 text-left mt-2">
          <div className="flex items-start gap-3 p-3 rounded bg-bg-light border-l-4 border-secondary">
            <ClipboardText size={20} className="text-secondary shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong>Сумма меньше 3 USDT</strong> не будет зачислена на баланс, так как издержки на обработку выше этой суммы.
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded bg-bg-light border-l-4 border-warning">
            <Warning size={20} className="text-warning shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong>Минимум 20 подтверждений</strong> в сети требуется для автоматического пополнения баланса.
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button className="w-full" onClick={onPaymentSubmitted}>
            Оплата совершена
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// 2. SuccessfulDepositModal
interface SuccessfulDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessfulDepositModal({ isOpen, onClose }: SuccessfulDepositModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Депозит отправлен">
      <div className="flex flex-col items-center gap-4 text-center py-4">
        <CheckCircle size={64} className="text-success" />
        <p className="text-text-primary font-bold">Оплата успешно зарегистрирована в системе!</p>
        <p className="text-xs text-text-muted">
          Средства поступят на ваш баланс после получения необходимых 20 подтверждений в сети TRC-20. Обычно это занимает от 5 до 15 минут.
        </p>
        <Button onClick={onClose} className="w-full mt-4">
          Отлично
        </Button>
      </div>
    </Modal>
  );
}

// 3. WithdrawUsdtModal
interface WithdrawUsdtModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted: (amount: number, address: string) => void;
  userBalance: number;
  commission: number;
}

export function WithdrawUsdtModal({ isOpen, onClose, onSubmitted, userBalance, commission }: WithdrawUsdtModalProps) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [errorAddress, setErrorAddress] = useState(false);

  const validateTRC20 = (addr: string) => {
    // Tron TRC20 address starts with 'T' and has length of 34
    return /^T[a-zA-Z0-9]{33}$/.test(addr);
  };

  const handleAddressChange = (val: string) => {
    setAddress(val);
    if (val.trim() === "") {
      setErrorAddress(false);
    } else {
      setErrorAddress(!validateTRC20(val));
    }
  };

  const amountNum = Number(amount) || 0;
  const isInsufficient = amountNum > userBalance;
  const isBelowMin = amountNum > 0 && amountNum < (commission + 1 || 7);

  const canSubmit = amountNum > 0 && address !== "" && !errorAddress && !isInsufficient && !isBelowMin;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Вывод USDT на адрес кошелька">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-secondary text-center">
          Введите сумму и адрес в сети Tether USDT TRC-20 для осуществления вывода.
        </p>

        {/* Amount Input */}
        <div>
          <label className="text-xs font-bold text-text-muted uppercase mb-1 block">Сумма вывода</label>
          <Input
            type="number"
            placeholder="USDT"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {isInsufficient && (
            <div className="text-[11px] text-danger mt-1 font-bold">Недостаточно средств на балансе. Доступно: {userBalance.toLocaleString()} USDT</div>
          )}
          {isBelowMin && (
            <div className="text-[11px] text-danger mt-1 font-bold">Минимальная сумма вывода: {Math.max(7, commission + 1)} USDT</div>
          )}
          <div className="text-xs text-text-muted mt-1.5 flex justify-between">
            <span>Комиссия сети:</span>
            <span className="mono-data font-bold text-text-primary">{commission} USDT</span>
          </div>
        </div>

        {/* Destination Wallet Address Input */}
        <div>
          <label className="text-xs font-bold text-text-muted uppercase mb-1 block">Адрес Tether USDT TRC-20</label>
          <Input
            type="text"
            placeholder="Например: TY2h4..."
            value={address}
            onChange={(e) => handleAddressChange(e.target.value)}
          />
          {errorAddress && (
            <div className="text-[11px] text-danger mt-1 font-bold">Неверный формат адреса. Адрес должен быть в сети TRC-20 (начинаться с &quot;T&quot;).</div>
          )}
        </div>

        {/* Expected output preview block */}
        <div className="card-inset p-3 rounded flex justify-between items-center text-sm mt-2">
          <span className="font-semibold text-text-secondary">Вы получите на кошелек:</span>
          <span className="mono-data font-extrabold text-success text-base">
            {amountNum > commission ? `${(amountNum - commission).toFixed(2)} USDT` : "0.00 USDT"}
          </span>
        </div>

        {/* Details & Help info block */}
        <div className="flex items-start gap-3 p-3 rounded bg-bg-light border-l-4 border-secondary mt-1">
          <ClipboardText size={20} className="text-secondary shrink-0 mt-0.5" />
          <div className="text-xs">
            Вывод средств занимает около 10 минут. В редких случаях из-за технических работ транзакция может занять до 24 часов.
          </div>
        </div>

        <Button 
          className="w-full mt-4" 
          disabled={!canSubmit}
          onClick={() => onSubmitted(amountNum, address)}
        >
          Продолжить
        </Button>
      </div>
    </Modal>
  );
}

// 4. DoubleConfirmModal
interface DoubleConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmed: () => void;
  amount: number;
  address: string;
}

export function DoubleConfirmModal({ isOpen, onClose, onConfirmed, amount, address }: DoubleConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Подтверждение вывода">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-sm text-text-primary font-bold">Пожалуйста, внимательно сверьте данные вашей транзакции!</p>
        <div className="card-inset p-4 rounded text-left flex flex-col gap-2">
          <div>
            <span className="text-xs text-text-muted block">Сумма к отправке:</span>
            <span className="mono-data font-extrabold text-text-primary text-lg">{amount} USDT</span>
          </div>
          <div>
            <span className="text-xs text-text-muted block">Адрес получателя (TRC-20):</span>
            <span className="mono-data font-bold text-xs break-all text-text-primary">{address}</span>
          </div>
        </div>
        <p className="text-xs text-danger font-semibold">
          Внимание: Отправка средств на ошибочный адрес или адрес другой сети приведет к безвозвратной потере средств!
        </p>
        <div className="flex gap-4 mt-2">
          <Button variant="light" className="w-full" onClick={onClose}>Отмена</Button>
          <Button className="w-full" onClick={onConfirmed}>Подтвердить</Button>
        </div>
      </div>
    </Modal>
  );
}

// 5. WithdrawSuccessModal
interface WithdrawSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export function WithdrawSuccessModal({ isOpen, onClose, amount }: WithdrawSuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Заявка создана">
      <div className="flex flex-col items-center gap-4 text-center py-4">
        <CheckCircle size={64} className="text-success" />
        <p className="text-text-primary font-bold">Вывод средств на сумму {amount} USDT успешно инициирован!</p>
        <p className="text-xs text-text-muted">
          Заявка отправлена в обработку. Средства будут переведены на указанный адрес в течение 10 минут.
        </p>
        <Button onClick={onClose} className="w-full mt-4">
          Понятно
        </Button>
      </div>
    </Modal>
  );
}

// 6. TwoFactorInfoModal
interface TwoFactorInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  isTelegram: boolean;
}

export function TwoFactorInfoModal({ isOpen, onClose, onAction, isTelegram }: TwoFactorInfoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Требуется защита 2FA">
      <div className="flex flex-col items-center gap-4 text-center py-4">
        <Warning size={64} className="text-warning" />
        <p className="text-text-primary font-bold">Для выполнения финансовых операций необходимо подключить 2FA</p>
        <p className="text-xs text-text-muted">
          {isTelegram
            ? "Для Telegram-пользователей доступна мгновенная синхронизация, однако рекомендуется использовать Google Authenticator."
            : "В целях безопасности вывод средств и подтверждение оплат требуют наличия активного Google Authenticator."
          }
        </p>
        <div className="flex flex-col gap-2 w-full mt-4">
          <Button onClick={onAction} className="w-full">Подключить 2FA</Button>
          <Button variant="light" onClick={onClose} className="w-full">Позже</Button>
        </div>
      </div>
    </Modal>
  );
}

// 7. TwoFactorModal (google setup with QR code and text key)
interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitCode: (code: string) => void;
  qrCodeImage: string | null;
  secretKey: string | null;
}

export function TwoFactorModal({ isOpen, onClose, onSubmitCode, qrCodeImage, secretKey }: TwoFactorModalProps) {
  const [pinCode, setPinCode] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Подключение Google 2FA">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-xs text-text-secondary">
          Отсканируйте этот QR-код в приложении Google Authenticator или введите ключ вручную, затем введите 6-значный пин-код подтверждения.
        </p>

        {qrCodeImage && (
          <div className="flex justify-center my-2">
            <div className="card p-2 bg-white rounded">
              <img src={`data:image/png;base64,${qrCodeImage}`} alt="2FA QR" width={150} height={150} />
            </div>
          </div>
        )}

        {secretKey && (
          <div className="card-inset p-3 rounded text-left">
            <span className="text-[10px] text-text-muted uppercase font-bold block mb-1">Секретный ключ</span>
            <div className="flex items-center justify-between">
              <span className="mono-data text-xs text-text-primary font-bold">{secretKey}</span>
              <button 
                onClick={() => copyToClipboard(secretKey)} 
                className="btn btn-primary btn-icon active btn-sm"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-text-muted uppercase mb-1 block text-left">Пин-код из приложения</label>
          <Input
            type="text"
            maxLength={6}
            placeholder="000000"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>

        <Button 
          className="w-full mt-2" 
          disabled={pinCode.length !== 6}
          onClick={() => onSubmitCode(pinCode)}
        >
          Активировать защиту
        </Button>
      </div>
    </Modal>
  );
}

// 8. PinCodeModal
interface PinCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
}

export function PinCodeModal({ isOpen, onClose, onSubmit }: PinCodeModalProps) {
  const [code, setCode] = useState("");

  const handleConfirm = () => {
    onSubmit(code);
    setCode("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Введите код 2FA">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-sm text-text-secondary">
          Пожалуйста, введите 6-значный одноразовый пароль из вашего приложения Google Authenticator для подтверждения транзакции.
        </p>
        <div className="py-2">
          <Input
            type="text"
            maxLength={6}
            placeholder="000000"
            className="text-center font-bold text-2xl tracking-widest mono-data"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Button variant="light" className="w-full" onClick={onClose}>Отмена</Button>
          <Button className="w-full" disabled={code.length !== 6} onClick={handleConfirm}>Подтвердить</Button>
        </div>
      </div>
    </Modal>
  );
}

// 9. StatusWarningModal
interface StatusWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string; // "notEnough" | "busyAddress" | "underDev"
}

export function StatusWarningModal({ isOpen, onClose, type }: StatusWarningModalProps) {
  const getContent = () => {
    switch (type) {
      case "notEnough":
        return {
          title: "Недостаточно средств",
          message: "На балансе вашего аккаунта недостаточно средств для проведения данной операции. Пожалуйста, пополните баланс.",
        };
      case "busyAddress":
        return {
          title: "Адрес занят",
          message: "Все доступные адреса для пополнения в данный момент заняты. Пожалуйста, повторите попытку через 5-10 минут.",
        };
      case "underDev":
      default:
        return {
          title: "Раздел в разработке",
          message: "Данный метод оплаты/вывода временно недоступен и находится в процессе технической интеграции.",
        };
    }
  };

  const content = getContent();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={content.title}>
      <div className="flex flex-col items-center gap-4 text-center py-4">
        <Key size={64} className="text-danger" />
        <p className="text-sm text-text-secondary leading-relaxed font-semibold">
          {content.message}
        </p>
        <Button onClick={onClose} className="w-full mt-4">
          Закрыть
        </Button>
      </div>
    </Modal>
  );
}
