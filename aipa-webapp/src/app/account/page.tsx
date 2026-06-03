"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import Preloader from "@/components/ui/Preloader";
import Button from "@/components/ui/Button";
import { useAccount } from "@/hooks/useAccount";
import { User, ShieldCheck, Browser, Desktop, TelegramLogo, Envelope, Pencil } from "@phosphor-icons/react";
import {
  EditNicknameModal,
  ActivityLogsModal,
  SessionsManagementModal,
  TelegramConnectionModal,
} from "@/components/ui/AccountModals";

export default function AccountPage() {
  const {
    userInfo,
    userActivity,
    userSessions,
    isTelegram,
    isLoading,
    isEditNicknameOpen,
    setIsEditNicknameOpen,
    isActivityOpen,
    setIsActivityOpen,
    isSessionsOpen,
    setIsSessionsOpen,
    isTelegramBotOpen,
    setIsTelegramBotOpen,
    nicknameInput,
    setNicknameInput,
    handleEditNicknameSubmit,
    handleTerminateSession,
  } = useAccount();

  return (
    <Layout>
      <div className="max-w-[800px] mx-auto px-10 py-8 select-none">
        {/* Navigation / Header Links */}
        <div className="flex items-center gap-6 mb-8 border-b border-nm-border pb-4">
          <span className="text-sm font-extrabold text-secondary border-b-2 border-secondary pb-4.5">
            Профиль
          </span>
          <a href="/transaction-history" className="text-sm font-semibold text-text-secondary hover:text-text-primary text-decoration-none transition-colors">
            История операций
          </a>
        </div>

        <h1 className="text-3xl font-extrabold text-text-primary mb-6">
          Личный кабинет
        </h1>

        {/* Profile Card & Info */}
        <div className="card p-6 rounded-lg border border-nm-border flex flex-col gap-6">
          
          {/* Header section with User Avatar Placeholder */}
          <div className="flex items-center gap-4">
            <div className="btn-icon active p-4 rounded-full text-secondary shrink-0">
              <User size={36} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-text-primary mb-0.5">{userInfo?.username || "Загрузка..."}</h2>
              <p className="text-xs text-text-muted">Игровой аккаунт AI Predict Arena</p>
            </div>
          </div>

          <hr className="border-nm-border my-0" />

          {/* Rows of settings */}
          <div className="flex flex-col gap-4">
            
            {/* Email (If not logged in via Telegram directly) */}
            {!isTelegram && (
              <div className="card-inset p-4 rounded flex items-center justify-between gap-4 border border-nm-border">
                <div className="flex items-center gap-3">
                  <Envelope size={20} className="text-text-muted" />
                  <div>
                    <span className="text-xs text-text-muted block">Электронная почта</span>
                    <span className="font-semibold text-sm text-text-primary">{userInfo?.email || "не указана"}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Username/Nickname row */}
            <div className="card-inset p-4 rounded flex items-center justify-between gap-4 border border-nm-border">
              <div className="flex items-center gap-3">
                <User size={20} className="text-text-muted" />
                <div>
                  <span className="text-xs text-text-muted block">Отображаемое имя</span>
                  <span className="font-semibold text-sm text-text-primary">{userInfo?.username || "..."}</span>
                </div>
              </div>
              <Button 
                variant="light" 
                size="sm" 
                onClick={() => setIsEditNicknameOpen(true)}
                className="flex items-center gap-1"
              >
                <Pencil size={14} />
                Изменить
              </Button>
            </div>

            {/* Activity Logs row */}
            <div className="card-inset p-4 rounded flex items-center justify-between gap-4 border border-nm-border">
              <div className="flex items-center gap-3">
                <Browser size={20} className="text-text-muted" />
                <div>
                  <span className="text-xs text-text-muted block">Безопасность аккаунта</span>
                  <span className="font-semibold text-sm text-text-primary">История входов и операций</span>
                </div>
              </div>
              <Button 
                variant="light" 
                size="sm" 
                onClick={() => setIsActivityOpen(true)}
              >
                Логи
              </Button>
            </div>

            {/* Active Sessions row */}
            <div className="card-inset p-4 rounded flex items-center justify-between gap-4 border border-nm-border">
              <div className="flex items-center gap-3">
                <Desktop size={20} className="text-text-muted" />
                <div>
                  <span className="text-xs text-text-muted block">Устройства и сеансы</span>
                  <span className="font-semibold text-sm text-text-primary">Управление активными сессиями</span>
                </div>
              </div>
              <Button 
                variant="light" 
                size="sm" 
                onClick={() => setIsSessionsOpen(true)}
              >
                Керувати
              </Button>
            </div>

            {/* Telegram connection row */}
            <div className="card-inset p-4 rounded flex items-center justify-between gap-4 border border-nm-border">
              <div className="flex items-center gap-3">
                <TelegramLogo size={20} className="text-info" />
                <div>
                  <span className="text-xs text-text-muted block">Интеграции</span>
                  <span className="font-semibold text-sm text-text-primary">Связать уведомления в Telegram</span>
                </div>
              </div>
              <Button 
                variant="light" 
                size="sm" 
                onClick={() => setIsTelegramBotOpen(true)}
              >
                Подключить
              </Button>
            </div>

          </div>

        </div>
      </div>

      {/* Modals injection */}
      <EditNicknameModal
        isOpen={isEditNicknameOpen}
        onClose={() => setIsEditNicknameOpen(false)}
        nickname={nicknameInput}
        onChangeNickname={setNicknameInput}
        onSubmit={handleEditNicknameSubmit}
      />

      <ActivityLogsModal
        isOpen={isActivityOpen}
        onClose={() => setIsActivityOpen(false)}
        activityList={userActivity}
      />

      <SessionsManagementModal
        isOpen={isSessionsOpen}
        onClose={() => setIsSessionsOpen(false)}
        sessionsList={userSessions}
        onTerminate={handleTerminateSession}
      />

      <TelegramConnectionModal
        isOpen={isTelegramBotOpen}
        onClose={() => setIsTelegramBotOpen(false)}
      />

      {isLoading && <Preloader />}
    </Layout>
  );
}
