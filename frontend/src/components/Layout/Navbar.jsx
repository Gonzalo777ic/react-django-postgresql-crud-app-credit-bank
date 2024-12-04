// Navbar.jsx
import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../images/lago_bank_ajustado.png"; // Ruta de la imagen del logo

const Navbar = ({ onLogoutClick }) => {
    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="navbar-logo">
                <img src={logo} alt="Logo de la empresa" />
            </div>

            <Link to="/crud">
                <button className="navbar-button">Ir a Clientes</button>
            </Link>
            <Link to="/accounts">
                <button className="navbar-button">Ir a Cuentas</button>
            </Link>
            <Link to="/transactions">
                <button className="navbar-button">Ir a Transacciones</button>
            </Link>
            <Link to="/loans">
                <button className="navbar-button">Ir a Préstamos</button>
            </Link>
            <Link to="/locations">
                <button className="navbar-button">Ir a Locaciones</button>
            </Link>
            <Link to="/cards">
                <button className="navbar-button">Ir a Tarjetas</button>
            </Link>

            <button className="navbar-button" onClick={onLogoutClick}>Cerrar sesión</button>
        </nav>
    );
};

export default Navbar;
