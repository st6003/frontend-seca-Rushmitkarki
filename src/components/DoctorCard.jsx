import React from "react";

const DoctorCard = ({ doctorInformation, color }) => {
  return (
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
        <a href="" className="btn btn-outline-dark w-100">
          View Profile
        </a>
      </div>
    </div>
  );
};

export default DoctorCard;
