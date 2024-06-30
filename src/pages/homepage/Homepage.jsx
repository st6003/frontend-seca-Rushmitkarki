import React, { useEffect, useState } from "react";
import { getAllDoctors } from "../../apis/api";
import DoctorCard from "../../components/DoctorCard";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getAllDoctors()
      .then((res) => {
        console.log("API Response:", res);
        if (Array.isArray(res.data.doctor)) {
          setDoctors(res.data.doctor);
        } else {
          console.log(
            "Expected an array of doctors, but received:",
            res.data.doctor
          );
          setDoctors([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      className="container"
      style={{
        marginLeft: "20rem",
      }}
    >
      <div className="flex flex-col">
        <div className="">
          <div
            className="carousel slide mt-4"
            id="carouselExampleControls"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="assets/images/sideimage1.png"
                  className="d-block w-full object-cover h-60vh"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/images/sideimage2.jpg"
                  className="d-block w-full object-cover h-60vh"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="assets/images/sideimage4.png"
                  className="d-block w-full object-cover h-60vh"
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
        </div>
        <div>
          {/* Doctors List */}
          <h2 className="mt-5 text-2xl font-bold">Available Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {doctors.map((singleDoctor, index) => (
              <div key={singleDoctor.id || index}>
                <DoctorCard doctorInformation={singleDoctor} color={"red"} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
