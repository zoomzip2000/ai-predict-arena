"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "light";
  size?: "sm" | "md" | "lg";
  pill?: boolean;
  active?: boolean;
  iconOnly?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  pill = false,
  active = false,
  iconOnly = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  // Base classes corresponding to .btn in the HTML kits
  let buttonClasses = "btn transition-all duration-200 select-none";

  // Variant matching
  switch (variant) {
    case "primary":
      buttonClasses += " btn-primary";
      break;
    case "secondary":
      buttonClasses += " btn-secondary";
      break;
    case "success":
      buttonClasses += " btn-success";
      break;
    case "danger":
      buttonClasses += " btn-danger";
      break;
    case "warning":
      buttonClasses += " btn-warning";
      break;
    case "info":
      buttonClasses += " btn-info";
      break;
    case "dark":
      buttonClasses += " btn-dark";
      break;
    case "light":
      buttonClasses += " btn-light";
      break;
  }

  // Size variations
  if (size === "sm") {
    buttonClasses += " btn-sm";
  } else if (size === "lg") {
    buttonClasses += " btn-lg";
  }

  // Rounding options
  if (pill) {
    buttonClasses += " btn-pill";
  }

  // Inset shadow status for active/clicked state
  if (active) {
    buttonClasses += " active";
  }

  // Icon only layout matching .btn-icon
  if (iconOnly) {
    buttonClasses += " btn-icon";
  }

  return (
    <button
      className={`${buttonClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
