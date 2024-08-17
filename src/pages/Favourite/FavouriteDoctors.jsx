import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import { FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { getUserFavoritesApi, removeFavoriteApi } from "../../apis/api";
import "./FavouriteDoctors.css";

const FavouriteDoctors = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await getUserFavoritesApi();
      console.log("Fetched data:", res.data); // Debugging: Check the structure of the fetched data

      // Ensure the data is an array before setting it
      if (Array.isArray(res.data.favorites)) {
        setFavorites(res.data.favorites);
      } else {
        console.error("Fetched data is not an array:", res.data);
        toast.error("Failed to fetch favorite doctors");
      }
    } catch (err) {
      console.error("Error fetching favorites:", err);
      toast.error("Failed to fetch favorite doctors");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (doctor) => {
    setSelectedDoctor(doctor);
    setShow(true);
  };

  const removeFromFavorites = async (id) => {
    try {
      await removeFavoriteApi(id);
      toast.success("Doctor removed from favorites");
      fetchFavorites(); // Refresh the list to automatically update the table
    } catch (err) {
      console.error("Error removing doctor from favorites:", err);
      toast.error("Failed to remove doctor from favorites");
    }
  };

  return (
    <div style={{ marginLeft: "250px", padding: "20px" }}>
      <h1>Your Favourite Doctors</h1>
      {favorites.length === 0 ? (
        <Alert variant="info">No favorite doctors found.</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Field</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((item) => (
              <tr key={item._id}>
                <td>{item.doctor?.doctorName || ""}</td>
                <td>{item.doctor?.doctorField || ""}</td>
                <td className="table-actions">
                  <Button
                    variant=""
                    className="icon-button"
                    onClick={() => handleShow(item.doctor)}
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant=""
                    className="icon-button"
                    onClick={() => removeFromFavorites(item._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDoctor?.doctorName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor && (
            <>
              <img
                src={`http://localhost:5000/doctors/${selectedDoctor.doctorImage}`}
                className="img-fluid mb-3"
                alt={selectedDoctor.doctorName}
              />
              <p>{selectedDoctor.doctorField}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FavouriteDoctors;
