import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import ClientesCrud from "./components/Clientes/ClientesCrud";
import "./components/Login/Login.css";
import "./App.css";

function App() {
  const [userType, setUserType] = useState(null);

  const handleLogin = (email, password) => {
    // Simula autenticación
    if (email === "admin@admin.com" && password === "admin") {
      setUserType("admin");
    } else {
      alert("Credenciales inválidas");
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            userType === "admin" ? (
              <Navigate to="/crud" replace /> // Redirige al CRUD si es admin
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/crud" element={<ClientesCrud />} />
      </Routes>
    </Router>
  );
}

export default App;
