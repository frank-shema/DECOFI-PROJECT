import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  Vote,
  History,
  Award,
  BarChart3,
  Users,
  MessagesSquare,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  to,
  active,
  onClick,
}: SidebarItemProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              active
                ? "bg-decofi-blue text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
            onClick={onClick}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
    { icon: Wallet, label: "Deposit/Withdraw", to: "/deposit-withdraw" },
    { icon: CreditCard, label: "Loans", to: "/loans" },
    { icon: Vote, label: "Governance", to: "/governance" },
    { icon: History, label: "Transactions", to: "/transactions" },
    { icon: Award, label: "Rewards", to: "/rewards" },
    { icon: BarChart3, label: "Savings", to: "/features/savings" },
    { icon: Users, label: "Cooperatives", to: "/cooperatives" },
    {
      icon: MessagesSquare,
      label: "Financial Advisor",
      to: "/financial-advisor",
    },
    { icon: HelpCircle, label: "Help & Support", to: "/help" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = async () => {
    await logout();
  };

  // Determine if the path matches the route or is a child route
  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      (path !== "/dashboard" && location.pathname.startsWith(path))
    );
  };

  // Mobile sidebar toggle
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 fixed z-30",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-4 h-16">
          <Link
            to="/dashboard"
            className={cn("flex items-center", isCollapsed && "justify-center")}
          >
            <span
              className={cn(
                "text-xl font-bold gradient-text",
                isCollapsed && "sr-only"
              )}
            >
              DeCoFi
            </span>
            {isCollapsed && (
              <div className="h-8 w-8 bg-gradient-to-r from-decofi-blue to-purple-600 rounded-full" />
            )}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className={cn("p-0 h-8 w-8", isCollapsed && "rotate-180")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={isActive(item.to)}
              />
            ))}
          </nav>
        </div>

        <div className="p-3 mt-auto">
          <Separator className="my-3" />
          <div className="space-y-1">
            <SidebarItem
              icon={Settings}
              label="Settings"
              to="/settings"
              active={isActive("/settings")}
            />
            <SidebarItem
              icon={LogOut}
              label="Logout"
              to="#"
              onClick={handleLogout}
            />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-gray-700">
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold gradient-text">DeCoFi</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileSidebar}
            className="p-0 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <SidebarItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={isActive(item.to)}
                onClick={() => setIsMobileOpen(false)}
              />
            ))}
          </nav>
        </div>

        <div className="p-3 mt-auto">
          <Separator className="my-3" />
          <div className="space-y-1">
            <SidebarItem
              icon={Settings}
              label="Settings"
              to="/settings"
              active={isActive("/settings")}
              onClick={() => setIsMobileOpen(false)}
            />
            <SidebarItem
              icon={LogOut}
              label="Logout"
              to="#"
              onClick={handleLogout}
            />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Spacer for desktop sidebar */}
      <div className={cn("hidden md:block", isCollapsed ? "w-16" : "w-64")} />
    </>
  );
};
