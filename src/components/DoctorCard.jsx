import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Rating from 'react-rating-stars-component';
import { addFavoriteApi, getDoctorReviews, addReviewApi } from "../apis/api";

const DoctorCard = ({ doctorInformation, refreshFavorites }) => {
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (show) {
      fetchReviews();
    }
  }, [show]);

  const fetchReviews = async () => {
    try {
      const res = await getDoctorReviews(doctorInformation._id);
      setReviews(res.data.reviews);
      calculateAverageRating(res.data.reviews);
    } catch (err) {
      toast.error("Failed to fetch reviews");
    }
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      setAverageRating(0);
      return;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    setAverageRating(totalRating / reviews.length);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addFavorites = async () => {
    if (!doctorInformation) {
      toast.error("Doctor information is not available");
      return;
    }

    try {
      const res = await addFavoriteApi({ doctorId: doctorInformation._id });
      toast.success(res.data.message);
      refreshFavorites(); 
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const submitReview = async () => {
    if (!rating || !comment) {
      toast.error("Please provide both rating and comment");
      return;
    }

    try {
      const res = await addReviewApi({ doctorId: doctorInformation._id, rating, comment });
      toast.success(res.data.message);
      fetchReviews(); // Refresh reviews after submitting a new one
      setRating(0); // Reset rating
      setComment(""); // Reset comment
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to submit review");
      }
    }
  };

  if (!doctorInformation) return null; // Return null if no doctor information

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={`http://localhost:5000/doctors/${doctorInformation.doctorImage}`}
          className="w-full h-48 object-cover"
          alt={doctorInformation.doctorName || "Doctor"}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">
            {doctorInformation.doctorName || "No Name"}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {doctorInformation.doctorField
              ? doctorInformation.doctorField.slice(0, 30)
              : "No Field Info"}
          </p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xl font-bold text-gray-800">
              {doctorInformation.doctorExperience || "N/A"} years
            </span>
            <span className="text-sm text-gray-600">
              {doctorInformation.doctorRating || ""}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <Button
              variant="primary"
              size="sm"
              className="mr-2"
              onClick={addFavorites}
            >
              Add to Favorites
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleShow}
            >
              View More
            </Button>
          </div>
          {averageRating > 0 && (
            <Rating
              value={averageRating}
              edit={false}
              size={24}
              activeColor="#ffd700"
              className="mt-2"
            />
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{doctorInformation.doctorName || "Doctor Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`http://localhost:5000/doctors/${doctorInformation.doctorImage}`}
            className="w-full h-48 object-cover mb-4"
            alt={doctorInformation.doctorName || "Doctor"}
          />
          <h5 className="font-semibold">Field: {doctorInformation.doctorField}</h5>
          <p>Experience: {doctorInformation.doctorExperience} years</p>
          <Rating
            value={rating}
            onChange={handleRatingChange}
            size={24}
            activeColor="#ffd700"
          />
          <textarea
            className="w-full mt-2 p-2 border rounded"
            rows="3"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <Button
            variant="primary"
            className="mt-2"
            onClick={submitReview}
          >
            Submit Review
          </Button>
          <div className="mt-4">
            <h5 className="font-semibold">Reviews:</h5>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="border-t pt-2 mt-2">
                  <p>{review.comment}</p>
                  <Rating
                    value={review.rating}
                    edit={false}
                    size={20}
                    activeColor="#ffd700"
                  />
                </div>
              ))
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DoctorCard;
