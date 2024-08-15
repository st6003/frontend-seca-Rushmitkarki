import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createInsurance,
  deleteInsurance,
  getInsurance,
  updateInsurance,
} from "../../../apis/api";

const Insurance = () => {
  const [insurances, setInsurances] = useState([]);
  const [currentInsurance, setCurrentInsurance] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchInsurances();
  }, []);

  const fetchInsurances = () => {
    getInsurance()
      .then((res) => {
        setInsurances(res.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching insurances:", error);
        toast.error("Failed to fetch insurances.");
      });
  };

  const handleAddInsurance = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("insuranceName", name);
    formData.append("insurancePrice", price);
    formData.append("insuranceDescription", description);
    formData.append("insuranceImage", imageFile);

    createInsurance(formData)
      .then((res) => {
        if (res.status === 201) {
          toast.success("insurance created sucessfully");
          // Update state with the new insurance
          setInsurances([...insurances, res.data.data]);
          // Clear form fields
          setName("");
          setPrice("");
          setDescription("");
          setImageFile(null);
        } else {
          toast.error("Failed to add insurance.");
        }
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const handleEditInsurance = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("insuranceName", name);
    formData.append("insurancePrice", price);
    formData.append("insuranceDescription", description);
    formData.append("insuranceImage", imageFile);

    updateInsurance(currentInsurance._id, formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("insurance update succesfully");
          fetchInsurances();
          // Clear form fields
          setCurrentInsurance(null);
          setName("");
          setPrice("");
          setDescription("");
          setImageFile(null);
        }
      })
      .catch((error) => {
        handleApiError(error);
      });
  };

  const handleDeleteInsurance = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this insurance?"
    );
    if (confirm) {
      deleteInsurance(id)
        .then((res) => {
          if (res.status === 200) {
            toast.success("insurance delete sucessfully");
            fetchInsurances();
          }
        })
        .catch((error) => {
          handleApiError(error);
        });
    }
  };

  const openEditModal = (insurance) => {
    setCurrentInsurance(insurance);
    setName(insurance.insuranceName);
    setPrice(insurance.insurancePrice);
    setDescription(insurance.insuranceDescription);
    setImageFile(null);

    document.getElementById("openModalButton").click();
  };

  const handleApiError = (error) => {
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
  };

  return (
    <>
      <div className="ml-64 p-6 bg-gray-100 min-h-screen">
        <header>
          <h1 className="mb-4 text-center">Insurance List Admin Panel</h1>
        </header>
        <main>
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title">Insurance List</h2>
                <button
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#addInsuranceModal"
                  id="openModalButton"
                >
                  Add New Insurance
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-black">
                    <tr>
                      <th scope="col">Insurance Image</th>
                      <th scope="col">Insurance Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insurances &&
                      insurances.map((insurance) => (
                        <tr key={insurance._id}>
                          <td>
                            {insurance.insuranceImage ? (
                              <img
                                src={`http://localhost:5000/insurance/${insurance.insuranceImage}`}
                                alt={insurance.insuranceName}
                                style={{ width: "50px" }}
                              />
                            ) : (
                              <span>No image available</span>
                            )}
                          </td>
                          <td>{insurance.insuranceName}</td>
                          <td>{insurance.insurancePrice}</td>
                          <td>{insurance.insuranceDescription}</td>
                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => openEditModal(insurance)}
                              data-bs-toggle="modal"
                              data-bs-target="#addInsuranceModal"
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                handleDeleteInsurance(insurance._id)
                              }
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

        {/* Add/Edit Insurance Modal */}
        <div
          className="modal fade"
          id="addInsuranceModal"
          tabIndex="-1"
          aria-labelledby="addInsuranceModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addInsuranceModalLabel">
                  {currentInsurance ? "Edit Insurance" : "Add New Insurance"}
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
                  onSubmit={
                    currentInsurance ? handleEditInsurance : handleAddInsurance
                  }
                >
                  <div className="form-group">
                    <label htmlFor="insuranceName">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="insuranceName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="insurancePrice">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="insurancePrice"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="insuranceDescription">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="insuranceDescription"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="insuranceImage">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="insuranceImage"
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
                      {currentInsurance ? "Update Insurance" : "Add Insurance"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Insurance;
