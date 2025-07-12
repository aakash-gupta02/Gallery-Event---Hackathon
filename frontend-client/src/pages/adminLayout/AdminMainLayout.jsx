import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Dashboard from "../../components/adminDashboard/Dashboard";
import EventsPage from "../../components/adminDashboard/EventsPage";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiMenu,
  FiChevronDown,
  FiLogOut,
  FiUser,
  FiCreditCard,
  FiImage,
  FiMessageSquare,
} from "react-icons/fi";
import UsersPage from "../../components/adminDashboard/UsersPage";
import MediaGallery from "../../components/adminDashboard/MediaGallery";
import CommentsPage from "../../components/adminDashboard/CommentsPage";

const AdminMainLayout = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsProfileDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <FiHome className="mr-3" /> },
    { key: "events", label: "Events", icon: <FiCalendar className="mr-3" /> },
    { key: "users", label: "Users", icon: <FiUsers className="mr-3" /> },
    { key: "media", label: "Media", icon: <FiImage className="mr-3" /> }, // FiImage for media
    { key: "comments", label: "Comments", icon: <FiMessageSquare className="mr-3" /> },
    // { key: "analytics", label: "Analytics", icon: <FiBarChart2 className="mr-3" /> },
    // { key: "settings", label: "Settings", icon: <FiSettings className="mr-3" /> },
  ];

  return (
    <div className="flex h-screen bg-bg-body">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-bg-surface text-text-heading shadow-md"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-bg-surface border-r border-border flex flex-col fixed h-full transition-all duration-300 z-40
          ${isMobileMenuOpen ? "left-0" : "-left-64 md:left-0"}`}
      >
        <div className="h-16 flex items-center px-6 border-b border-border">
          <h1
            onClick={() => navigate("/")}
            className="text-xl font-bold text-primary cursor-pointer"
          >
            Event Gallery Admin
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {menuItems.map((menu) => (
              <button
                key={menu.key}
                onClick={() => {
                  setActiveMenu(menu.key);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center px-4 py-3 w-full text-left rounded-lg transition-colors ${
                  activeMenu === menu.key
                    ? "bg-primary-light text-primary"
                    : "text-text-body hover:bg-bg-muted"
                }`}
              >
                {menu.icon}
                <span>{menu.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <button
            onClick={() => navigate("/")}
            className="flex items-center px-4 py-2 w-full text-left text-primary rounded-lg hover:bg-primary-light transition-colors"
          >
            <FiHome className="mr-3" />
            <span>Home</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 bg-bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="md:hidden"></div> {/* Spacer for mobile */}
          <div>
            <h2 className="text-lg font-medium text-text-heading">
              Welcome back, {user?.name || "Admin"}
            </h2>
          </div>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileDropdownOpen(!isProfileDropdownOpen);
              }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary-light text-primary flex items-center justify-center overflow-hidden">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser size={20} />
                )}
              </div>
              <span className="hidden md:inline text-text-body">{user?.name}</span>
              <FiChevronDown
                className={`text-text-muted transition-transform ${
                  isProfileDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isProfileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-bg-surface rounded-lg shadow-card py-1 z-20 border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center w-full px-4 py-2 text-text-body hover:bg-bg-muted"
                >
                  <FiUser className="mr-3" />
                  Your Profile
                </button>
                <button
                  onClick={() => setActiveMenu("settings")}
                  className="flex items-center w-full px-4 py-2 text-text-body hover:bg-bg-muted"
                >
                  <FiSettings className="mr-3" />
                  Settings
                </button>
                <button
                  onClick={() => navigate("/billing")}
                  className="flex items-center w-full px-4 py-2 text-text-body hover:bg-bg-muted"
                >
                  <FiCreditCard className="mr-3" />
                  Billing
                </button>
                <div className="border-t border-border my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-error hover:bg-error/10"
                >
                  <FiLogOut className="mr-3" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {activeMenu === "dashboard" && <Dashboard />}
          {activeMenu === "events" && <EventsPage />}
          {activeMenu === "users" && <UsersPage />}
          {activeMenu === "media" && <MediaGallery/> }
          {activeMenu === "comments" &&  <CommentsPage/> }
          {activeMenu === "analytics" && <div>Analytics</div>}
          {activeMenu === "settings" && <div>Settings</div>}
        </main>
      </div>
    </div>
  );
};

export default AdminMainLayout