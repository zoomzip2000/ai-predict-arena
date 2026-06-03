"use client";

import React, { useEffect } from "react";
import { X } from "@phosphor-icons/react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: string; // e.g. "480px"
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  actions,
  maxWidth = "480px"
}: ModalProps) {
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="modal-overlay open select-none"
    >
      <div 
        className="modal-box" 
        style={{ maxWidth }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="modal-close-btn hover:shadow-soft-sm"
        >
          <X size={16} />
        </button>

        {/* Modal Title */}
        <div className="modal-title font-extrabold text-text-primary">
          {title}
        </div>

        {/* Modal Body */}
        <div className="modal-body text-text-muted mt-4">
          {children}
        </div>

        {/* Modal Actions */}
        {actions && (
          <div className="modal-actions mt-6">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function WarningModal({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = "Подтвердить",
  cancelText = "Отмена"
}: WarningModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      actions={
        <>
          <Button variant="light" size="sm" onClick={onClose} className="w-full">
            {cancelText}
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm} className="w-full">
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="margin-0 text-text-secondary leading-relaxed font-semibold">
        {message}
      </p>
    </Modal>
  );
}
