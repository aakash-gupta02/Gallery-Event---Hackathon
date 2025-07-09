import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaChevronDown,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  console.log(user);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  React.useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

return (
    <nav className="w-full bg-bg-surface border-b border-border shadow-sm px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => navigate("/")}
            tabIndex={0}
            role="button"
            aria-label="Go to Home"
            onKeyDown={e => (e.key === "Enter" || e.key === " ") && navigate("/")}
        >
            <span className="text-primary font-bold text-xl transition-colors hover:text-primary-hover">GalleryEvent</span>
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-6">
            <button
                className="text-text-body hover:text-primary transition-colors focus:outline-none focus:text-primary-hover px-2 py-1 rounded"
                onClick={() => navigate("/")}
            >
                Home
            </button>
            <button
                className="text-text-body hover:text-primary transition-colors focus:outline-none focus:text-primary-hover px-2 py-1 rounded"
                onClick={() => navigate("/about")}
            >
                About
            </button>
            <button
                className="text-text-body hover:text-primary transition-colors focus:outline-none focus:text-primary-hover px-2 py-1 rounded"
                onClick={() => navigate("/features")}
            >
                Features
            </button>
            <button
                className="text-text-body hover:text-primary transition-colors focus:outline-none focus:text-primary-hover px-2 py-1 rounded"
                onClick={() => navigate("/gallery")}
            >
                Gallery
            </button>
        </div>

        <div className="md:hidden flex items-center">
            <button
                className="text-2xl text-text-body focus:outline-none hover:text-primary transition-colors"
                onClick={() => setOpen((v) => !v)}
                aria-label="Open menu"
            >
                <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
            {user ? (
                <div className="relative" ref={menuRef}>
                    <button
                        className="flex items-center gap-2 px-3 py-1 rounded-[var(--radius-base)] hover:bg-primary-light focus:bg-primary-light transition-colors focus:outline-none"
                        onClick={() => setOpen((v) => !v)}
                        aria-haspopup="true"
                        aria-expanded={open}
                    >
                        <img
                            src={
                                user.profileImage ||
                                "https://ui-avatars.com/api/?name=" +
                                    encodeURIComponent(user.name)
                            }
                            alt="profile"
                            className="w-8 h-8 rounded-full object-cover border border-border"
                        />
                        <span className="text-text-heading font-medium">{user.name}</span>
                        <FaChevronDown className="text-text-muted" />
                    </button>
                    {open && (
                        <div className="absolute right-0 mt-2 w-64 bg-bg-surface rounded-[var(--radius-lg)] shadow-lg border border-border z-50 py-2 animate-fade-in">
                            {/* Profile Header */}
                            <div className="flex flex-col items-center py-4 border-b border-border">
                                <img
                                    src={
                                        user.profileImage ||
                                        "https://ui-avatars.com/api/?name=" +
                                            encodeURIComponent(user.name)
                                    }
                                    alt="profile"
                                    className="w-16 h-16 rounded-full object-cover border border-border mb-2"
                                />
                                <div className="text-lg font-semibold text-text-heading">
                                    {user.name}
                                </div>
                                <div className="text-sm text-text-muted">{user.email}</div>
                            </div>
                            {/* Options */}
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-primary-light focus:bg-primary-light text-text-body transition-colors focus:outline-none"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/profile");
                                }}
                            >
                                <FaUser /> Profile
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-primary-light focus:bg-primary-light text-text-body transition-colors focus:outline-none"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/settings");
                                }}
                            >
                                <FaCog /> Settings
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-primary-light focus:bg-primary-light text-text-body transition-colors focus:outline-none"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/");
                                }}
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
                                    ></path>
                                </svg>
                                Home
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-primary-light focus:bg-primary-light text-text-body transition-colors focus:outline-none"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/about");
                                }}
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                                    ></path>
                                </svg>
                                About
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-primary-light focus:bg-primary-light text-text-body transition-colors focus:outline-none"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/features");
                                }}
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.75 17L9 21m6-4l.75 4m-7.5-4h9m-9 0a2.25 2.25 0 01-2.25-2.25V7.5A2.25 2.25 0 017.5 5.25h9A2.25 2.25 0 0118.75 7.5v7.25A2.25 2.25 0 0116.5 17h-9z"
                                    ></path>
                                </svg>
                                Features
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-primary-light focus:bg-primary-light text-text-body transition-colors focus:outline-none"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/gallery");
                                }}
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6"
                                    ></path>
                                </svg>
                                Gallery
                            </button>
                            <button
                                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-error/10 focus:bg-error/10 text-error border-t border-border mt-2 transition-colors focus:outline-none"
                                onClick={() => {
                                    setOpen(false);
                                    logout();
                                }}
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-base)] bg-primary text-text-inverted hover:bg-primary-hover focus:bg-primary-hover transition-colors focus:outline-none"
                        onClick={() => navigate("/login")}
                    >
                        <FaSignInAlt /> Login
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-base)] border border-primary text-primary hover:bg-primary-light focus:bg-primary-light transition-colors focus:outline-none"
                        onClick={() => navigate("/register")}
                    >
                        <FaUserPlus /> Register
                    </button>
                </>
            )}
        </div>

        {/* Mobile Dropdown */}
        {open && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-bg-surface shadow-lg border-t border-border z-50 animate-fade-in">
                <div className="flex flex-col gap-2 p-4">
                    <button
                        className="text-text-body text-left py-2 px-2 rounded hover:bg-primary-light focus:bg-primary-light transition-colors focus:outline-none"
                        onClick={() => {
                            setOpen(false);
                            navigate("/");
                        }}
                    >
                        Home
                    </button>
                    <button
                        className="text-text-body text-left py-2 px-2 rounded hover:bg-primary-light focus:bg-primary-light transition-colors focus:outline-none"
                        onClick={() => {
                            setOpen(false);
                            navigate("/about");
                        }}
                    >
                        About
                    </button>
                    <button
                        className="text-text-body text-left py-2 px-2 rounded hover:bg-primary-light focus:bg-primary-light transition-colors focus:outline-none"
                        onClick={() => {
                            setOpen(false);
                            navigate("/features");
                        }}
                    >
                        Features
                    </button>
                    <button
                        className="text-text-body text-left py-2 px-2 rounded hover:bg-primary-light focus:bg-primary-light transition-colors focus:outline-none"
                        onClick={() => {
                            setOpen(false);
                            navigate("/gallery");
                        }}
                    >
                        Gallery
                    </button>
                    {user ? (
                        <>
                            <div className="flex items-center gap-3 border-t border-border pt-3 mt-2">
                                <img
                                    src={
                                        user.profileImage ||
                                        "https://ui-avatars.com/api/?name=" +
                                            encodeURIComponent(user.name)
                                    }
                                    alt="profile"
                                    className="w-10 h-10 rounded-full object-cover border border-border"
                                />
                                <div>
                                    <div className="font-semibold text-text-heading">
                                        {user.name}
                                    </div>
                                    <div className="text-xs text-text-muted">{user.email}</div>
                                </div>
                            </div>
                            <button
                                className="text-text-body text-left py-2 px-2 rounded hover:bg-primary-light focus:bg-primary-light transition-colors focus:outline-none"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/profile");
                                }}
                            >
                                Profile
                            </button>
                            <button
                                className="text-text-body text-left py-2 px-2 rounded hover:bg-primary-light focus:bg-primary-light transition-colors focus:outline-none"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/settings");
                                }}
                            >
                                Settings
                            </button>
                            <button
                                className="text-error text-left py-2 px-2 rounded hover:bg-error/10 focus:bg-error/10 border-t border-border mt-2 transition-colors focus:outline-none"
                                onClick={() => {
                                    setOpen(false);
                                    logout();
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-base)] bg-primary text-text-inverted hover:bg-primary-hover focus:bg-primary-hover transition-colors focus:outline-none mt-2"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/login");
                                }}
                            >
                                <FaSignInAlt /> Login
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-[var(--radius-base)] border border-primary text-primary hover:bg-primary-light focus:bg-primary-light transition-colors focus:outline-none mt-2"
                                onClick={() => {
                                    setOpen(false);
                                    navigate("/register");
                                }}
                            >
                                <FaUserPlus /> Register
                            </button>
                        </>
                    )}
                </div>
            </div>
        )}
    </nav>
);

};

export default Navbar;
