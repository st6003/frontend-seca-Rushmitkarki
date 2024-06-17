import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  updateDoctor,
} from "../../../apis/api";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [experience, setExperience] = useState("");
  const [fee, setFee] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Fetch all doctors from the backend
    getAllDoctors()
      .then((res) => {
        setDoctors(res.data.doctor);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("doctorName", name);
    formData.append("doctorField", field);
    formData.append("doctorExperience", experience);
    formData.append("doctorFee", fee);
    formData.append("doctorImage", imageFile);

    createDoctor(formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            toast.warning(error.response.data.message);
          } else if (error.response.status === 500) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong");
          }
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const handleEditDoctor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("doctorName", name);
    formData.append("doctorField", field);
    formData.append("doctorExperience", experience);
    formData.append("doctorFee", fee);
    formData.append("doctorImage", imageFile);

    // Update the doctor in the backend
    updateDoctor(currentDoctor._id, formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message);
          window.location.reload();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteDoctor = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (confirm) {
      // Delete the doctor from the backend
      deleteDoctor(id)
        .then((res) => {
          if (res.status === 201) {
            toast.success(res.data.message);
            window.location.reload();
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  const openEditModal = (doctor) => {
    setCurrentDoctor(doctor);
    setName(doctor.doctorName);
    setField(doctor.doctorField);
    setExperience(doctor.doctorExperience);
    setFee(doctor.doctorFee);
    setImageFile(doctor.doctorImage);

    document.getElementById("openModalButton").click();
  };

  return (
    <div className="container-fluid  flex flex-column">
      <header>
        <h1 className="mb-4 text-center">Doctor List Admin Panel</h1>
      </header>
      <main>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="card-title">Doctor List</h2>
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#addDoctorModal"
                id="openModalButton"
              >
                Add New Doctor
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Doctor Image</th>
                    <th scope="col">Doctor Name</th>
                    <th scope="col">Doctor Field</th>
                    <th scope="col">Experience</th>
                    <th scope="col">Fee</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor) => (
                    <tr key={doctor._id}>
                      <td>
                        <img
                          src={`http://localhost:5000/doctors/${doctor.doctorImage}`}
                          alt={doctor.doctorName}
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td>{doctor.doctorName}</td>
                      <td>{doctor.doctorField}</td>
                      <td>{doctor.doctorExperience}</td>
                      <td>{doctor.doctorFee}</td>
                      <td>
                        <button
                          className="btn btn-warning "
                          onClick={() => openEditModal(doctor)}
                          data-bs-toggle="modal"
                          data-bs-target="#addDoctorModal"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteDoctor(doctor._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Doctor Modal */}
      <div
        className="modal fade"
        id="addDoctorModal"
        tabIndex="-1"
        aria-labelledby="addDoctorModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addDoctorModalLabel">
                {currentDoctor ? "Edit Doctor" : "Add New Doctor"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="closeModalButton"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={currentDoctor ? handleEditDoctor : handleAddDoctor}
              >
                <div className="form-group">
                  <label htmlFor="doctorName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="doctorName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="doctorField">Field</label>
                  <input
                    type="text"
                    className="form-control"
                    id="doctorField"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="doctorExperience">Experience</label>
                  <input
                    type="text"
                    className="form-control"
                    id="doctorExperience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="doctorFee">Fee</label>
                  <input
                    type="text"
                    className="form-control"
                    id="doctorFee"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="doctorImage">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="doctorImage"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {currentDoctor ? "Update Doctor" : "Add Doctor"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
