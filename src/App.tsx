
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

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
            <Route path="/help" element={<HelpSupportPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/deposit-withdraw" element={
              <ProtectedRoute>
                <DepositWithdrawPage />
              </ProtectedRoute>
            } />
            <Route path="/loans" element={
              <ProtectedRoute>
                <LoansPage />
              </ProtectedRoute>
            } />
            <Route path="/governance" element={
              <ProtectedRoute>
                <GovernancePage />
              </ProtectedRoute>
            } />
            <Route path="/transactions" element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            } />
            <Route path="/rewards" element={
              <ProtectedRoute>
                <RewardsPage />
              </ProtectedRoute>
            } />
            <Route path="/features/savings" element={
              <ProtectedRoute>
                <SavingsPage />
              </ProtectedRoute>
            } />
            <Route path="/cooperatives" element={
              <ProtectedRoute>
                <CooperativesPage />
              </ProtectedRoute>
            } />
            <Route path="/financial-advisor" element={
              <ProtectedRoute>
                <FinancialAdvisorPage />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <AdminPage />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
