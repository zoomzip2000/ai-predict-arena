"use client";

import React from "react";

interface ProgressBarProps {
  label: string;
  percent: number;
  variant?: "default" | "success" | "danger" | "warning";
  height?: string; // e.g. "10px"
  showPercent?: boolean;
}

export default function ProgressBar({
  label,
  percent,
  variant = "default",
  height = "10px",
  showPercent = true
}: ProgressBarProps) {
  
  // Format percentage safely
  const percentClamped = Math.min(100, Math.max(0, percent));
  
  // Color mapping
  let barClass = "progress-bar";
  if (variant === "success") barClass += " success";
  if (variant === "danger") barClass += " danger";
  if (variant === "warning") barClass += " warning";

  return (
    <div className="progress-wrap select-none">
      <div className="progress-label font-bold text-text-primary text-sm flex justify-between">
        <span>{label}</span>
        {showPercent && <span className="mono-data">{percentClamped}%</span>}
      </div>
      
      <div 
        className="progress" 
        style={{ height }}
      >
        <div 
          className={barClass} 
          style={{ width: `${percentClamped}%` }}
        />
      </div>
    </div>
  );
}
