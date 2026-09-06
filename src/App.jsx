import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./i18n";
import { CartProvider } from "./context/CartContext";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import DashboardLayout from "./components/layout/DashboardLayout";

function AppContent() {
  const { user } = useAuth();
  const [authView, setAuthView] = useState("login");
  const [activeNav, setActiveNav] = useState(() => {
    return sessionStorage.getItem("vitrina-nav") || "home";
  });

  function navigate(key) {
    setActiveNav(key);
    sessionStorage.setItem("vitrina-nav", key);
  }

  if (!user) {
    return authView === "login" ? (
      <LoginPage onSwitch={() => setAuthView("register")} />
    ) : (
      <RegisterPage onSwitch={() => setAuthView("login")} />
    );
  }

  return <DashboardLayout activeNav={activeNav} setActiveNav={navigate} />;
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
