import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { addFavoriteApi } from "../apis/api";

const DoctorCard = ({ doctorInformation, refreshFavorites }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addFavorites = async () => {
    if (!doctorInformation) {
      toast.error("Doctor information is not available");
      return;
    }

    try {
      const res = await addFavoriteApi({ doctorId: doctorInformation._id });
      toast.success(res.data.message);
      refreshFavorites(); // Call the function to refresh the favorite list
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } 
    }
  };

  if (!doctorInformation) return null; // Return null if no doctor information

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={`http://localhost:5000/doctors/${doctorInformation.doctorImage}`}
          className="w-full h-48 object-cover"
          alt={doctorInformation.doctorName || "Doctor"}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {doctorInformation.doctorName || "No Name"}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {doctorInformation.doctorField
              ? doctorInformation.doctorField.slice(0, 30)
              : "No Field Info"}
          </p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold text-blue-600">
              ${doctorInformation.doctorFee || "0.00"}
            </span>
            <button
              onClick={handleShow}
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition"
            >
              View More
            </button>
          </div>
          <button
            onClick={addFavorites}
            className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Add to Favorites
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{doctorInformation.doctorName || "Doctor Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`http://localhost:5000/doctors/${doctorInformation.doctorImage}`}
            className="img-fluid mb-3"
            alt={doctorInformation.doctorName || "Doctor"}
          />
          <p>{doctorInformation.doctorField || "No Field Info"}</p>
          <p>Fee: ${doctorInformation.doctorFee || "0.00"}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              addFavorites();
              handleClose();
            }}
          >
            Add to Favorites
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DoctorCard;
