import { TopRatedHandyman } from "../../../interfaces/Interfaces";
import "./TopHandymans.css";

const HandymanCard = ({ handyman }: { handyman: TopRatedHandyman }) => {
  return (
    <div className="scroll-card">
      <div
        className={`bg-${handyman.specialtyColorBadge} text-center text-white p-2 `}
      >
        <h6 className="mb-0">{handyman.specialty}</h6>
      </div>
      <div>
        <img
          loading="lazy"
          src={handyman.img}
          alt={handyman.user}
          className="img-fluid "
        />
      </div>
      <div className="text-start p-2">
        <p className="fw-bold">{handyman.user}</p>
        <div className="city-badge d-inline-flex align-items-center px-2 py-1 rounded bg-transparent border border-1 border-secondary ">
          <i className="fa-solid fa-location-dot me-2"></i>
          {handyman.city}
        </div>
        <p className="mb-0 pt-3">
          <strong>Rating:</strong> {"⭐".repeat(handyman.rating)}
        </p>
      </div>
    </div>
  );
};

export default HandymanCard;
