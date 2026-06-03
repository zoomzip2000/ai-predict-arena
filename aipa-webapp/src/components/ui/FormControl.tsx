"use client";

import React from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  feedbackText?: string;
  addonText?: string; // For input group text (e.g. USDT)
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  feedbackText?: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  isValid?: boolean;
  isInvalid?: boolean;
  feedbackText?: string;
}

export function Input({
  label,
  isValid,
  isInvalid,
  feedbackText,
  addonText,
  className = "",
  id,
  type = "text",
  ...props
}: InputProps) {
  let inputClass = "form-control";
  if (isValid) inputClass += " is-valid";
  if (isInvalid) inputClass += " is-invalid";

  const renderFeedback = () => {
    if (isValid && feedbackText) {
      return (
        <div className="valid-feedback flex items-center gap-1">
          <CheckCircle className="icon-sm text-success" />
          {feedbackText}
        </div>
      );
    }
    if (isInvalid && feedbackText) {
      return (
        <div className="invalid-feedback flex items-center gap-1">
          <WarningCircle className="icon-sm text-danger" />
          {feedbackText}
        </div>
      );
    }
    return null;
  };

  const renderInputCore = () => {
    if (addonText) {
      return (
        <div className="input-group">
          <input
            id={id}
            type={type}
            className={`${inputClass} ${className}`}
            {...props}
          />
          <span className="input-group-text">{addonText}</span>
        </div>
      );
    }
    return (
      <input
        id={id}
        type={type}
        className={`${inputClass} ${className}`}
        {...props}
      />
    );
  };

  return (
    <div className="form-group flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="form-label select-none">
          {label}
        </label>
      )}
      {renderInputCore()}
      {renderFeedback()}
    </div>
  );
}

export function Textarea({
  label,
  isValid,
  isInvalid,
  feedbackText,
  className = "",
  id,
  ...props
}: TextareaProps) {
  let inputClass = "form-control";
  if (isValid) inputClass += " is-valid";
  if (isInvalid) inputClass += " is-invalid";

  return (
    <div className="form-group flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="form-label select-none">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`${inputClass} ${className}`}
        {...props}
      />
      {isValid && feedbackText && (
        <div className="valid-feedback flex items-center gap-1">
          <CheckCircle className="icon-sm text-success" />
          {feedbackText}
        </div>
      )}
      {isInvalid && feedbackText && (
        <div className="invalid-feedback flex items-center gap-1">
          <WarningCircle className="icon-sm text-danger" />
          {feedbackText}
        </div>
      )}
    </div>
  );
}

export function Select({
  label,
  options,
  isValid,
  isInvalid,
  feedbackText,
  className = "",
  id,
  ...props
}: SelectProps) {
  let inputClass = "form-control";
  if (isValid) inputClass += " is-valid";
  if (isInvalid) inputClass += " is-invalid";

  return (
    <div className="form-group flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="form-label select-none">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`${inputClass} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {isValid && feedbackText && (
        <div className="valid-feedback flex items-center gap-1">
          <CheckCircle className="icon-sm text-success" />
          {feedbackText}
        </div>
      )}
      {isInvalid && feedbackText && (
        <div className="invalid-feedback flex items-center gap-1">
          <WarningCircle className="icon-sm text-danger" />
          {feedbackText}
        </div>
      )}
    </div>
  );
}
