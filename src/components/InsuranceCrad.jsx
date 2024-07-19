import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { initializeKhaltiPayment } from "../apis/api";

const InsuranceCard = ({ insuranceInformation }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlePayment = async () => {
    try {
      const { _id, insurancePrice } = insuranceInformation;
      const totalPriceInPaisa = insurancePrice * 100;

      const response = await initializeKhaltiPayment({
        itemId: _id,
        totalPrice: totalPriceInPaisa,
        website_url: window.location.origin,
      });

      if (response.data.success) {
        // Redirect to the Khalti payment URL
        window.location.href = response.data.payment_url;
      } else {
        setError("Failed to initialize payment");
      }
    } catch (error) {
      console.error("Error initiating Khalti payment:", error);
      setError("Error initiating Khalti payment");
    }
  };

  return (
    <>
      <div className="card">
        <img
          src={`http://localhost:5000/insurance/${insuranceInformation.insuranceImage}`}
          className="card-img-top"
          alt={insuranceInformation.insuranceName}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{insuranceInformation.insuranceName}</h5>
            <h5 className="card-title text-danger">
              {insuranceInformation.insurancePrice}
            </h5>
          </div>
          <p className="card-text">
            {insuranceInformation.insuranceDescription.slice(0, 30)}
          </p>
          <Button variant="outline-dark" onClick={handleShow}>
            View More
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{insuranceInformation.insuranceName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`http://localhost:5000/insurance/${insuranceInformation.insuranceImage}`}
            className="img-fluid"
            alt={insuranceInformation.insuranceName}
          />
          <p>{insuranceInformation.insuranceDescription}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handlePayment}>
            Make a payment
          </Button>
        </Modal.Footer>
      </Modal>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </>
  );
};

export default InsuranceCard;
