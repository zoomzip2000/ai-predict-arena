import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import AdminLayout from "./components/layout/AdminLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import EventsList from "./pages/EventsList";
import CryptoLogs from "./pages/CryptoLogs";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  if (!isAuthorized) {
    return <Navigate to="/sign-in" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

export default function App() {
  const isAuthorized = useSelector((state: RootState) => state.auth.isAuthorized);

  return (
    <Routes>
      {/* Public Login Route */}
      <Route 
        path="/sign-in" 
        element={isAuthorized ? <Navigate to="/" replace /> : <Login />} 
      />

      {/* Protected Layout Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <EventsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/crypto"
        element={
          <ProtectedRoute>
            <CryptoLogs />
          </ProtectedRoute>
        }
      />

      {/* Redirects */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
