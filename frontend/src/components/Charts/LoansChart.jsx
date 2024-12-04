// LoansChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";

const LoansChart = ({ loanChartData }) => (
  <div className="chart-container">
    <h3>Préstamos Realizados</h3>
    <Line data={loanChartData} options={{
      responsive: true,
      scales: {
        x: { type: 'category', title: { display: true, text: 'Fecha' } },
        y: { type: 'linear', title: { display: true, text: 'Monto' }, beginAtZero: true }
      }
    }} />
  </div>
);

export default LoansChart;
