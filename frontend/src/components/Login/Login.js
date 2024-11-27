// login.js
import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza la solicitud POST al endpoint de login
      const response = await axios.post("http://localhost:8000/api/login/", {
        email: email,
        password: password,
      });
      if (response.data.access_token) {
        // Si la autenticación es exitosa, pasa el token a App.js
        localStorage.setItem("access_token", response.data.access_token);
        onLogin(response.data.access_token);
      } else {
        alert("Credenciales inválidas");
      }
    } catch (error) {
      alert("Error en la autenticación");
    }
  };
  

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
