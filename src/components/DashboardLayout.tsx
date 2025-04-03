import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import Footer from "./Footer";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
