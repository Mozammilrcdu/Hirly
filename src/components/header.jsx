import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox, Menu, X } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="py-4 px-4 md:px-8 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.png" className="h-16 md:h-20" alt="Hirrd Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/jobs">
            <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">
              Latest Jobs
            </Button>
          </Link>

          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Dropdown */}
       {menuOpen && (
        <div className="absolute top-full left-0 w-full flex flex-col items-center gap-4 py-6 bg-white/10 backdrop-blur-md md:hidden z-50">
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>
            <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-white w-40">
              Latest Jobs
            </Button>
          </Link>

          <SignedOut>
            <Button
              variant="outline"
              className="w-40"
              onClick={() => {
                setShowSignIn(true);
                setMenuOpen(false);
              }}
            >
              Login
            </Button>
          </SignedOut>
            
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job" onClick={() => setMenuOpen(false)}>
                <Button variant="destructive" className="rounded-full w-40">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <div className="relative z-[9999]"> {/* Important Fix */}
              <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
            </div>
          </SignedIn>
        </div>
      )}

      </nav>

      {/* Sign-In Modal */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
