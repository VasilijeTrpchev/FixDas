import { Link, useNavigate, useParams } from "react-router-dom";
import "./ProfileHandyman.css";
import { useEffect, useState } from "react";
import { AvailableHandyman } from "../../interfaces/Interfaces";
import useContactHandyman from "../../hooks/useContactHandyman";
import LoadingSpinner from "../../components/LoadingSpinner";
import BookMe from "./BookMe";
import { getAuth } from "firebase/auth";
import NavbarLogged from "../navbarLogged/NavbarLogged";

const ProfileHandyman = () => {
  const authUser = getAuth().currentUser;
  const navigate = useNavigate();
  const { userToChatWith } = useParams();
  const { handleContactClick } = useContactHandyman();
  const [handymanProfile, setHandymanProfile] = useState<AvailableHandyman>();
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const fetchHandymanProfile = async () => {
      setIsLoading(true);

      const res = await fetch("http://localhost:3001/availableHandyman");
      const resHandymen = await res.json();
      const filtered = resHandymen.find(
        (h: AvailableHandyman) =>
          h.user.toLowerCase() === userToChatWith?.toLowerCase()
      );

      setHandymanProfile(filtered);
      setIsLoading(false);
    };
    fetchHandymanProfile();
  }, [userToChatWith]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (!handymanProfile) {
    return (
      <div className="container text-center mt-5">
        <p>Handyman not found</p>
        <Link className="btn btn-secondary mt-3" to="/homepageLogged">
          Back to Homepage
        </Link>
      </div>
    );
  }

  const averageRating =
    handymanProfile?.kundeFeedback?.length > 0
      ? handymanProfile.kundeFeedback.reduce(
          (acc, feedback) => acc + feedback.kundeRating,
          0
        ) / handymanProfile.kundeFeedback.length
      : 0;
  return (
    <>
      {isBooking ? (
        <BookMe
          handymanProfile={handymanProfile}
          setIsBooking={setIsBooking}
          availableDates={handymanProfile.availableToBook}
        />
      ) : (
        <>
          <div className="container with-bottom-padding">
            <div className="row d-md-flex  align-items-md-center">
              <div className="col-12  mt-3">
                <Link
                  className="text-decoration-none text-dark"
                  to={"/homepageLogged"}
                >
                  <i className="fa-solid fa-chevron-left cursor-pointer"></i>

                  <span className="ms-2">Go Back</span>
                </Link>
              </div>
              <div className="col-12 col-md-6 my-4">
                <div className="profile-img-container">
                  <img className="" src={handymanProfile?.img} alt="" />
                </div>
              </div>
              <div className="col-12 col-md-6 justify-content-md-center align-items-md-center d-md-flex flex-md-column">
                <div className="col-12 col-md-8">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="pe-1 fw-bold mb-0">
                        {handymanProfile?.user}
                      </p>
                      <span>
                        <img src="/icons/verified-icon.svg" alt="" />
                      </span>
                    </div>
                    <div>
                      <span className="badge bg-success available-badge p-2 ">
                        Now Available
                      </span>
                    </div>
                  </div>
                  <div>
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
                  </div>
                </div>
                <div className="col-12 col-md-8 my-2">
                  {handymanProfile?.specialty?.map((spec) => (
                    <span
                      className="badge specialty-badge  me-1 p-2 "
                      key={spec}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <div className="col-12 col-md-8">
                  <p className="mb-1">
                    <span>
                      <i className="fa-solid fa-location-dot me-2 show-profile-text"></i>
                    </span>
                    {handymanProfile?.city}
                  </p>
                </div>
                <div className="col-12 col-md-8">
                  <i className="fa-solid fa-briefcase show-profile-text"></i>
                  <span className="ps-2">20 Completed Requests</span>
                </div>
                <div className="col-12 col-md-8 my-3 d-flex justify-content-md-start justify-content-center gap-1 mx-auto mx-md-0">
                  <div className="col-6">
                    <button
                      className="btn contact-btn w-100 "
                      onClick={() => handleContactClick(handymanProfile)}
                    >
                      Contact
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn contact-btn w-100"
                      onClick={() => {
                        if (!authUser) navigate("/notAuth");
                        setIsBooking(true);
                      }}
                    >
                      Book me!
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 d-md-flex justify-content-md-between align-items-md-start p-md-3 mt-3">
                <div className="col-md-6">
                  <h5>About me</h5>
                  <p>{handymanProfile.description}</p>
                </div>

                <div className="col-md-6">
                  <h5 className="mt-4 mt-md-0">Services description</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fuga, odit! Maiores rem aspernatur dolorem voluptatibus,
                    autem porro accusamus eum esse pariatur commodi odio a animi
                    repellendus error iure odit fugiat.
                  </p>
                </div>
              </div>
              <div className="col-12 my-3">
                <h5>Completed jobs</h5>
                <div className="scroll-container">
                  {handymanProfile.finishedJobsImgs.map((imgs, index) => (
                    <div className="scroll-card " key={index}>
                      <div className="profile-img-container">
                        <img src={imgs} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h5 className="my-5">Customer Feedback</h5>
            <div className="row row-gap-4 p-2">
              {handymanProfile.kundeFeedback.map((feedback) => {
                return (
                  <div
                    key={feedback.id}
                    className="col-12 col-md-6 col-lg-4 shadow p-2 "
                  >
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="col-8 d-flex justify-content-start align-items-center">
                        <img
                          loading="lazy"
                          className="feedback-img"
                          src={feedback.kundeImg}
                          alt="img-kunde"
                        />
                        <p className="ps-2 mb-0 fw-bold">
                          {feedback.kundeName}
                        </p>
                      </div>
                      <div className="col-4 mb-0 text-center show-profile-text">
                        {feedback.kundeCity}
                      </div>
                    </div>
                    <div className="my-2">
                      {"⭐".repeat(feedback.kundeRating)}
                    </div>
                    <p>{feedback.kundeComment}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <NavbarLogged />
        </>
      )}
    </>
  );
};

export default ProfileHandyman;
