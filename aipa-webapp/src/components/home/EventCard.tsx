"use client";

import React from "react";
import { useTranslation } from "@/utils/intl";
import Button from "@/components/ui/Button";
import { GetImageComponent } from "@/components/ui/GetImageComponent";
import { useEventCard, getDateWithTZ } from "@/hooks/useEventCard";

export interface EventItem {
  id: string;
  uuid: string;
  title: string;
  categoryName: string;
  categoryUuid: string;
  subCategory: string;
  imageLink: string | null;
  imageUuid: string | null;
  startTime: string;
  finishTime: string;
  betEndTime: string;
  status:
    | "ACTIVE"
    | "PASSIVE"
    | "EXPIRED"
    | "FINISHED"
    | "CLOSED"
    | "PUBLISHED"
    | "CANCELED"
    | "WAITING_UPDATE";
  bidUpCoefficient: number;
  bidDownCoefficient: number;
  totalAmount: number;
  expirationValue?: "BID_UP" | "BID_DOWN";
}

interface EventCardProps {
  item: EventItem;
  mainPage?: boolean;
}

export default function EventCard({ item, mainPage = false }: EventCardProps) {
  const { t } = useTranslation();
  const { isAnimatedChange, handlePredictClick, handleDetailsClick } = useEventCard(
    item.uuid,
    item.bidUpCoefficient,
    item.bidDownCoefficient
  );

  const renderBtnForStatus = (status: string) => {
    const defaultBtnClass = "w-full py-2.5 text-sm font-bold uppercase tracking-wider";
    
    switch (status) {
      case "ACTIVE":
        return (
          <Button
            variant="primary"
            className={defaultBtnClass}
            onClick={() => handleDetailsClick(item.categoryUuid, status)}
          >
            {mainPage ? t("mainPage_card", "Перейти к событиям") : t("cardText8", "Сделать ставку")}
          </Button>
        );
      case "PASSIVE":
        return (
          <Button
            variant="primary"
            className={defaultBtnClass}
            onClick={() => handleDetailsClick(item.categoryUuid, status)}
          >
            {mainPage ? t("mainPage_card", "Перейти к событиям") : t("cardText9", "Прием ставок окончен")}
          </Button>
        );
      case "EXPIRED":
        return (
          <Button
            variant="primary"
            className={defaultBtnClass}
            onClick={() => handleDetailsClick(item.categoryUuid, status)}
          >
            {mainPage ? t("mainPage_card", "Перейти к событиям") : t("cardBtnExp", "Расчет")}
          </Button>
        );
      case "FINISHED":
        return (
          <Button
            variant="primary"
            className={defaultBtnClass}
            onClick={() => handleDetailsClick(item.categoryUuid, status)}
          >
            {mainPage ? t("mainPage_card", "Перейти к событиям") : t("cardBtnExpire", "Экспирация")}
          </Button>
        );
      case "CLOSED":
        return (
          <Button
            variant="primary"
            className={defaultBtnClass}
            onClick={() => handleDetailsClick(item.categoryUuid, status)}
          >
            {mainPage ? t("mainPage_card", "Перейти к событиям") : t("cardBtnClosed", "Событие завершено")}
          </Button>
        );
      case "PUBLISHED":
        return (
          <Button
            variant="primary"
            className={defaultBtnClass}
            onClick={() => handleDetailsClick(item.categoryUuid, status)}
            disabled={!mainPage}
          >
            {mainPage ? (
              t("mainPage_card", "Перейти к событиям")
            ) : (
              <span>
                {t("cardBtnPublished", "Начало приема ставок")}{" "}
                {getDateWithTZ(item.startTime)}
              </span>
            )}
          </Button>
        );
      case "CANCELED":
        return (
          <Button
            variant="primary"
            className={defaultBtnClass}
            onClick={() => handleDetailsClick(item.categoryUuid, status)}
          >
            {mainPage ? t("mainPage_card", "Перейти к событиям") : t("cardBtnCanceled", "Событие отменено подробнее...")}
          </Button>
        );
      case "WAITING_UPDATE":
        return (
          <Button
            variant="primary"
            className={defaultBtnClass}
            onClick={() => handleDetailsClick(item.categoryUuid, status)}
          >
            {mainPage ? t("mainPage_card", "Перейти к событиям") : t("cardBtnExpire", "Экспирация")}
          </Button>
        );
      default:
        return (
          <Button
            variant="primary"
            className={defaultBtnClass}
            onClick={() => handleDetailsClick(item.categoryUuid, status)}
          >
            {mainPage ? t("mainPage_card", "Перейти к событиям") : t("cardText8", "Сделать ставку")}
          </Button>
        );
    }
  };

  const yesCoefficient = item.bidUpCoefficient ? item.bidUpCoefficient.toFixed(2) : "0.00";
  const noCoefficient = item.bidDownCoefficient ? item.bidDownCoefficient.toFixed(2) : "0.00";

  return (
    <div
      className={`nm-card border border-nm-border p-6 rounded-2xl flex flex-col justify-between hover:shadow-soft-lg transform hover:-translate-y-1 transition-all duration-200 w-full select-none ${
        isAnimatedChange ? "border-secondary/40 ring-1 ring-secondary/20" : ""
      }`}
    >
      {/* 1. Image block */}
      <div className="w-full h-40 mb-4 rounded-xl overflow-hidden">
        <GetImageComponent imageLink={item.imageLink} imgUuid={item.imageUuid} />
      </div>

      {/* 2. End date & Betting end date */}
      <div className="flex gap-4 mb-4">
        <div className="nm-card-inset bg-bg-secondary p-3 rounded-lg flex-1 text-center border border-nm-border">
          <span className="text-[10px] text-text-muted font-bold block mb-1 uppercase leading-none">
            {t("cardText1", "Дата завершения события")}
          </span>
          <span className="text-xs font-mono font-bold text-text-primary">
            {getDateWithTZ(item.finishTime)}
          </span>
        </div>

        <div className="nm-card-inset bg-bg-secondary p-3 rounded-lg flex-1 text-center border border-nm-border">
          <span className="text-[10px] text-text-muted font-bold block mb-1 uppercase leading-none">
            {t("cardText2", "Конец приема ставок")}
          </span>
          <span className="text-xs font-mono font-bold text-text-primary">
            {getDateWithTZ(item.betEndTime)}
          </span>
        </div>
      </div>

      {/* 3. Topic & Subtopic */}
      <div className="flex justify-between items-center gap-4 mb-3 px-1 text-xs">
        <div className="text-text-muted font-medium truncate">
          {t("cardText3", "Тема")}:{" "}
          <span className="text-text-primary font-bold">{item.categoryName}</span>
        </div>
        <div className="text-text-muted font-medium truncate text-right">
          {t("cardText4", "Подтема")}:{" "}
          <span className="text-text-primary font-bold">{item.subCategory}</span>
        </div>
      </div>

      {/* 4. Event Title */}
      <div className="min-h-[50px] mb-4 flex items-center">
        <h3 className="text-sm font-bold text-text-primary line-clamp-2 leading-relaxed mb-0">
          {item.title}
        </h3>
      </div>

      {/* 5. YES / NO Prediction Buttons */}
      <div className="flex gap-4 mb-4">
        <Button
          variant="success"
          className="flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          onClick={() => handlePredictClick("BID_UP")}
          disabled={item.status !== "ACTIVE" || mainPage}
        >
          <span>{t("cardText6", "Да")}</span>
          <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[10px]">{yesCoefficient}x</span>
        </Button>

        <Button
          variant="danger"
          className="flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          onClick={() => handlePredictClick("BID_DOWN")}
          disabled={item.status !== "ACTIVE" || mainPage}
        >
          <span>{t("cardText7", "Нет")}</span>
          <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[10px]">{noCoefficient}x</span>
        </Button>
      </div>

      {/* 6. Action state button */}
      <div className="w-full">
        {renderBtnForStatus(item.status)}
      </div>
    </div>
  );
}
