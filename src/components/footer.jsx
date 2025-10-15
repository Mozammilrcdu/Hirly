import { useState } from "react";
import { SignedIn, SignedOut, useUser, SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Code } from "lucide-react";

const Footer = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useUser();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-6 max-w-7xl mx-auto">
        
        {/* Left: Logo + Copyright */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-12 sm:h-16" />
          </Link>
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} YourCompany. All rights reserved.
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-center">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/jobs" className="hover:text-blue-400 transition-colors">
            Latest Jobs
          </Link>

          <SignedOut>
            <span
              onClick={() => setShowSignIn(true)}
              className="cursor-pointer hover:text-blue-400 transition-colors"
            >
              Login
            </span>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link
                to="/post-job"
                className="hover:text-blue-400 transition-colors"
              >
                Post a Job
              </Link>
            )}
            <Link
              to="/my-jobs"
              className="hover:text-blue-400 transition-colors"
            >
              My Jobs
            </Link>
            <Link
              to="/saved-jobs"
              className="hover:text-blue-400 transition-colors"
            >
              Saved Jobs
            </Link>
          </SignedIn>
        </nav>

        {/* Right: Developer Credit */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Code className="w-4 h-4 text-blue-400" />
          Developed by <span className="text-white font-medium">Md Mozammil Alam</span>
        </div>
      </div>

      {/* Sign-In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </footer>
  );
};

export default Footer;
