import React, { useEffect, useState } from "react";
import { getUsersWithAppointments, deleteAppointment } from "../../../apis/api";
import { FaTrash } from "react-icons/fa";

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
        setUsersWithAppointments(usersWithAppointments.filter(appointment => appointment._id !== id));
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    }
  };

  return (
    <>
      <div className="p-6">
        <h2 className="text-4xl mb-4">Users Appointments List</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b border-gray-200">Patient Name</th>
              <th className="py-3 px-4 border-b border-gray-200">Email</th>
              <th className="py-3 px-4 border-b border-gray-200">Appointment Date</th>
              <th className="py-3 px-4 border-b border-gray-200">Appointment Description</th>
              <th className="py-3 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersWithAppointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">{appointment.patientName}</td>
                <td className="py-3 px-4 border-b border-gray-200">{appointment.email}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  {appointment.appointmentDescription || "-"}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleDeleteAppointment(appointment._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Appointmentlist;
