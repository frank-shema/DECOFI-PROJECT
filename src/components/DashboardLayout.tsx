import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import Footer from "./Footer";
import { useAuth } from "@/context/AuthContext";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect to dashboard if on root authenticated route
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-decofi-dark flex flex-col">
      <div className="flex flex-1 h-full">
        <Sidebar />
        <main className="flex-1 pt-16 px-4 md:px-8 pb-12 overflow-y-auto">
          {user && (
            <div className="mb-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-md text-sm text-slate-600 dark:text-slate-300">
              <span className="font-medium">Your Internet Identity: </span>
              <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">
                {user.principal}
              </code>
            </div>
          )}
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
