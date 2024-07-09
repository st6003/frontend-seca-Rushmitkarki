import React, { useEffect, useState } from "react"; // Import useState and useEffect
import { getUsersWithAppointments } from "../../../apis/api";

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

  return (
    <>
      <div className="p-6">
        <h2 className="text-4xl mb-4">Users Appointments list</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200">
                Patient Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200">Email</th>
              <th className="py-2 px-4 border-b border-gray-200">
                Appointment Date
              </th>
            </tr>
          </thead>
          <tbody>
            {usersWithAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td className="py-2 px-4 border-b border-gray-200">
                  {appointment.patientName}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {appointment.email}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
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
