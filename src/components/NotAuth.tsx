import { Link } from "react-router-dom";

const NotAuth = () => {
  return (
    <div className="container">
      <div className="row mt-5 ">
        <div className="col-12 text-center">
          <h1>Please Sign-in first </h1>
          <Link className="btn btn-outline-primary me-3" to={"/signIn"}>
            Sign-in Page
          </Link>
          <Link className="btn btn-outline-warning" to={"/"}>
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotAuth;
