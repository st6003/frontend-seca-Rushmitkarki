import React, { useEffect, useState } from "react";
import { getAllDoctors } from "../../apis/api";
import DoctorCard from "../../components/DoctorCard";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);

  // Call API initially
  useEffect(() => {
    getAllDoctors()
      .then((res) => {
        setDoctors(res.data.doctors);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="assets/images/doctor.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="assets/images/doctor.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="assets/images/doctor.png"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <h2 className="mt-5">Available Doctors</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {doctors && doctors.length > 0 ? (
            doctors.map((singleDoctor, index) => (
              <div className="col" key={index}>
                <DoctorCard doctorInformation={singleDoctor} color={"red"} />
              </div>
            ))
          ) : (
            <p>No doctors available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;
