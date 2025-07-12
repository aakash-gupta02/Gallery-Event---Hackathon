import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EventGallery from "./pages/eventGallery/EventGallery";
import OfficeGalleryLanding from "./components/OfficeGalleryLanding";
import EventMediaByID from "./pages/media/EventMediaByID";
import AdminMainLayout from "./pages/adminLayout/AdminMainLayout";
import { useAuth } from "./context/AuthContext";

// ProtectedRoute component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Show a warning before redirecting
    window.alert("Please login to access this page.");
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/landing"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OfficeGalleryLanding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EventGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <EventMediaByID />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AdminMainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
