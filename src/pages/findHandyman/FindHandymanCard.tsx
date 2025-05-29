import { Link, useNavigate } from "react-router-dom";
import { AvailableHandyman } from "../../interfaces/Interfaces";
import "./FindHandyman.css";
import useContactHandyman from "../../hooks/useContactHandyman";
const FindHandymanCard = ({ handyman }: { handyman: AvailableHandyman }) => {
  const navigate = useNavigate();

  const { handleContactClick } = useContactHandyman();
  const averageRating =
    handyman?.kundeFeedback?.length > 0
      ? handyman.kundeFeedback.reduce(
          (acc, feedback) => acc + feedback.kundeRating,
          0
        ) / handyman.kundeFeedback.length
      : 0;
  return (
    <>
      <div className="handyman-card h-100 p-2 mb-3 mb-md-0 shadow-sm">
        <div className="card-body  d-flex">
          <div className="flex">
            <div className="d-flex justify-content-between align-items-start">
              <img
                loading="lazy"
                src={handyman.img}
                alt="Leo Hoffmann"
                className="handyman-img img-fluid "
              />
              <div className="d-flex justify-content-center align-items-start">
                <div className="d-flex flex-column justify-content-center align-items-start ">
                  <h5 className="card-title mb-1 fw-bold">{handyman.user}</h5>
                  <p
                    className="text-primary mb-1"
                    onClick={() =>
                      navigate(
                        `/karte/${handyman.coordinates.lat}/${handyman.coordinates.lng}`
                      )
                    }
                  >
                    <span>
                      <i className="fa-solid fa-location-dot pe-1"></i>
                    </span>
                    {handyman.city}
                  </p>
                </div>
                <img
                  className="ps-2"
                  loading="lazy"
                  src="/icons/verified-icon.svg"
                  alt=""
                />
              </div>

              <span className="badge bg-success available-badge p-1">
                Now Available
              </span>
            </div>

            <div className="handyman-stars my-2">
              {handyman?.kundeFeedback?.length > 0 && (
                <p className="mb-1">
                  <span className="text-warning">
                    {"⭐".repeat(Math.round(averageRating))}
                  </span>
                </p>
              )}{" "}
              <span>{handyman?.kundeFeedback?.length} reviews</span>
            </div>
            <>
              {handyman.specialty?.map((spec) => (
                <span className="badge specialty-badge  me-1 p-2 " key={spec}>
                  {spec}
                </span>
              ))}
            </>
            <p className="card-text  my-3 handyman-description">
              {handyman.description}
            </p>
          </div>
        </div>
        <div className="col-12 d-flex justify-content-between align-items-center">
          <Link
            to={`/profileHandyman/${handyman.user}`}
            className="show-profile-text"
          >
            Show profile
          </Link>
          <button
            className="btn contact-btn"
            onClick={() => handleContactClick(handyman)}
          >
            Contact
          </button>
        </div>
      </div>
      <div className="border d-md-none  border-ligth my-3"></div>
    </>
  );
};

export default FindHandymanCard;
