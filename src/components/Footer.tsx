import { Link, useLocation } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const location = useLocation();

  const handleScroll = (id: string) => {
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

  return (
    <footer className="bg-white dark:bg-decofi-dark border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold gradient-text">DeCoFi</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Transforming cooperative finance through decentralized technology.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-decofi-blue dark:text-gray-400 dark:hover:text-decofi-blue"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-decofi-blue dark:text-gray-400 dark:hover:text-decofi-blue"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-decofi-blue dark:text-gray-400 dark:hover:text-decofi-blue"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-decofi-blue dark:text-gray-400 dark:hover:text-decofi-blue"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-decofi-blue dark:text-gray-400 dark:hover:text-decofi-blue"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleScroll("mission")}
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue text-left"
                >
                  Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleScroll("how-it-works")}
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <Link
                  to="/about#team"
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Features
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features/savings"
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue"
                >
                  Savings
                </Link>
              </li>
              <li>
                <Link
                  to="/loans"
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue"
                >
                  Loans
                </Link>
              </li>
              <li>
                <Link
                  to="/governance"
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue"
                >
                  Governance
                </Link>
              </li>
              <li>
                <Link
                  to="/rewards"
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue"
                >
                  Rewards System
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/help#faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/documentation"
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/help#contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/cooperatives"
                  className="text-gray-600 dark:text-gray-400 hover:text-decofi-blue dark:hover:text-decofi-blue"
                >
                  Cooperatives
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} DeCoFi. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-decofi-blue dark:hover:text-decofi-blue"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-decofi-blue dark:hover:text-decofi-blue"
              >
                Terms of Service
              </Link>
              <Link
                to="/legal"
                className="text-gray-500 dark:text-gray-400 text-sm hover:text-decofi-blue dark:hover:text-decofi-blue"
              >
                Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
