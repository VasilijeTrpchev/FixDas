import { useNavigate } from "react-router-dom";
import { AvailableHandyman } from "../../interfaces/Interfaces";
import NavbarLogged from "../navbarLogged/NavbarLogged";
import { useState } from "react";
import { getAuth } from "firebase/auth";

const BookMeInfos = ({
  handymanProfile,
  setIsFurther,
  date,
  time,
}: {
  handymanProfile: AvailableHandyman;
  date: Date | null;
  time: string | null;
  setIsFurther: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [request, setRequest] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const loggedUserId = getAuth().currentUser?.uid;

  const handleSendRequest = async () => {
    const formattedDate = date ? date.toLocaleDateString("sv-SE") : null;
    const bookingPayload = {
      handymanId: handymanProfile.id,
      handymanName: handymanProfile.user,
      handymanImg: handymanProfile.img,
      loggedUserId,
      date: formattedDate,
      time,
      description: request,
      city,
      status: "ongoing",
      specialty: handymanProfile.specialty,
      coordinates: handymanProfile.coordinates,
    };

    await fetch("http://localhost:3001/bookedClients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload),
    });

    navigate("/bookings");
  };
  const averageRating =
    handymanProfile?.kundeFeedback?.length > 0
      ? handymanProfile.kundeFeedback.reduce(
          (acc, feedback) => acc + feedback.kundeRating,
          0
        ) / handymanProfile.kundeFeedback.length
      : 0;
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div
              className="d-flex justify-content-start align-items-center"
              onClick={() => {
                setIsFurther(false);
              }}
            >
              <i className="fa-solid fa-chevron-left"></i>
              <h6 className="m-0 ms-2">To Data/Time</h6>
            </div>
          </div>
        </div>
        <div className="row justify-content-lg-center">
          <div className="col-12">
            <h6 className="mt-4 mb-3">Service request</h6>
            <div className="border"></div>
          </div>
          <div className="col-12 d-flex   justify-content-center">
            <div className="col-12 col-md-6 d-flex justify-content-between mt-2">
              <p>
                {date
                  ? date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </p>
              <p>{time}</p>
            </div>
          </div>
          {/* handyman card */}
          <div className="col-12 col-md-6  col-lg-3 mt-3">
            <div className="handyman-card mb-3 mb-md-0 ">
              <div className="card-body">
                <div className="flex">
                  <div className="d-flex justify-content-between align-items-start">
                    <img
                      src={handymanProfile.img}
                      alt="Leo Hoffmann"
                      className="handyman-img img-fluid "
                    />
                    <div className="d-flex justify-content-center align-items-start">
                      <div className="d-flex flex-column justify-content-center align-items-start pe-2">
                        <h5 className="card-title mb-1 pe-1 fw-bold">
                          {handymanProfile.user}
                        </h5>
                        <p
                          className="text-primary mb-1"
                          onClick={() =>
                            navigate(
                              `/karte/${handymanProfile.coordinates.lat}/${handymanProfile.coordinates.lng}`
                            )
                          }
                        >
                          <span>
                            <i className="fa-solid fa-location-dot me-2"></i>
                          </span>
                          {handymanProfile.city}
                        </p>
                      </div>
                      <img src="/icons/verified-icon.svg" alt="" />
                    </div>

                    <span className="badge bg-success available-badge p-1">
                      Now Available
                    </span>
                  </div>

                  <div className="handyman-stars my-2">
                    {handymanProfile?.kundeFeedback?.length > 0 && (
                      <p className="mb-1">
                        <span className="text-warning">
                          {"⭐".repeat(Math.round(averageRating))}
                        </span>
                      </p>
                    )}{" "}
                    <span>
                      {handymanProfile?.kundeFeedback?.length} reviews
                    </span>
                  </div>
                  <div className="mb-2">
                    <>
                      {handymanProfile.specialty?.map((spec) => (
                        <span
                          className="badge specialty-badge  me-1 p-2 "
                          key={spec}
                        >
                          {spec}
                        </span>
                      ))}
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 p-3">
            <div className="col-12">
              <label htmlFor="description" className="fw-bold mb-1">
                Describe your request:
              </label>
              <textarea
                onChange={(e) => setRequest(e.currentTarget.value)}
                className="form-control"
                id="description"
                rows={4}
                placeholder="Enter your request here"
              ></textarea>
            </div>
            <div className="col-12 mt-3">
              <label htmlFor="address" className="fw-bold mb-1">
                Enter your City or Address here:
              </label>
              <input
                onChange={(e) => setCity(e.currentTarget.value)}
                className="form-control"
                id="address"
                type="text"
                placeholder="Address or City"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-12 col-md-6 ">
            <button
              onClick={handleSendRequest}
              className="btn contact-btn w-100 mt-4"
              disabled={!city || !request}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
      <NavbarLogged />
    </>
  );
};

export default BookMeInfos;
