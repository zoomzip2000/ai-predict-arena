"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "@/components/layout/Layout";
import Preloader from "@/components/ui/Preloader";
import Button from "@/components/ui/Button";
import { ShieldCheck, DeviceMobile, CheckCircle } from "@phosphor-icons/react";
import { RootState, AppDispatch } from "@/store";
import { useTranslation } from "@/utils/intl";
import { 
  generateGoogleTwoFAQr, 
  turnOnTwoFAMethod, 
  disableGoogleTwoFA 
} from "@/api/google2FA";
import { toggleIsTwoFAEnabled } from "@/store/slices/googleTwoFASlice";
import { getUserInfoAction } from "@/store/slices/userSlice";
import { TwoFactorModal, PinCodeModal } from "@/components/ui/DepositWithdrawModals";
import Modal from "@/components/ui/Modal";

export default function SafetyPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isDisconnectOpen, setIsDisconnectOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState<string | null>(null);

  const handleConnectClick = async () => {
    setIsLoading(true);
    try {
      const res = await generateGoogleTwoFAQr();
      if (res.status === 200) {
        setQrCode(res.data.qrCodeImage);
        setSecretKey(res.data.secretKey);
        setIsConnectOpen(true);
      }
    } catch (err) {
      console.error("Error generating 2FA QR code:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectSubmit = async (code: string) => {
    setIsLoading(true);
    try {
      const res = await turnOnTwoFAMethod(code);
      if (res.status === 200 || res.status === 201) {
        dispatch(toggleIsTwoFAEnabled(true));
        await dispatch(getUserInfoAction());
        setIsConnectOpen(false);
        setSuccessMessage("Вы успешно включили двухфакторную аутентификацию!");
        setIsSuccessOpen(true);
      }
    } catch (err) {
      console.error("Error enabling 2FA:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnectSubmit = async (code: string) => {
    setIsLoading(true);
    try {
      const res = await disableGoogleTwoFA(code);
      if (res.status === 200 || res.status === 201) {
        dispatch(toggleIsTwoFAEnabled(false));
        await dispatch(getUserInfoAction());
        setIsDisconnectOpen(false);
        setSuccessMessage("Двухфакторная аутентификация успешно отключена.");
        setIsSuccessOpen(true);
      }
    } catch (err) {
      console.error("Error disabling 2FA:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isEnabled = userInfo?.twoFactorEnabled || false;

  return (
    <Layout>
      <div className="max-w-[800px] mx-auto px-6 py-8 select-none">
        {/* Navigation Tabs Header */}
        <div className="flex items-center gap-6 mb-8 border-b border-nm-border pb-4">
          <a href="/account" className="text-sm font-semibold text-text-secondary hover:text-text-primary text-decoration-none transition-colors">
            Профиль
          </a>
          <span className="text-sm font-extrabold text-secondary border-b-2 border-secondary pb-4.5">
            Безопасность
          </span>
          <a href="/transaction-history" className="text-sm font-semibold text-text-secondary hover:text-text-primary text-decoration-none transition-colors">
            История операций
          </a>
        </div>

        <h1 className="text-3xl font-extrabold text-text-primary mb-6">
          Безопасность аккаунта
        </h1>

        <div className="card p-6 border border-nm-border flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="btn-icon active p-4 rounded-full text-secondary shrink-0">
              <ShieldCheck size={36} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-text-primary mb-0.5">
                {t("safePage_text1", "Двухфакторная аутентификация")}
              </h2>
              <p className="text-xs text-text-muted">
                {t("safePage_text25", "Установите приложение 2FA на ваш телефон для защиты транзакций")}
              </p>
            </div>
          </div>

          <hr className="border-nm-border my-0" />

          {/* GA Section */}
          <div className="card-inset p-5 rounded border border-nm-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="btn-icon active p-3 rounded-full text-secondary shrink-0">
                <DeviceMobile size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary mb-1">
                  Google Authenticator
                </h3>
                <p className="text-xs text-text-muted mb-0 leading-relaxed max-w-[400px]">
                  Одноразовые коды безопасности из приложения на мобильном устройстве для подтверждения критических операций (вывод средств, изменение настроек).
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              {isEnabled ? (
                <>
                  <span className="text-xs font-bold text-success uppercase tracking-wider px-2 py-1 rounded bg-success/10 border border-success/20">
                    Активно
                  </span>
                  <Button variant="light" size="sm" onClick={() => setIsDisconnectOpen(true)}>
                    Отключить
                  </Button>
                </>
              ) : (
                <>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider px-2 py-1 rounded bg-bg-white/10 border border-nm-border">
                    Отключено
                  </span>
                  <Button variant="secondary" size="sm" onClick={handleConnectClick}>
                    Подключить
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Connection Modal */}
      <TwoFactorModal
        isOpen={isConnectOpen}
        onClose={() => setIsConnectOpen(false)}
        onSubmitCode={handleConnectSubmit}
        qrCodeImage={qrCode}
        secretKey={secretKey}
      />

      {/* Disconnection Modal */}
      <PinCodeModal
        isOpen={isDisconnectOpen}
        onClose={() => setIsDisconnectOpen(false)}
        onSubmit={handleDisconnectSubmit}
      />

      {/* Success Notification Modal */}
      <Modal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} title="Успех">
        <div className="flex flex-col items-center gap-4 text-center py-4">
          <CheckCircle size={64} className="text-success" />
          <p className="text-text-primary font-bold">{successMessage}</p>
          <Button onClick={() => setIsSuccessOpen(false)} className="w-full mt-4">
            Отлично
          </Button>
        </div>
      </Modal>

      {isLoading && <Preloader />}
    </Layout>
  );
}
