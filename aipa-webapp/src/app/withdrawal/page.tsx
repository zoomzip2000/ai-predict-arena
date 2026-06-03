"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Coins, CreditCard, TelegramLogo, CaretRight, ArrowLeft } from "@phosphor-icons/react";
import Layout from "@/components/layout/Layout";
import Tabs from "@/components/ui/Tabs";
import Preloader from "@/components/ui/Preloader";
import { useWithdrawal } from "@/hooks/useWithdrawal";
import { getUsdtCommissionAction } from "@/store/slices/commissionsSlice";
import { RootState } from "@/store";
import {
  UsdtDepositModal,
  SuccessfulDepositModal,
  WithdrawUsdtModal,
  DoubleConfirmModal,
  WithdrawSuccessModal,
  TwoFactorInfoModal,
  TwoFactorModal,
  PinCodeModal,
  StatusWarningModal,
} from "@/components/ui/DepositWithdrawModals";

export default function WithdrawalPage() {
  const dispatch = useDispatch<any>();
  const {
    activeTab,
    setActiveTab,
    permissions,
    isLoading,
    isDepositModalOpen,
    setIsDepositModalOpen,
    isTwoFactorInfoModalOpen,
    setIsTwoFactorInfoModalOpen,
    isTwoFactorModalOpen,
    setIsTwoFactorModalOpen,
    isSuccessDepositModalOpen,
    setIsSuccessDepositModalOpen,
    isWithdrawUsdtModalOpen,
    setIsWithdrawUsdtModalOpen,
    isWithdrawConfirmModalOpen,
    setIsWithdrawConfirmModalOpen,
    isPinCodeModalOpen,
    setIsPinCodeModalOpen,
    isWithdrawSuccessModalOpen,
    setIsWithdrawSuccessModalOpen,
    isWarningModalOpen,
    setIsWarningModalOpen,
    withdrawAmountValue,
    setWithdrawAmountValue,
    withdrawAddressValue,
    setWithdrawAddressValue,
    code,
    popupType,
    setPopupType,
    handleDepositOpen,
    handleWithdrawOpen,
    tetherDepositModalBtnHandler,
    withdrawModalBtnHandler,
    confirmWithdrawModalBtnHandler,
    twoFactorInfoModalBtnHandler,
    twoFactorModalBtnHandler,
    pinCodePopupSubmitHandler,
  } = useWithdrawal();

  const userBalance = useSelector((state: RootState) => state.user.userInfo?.balance || 0);
  const isTelegram = useSelector((state: RootState) => state.user.isTelegram);
  const qrCodeImage = useSelector((state: RootState) => state.googleTwoFA.qrCodeImage);
  const secretKey = useSelector((state: RootState) => state.googleTwoFA.secretKey);
  const commission = useSelector((state: RootState) => state.commissions.commissions?.commissionUSDT || 1);

  useEffect(() => {
    dispatch(getUsdtCommissionAction());
  }, [dispatch]);

  const tabs = [
    { id: "deposit", label: "Пополнение баланса" },
    { id: "withdrawal", label: "Вывод средств" },
  ];

  const triggerUnderDev = () => {
    setPopupType("underDev");
    setIsWarningModalOpen(true);
  };

  return (
    <Layout>
      <div className="max-w-[700px] mx-auto px-4 py-8 select-none">
        <h1 className="text-3xl font-extrabold text-text-primary tracking-tight mb-6 text-center">
          Касса
        </h1>

        {/* Tab switcher */}
        <div className="flex justify-center mb-8">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as "deposit" | "withdrawal")}
          />
        </div>

        <div className="flex flex-col gap-4">
          {activeTab === "deposit" ? (
            <>
              {/* USDT Card */}
              <div
                onClick={handleDepositOpen}
                className={`card p-5 rounded-lg flex items-center justify-between cursor-pointer border border-nm-border transition-all ${
                  permissions.depositCryptoUSDT === "OFF" ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="btn-icon active p-3 rounded-full text-secondary">
                    <Coins size={28} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary mb-0.5">Tether USDT TRC-20</h3>
                    <p className="text-xs text-text-muted">Моментальное автоматическое пополнение</p>
                  </div>
                </div>
                <CaretRight size={20} className="text-text-muted" />
              </div>

              {/* P2P Ukraine */}
              <a
                href="https://t.me/wallet"
                target="_blank"
                rel="noreferrer"
                className={`card p-5 rounded-lg flex items-center justify-between cursor-pointer border border-nm-border text-decoration-none transition-all ${
                  permissions.depositP2p === "OFF" ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="btn-icon active p-3 rounded-full text-info">
                    <TelegramLogo size={28} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary mb-0.5">P2P Украина</h3>
                    <p className="text-xs text-text-muted">Покупка через Telegram P2P Wallet</p>
                  </div>
                </div>
                <CaretRight size={20} className="text-text-muted" />
              </a>

              {/* Visa/Mastercard */}
              <div
                onClick={triggerUnderDev}
                className={`card p-5 rounded-lg flex items-center justify-between cursor-pointer border border-nm-border transition-all ${
                  permissions.depositVisaEur === "OFF" ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="btn-icon active p-3 rounded-full text-text-muted">
                    <CreditCard size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-text-primary mb-0.5">Visa / Mastercard</h3>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-bg-light border border-nm-border text-text-muted font-bold">
                        Dev
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">Пополнение в EUR с банковских карт</p>
                  </div>
                </div>
                <CaretRight size={20} className="text-text-muted" />
              </div>
            </>
          ) : (
            <>
              {/* USDT Withdrawal */}
              <div
                onClick={handleWithdrawOpen}
                className={`card p-5 rounded-lg flex items-center justify-between cursor-pointer border border-nm-border transition-all ${
                  permissions.withdrawCryptoUSDT === "OFF" ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="btn-icon active p-3 rounded-full text-secondary">
                    <Coins size={28} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary mb-0.5">Tether USDT TRC-20</h3>
                    <p className="text-xs text-text-muted">Вывод на адрес любого криптокошелька</p>
                  </div>
                </div>
                <CaretRight size={20} className="text-text-muted" />
              </div>

              {/* P2P Ukraine Withdrawal */}
              <a
                href="https://t.me/wallet"
                target="_blank"
                rel="noreferrer"
                className={`card p-5 rounded-lg flex items-center justify-between cursor-pointer border border-nm-border text-decoration-none transition-all ${
                  permissions.withdrawP2p === "OFF" ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="btn-icon active p-3 rounded-full text-info">
                    <TelegramLogo size={28} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary mb-0.5">P2P Украина</h3>
                    <p className="text-xs text-text-muted">Вывод гривны через Telegram P2P</p>
                  </div>
                </div>
                <CaretRight size={20} className="text-text-muted" />
              </a>

              {/* Visa/Mastercard Withdrawal */}
              <div
                onClick={triggerUnderDev}
                className={`card p-5 rounded-lg flex items-center justify-between cursor-pointer border border-nm-border transition-all ${
                  permissions.withdrawVisaEur === "OFF" ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="btn-icon active p-3 rounded-full text-text-muted">
                    <CreditCard size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-text-primary mb-0.5">Visa / Mastercard</h3>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-bg-light border border-nm-border text-text-muted font-bold">
                        Dev
                      </span>
                    </div>
                    <p className="text-xs text-text-muted">Прямой вывод в EUR на карту</p>
                  </div>
                </div>
                <CaretRight size={20} className="text-text-muted" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals injection */}
      <UsdtDepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        onPaymentSubmitted={tetherDepositModalBtnHandler}
        code={code}
      />

      <SuccessfulDepositModal
        isOpen={isSuccessDepositModalOpen}
        onClose={() => setIsSuccessDepositModalOpen(false)}
      />

      <WithdrawUsdtModal
        isOpen={isWithdrawUsdtModalOpen}
        onClose={() => setIsWithdrawUsdtModalOpen(false)}
        onSubmitted={(amount, address) => {
          setWithdrawAmountValue(String(amount));
          setWithdrawAddressValue(address);
          setIsWithdrawUsdtModalOpen(false);
          withdrawModalBtnHandler();
        }}
        userBalance={userBalance}
        commission={commission}
      />

      <DoubleConfirmModal
        isOpen={isWithdrawConfirmModalOpen}
        onClose={() => setIsWithdrawConfirmModalOpen(false)}
        onConfirmed={confirmWithdrawModalBtnHandler}
        amount={Number(withdrawAmountValue)}
        address={withdrawAddressValue}
      />

      <WithdrawSuccessModal
        isOpen={isWithdrawSuccessModalOpen}
        onClose={() => setIsWithdrawSuccessModalOpen(false)}
        amount={Number(withdrawAmountValue)}
      />

      <TwoFactorInfoModal
        isOpen={isTwoFactorInfoModalOpen}
        onClose={() => setIsTwoFactorInfoModalOpen(false)}
        onAction={twoFactorInfoModalBtnHandler}
        isTelegram={isTelegram}
      />

      <TwoFactorModal
        isOpen={isTwoFactorModalOpen}
        onClose={() => setIsTwoFactorModalOpen(false)}
        onSubmitCode={twoFactorModalBtnHandler}
        qrCodeImage={qrCodeImage}
        secretKey={secretKey}
      />

      <PinCodeModal
        isOpen={isPinCodeModalOpen}
        onClose={() => setIsPinCodeModalOpen(false)}
        onSubmit={pinCodePopupSubmitHandler}
      />

      <StatusWarningModal
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        type={popupType}
      />

      {isLoading && <Preloader />}
    </Layout>
  );
}
