import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
  );
};

export default App;
