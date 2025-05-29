import { signOut } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Logout = () => {
  const [logoutMessage, setLogoutMessage] = useState("");

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");

      setLogoutMessage("You have successfully logged out!");
      setTimeout(() => {
        setLogoutMessage("");
        navigate("/");
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="row mt-4">
        {logoutMessage && (
          <div className="alert alert-success" role="alert">
            {logoutMessage}
          </div>
        )}
        <div className="col-12 text-end my-2">
          <span className="pe-2">
            <i className="fas fa-sign-out-alt"></i>
          </span>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
          <div id="liveAlertPlaceholder"></div>
        </div>
      </div>
    </>
  );
};

export default Logout;
