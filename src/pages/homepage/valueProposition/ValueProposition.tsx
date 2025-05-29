import { useNavigate } from "react-router-dom";
import "./ValueProposition.css";
const ValueProposition = () => {
  const navigate = useNavigate();

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-12 ">
          <h2 className="text-center position-relative custom-underline mb-5 display-4 fw-bold">
            Finde und buche zuverlässige Handwerker
          </h2>
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center  mt-1 mx-auto">
          <div className="avatar-wrapper">
            <img src="/HomepageValueProposition/avatar-1.png" alt="" />
          </div>
          <div className="avatar-wrapper">
            <img src="/HomepageValueProposition/avatar-2.png" alt="" />
          </div>
          <div className="avatar-wrapper">
            <img src="/HomepageValueProposition/avatar-3.png" alt="" />
          </div>
          <div className="avatar-wrapper">
            <img src="/HomepageValueProposition/avatar-4.png" alt="" />
          </div>
          <div className="avatar-wrapper">
            <img src="/HomepageValueProposition/avatar-5.png" alt="" />
          </div>
        </div>
        <p className="text-center mb-0 mt-3">
          Schließe dich über 10.000 zufriedenen Haushalten und Unternehmen an,
          die uns vertrauen, um erfahrene Profis zu finden. Chatten, planen und
          erledigen – alles an einem Ort.
        </p>
      </div>
      <div className="col-12 col-md-5 mx-md-auto text-center p-0 mt-4 ">
        <button
          type="button"
          className="btn  btn-outline-warning banner-btn-r w-100"
          onClick={() => navigate("/signIn")}
        >
          Jetzt anmelden
        </button>
      </div>
    </div>
  );
};

export default ValueProposition;
