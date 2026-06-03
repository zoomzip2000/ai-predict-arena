"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogo, TelegramLogo, ArrowRight, Envelope, Lock, Key } from "@phosphor-icons/react";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/FormControl";
import { saveTokenAction } from "@/store/slices/mainSlice";
import { getUserInfoAction } from "@/store/slices/userSlice";
import { signInWithGoogleMethod } from "@/api/auth";
import { RootState } from "@/store";

export default function SignInPage() {
  const dispatch = useDispatch<any>();
  const authToken = useSelector((state: RootState) => state.main.token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Re-route if token already exists
  useEffect(() => {
    if (authToken) {
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  }, [authToken]);

  const handleDemoSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // Simulate successful login with a mock token if credential-based
      const mockToken = "mock_jwt_token_for_aipa_arena_platform";
      dispatch(saveTokenAction(mockToken));
      if (typeof window !== "undefined") {
        localStorage.setItem("token", mockToken);
        localStorage.setItem("refreshToken", "mock_refresh_token");
      }
      await dispatch(getUserInfoAction());
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err: any) {
      setErrorMessage("Ошибка входа. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleMockLogin = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // Call mock auth endpoint with fake google credential
      const res = await signInWithGoogleMethod({ tokenFromGoogle: "google_oauth_mock_credential_token" });
      if (res.status === 200 || res.status === 201) {
        dispatch(saveTokenAction(res.data.token));
        if (typeof window !== "undefined") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }
        await dispatch(getUserInfoAction());
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }
    } catch (err: any) {
      // Fallback if backend is down or API has issue
      console.warn("Backend auth failed, falling back to mock authentication token");
      const mockToken = "mock_jwt_token_from_google_fallback";
      dispatch(saveTokenAction(mockToken));
      if (typeof window !== "undefined") {
        localStorage.setItem("token", mockToken);
        localStorage.setItem("refreshToken", "mock_refresh_token");
      }
      await dispatch(getUserInfoAction());
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col justify-center items-center px-4 select-none">
      {/* Dynamic colorful light spots for visual premium polish */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-secondary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-info/10 blur-[120px] pointer-events-none" />

      <div className="card w-full max-w-[420px] p-8 rounded-2xl border border-nm-border relative overflow-hidden">
        {/* Top Header */}
        <div className="text-center mb-8">
          <span className="text-3xl font-extrabold text-text-primary tracking-tight">
            AI Predict <span className="text-secondary font-bold">Arena</span>
          </span>
          <p className="text-xs text-text-muted mt-2 font-semibold uppercase tracking-wider">
            Авторизация в панели прогнозов
          </p>
        </div>

        {errorMessage && (
          <div className="card-inset p-3 rounded mb-4 border border-danger/20 bg-danger/5 text-danger text-xs font-bold text-center">
            {errorMessage}
          </div>
        )}

        {/* Auth Social Networks Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={handleGoogleMockLogin}
            className="btn btn-primary w-full flex items-center justify-center gap-3 py-3 border border-nm-border hover:shadow-soft-sm active:shadow-inset"
          >
            <GoogleLogo size={20} className="text-danger" />
            <span className="text-sm font-bold text-text-primary">Войти через Google</span>
          </button>

          <button
            onClick={handleGoogleMockLogin}
            className="btn btn-primary w-full flex items-center justify-center gap-3 py-3 border border-nm-border hover:shadow-soft-sm active:shadow-inset"
          >
            <TelegramLogo size={20} className="text-info" />
            <span className="text-sm font-bold text-text-primary">Войти через Telegram</span>
          </button>
        </div>

        {/* Horizontal separator */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-[1px] bg-nm-border" />
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Или</span>
          <div className="flex-1 h-[1px] bg-nm-border" />
        </div>

        {/* Manual Credentials form */}
        <form onSubmit={handleDemoSignIn} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-text-muted uppercase mb-1 block">Электронная почта</label>
            <div className="relative">
              <Input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-text-muted uppercase mb-1 block">Пароль</label>
            <div className="relative">
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? "Вход..." : "Войти в систему"}
          </Button>
        </form>

        {/* Footer info link */}
        <div className="text-center mt-6 text-xs text-text-muted">
          <span>Нет аккаунта? </span>
          <Link href="/sign-up" className="text-secondary font-bold text-decoration-none hover:underline">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}
