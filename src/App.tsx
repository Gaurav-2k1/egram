import { BrowserRouter, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Language } from "./types";

function AppContent() {
  const location = useLocation();
  const [, setLanguage] = useLocalStorage<Language>("language", "en");
  
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isPanchayat = location.pathname.startsWith("/panchayat");
  const isLogin = location.pathname === "/login";

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white">
        {/* Render header based on current route */}
        {!isDashboard && !isLogin && (
          <Header
            variant={isPanchayat ? "panchayat" : "platform"}
            panchayatName={isPanchayat ? "Ramnagar" : undefined}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {/* Main content */}
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>

        {/* Render footer based on current route */}
        {!isDashboard && !isLogin && (
          <Footer variant={isPanchayat ? "panchayat" : "platform"} />
        )}

        {/* Toast notifications */}
        <Toaster />
      </div>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
