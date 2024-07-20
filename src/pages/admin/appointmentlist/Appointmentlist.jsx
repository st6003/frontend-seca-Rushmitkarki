import React, { useEffect, useState } from "react";
import { getUsersWithAppointments, deleteAppointment } from "../../../apis/api";
import { FaTrash } from "react-icons/fa";
import "./appointment.css";

const Appointmentlist = () => {
  const [usersWithAppointments, setUsersWithAppointments] = useState([]);

  useEffect(() => {
    const fetchUsersWithAppointments = async () => {
      try {
        const response = await getUsersWithAppointments();
        setUsersWithAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching users with appointments:", error);
      }
    };

    fetchUsersWithAppointments();
  }, []);

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const response = await deleteAppointment(id);
        console.log(response.data.message);
        setUsersWithAppointments(usersWithAppointments.filter((appointment) => appointment._id !== id));
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  return (
    <div className="appointmentlist-container">
      <h2 className="title">Users Appointments List</h2>
      <table className="appointments-table">
        <thead>
          <tr className="table-header">
            <th className="table-cell">Patient Name</th>
            <th className="table-cell">Email</th>
            <th className="table-cell">Appointment Date</th>
            <th className="table-cell">Appointment Description</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersWithAppointments.map((appointment) => (
            <tr key={appointment._id} className="table-row">
              <td className="table-cell">{appointment.patientName}</td>
              <td className="table-cell">{appointment.email}</td>
              <td className="table-cell">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
              <td className="table-cell">{appointment.appointmentDescription || "-"}</td>
              <td className="table-cell">
                <button
                  onClick={() => handleDeleteAppointment(appointment._id)}
                  className="delete-button"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointmentlist;
