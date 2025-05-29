import { useEffect, useState } from "react";
import { NewlyJoinedHandyman } from "../../../interfaces/Interfaces";
import "./NewlyJoined.css";
import NewlyJoinedCard from "./NewlyJoinedCard";
import { useNavigate } from "react-router-dom";
const NewlyJoined = () => {
  const [newlyJoinedHandymans, setNewlyJoinedHandymans] = useState<
    NewlyJoinedHandyman[]
  >([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNewlyJoinedHandymans = async () => {
      const response = await fetch(
        "https://api-fixdas.onrender.com/newlyJoinedHandymen"
      );
      const newHandymans = await response.json();
      setNewlyJoinedHandymans(newHandymans);
    };
    fetchNewlyJoinedHandymans();
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h4 className="text-center display-4 fw-bold mb-5">
            Neu beigetreten, bereit zu <i>helfen!</i>
          </h4>
        </div>
        <div className="col-12 col-md-5 mx-auto">
          <div className="scroll-container">
            {newlyJoinedHandymans.map((newMember) => (
              <NewlyJoinedCard newMember={newMember} key={newMember.id} />
            ))}
          </div>
          <div className="col-12 col-md-6 mx-md-auto text-center p-0 mt-4 ">
            <button
              type="button"
              className="btn  btn-outline-warning banner-btn-r w-100"
              onClick={() => navigate("/findHandyman")}
            >
              Hausmeister Finden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewlyJoined;
