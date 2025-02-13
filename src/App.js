import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  // Sayfa değiştikçe body sınıfını güncellemek için useEffect kullanıyoruz
  useEffect(() => {
    // Sayfalar arasında geçiş yaparken body'nin class'ını ayarlıyoruz
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
      document.body.className = "login-page"; // Login sayfası
    } else if (currentPath === "/home") {
      document.body.className = "home-page"; // Home sayfası
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
