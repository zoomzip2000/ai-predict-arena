"use client";

import React from "react";

export default function Preloader() {
  return (
    <div className="preloader-showcase p-10 flex items-center justify-center select-none">
      <div className="pl">
        <div className="pl__outer-ring" />
        <div className="pl__inner-ring" />
        <div className="pl__track-cover" />
        <div className="pl__ball">
          <div className="pl__ball-texture" />
          <div className="pl__ball-inner-shadow" />
          <div className="pl__ball-side-shadows" />
        </div>
      </div>
    </div>
  );
}
