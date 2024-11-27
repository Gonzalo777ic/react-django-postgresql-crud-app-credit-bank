// app.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import ClientesCrud from "./components/Clientes/ClientesCrud";
import "./components/Login/Login.css";
import "./App.css";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Verifica si hay un token en localStorage cuando se carga la página
    const token = localStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleLogin = (token) => {
    setAccessToken(token);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            accessToken ? (
              <Navigate to="/crud" replace /> // Redirige al CRUD si está autenticado
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/crud" element={<ClientesCrud accessToken={accessToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
