import { useEffect, useState } from "react";
import { TopRatedHandyman } from "../../../interfaces/Interfaces";
import HandymanCard from "./HandymanCard";
import "./TopHandymans.css";
import { useNavigate } from "react-router-dom";

const TopHandymans = () => {
  const [topHandymans, setTopHandymans] = useState<TopRatedHandyman[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTopHandymans = async () => {
      const response = await fetch(
        "https://api-fixdas.onrender.com/topRatedHandymen"
      );
      const topHandymans = await response.json();
      setTopHandymans(topHandymans);
    };
    fetchTopHandymans();
  }, []);
  return (
    <div className="container mt-5">
      <div className="row ">
        <>
          <h2 className="mb-4 text-center">Top Rated Handwerker</h2>
          <div className="scroll-container">
            {topHandymans.map((handyman) => (
              <HandymanCard handyman={handyman} key={handyman.id} />
            ))}
          </div>
        </>
      </div>
      <div className="col-12 col-md-3 mx-md-auto text-center p-0 mt-4 ">
        <button
          type="button"
          className="btn  btn-outline-warning banner-btn-r w-100"
          onClick={() => navigate("/findHandyman")}
        >
          Hausmeister Finden
        </button>
      </div>
    </div>
  );
};

export default TopHandymans;
