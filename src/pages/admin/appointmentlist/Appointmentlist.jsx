import React, { useEffect, useState } from "react";
import { getUsersWithAppointments, deleteAppointment, approveAppointment } from "../../../apis/api";
import { FaTrash, FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./appointment.css";

const AppointmentList = () => {
  const [usersWithAppointments, setUsersWithAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersWithAppointments = async () => {
      try {
        const response = await getUsersWithAppointments();
        setUsersWithAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching users with appointments:", error);
        toast.error("Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersWithAppointments();
  }, []);

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteAppointment(id);
        setUsersWithAppointments(usersWithAppointments.filter((appointment) => appointment._id !== id));
        toast.success("Appointment deleted successfully");
      } catch (error) {
        console.error("Error deleting appointment:", error);
        toast.error("Error deleting appointment");
      }
    }
  };

  const handleApproveAppointment = async (id) => {
    try {
      await approveAppointment(id);
      setUsersWithAppointments(usersWithAppointments.map((appointment) =>
        appointment._id === id ? { ...appointment, status: 'approved' } : appointment
      ));
      toast.success("Appointment approved successfully");
    } catch (error) {
      console.error("Error approving appointment:", error);
      toast.error("Error approving appointment");
    }
  };

  return (
    <div className="admin-content">
      <ToastContainer />
      <h1 className="title">List of Appointments</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr className="table-header">
              <th className="table-cell">User Name</th>
              <th className="table-cell">Email</th>
              <th className="table-cell">Appointment Date</th>
              <th className="table-cell">Description</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersWithAppointments.map((appointment) => (
              <tr key={appointment._id} className="table-row">
                <td className="table-cell">
                  {appointment.userId ? `${appointment.userId.firstName} ${appointment.userId.lastName}` : 'N/A'}
                </td>
                <td className="table-cell">{appointment.userId ? appointment.userId.email : 'N/A'}</td>
                <td className="table-cell">{appointment.appointmentDate}</td>
                <td className="table-cell">{appointment.appointmentDescription}</td>
                <td className="table-cell">{appointment.status}</td>
                <td className="table-cell">
                  <button className="delete-button" onClick={() => handleDeleteAppointment(appointment._id)}>
                    <FaTrash />
                  </button>
                  {appointment.status === 'pending' && (
                    <button className="approve-button" onClick={() => handleApproveAppointment(appointment._id)}>
                      <FaCheck />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentList;
