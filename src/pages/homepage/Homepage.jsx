import React, { useEffect, useState } from "react";
import { doctorPagination, getDoctorCount } from "../../apis/api";
import DoctorCard from "../../components/DoctorCard";
import { Carousel } from "react-bootstrap";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const limit = 8;

  useEffect(() => {
    fetchDoctorCount();
    fetchDoctors(page);
  }, [page]);

  const fetchDoctorCount = async () => {
    try {
      const res = await getDoctorCount();
      const count = res.data.doctorCount;
      setDoctorCount(count);
      setTotalPages(Math.ceil(count / limit));
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching doctor count");
    }
  };

  const fetchDoctors = async (pageNum) => {
    try {
      const res = await doctorPagination(pageNum, limit);
      setDoctors(res.data.doctors);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching doctors");
    }
  };

  const handlePagination = (pageNum) => {
    setPage(pageNum);
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      {/* Carousel */}
      <div className="mb-8">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 h-64 object-cover"
              src="assets/images/sideimage1.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-64 object-cover"
              src="assets/images/sideimage2.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-64 object-cover"
              src="assets/images/sideimage4.png"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Doctors List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Meet our Professional Doctors
        </h2>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctorInformation={doctor}
                color="red"
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <nav aria-label="Page navigation" className="mt-8">
          <ul className="flex justify-center">
            <li className={`mx-1 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => handlePagination(1)}
                disabled={page === 1}
              >
                First
              </button>
            </li>
            <li className={`mx-1 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => handlePagination(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className="mx-1">
                <button
                  className={`px-3 py-1 rounded ${
                    page === i + 1
                      ? "bg-blue-700 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                  onClick={() => handlePagination(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`mx-1 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => handlePagination(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </li>
            <li className={`mx-1 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => handlePagination(totalPages)}
                disabled={page === totalPages}
              >
                Last
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Homepage;