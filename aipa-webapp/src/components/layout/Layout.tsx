"use client";

import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col nm-bg transition-colors duration-200">
      <Header />
      
      {/* 
        Print-style Container Layout:
        Lock to vertical grid spacing (padding-top 40px / margin-bottom 40px / baseline units)
      */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-10 py-10 flex flex-col gap-8">
        {children}
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
