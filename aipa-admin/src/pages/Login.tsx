import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Key, User } from "@phosphor-icons/react";
import { setAuthData } from "../store/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    // In mock mode, we accept any credentials and assign the "ADMIN" role
    const mockToken = "mock-jwt-token-admin";
    const assignedRole = username.toLowerCase().includes("support") 
      ? "ROLE_TECH_SUPPORT" 
      : username.toLowerCase().includes("market")
      ? "ROLE_MARKETER"
      : "ADMIN";

    dispatch(setAuthData({ token: mockToken, role: assignedRole }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F3]">
      <div className="w-full max-w-md p-8 nm-card border border-nm-border">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-[#31344b] mb-1">
            AIPA <span className="text-[#2D4CC8]">Admin</span>
          </h1>
          <p className="text-sm text-[#66799e]">
            Панель управления платформы предсказаний
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg border border-red-200 bg-red-50 text-[#A91E2C] text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#44476a]">Имя пользователя</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#93a5be]">
                <User size={18} />
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin / support"
                className="form-control-nm pl-11"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#44476a]">Пароль</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#93a5be]">
                <Key size={18} />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-control-nm pl-11"
              />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn-nm btn-nm-primary w-full justify-center py-3 mt-4 cursor-pointer"
          >
            Войти в систему
          </button>
        </form>
      </div>
    </div>
  );
}
