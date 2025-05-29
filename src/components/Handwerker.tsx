import { Link } from "react-router-dom";

const Handwerker = () => {
  return (
    <div className="container">
      <div className="row mt-5 ">
        <div className="col-12 text-center ">
          <h1>
            This page is only for Handwerker, please sign-in/log-in as a
            Handwerker first!
          </h1>
          <Link className="btn btn-outline-info" to={"/"}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Handwerker;
