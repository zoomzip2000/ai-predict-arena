"use client";

import React from "react";
import { Check } from "@phosphor-icons/react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Checkbox({ label, checked, onChange, disabled, ...props }: CheckboxProps) {
  const [internalChecked, setInternalChecked] = React.useState(checked || false);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    const nextVal = !internalChecked;
    setInternalChecked(nextVal);
    if (onChange) {
      const event = {
        target: { checked: nextVal },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  React.useEffect(() => {
    if (checked !== undefined) {
      setInternalChecked(checked);
    }
  }, [checked]);

  return (
    <div 
      onClick={handleClick}
      className={`form-check select-none ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div className="check-box">
        {internalChecked && <Check className="text-white" size={12} weight="bold" />}
      </div>
      <span className="check-label">{label}</span>
    </div>
  );
}

export function Radio({ label, checked, onChange, disabled, name, value, ...props }: RadioProps) {
  const handleClick = () => {
    if (disabled) return;
    if (onChange) {
      const event = {
        target: { name, value, checked: true },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`form-check select-none ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div className="radio-box">
        {checked && <div className="w-2 h-2 rounded-full bg-secondary" />}
      </div>
      <span className="check-label">{label}</span>
    </div>
  );
}

export function Toggle({ label, checked, onChange, disabled }: ToggleProps) {
  const handleToggle = () => {
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <div 
      onClick={handleToggle}
      className={`toggle-wrap select-none ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div className={`toggle ${checked ? "on" : ""}`} />
      <span className="check-label">{label}</span>
    </div>
  );
}
