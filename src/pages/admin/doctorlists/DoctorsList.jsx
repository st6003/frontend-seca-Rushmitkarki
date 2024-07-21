import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  updateDoctor,
} from "../../../apis/api";
import AdminNavbar from "../../../components/AdminNavbar";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [experience, setExperience] = useState("");
  const [fee, setFee] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
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
    <div className="flex">
      <AdminNavbar />
      <div className="flex-1 p-10 ml-64">
        <h2 className="text-2xl font-bold mb-4">Doctor List</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm mb-4"
          data-bs-toggle="modal"
          data-bs-target="#addDoctorModal"
          id="openModalButton"
        >
          Add New Doctor
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Doctor Image</th>
                <th className="py-2 px-4 text-left">Doctor Name</th>
                <th className="py-2 px-4 text-left">Doctor Field</th>
                <th className="py-2 px-4 text-left">Experience</th>
                <th className="py-2 px-4 text-left">Fee</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="border-b">
                  <td className="py-2 px-4">
                    <img
                      src={`http://localhost:5000/doctors/${doctor.doctorImage}`}
                      alt={doctor.doctorName}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-2 px-4">{doctor.doctorName}</td>
                  <td className="py-2 px-4">{doctor.doctorField}</td>
                  <td className="py-2 px-4">{doctor.doctorExperience}</td>
                  <td className="py-2 px-4">{doctor.doctorFee}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-xs mr-2"
                      onClick={() => openEditModal(doctor)}
                      data-bs-toggle="modal"
                      data-bs-target="#addDoctorModal"
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
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
                      type="number"
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
                      type="number"
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
                      Close
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
    </div>
  );
};

export default DoctorsList;
