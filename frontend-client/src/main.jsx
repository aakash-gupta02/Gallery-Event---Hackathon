import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { EventProvider } from "./context/EventContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <EventProvider>
        <AdminProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AdminProvider>
      </EventProvider>
    </AuthProvider>
  </BrowserRouter>
);
