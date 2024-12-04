import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransaccionesPorClienteChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Transacciones por Cliente",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Fetch datos de la API para transacciones por cliente
    fetch("http://127.0.0.1:8000/api/transacciones-por-cliente/")
      .then((response) => response.json())
      .then((data) => {
        const labels = data.map((item) => item.cliente);
        const totalTransacciones = data.map((item) => item.total_transacciones);
        const totalMonto = data.map((item) => item.total_monto);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Total de Transacciones",
              data: totalTransacciones,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Monto Total de Transacciones",
              data: totalMonto,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error("Error al cargar datos:", error));
  }, []);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2>Transacciones por Cliente</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TransaccionesPorClienteChart;
