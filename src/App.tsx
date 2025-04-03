import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import DepositWithdrawPage from "./pages/DepositWithdrawPage";
import LoansPage from "./pages/LoansPage";
import GovernancePage from "./pages/GovernancePage";
import TransactionsPage from "./pages/TransactionsPage";
import AdminPage from "./pages/AdminPage";
import RewardsPage from "./pages/RewardsPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import SavingsPage from "./pages/SavingsPage";
import CooperativesPage from "./pages/CooperativesPage";
import FinancialAdvisorPage from "./pages/FinancialAdvisorPage";
import SettingsPage from "./pages/SettingsPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes with Dashboard Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route
                path="/deposit-withdraw"
                element={<DepositWithdrawPage />}
              />
              <Route path="/loans" element={<LoansPage />} />
              <Route path="/governance" element={<GovernancePage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/features/savings" element={<SavingsPage />} />
              <Route path="/cooperatives" element={<CooperativesPage />} />
              <Route
                path="/financial-advisor"
                element={<FinancialAdvisorPage />}
              />
              <Route path="/help" element={<HelpSupportPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/ai-assistant" element={<AIAssistantPage />} />

              {/* Admin routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
