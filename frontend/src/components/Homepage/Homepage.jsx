// src/components/Homepage/Homepage.jsx
import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";  // Importar el Footer
import ClientesChart from "../Charts/ClientesChart";
import LoansChart from "../Charts/LoansChart";
import CardsChart from "../Charts/CardsChart";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';  // Asegúrate de importar el componente Bar

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, BarElement);

function Homepage() {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
    }]
  });

  const [loanChartData, setLoanChartData] = useState({
    labels: [],
    datasets: [{
      label: "Préstamos realizados",
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1,
    }]
  });

  const [transactionChartData, setTransactionChartData] = useState({
    labels: [],
    datasets: [{
      label: "Transacciones por Cliente",
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  });

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/clientes-candidatos-black/')
      .then(response => response.json())
      .then(data => {
        const labels = data.map(cliente => cliente.nombre);
        const dataSet = data.map(cliente => cliente.saldo);
        const maxSaldo = Math.max(...dataSet);
        const colors = dataSet.map(saldo => saldo === maxSaldo ? 'black' : `hsl(0, 0%, ${(1 - saldo / maxSaldo) * 100}%)`);
        setChartData({
          labels: labels,
          datasets: [{ data: dataSet, backgroundColor: colors }],
        });
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/loans/')
      .then(response => response.json())
      .then(data => {
        const labels = data.map(loan => new Date(loan.fecha_inicio).toLocaleDateString());
        const dataSet = data.map(loan => loan.monto_prestamo);
        setLoanChartData({
          labels: labels,
          datasets: [{
            label: "Préstamos realizados",
            data: dataSet,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
          }]
        });
      })
      .catch(error => console.error('Error al obtener los préstamos:', error));
  }, []);

  useEffect(() => {
    // Agregar la consulta para las transacciones por cliente
    fetch('http://127.0.0.1:8000/api/transacciones-por-cliente/')
      .then(response => response.json())
      .then(data => {
        const labels = data.map(item => item.cliente);
        const dataSet = data.map(item => item.total_monto);
        setTransactionChartData({
          labels: labels,
          datasets: [{
            label: "Transacciones por Cliente",
            data: dataSet,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }]
        });
      })
      .catch(error => console.error('Error al obtener las transacciones por cliente:', error));
  }, []);

  return (
    <div className="homepage-container">
      <header className="header">
        <h1>Bienvenido</h1>
        <Navbar onLogoutClick={() => setShowLogoutConfirm(true)} />
      </header>
      <section className="body">
        <h2>Explora</h2>
        <p>Disfruta de las opciones disponibles para gestionar tus clientes y cuentas.</p>

        {/* Contenedor de los 4 gráficos */}
        <div className="charts-grid">
          <div className="chart-item">
            <ClientesChart chartData={chartData} />
          </div>
          <div className="chart-item">
            <LoansChart loanChartData={loanChartData} />
          </div>
          <div className="chart-item">
            <Bar data={transactionChartData} />
          </div>
          <div className="chart-item">
            <CardsChart />
          </div>
        </div>
      </section>
      {showLogoutConfirm && (
        <div className="logout-modal">
          <div className="modal-content">
            <p>¿Estás seguro de que deseas cerrar sesión?</p>
            <button onClick={handleLogout}>Aceptar</button>
            <button onClick={() => setShowLogoutConfirm(false)}>Rechazar</button>
          </div>
        </div>
      )}
      
      {/* Usar el Footer aquí */}
      <Footer />
    </div>
  );
}

export default Homepage;
