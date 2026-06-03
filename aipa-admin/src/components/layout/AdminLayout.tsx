import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { House, Users, Calendar, Coins, SignOut } from "@phosphor-icons/react";
import { clearAuthData } from "../../store/slices/authSlice";
import { RootState } from "../../store";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const role = useSelector((state: RootState) => state.auth.role);

  const handleLogout = () => {
    dispatch(clearAuthData());
    navigate("/sign-in");
  };

  const navItems = [
    { path: "/", label: "Панель управления", icon: House, roles: ["ADMIN", "USER", "ROLE_SUB_ADMIN"] },
    { path: "/users", label: "Користувачі", icon: Users, roles: ["ADMIN", "ROLE_SUB_ADMIN", "ROLE_TECH_SUPPORT", "ROLE_MARKETER"] },
    { path: "/events", label: "Події", icon: Calendar, roles: ["ADMIN", "ROLE_SUB_ADMIN"] },
    { path: "/crypto", label: "Крипто процесінг", icon: Coins, roles: ["ADMIN", "ROLE_SUB_ADMIN"] },
  ];

  const allowedItems = navItems.filter(item => {
    if (!role) return false;
    return item.roles.includes(role) || role === "ADMIN";
  });

  return (
    <div className="admin-layout flex">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8 px-2">
            <span className="text-xl font-extrabold text-text-dark">
              AIPA <span className="text-secondary font-bold">Admin</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {allowedItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-decoration-none transition-all cursor-pointer ${
                    isActive
                      ? "nm-card-inset text-secondary font-bold border-nm-border"
                      : "nm-card text-text-body border-nm-border hover:shadow-soft-sm"
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-secondary" : "text-text-muted"} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="px-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-nm-border nm-card text-danger font-bold cursor-pointer hover:shadow-soft-sm transition-all"
          >
            <SignOut size={20} className="text-danger" />
            <span className="text-sm">Выйти</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-content flex-1">
        {children}
      </main>
    </div>
  );
}
