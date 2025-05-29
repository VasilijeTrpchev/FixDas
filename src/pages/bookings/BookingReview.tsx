import { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { AvailableHandyman, bookedClients } from "../../interfaces/Interfaces";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const BookingReview = ({
  setCurrStatus,
  selectedBooking,
}: {
  selectedBooking:
    | (bookedClients & { handyman: AvailableHandyman | null })
    | null;

  setCurrStatus: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [rating, setRating] = useState<number | null>(2);
  const [comment, setComment] = useState("");
  const loggedUserId = getAuth().currentUser?.uid;

  const navigate = useNavigate();

  const handleSubmitReview = async () => {
    if (!selectedBooking || !selectedBooking.handyman) return;

    const handymanId = selectedBooking.handyman.id;

    // 1. Fetch current handyman to get existing kundeFeedback
    const handymanRes = await fetch(
      `http://localhost:3001/availableHandyman/${handymanId}`
    );
    const handymanData = await handymanRes.json();

    if (!handymanRes.ok) {
      alert("Failed to fetch handyman data");
      return;
    }

    const userRes = await fetch(
      `http://localhost:3001/loggedUser?loggedUserId=${loggedUserId}`
    );
    const arrRes = await userRes.json();
    const loggedUserData = arrRes[0];
    // 2. Create new feedback entry
    const newFeedback = {
      id: handymanData.kundeFeedback.length + 1,
      kundeName: loggedUserData?.name,
      kundeCity: loggedUserData?.city,
      kundeRating: rating,
      kundeComment: comment,
      kundeImg: loggedUserData?.photoUrl,
    };

    // 3. PATCH the updated kundeFeedback array
    await fetch(`http://localhost:3001/availableHandyman/${handymanId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kundeFeedback: [...handymanData.kundeFeedback, newFeedback],
      }),
    });
    const bookedRes = await fetch("http://localhost:3001/bookedClients");
    const bookedClients = await bookedRes.json();

    const filteredBookings = bookedClients.find(
      (b: bookedClients) =>
        b.handymanId === handymanId &&
        b.loggedUserId === loggedUserId &&
        b.date === selectedBooking.date &&
        b.time === selectedBooking.time
    );

    // delete bookedClients
    if (filteredBookings?.id) {
      await fetch(
        `http://localhost:3001/bookedClients/${filteredBookings.id}`,
        {
          method: "DELETE",
        }
      );
    }
    navigate("/bookings");
    setCurrStatus("completed");
  };

  return (
    <div className="container ">
      <div className="row pt-4">
        <div className="col-12 d-flex justify-content-start align-items-center">
          <div
            onClick={() => {
              setCurrStatus("completed");
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <h5 className="mb-0 ms-3">Leave a review</h5>
        </div>
        <div className="col-12 mt-4">
          <small>
            We'd appreciate it if you could rate the handyman before moving on.
          </small>
        </div>
        <div className="col-12 text-center mt-5">
          <h6>Rate your service with {selectedBooking?.handymanName}</h6>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(_, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <label htmlFor="experience">Share your experience</label>
          <textarea
            onChange={(e) => setComment(e.currentTarget.value)}
            className="form-control mt-1"
            placeholder="Enter message"
            name="experience"
            id="experience"
            rows={6}
          ></textarea>
        </div>
        <div className="col-12 mt-5">
          <button
            className="btn contact-btn w-100 "
            onClick={handleSubmitReview}
          >
            Send Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingReview;
