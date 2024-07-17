import React, { useEffect, useState } from 'react';
import { doctorPagination, getDoctorCount } from '../../apis/api';
import DoctorCard from '../../components/DoctorCard';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const limit = 4;

  useEffect(() => {
    // Fetch doctor count
    getDoctorCount()
      .then((res) => {
        const count = res.data.doctorCount;
        setDoctorCount(count);
        setTotalPages(Math.ceil(count / limit));
      })
      .catch((err) => {
        setError(err.response?.data?.message || "An error occurred");
      });

    // Fetch doctors for the current page
    fetchDoctors(page, searchQuery, sortOrder);
  }, [page, searchQuery, sortOrder]);

  const fetchDoctors = (page, searchQuery, sortOrder) => {
    doctorPagination(page, limit, searchQuery, sortOrder)
      .then((res) => {
        setDoctors(res.data.doctors);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "An error occurred");
      });
  };

  const handlePagination = (pageNum) => {
    setPage(pageNum);
  };

  const handleSearch = () => {
    setPage(1);
    fetchDoctors(1, searchQuery, sortOrder);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setPage(1);
    fetchDoctors(1, searchQuery, order);
  };

  return (
    <>
    <div className="container mt-5">
    
      <div className="container" style={{ marginLeft: "20rem" }}>
        <div className="flex flex-col">
          <div>
            <div className="flex justify-between items-center my-4">
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded"
              />
              <button
                onClick={handleSearch}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Search
              </button>
              <div>
                <button
                  onClick={() => handleSort("asc")}
                  className={`p-2 mx-1 ${
                    sortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded`}
                >
                  Sort by Price: Low to High
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className={`p-2 mx-1 ${
                    sortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded`}
                >
                  Sort by Price: High to Low
                </button>
              </div>
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
                  <div key={singleDoctor._id || index}>
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
      </div>
    </>
  );
};

export default Doctor;
