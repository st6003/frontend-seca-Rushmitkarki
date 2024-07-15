import React, { useEffect, useState } from "react";
import { doctorPagination, getDoctorCount } from "../../apis/api";
import DoctorCard from "../../components/DoctorCard";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const limit = 4; // Set limit for pagination

  useEffect(() => {
    // Fetch doctor count
    getDoctorCount()
      .then((res) => {
        const count = res.data.doctorCount;
        setDoctorCount(count);
        setTotalPages(Math.ceil(count / limit));
      })
      .catch((err) => {
        setError(err.response.data.message);
      });

    // Fetch doctors for the current page
    fetchDoctors(page);
  }, [page]);

  const fetchDoctors = (page) => {
    doctorPagination(page, limit)
      .then((res) => {
        setDoctors(res.data.doctors);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const handlePagination = (pageNum) => {
    setPage(pageNum);
  };

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
          <h2 className="mt-5 text-2xl font-bold">Meet our Professional Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {error ? (
              <h1>{error}</h1>
            ) : (
              doctors.map((singleDoctor, index) => (
                <div key={singleDoctor.id || index}>
                  <DoctorCard doctorInformation={singleDoctor} color={"red"} />
                </div>
              ))
            )}
          </div>
          {/* Pagination */}
          <nav aria-label="Page navigation example" className="mt-5">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePagination(1)}
                >
                  First
                </button>
              </li>
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => handlePagination(page - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${page === i + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePagination(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePagination(page + 1)}
                >
                  Next
                </button>
              </li>
              <li
                className={`page-item ${page === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePagination(totalPages)}
                >
                  Last
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
