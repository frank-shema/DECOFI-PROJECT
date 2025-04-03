import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleScroll = (id: string) => {
    setIsMenuOpen(false);
    setActiveDropdown(null);

    // Check if the section is on the current page
    const element = document.getElementById(id);

    if (element) {
      // If element exists on current page, just scroll to it
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If not on the current page, navigate to the appropriate page
      const targetPage =
        id === "mission" || id === "how-it-works" ? "/about" : "/";
      sessionStorage.setItem("scrollTo", id);
      window.location.href = targetPage;
    }
  };

  // Check if we need to scroll when the page loads
  useEffect(() => {
    const scrollTo = sessionStorage.getItem("scrollTo");
    if (scrollTo) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        const element = document.getElementById(scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-decofi-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold gradient-text">DeCoFi</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-8">
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("about")}
                  className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue px-1 pt-1 text-sm font-medium"
                >
                  About
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === "about" && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-decofi-dark ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <button
                      onClick={() => handleScroll("mission")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Our Mission
                    </button>
                    <button
                      onClick={() => handleScroll("how-it-works")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      How It Works
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("features")}
                  className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue px-1 pt-1 text-sm font-medium"
                >
                  Features
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === "features" && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-decofi-dark ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      to="/features/savings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Savings
                    </Link>
                    <Link
                      to="/loans"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Loans
                    </Link>
                    <Link
                      to="/governance"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsMenuOpen(false);
                      }}
                    >
                      Governance
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/cooperatives"
                className="text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue px-1 pt-1 text-sm font-medium"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Cooperatives
              </Link>
              <Link
                to="/help#faq"
                className="text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue px-1 pt-1 text-sm font-medium"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                FAQ
              </Link>
              <Link
                to="/help#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue px-1 pt-1 text-sm font-medium"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                {user && (
                  <div className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                    <span className="font-medium">ID: </span>
                    <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-xs">
                      {user.principal.substring(0, 10)}...
                    </code>
                  </div>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 px-4 rounded-md"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 px-4 rounded-md"
                  asChild
                >
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button
                  className="bg-decofi-blue hover:bg-decofi-blue/90 h-9 px-4 rounded-md"
                  size="sm"
                  asChild
                >
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-decofi-blue"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white dark:bg-decofi-dark">
            <button
              onClick={() => toggleDropdown("mobileAbout")}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
            >
              About
            </button>
            {activeDropdown === "mobileAbout" && (
              <div className="pl-6 space-y-1">
                <Link
                  to="/about"
                  className="block pl-3 pr-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveDropdown(null);
                  }}
                >
                  About Us
                </Link>
                <button
                  onClick={() => handleScroll("mission")}
                  className="block w-full text-left pl-3 pr-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Our Mission
                </button>
                <button
                  onClick={() => handleScroll("how-it-works")}
                  className="block w-full text-left pl-3 pr-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  How It Works
                </button>
              </div>
            )}
            <button
              onClick={() => toggleDropdown("mobileFeatures")}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-left"
            >
              Features
            </button>
            {activeDropdown === "mobileFeatures" && (
              <div className="pl-6 space-y-1">
                <Link
                  to="/features/savings"
                  className="block pl-3 pr-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveDropdown(null);
                  }}
                >
                  Savings
                </Link>
                <Link
                  to="/features/loans"
                  className="block pl-3 pr-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveDropdown(null);
                  }}
                >
                  Loans
                </Link>
                <Link
                  to="/features/governance"
                  className="block pl-3 pr-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveDropdown(null);
                  }}
                >
                  Governance
                </Link>
              </div>
            )}
            <Link
              to="/cooperatives"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Cooperatives
            </Link>
            <Link
              to="/help#faq"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/help#contact"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-decofi-blue dark:hover:text-decofi-blue hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-4">
              <div className="space-x-2">
                {isAuthenticated ? (
                  <>
                    {user && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span className="font-medium">ID: </span>
                        <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-xs">
                          {user.principal.substring(0, 10)}...
                        </code>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 rounded-md"
                      onClick={() => {
                        navigate("/dashboard");
                        setIsMenuOpen(false);
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="h-8 px-3 rounded-md"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3 rounded-md"
                      asChild
                    >
                      <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      className="bg-decofi-blue hover:bg-decofi-blue/90 h-8 px-3 rounded-md"
                      size="sm"
                      asChild
                    >
                      <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
