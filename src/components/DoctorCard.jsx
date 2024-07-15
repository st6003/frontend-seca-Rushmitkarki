import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { addToFavoriteApi,  } from "../apis/api";

const DoctorCard = ({ doctorInformation, color }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToFavorites = () => {
    // Example function, adjust as per your API and logic
    console.log("Adding to favorites:", doctorInformation);
    // Replace addToFavoriteApi with your actual API call
    addToFavoriteApi({ doctorId: doctorInformation._id })
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <>
      <div className="card">
        <span
          style={{ backgroundColor: color }}
          className="badge position-absolute top-0"
        ></span>
        <img
          src={`http://localhost:5000/doctors/${doctorInformation.doctorImage}`}
          className="card-img-top"
          alt={doctorInformation.doctorName}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{doctorInformation.doctorName}</h5>
            <h5 className="card-title text-danger">
              {doctorInformation.doctorFee}
            </h5>
          </div>
          <p className="card-text">
            {doctorInformation.doctorField.slice(0, 30)}
          </p>
          <Button variant="outline-dark" onClick={handleShow}>
            View More
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{doctorInformation.doctorName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`http://localhost:5000/doctors/${doctorInformation.doctorImage}`}
            className="img-fluid"
            alt={doctorInformation.doctorName}
          />
          <p>{doctorInformation.doctorField}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              addToFavorites();
              handleClose();
            }}
          >
            Add to Favorites
          </Button>
          {/* <Button
            variant="primary"
            onClick={() => {
              appointmentDoctor();
              handleClose();
            }}
          >
            Make an appointment
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DoctorCard;
