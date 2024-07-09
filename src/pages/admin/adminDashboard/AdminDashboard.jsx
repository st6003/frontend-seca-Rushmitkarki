

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getDashboardStats } from '../../../apis/api'; 
import DashboardChart from '../../../components/DashboardChart';

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
    <DashboardChart data={stats} />
  );
};

export default AdminDashboard;
