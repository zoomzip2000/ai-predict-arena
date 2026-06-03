"use client";

import React from "react";
import { User, Globe, Desktop, Key, Info, TelegramLogo } from "@phosphor-icons/react";
import Modal from "./Modal";
import Button from "./Button";
import { Input } from "./FormControl";
import { Table } from "./Table";
import { UserActivityItem, UserSessionItem } from "../../api/user";

// 1. EditNicknameModal
interface EditNicknameModalProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
  onChangeNickname: (val: string) => void;
  onSubmit: () => void;
}

export function EditNicknameModal({ isOpen, onClose, nickname, onChangeNickname, onSubmit }: EditNicknameModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Изменить имя пользователя">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-text-secondary">
          Введите новое имя пользователя, которое будет отображаться в рейтингах, чатах и деталях ставок.
        </p>
        <div>
          <Input
            type="text"
            placeholder="Новое имя"
            value={nickname}
            onChange={(e) => onChangeNickname(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mt-2">
          <Button variant="light" className="w-full" onClick={onClose}>Отмена</Button>
          <Button className="w-full" disabled={nickname.trim() === ""} onClick={onSubmit}>Сохранить</Button>
        </div>
      </div>
    </Modal>
  );
}

// 2. ActivityLogsModal
interface ActivityLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activityList: UserActivityItem[];
}

export function ActivityLogsModal({ isOpen, onClose, activityList }: ActivityLogsModalProps) {
  const formatTime = (timeStr: string) => {
    try {
      return new Date(timeStr).toLocaleString("ru-RU");
    } catch {
      return timeStr;
    }
  };

  const columns = [
    {
      header: "Действие",
      key: "action",
      render: (row: UserActivityItem) => <span className="font-bold text-text-primary text-xs">{row.action}</span>,
    },
    {
      header: "IP Адрес",
      key: "ipAddress",
      render: (row: UserActivityItem) => <span className="mono-data text-xs text-text-secondary">{row.ipAddress}</span>,
    },
    {
      header: "Устройство",
      key: "device",
      render: (row: UserActivityItem) => <span className="text-text-muted text-xs">{row.device}</span>,
    },
    {
      header: "Время",
      key: "operationTime",
      render: (row: UserActivityItem) => <span className="text-xs">{formatTime(row.operationTime)}</span>,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="История активности аккаунта" maxWidth="650px">
      <div className="flex flex-col gap-4">
        <p className="text-xs text-text-secondary">
          Здесь показаны последние входы и изменения настроек безопасности вашего профиля.
        </p>
        <div className="max-h-[300px] overflow-y-auto">
          <Table columns={columns} data={activityList} />
        </div>
        <Button onClick={onClose} className="w-full mt-2">Закрыть</Button>
      </div>
    </Modal>
  );
}

// 3. SessionsManagementModal
interface SessionsManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionsList: UserSessionItem[];
  onTerminate: (id: string | number, device: string, isCurrentIp: boolean) => void;
}

export function SessionsManagementModal({ isOpen, onClose, sessionsList, onTerminate }: SessionsManagementModalProps) {
  const formatTime = (timeStr: string) => {
    try {
      return new Date(timeStr).toLocaleString("ru-RU");
    } catch {
      return timeStr;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Активные сессии" maxWidth="550px">
      <div className="flex flex-col gap-4">
        <p className="text-xs text-text-secondary">
          Список устройств, с которых осуществлен вход в ваш аккаунт. Вы можете завершить любую сессию отдельно.
        </p>

        <div className="flex flex-col gap-3 max-h-[320px] overflow-y-auto pr-1">
          {sessionsList.length === 0 ? (
            <div className="text-center text-text-muted py-6">Нет активных сессий</div>
          ) : (
            sessionsList.map((session) => (
              <div 
                key={session.id} 
                className="card-inset p-4 rounded flex items-center justify-between gap-4 border border-nm-border"
              >
                <div className="flex items-center gap-3">
                  <div className="btn-icon p-2 rounded bg-bg-light text-text-muted">
                    <Desktop size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-text-primary break-all">{session.device}</span>
                      {session.current && (
                        <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-success/15 border border-success/30 text-success font-bold">
                          Текущая
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-text-muted flex gap-2 mt-0.5">
                      <span className="mono-data">{session.ipAddress}</span>
                      <span>•</span>
                      <span>Активен: {formatTime(session.lastActive)}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => onTerminate(session.id, session.device, !!session.current)}
                >
                  Выйти
                </Button>
              </div>
            ))
          )}
        </div>

        <Button onClick={onClose} className="w-full mt-2">Закрыть</Button>
      </div>
    </Modal>
  );
}

// 4. TelegramConnectionModal
interface TelegramConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TelegramConnectionModal({ isOpen, onClose }: TelegramConnectionModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Подключить Telegram Bot">
      <div className="flex flex-col items-center gap-4 text-center py-4">
        <TelegramLogo size={64} className="text-info" />
        <p className="text-text-primary font-bold">Уведомления о ставках и выплатах прямо в Telegram!</p>
        <p className="text-xs text-text-muted leading-relaxed">
          Подключите нашего официального Telegram-бота, чтобы мгновенно получать отчеты о закрытии рынков, коэффициентах, выигрышах и пополнениях.
        </p>

        <div className="card-inset p-4 rounded-lg text-left text-xs text-text-secondary flex flex-col gap-2 w-full">
          <div>
            <strong>Шаг 1:</strong> Перейдите в бота по кнопке ниже.
          </div>
          <div>
            <strong>Шаг 2:</strong> Нажмите кнопку <strong>/start</strong>.
          </div>
          <div>
            <strong>Шаг 3:</strong> Бот автоматически привяжет ваш игровой профиль.
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full mt-4">
          <a 
            href="https://t.me/AIPredictArenaBot" 
            target="_blank" 
            rel="noreferrer" 
            className="btn btn-secondary w-full flex items-center justify-center gap-2 text-decoration-none"
          >
            <TelegramLogo size={20} />
            Запустить AIPredictArenaBot
          </a>
          <Button variant="light" onClick={onClose} className="w-full">
            Закрыть
          </Button>
        </div>
      </div>
    </Modal>
  );
}
