// ClientesChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";

const ClientesChart = ({ chartData }) => (
  <div className="chart-container">
    <h3>Clientes Candidatos a Tarjeta Black</h3>
    <Doughnut 
      data={chartData} 
      options={{
        plugins: {
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const saldo = tooltipItem.raw || 0;
                return `${tooltipItem.label}: $${saldo.toFixed(2)}`;
              }
            }
          }
        }
      }}
    />
  </div>
);

export default ClientesChart;
