"use client";

import React from "react";

interface GetImageComponentProps {
  imageLink?: string | null;
  imgUuid?: string | null;
  categoryName?: string;
}

// Category icon map for visual variety
const CATEGORY_ICONS: Record<string, string> = {
  "Выборы": "🗳",
  "Политика": "🌍",
  "Криптовалюта": "₿",
  "Рынки": "📈",
  "Космос": "🚀",
  "Технологии": "⚡",
  "Спорт": "⚽",
  "Экономика": "💹",
  "Наука": "🔬",
  "ИИ": "🤖",
};

const GRADIENT_PRESETS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
  "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
  "linear-gradient(135deg, #0d0d0d 0%, #1a1a3e 50%, #0d0d0d 100%)",
];

function getGradientForUuid(uuid?: string | null): string {
  if (!uuid) return GRADIENT_PRESETS[0];
  const code = uuid.charCodeAt(0) + uuid.charCodeAt(1);
  return GRADIENT_PRESETS[code % GRADIENT_PRESETS.length];
}

export function GetImageComponent({ imageLink, imgUuid, categoryName }: GetImageComponentProps) {
  const isCustomImage = !!imageLink;

  if (isCustomImage) {
    return (
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center rounded-lg">
        <img
          alt={imgUuid || "event image"}
          src={imageLink!}
          className="w-full h-full"
          style={{ objectFit: "cover" }}
          onError={(e) => {
            // If image fails to load, hide it and show the placeholder
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    );
  }

  // CSS gradient placeholder — no external image dependency
  const gradient = getGradientForUuid(imgUuid);
  const icon = categoryName ? (CATEGORY_ICONS[categoryName] || "🔮") : "🔮";

  return (
    <div
      className="relative w-full h-full rounded-lg flex flex-col items-center justify-center gap-2 select-none"
      style={{ background: gradient }}
    >
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 21px)",
        }}
      />
      <span className="text-4xl z-10 drop-shadow-lg">{icon}</span>
      <span
        className="z-10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        AI PREDICT ARENA
      </span>
    </div>
  );
}

export default React.memo(GetImageComponent);

