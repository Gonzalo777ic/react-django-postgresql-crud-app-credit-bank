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

// Registro de los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CardsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Tarjetas por tipo",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Obtener datos desde la API
    fetch("http://127.0.0.1:8000/api/tarjetas-por-tipo/")
      .then((response) => response.json())
      .then((data) => {
        // Extraer los labels (tipos de tarjetas) y los counts (cantidades de tarjetas)
        const labels = data.map((item) => item.tipo_tarjeta);
        const counts = data.map((item) => item.cantidad);

        // Actualizar los datos del gráfico
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Tarjetas por tipo",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error("Error al cargar datos:", error));
  }, []);

  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h2>Tarjetas por Tipo</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default CardsChart;
