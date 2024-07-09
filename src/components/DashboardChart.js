import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = ({ data }) => {
  const chartData = {
    labels: ["Total User Logins", "Total Doctors Added", "Total Appointments"],
    datasets: [
      {
        label: "Statistics",
        data: [
          data.totalUserLogins,
          data.totalDoctorsAdded,
          data.totalAppointments,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Admin Dashboard Statistics" },
    },
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h2 className="text-4xl mb-4">Admin Dashboard</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DashboardChart;
