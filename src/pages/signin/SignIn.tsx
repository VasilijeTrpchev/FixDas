import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth, provider } from "../../firebase/firebase-config";

const cookies = new Cookies();

const SignIn = () => {
  const [signedInAs, setSignedInAs] = useState("");

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    cookies.set("auth-token", result.user.refreshToken);

    navigate("/homepageLogged");
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <Link to={"/"} className="sign-in-logo">
            <img className="" src={"./icons/big-logo.png"} alt="logo" />
          </Link>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-center align-items-center gap-3   gap-md-5">
          <div className="text-center">
            <Link
              to={"/signin"}
              className={`register-as  ${
                signedInAs === "asCustomer" ? "register-as-active" : ""
              }`}
              onClick={() => setSignedInAs("asCustomer")}
            >
              Register as Customer
            </Link>
          </div>
          <div className="text-center">
            <Link
              to={"/handwerker-register"}
              className={`register-as  ${
                signedInAs === "asHandwerker" ? "register-as-active" : ""
              }`}
              onClick={() => setSignedInAs("asHandwerker")}
            >
              Register as Handwerker
            </Link>
          </div>
        </div>
        <div className="col-12 mx-auto">
          <div className="border border-bottom  mx-auto mt-3"></div>
        </div>
      </div>
      <div className="row text-center align-items-md-center gap-3 d-md-flex flex-md-column  mt-5">
        <div className="col-12 col-md-6 ">
          <button
            className="sign-in-btn d-flex flex-row justify-content-around justify-content-md-center gap-md-3 "
            onClick={signInWithGoogle}
          >
            <img src={"./icons/google-icon.png"} loading="lazy" alt="" />
            Continue with Google
          </button>
        </div>
        <div className="col-12 col-md-6">
          <button className="sign-in-btn d-flex flex-row justify-content-around justify-content-md-center gap-md-3 ">
            <img src={"./icons/facebook-icon.png"} loading="lazy" alt="" />
            Continue with Facebook
          </button>
        </div>
        <div className="col-12 col-md-6">
          <button className="sign-in-btn d-flex flex-row justify-content-around justify-content-md-center gap-md-3 ">
            <img src={"./icons/apple-icon.png"} loading="lazy" alt="" />
            Continue with Apple
          </button>
        </div>
        <div className="col-12 col-md-6">
          <button className="sign-in-btn d-flex flex-row justify-content-around justify-content-md-center gap-md-3 ">
            <img src={"./icons/mail-icon.png"} loading="lazy" alt="" />
            Continue with E-mail
          </button>
        </div>
      </div>

      <div className="col-12 col-md-6 mx-md-auto mt-5">
        <button
          type="button"
          className="btn p-2 fs-5  btn-outline-warning banner-btn-r w-100"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already an account ?
          <Link to={"/login"} className="login-link ps-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
