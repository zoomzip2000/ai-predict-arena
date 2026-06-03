"use client";

import React from "react";

interface GetImageComponentProps {
  imageLink?: string | null;
  imgUuid?: string | null;
}

export function GetImageComponent({ imageLink, imgUuid }: GetImageComponentProps) {
  const isCustomImage = !!imageLink;
  return (
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center rounded-lg ${isCustomImage ? "" : "bg-bg-light"}`}>
      <img
        alt={imgUuid || "event image"}
        src={imageLink || "/img/defaultEventImg.png"}
        className="w-full h-full"
        style={{ objectFit: isCustomImage ? "cover" : "contain" }}
      />
    </div>
  );
}

export default React.memo(GetImageComponent);
