import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex justify-content-around justify-content-md-center align-items-center  my-5 ">
          <img className="ms-4" src="/logo.png" alt="" />
          <h4 className="ms-md-4">Mein Handwerker</h4>
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center text-center flex-wrap">
          <div className="col-4 text-secondary ">
            <p>Lorem</p>
          </div>
          <div className="col-4 text-secondary">
            <p>Lorem</p>
          </div>
          <div className="col-4 text-secondary ">
            <p>Lorem</p>
          </div>
          <div className="col-4 text-secondary ">
            <p>Lorem</p>
          </div>
          <div className="col-4 text-secondary ">
            <p>Lorem</p>
          </div>
        </div>

        <div className="col-12 mt-5 d-flex justify-content-between justify-content-md-around align-items-center ">
          <div className="text-center ">
            <Link
              to={"https://facebook.com/"}
              target="_blank"
              className="text-decoration-none text-secondary footer-icon d-flex align-items-center justify-content-center"
            >
              <i className="fa-brands fa-facebook-f fa-2x"></i>
            </Link>
          </div>
          <div className="text-center">
            <Link
              to={"https://x.com/"}
              target="_blank"
              className="text-decoration-none text-secondary footer-icon d-flex align-items-center justify-content-center"
            >
              <i className="fa-brands fa-twitter fa-2x"></i>
            </Link>
          </div>
          <div className="text-center">
            <Link
              to={"https://instagram.com/"}
              target="_blank"
              className="text-decoration-none text-secondary footer-icon d-flex align-items-center justify-content-center"
            >
              <i className="fa-brands fa-instagram fa-2x"></i>
            </Link>
          </div>
          <div className="text-center">
            <Link
              to={"https://linkedin.com/"}
              target="_blank"
              className="text-decoration-none text-secondary footer-icon d-flex align-items-center justify-content-center"
            >
              <i className="fa-brands fa-linkedin-in fa-2x"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center my-4">
          <div className="border  border-muted  my-4 "></div>
          <p className="text-secondary ">
            Copyright © 2025 Mein Hausmaister All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
