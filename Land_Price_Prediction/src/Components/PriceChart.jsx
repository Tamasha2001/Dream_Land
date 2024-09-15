import React from 'react';
import { Line } from 'react-chartjs-2';
import './PriceChart.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnimatedChart = () => {
  // Sample data - replace with your actual data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Land Prices',
        data: [100, 200, 150, 300, 250, 350, 400, 450, 500, 550, 600, 650], // Replace with your data
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1, // Add tension for smooth lines
        pointRadius: 5,
        pointHoverRadius: 7,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    animation: {
      duration: 2000, // Adjust the animation duration as needed
      easing: 'easeOutBounce', // You can use different easing functions
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      },
    },
  };

  return (
    <div className="animated-chart">
      <h2>Land Prices Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default AnimatedChart;
