import React, { useState } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register the necessary Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale);

const AnalyticsDashboard: React.FC = () => {
  const [] = useState<string>('monthly');

  // Sample data for the charts
  const orderData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Number of Orders',
        data: [12, 19, 3, 5, 2, 3, 15],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };


  // New job types data
  const jobTypeData = {
    labels: ['Normal Print', 'Business Cards', 'Brochures', 'Posters', 'Flyers', 'Banners'],
    datasets: [
      {
        label: 'Jobs by Type',
        data: [30, 15, 25, 10, 20, 18], // Sample data for each job type
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // New revenue data
  const revenueData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue',
        data: [3000, 4500, 2000, 6000, 4000, 7000, 5000], // Sample revenue data for each month
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Number of Orders Over Time">
          <Line data={orderData} options={chartOptions} />
        </ChartCard>


        <ChartCard title="Jobs by Type">
          <Bar data={jobTypeData} options={chartOptions} />
        </ChartCard>

        <ChartCard title="Revenue Over Time">
          <Line data={revenueData} options={chartOptions} />
        </ChartCard>
      </div>
    </div>
  );
};

// Chart Card Component
const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 transition duration-300 hover:shadow-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="h-60 md:h-72">{children}</div>
    </div>
  );
};

export default AnalyticsDashboard;
