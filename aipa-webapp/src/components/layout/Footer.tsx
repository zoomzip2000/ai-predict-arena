import React from "react";

export default function Footer() {
  return (
    <footer className="kit-footer select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="margin-0 text-text-muted">
          &copy; 2026 AI Predict Arena (AIPA). Все права защищены. Экспериментальная ИИ-платформа.
        </p>
        <div className="flex gap-4">
          <a href="/rules" className="text-text-muted hover:text-text-primary text-decoration-none">Правила</a>
          <a href="/safety" className="text-text-muted hover:text-text-primary text-decoration-none">Безопасность</a>
          <a href="/commissions" className="text-text-muted hover:text-text-primary text-decoration-none">Комиссии</a>
        </div>
      </div>
    </footer>
  );
}
