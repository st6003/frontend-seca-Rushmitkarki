import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getUsersWithAppointments, cancelAppointment } from '../../apis/api'; // Adjust import paths

const UserAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getUsersWithAppointments();
      setAppointments(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch appointments');
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      toast.success('Appointment canceled successfully');
      fetchAppointments(); // Refresh the list after cancellation
    } catch (err) {
      toast.error('Failed to cancel appointment');
    }
  };

  return (
    <div style={{ marginLeft: '250px', padding: '20px' }}>
      <h1>Your Appointments</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.patientName}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td>{appointment.phoneNumber}</td>
                <td>{appointment.email}</td>
                <td>{appointment.appointmentDescription}</td>
                <td>{appointment.status}</td>
                <td>
                  {appointment.status === 'pending' && (
                    <Button variant="danger" onClick={() => handleCancel(appointment._id)}>
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserAppointmentList;
