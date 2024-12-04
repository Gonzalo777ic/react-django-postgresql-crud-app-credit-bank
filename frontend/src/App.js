import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import ClientesCrud from "./components/Clientes/ClientesCrud";
import Homepage from "./components/Homepage/Homepage";
import "./components/Login/Login.css";
import "./App.css";
import CuentasTabla from "./components/Cuentas/CuentasTabla";
import Transacciones from "./components/Transacciones/Transacciones";
import PrestamosCrud from './components/Prestamos/PrestamosCrud';
import LocacionesCrud from "./components/Locaciones/LocacionesCrud";
import TarjetasCrud from "./components/Tarjetas/TarjetasCrud";

// Componente de ruta protegida
const ProtectedRoute = ({ element, accessToken }) => {
  if (!accessToken) {
    // Si no hay token, redirige a la página de login
    return <Navigate to="/" replace />;
  }
  return element; // Si hay token, muestra la página
};

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
    // Al autenticar, guarda el token en localStorage
    localStorage.setItem("access_token", token);
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de inicio que redirige a /homepage si el usuario está autenticado */}
        <Route
          path="/"
          element={
            accessToken ? (
              <Navigate to="/homepage" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Página principal - accesible solo si el usuario está autenticado */}
        <Route
          path="/homepage"
          element={<ProtectedRoute element={<Homepage />} accessToken={accessToken} />}
        />

        {/* Páginas protegidas - solo accesibles si hay un token */}
        <Route
          path="/crud"
          element={<ProtectedRoute element={<ClientesCrud accessToken={accessToken} />} accessToken={accessToken} />}
        />
        <Route
          path="/accounts"
          element={<ProtectedRoute element={<CuentasTabla />} accessToken={accessToken} />}
        />
        <Route
          path="/transactions"
          element={<ProtectedRoute element={<Transacciones />} accessToken={accessToken} />}
        />
        <Route
          path="/loans"
          element={<ProtectedRoute element={<PrestamosCrud />} accessToken={accessToken} />}
        />
        <Route
          path="/locations"
          element={<ProtectedRoute element={<LocacionesCrud />} accessToken={accessToken} />}
        />
        <Route
          path="/cards"
          element={<ProtectedRoute element={<TarjetasCrud />} accessToken={accessToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
