import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Bookings.css";
import Ongoing from "./Ongoing";
import NewRequest from "./NewRequest";
import Completed from "./Completed";
import BookingReview from "./BookingReview";
import { useEffect, useState } from "react";
import { AvailableHandyman, bookedClients } from "../../interfaces/Interfaces";
const Bookings = () => {
  const [currStatus, setCurrStatus] = useState("ongoing");

  const [selectedBookingForReview, setSelectedBookingForReview] = useState<
    (bookedClients & { handyman: AvailableHandyman | null }) | null
  >(null);
  const [completedBookings, setCompletedBookings] = useState<
    (bookedClients & { handyman: AvailableHandyman | null })[]
  >([]);

  const [newRequestBookings, setNewRequestBookings] = useState<
    (bookedClients & { handyman: AvailableHandyman | null })[]
  >([]);

  const [ongoingBookings, setOngoingBookings] = useState<
    (bookedClients & { handyman: AvailableHandyman | null })[]
  >([]);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      if (currUser) {
        const res = await fetch(
          "https://api-fixdas.onrender.com/bookedClients"
        );
        const bookings: bookedClients[] = await res.json();

        // completed bookings
        const userBooking = bookings.filter(
          (b) => b.loggedUserId === currUser?.uid && b.status === "completed"
        );

        const combinedBookings = await Promise.all(
          userBooking.map(async (booking) => {
            const handymanRes = await fetch(
              `https://api-fixdas.onrender.com/availableHandyman?id=${booking.handymanId}`
            );
            const handymanData = await handymanRes.json();
            return {
              ...booking,
              handyman: handymanData[0] || null,
            };
          })
        );

        setCompletedBookings(combinedBookings);

        // ongoing
        const ongoingBooking = bookings.filter(
          (b) => b.loggedUserId === currUser?.uid && b.status === "ongoing"
        );
        const combinedOngoingBookings = await Promise.all(
          ongoingBooking.map(async (booking) => {
            const handymanRes = await fetch(
              `https://api-fixdas.onrender.com/availableHandyman?id=${booking.handymanId}`
            );
            const handymanData = await handymanRes.json();
            return {
              ...booking,
              handyman: handymanData[0] || null,
            };
          })
        );

        setOngoingBookings(combinedOngoingBookings);

        // new-request
        const newRequest = bookings.filter((b) => b.status === "new-request");

        const newRequestWithHandyman = await Promise.all(
          newRequest.map(async (booking) => {
            const handymanRes = await fetch(
              `https://api-fixdas.onrender.com/availableHandyman?id=${booking.handymanId}`
            );
            const handymanData = await handymanRes.json();
            return { ...booking, handyman: handymanData[0] || null };
          })
        );

        setNewRequestBookings(newRequestWithHandyman);
      } else {
        setCompletedBookings([]);
        setNewRequestBookings([]);
      }
    });

    return () => unsubscribe();
  }, [currStatus]);

  return (
    <>
      {currStatus === "review" ? (
        <BookingReview
          selectedBooking={selectedBookingForReview}
          setCurrStatus={setCurrStatus}
        />
      ) : (
        <div className="container with-bottom-padding">
          <div className="row pt-4">
            <div className="col-12 d-flex justify-content-between">
              <h2 className="m-0 main-color">My Bookings</h2>
              <i className="fa-regular fa-bell text-primary fa-2x"></i>
            </div>
          </div>
          <div className="row my-5">
            <div className="col-12 d-flex justify-content-between align-items-center text-secondary small">
              <p
                className={`mb-0 fw-bold cursor-pointer ${
                  currStatus === "new-request" ? "currStatus-p" : ""
                }`}
                onClick={() => setCurrStatus("new-request")}
              >
                New Requests
                {newRequestBookings.length > 0 && (
                  <span>({newRequestBookings.length})</span>
                )}
              </p>
              <p
                className={`mb-0 fw-bold cursor-pointer ${
                  currStatus === "ongoing" ? "currStatus-p" : ""
                }`}
                onClick={() => setCurrStatus("ongoing")}
              >
                Ongoing
                {ongoingBookings.length > 0 && (
                  <span>({ongoingBookings.length})</span>
                )}
              </p>
              <p
                className={`mb-0 fw-bold cursor-pointer ${
                  currStatus === "completed" ? "currStatus-p" : ""
                }`}
                onClick={() => setCurrStatus("completed")}
              >
                Completed
                {completedBookings.length > 0 && (
                  <span>({completedBookings.length})</span>
                )}
              </p>
            </div>
          </div>
          <div className="row d-flex row-gap-2">
            {currStatus === "ongoing" ? (
              <Ongoing
                ongoingBookings={ongoingBookings}
                setOngoingBookings={setOngoingBookings}
              />
            ) : currStatus === "new-request" ? (
              <NewRequest
                newRequestBookings={newRequestBookings}
                setNewRequestBookings={setNewRequestBookings}
              />
            ) : currStatus === "completed" ? (
              <Completed
                completedBookings={completedBookings}
                setCurrStatus={setCurrStatus}
                setSelectedBookingForReview={setSelectedBookingForReview}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Bookings;
