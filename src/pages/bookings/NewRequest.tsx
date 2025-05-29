import { AvailableHandyman, bookedClients } from "../../interfaces/Interfaces";
import { useNavigate } from "react-router-dom";
import userFormatTime from "../../hooks/userFormatTime";

const NewRequest = ({
  newRequestBookings,
  setNewRequestBookings,
}: {
  newRequestBookings: (bookedClients & {
    handyman: AvailableHandyman | null;
  })[];
  setNewRequestBookings: React.Dispatch<
    React.SetStateAction<
      (bookedClients & { handyman: AvailableHandyman | null })[]
    >
  >;
}) => {
  const { formatTime } = userFormatTime();

  const navigate = useNavigate();

  const handleOnRefuse = async (bookingId: number) => {
    try {
      const response = await fetch(
        `https://api-fixdas.onrender.com/bookedClients/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setNewRequestBookings((prev) =>
          prev.filter((booking) => booking.id !== bookingId)
        );
      } else {
        console.error("Failed to update booking status.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };
  const handleOnComplited = async (bookingId: number) => {
    try {
      const response = await fetch(
        `https://api-fixdas.onrender.com/bookedClients/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "ongoing" }),
        }
      );

      if (response.ok) {
        setNewRequestBookings((prev) =>
          prev.filter((booking) => booking.id !== bookingId)
        );
      } else {
        console.error("Failed to update booking status.");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <>
      {newRequestBookings?.length === 0 ? (
        <p className="text-center fw-bold ">No New request yet!</p>
      ) : (
        newRequestBookings.map((booking) => (
          <div key={booking.id} className="card col-12 col-md-6 mb-3">
            <div className="card-body">
              <div className="d-flex  justify-content-between align-items-center">
                <div className="col-6 text-start">
                  <span className="mb-0 fw-bold booking-font">
                    {booking.specialty}
                  </span>
                </div>
                <div className="col-6 text-end">
                  <p
                    className=" mb-0 main-color booking-font"
                    onClick={() =>
                      navigate(
                        `/karte/${booking.coordinates.lat}/${booking.coordinates.lng}`
                      )
                    }
                  >
                    <span>
                      <i className="fa-solid fa-location-dot me-2"></i>
                    </span>
                    View on map
                  </p>
                </div>
              </div>
              <div className="border my-3"></div>
              <div className="d-flex justify-content-between ">
                <div className="col-7 d-flex justify-content-center align-items-start flex-column">
                  <p className="mb-2 booking-font">
                    <i className="fa-regular fa-calendar-check main-color me-2"></i>
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-muted mb-2 booking-font">
                    <i className="fa-solid fa-arrows-rotate main-color me-2"></i>
                    {booking.description}
                  </p>
                  <p className="mb-0 booking-font">
                    <i className="fa-solid fa-user main-color me-2"></i>
                    {booking.handymanName}
                  </p>
                </div>
                <div className="col-3 text-end">
                  <span className="mb-0 booking-font ">
                    <i className="fa-regular fa-clock main-color me-2"></i>
                    {formatTime(booking.time).split("-")}
                  </span>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-between align-items-center mt-3">
                <button
                  className="btn btn-outline-danger "
                  onClick={() => handleOnRefuse(booking.id)}
                >
                  Refuse
                </button>
                <button
                  className="btn contact-btn "
                  onClick={() => handleOnComplited(booking.id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default NewRequest;
