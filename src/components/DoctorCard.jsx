import React from "react";

const DoctorCard = ({ doctorInformation, color }) => {
  return (
    <>
      <div
        class="card"
        style={{
          width: "18rem",
        }}
      >
        <span
          style={{ backgroundColor: color }}
          className="badge position-absolute top-0 "
        >
          {doctorInformation.speciality}
        </span>
        <img
          src={`http://localhost:5000/doctors/${doctorInformation.doctorImage}`}
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <div className="d-flex justify-content-between">
            <h5 class="card-title">{doctorInformation.doctorName}</h5>
            <h5 class="card-title text-danger">
              {""}
              {doctorInformation.doctorFee}
            </h5>
          </div>
          <p class="card-text">{doctorInformation.doctorField.slice(0, 30)}</p>
          <a href="#" class="btn btn-outline-dark w-100">
            View Profile
          </a>
        </div>
      </div>
    </>
  );
};

export default DoctorCard;
