import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import EventGallery from "./pages/eventGallery/EventGallery";
import OfficeGalleryLanding from "./components/OfficeGalleryLanding";
import EventMediaByID from "./pages/media/EventMediaByID";
import AdminMainLayout from "./pages/adminLayout/AdminMainLayout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/landing" element={<OfficeGalleryLanding />} />

        <Route path="/event" element={<EventGallery />} />
        <Route path="/event/:id" element={<EventMediaByID />} />


        <Route path="/admin" element={ <AdminMainLayout/> } />
      </Routes>
    </div>
  );
};

export default App;
