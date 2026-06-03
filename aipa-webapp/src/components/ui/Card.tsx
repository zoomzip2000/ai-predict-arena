"use client";

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "soft" | "inset";
}

export function Card({ 
  children, 
  variant = "soft", 
  className = "", 
  ...props 
}: CardProps) {
  const cardClass = variant === "inset" ? "nm-card-inset" : "nm-card";
  return (
    <div className={`${cardClass} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 border-b border-nm-border ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 border-t border-nm-border ${className}`} {...props}>
      {children}
    </div>
  );
}

interface PredCardProps {
  category: string;
  timeLeft: string;
  amount: string;
  description: string;
  items: { label: string; value: string; isAccent?: boolean }[];
  children?: React.ReactNode;
  className?: string;
  onHeaderClick?: () => void;
}

export function PredCard({
  category,
  timeLeft,
  amount,
  description,
  items,
  children,
  className = "",
  onHeaderClick
}: PredCardProps) {
  return (
    <div className={`pred-card ${className}`}>
      {/* Price / Pool box */}
      <div className="pred-card__price-box">
        <span className="pred-card__currency">POOL:</span>
        <span className="pred-card__amount font-mono"> {amount}</span>
        <span className="pred-card__period"> AIPA</span>
      </div>

      <div className="pred-card__body flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-center text-[10px] font-bold text-text-muted mb-4 uppercase">
            <span className="text-secondary bg-secondary/10 px-2 py-0.5 rounded tracking-wider">{category}</span>
            <span className="font-mono">{timeLeft}</span>
          </div>

          <p 
            onClick={onHeaderClick}
            className={`pred-card__desc text-sm text-text-secondary leading-relaxed font-semibold hover:text-secondary cursor-pointer transition-colors ${onHeaderClick ? "cursor-pointer" : ""}`}
          >
            {description}
          </p>

          <ul className="pred-card__list">
            {items.map((item, idx) => (
              <li key={idx}>
                <strong>{item.label}</strong>
                <span className={item.isAccent ? "text-secondary font-mono" : "text-text-primary"}>
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {children && <div className="pred-card__actions">{children}</div>}
      </div>
    </div>
  );
}
