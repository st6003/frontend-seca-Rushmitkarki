import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDashboardStats } from '../../../apis/api';
import DashboardChart from '../../../components/DashboardChart';
import AdminNavbar from '../../../components/AdminNavbar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUserLogins: 0,
    totalDoctorsAdded: 0,
    totalAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => {
        if (res.status === 200) {
          setStats(res.data);
          setLoading(false);
        } else {
          toast.error('Failed to fetch dashboard statistics');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching dashboard statistics:', error);
        toast.error('Failed to fetch dashboard statistics');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="flex">
      <AdminNavbar />
      <div className="flex-1 p-10 ml-64">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <div className="w-full max-w-3xl mx-auto">
          <DashboardChart data={stats} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;