import React, { useEffect, useState } from 'react';
import { doctorPagination, getDoctorCount } from '../../apis/api';
import DoctorCard from '../../components/DoctorCard';
import UserNavbar from '../../components/UserNavbar';  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const limit = 8;

  useEffect(() => {
    getDoctorCount()
      .then((res) => {
        const count = res.data.doctorCount;
        setDoctorCount(count);
        setTotalPages(Math.ceil(count / limit));
      })
      .catch((err) => {
        setError(err.response?.data?.message || "An error occurred");
      });

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
    <div className="flex min-h-screen bg-gray-100">
      <UserNavbar /> 

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1 mr-4">
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Search
          </button>
          <div className="ml-4">
            <button
              onClick={() => handleSort("asc")}
              className={`px-4 py-2 rounded-lg ${sortOrder === "asc" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleSort("desc")}
              className={`px-4 py-2 rounded-lg ml-2 ${sortOrder === "desc" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Price: High to Low
            </button>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Meet our Professional Doctors</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctorInformation={doctor} />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <nav>
            <ul className="flex space-x-2">
              <li>
                <button onClick={() => handlePagination(1)} className="px-4 py-2 bg-gray-200 rounded-lg" disabled={page === 1}>First</button>
              </li>
              <li>
                <button onClick={() => handlePagination(page - 1)} className="px-4 py-2 bg-gray-200 rounded-lg" disabled={page === 1}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i}>
                  <button
                    onClick={() => handlePagination(i + 1)}
                    className={`px-4 py-2 rounded-lg ${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => handlePagination(page + 1)} className="px-4 py-2 bg-gray-200 rounded-lg" disabled={page === totalPages}>Next</button>
              </li>
              <li>
                <button onClick={() => handlePagination(totalPages)} className="px-4 py-2 bg-gray-200 rounded-lg" disabled={page === totalPages}>Last</button>
              </li>
            </ul>
          </nav>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Doctor;