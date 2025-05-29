import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import "./HomepageLogged.css";
import { auth } from "../../firebase/firebase-config";
import FindHandyman from "../findHandyman/FindHandyman";

const HomepageLogged = () => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName);
      }
    });
  }, []);
  return (
    <>
      <div className="container with-bottom-padding">
        <div className="row pt-4">
          <div className="col-12 d-flex justify-content-between">
            <h2 className="m-0 main-color">Hi {name},</h2>
            <i className="fa-regular fa-bell text-primary fa-2x"></i>
          </div>
          <p className="mt-3">
            Are you looking for help? Find suitable craftsmen for your needs.
            Below are the latest displays of craftsmen near you .
          </p>
        </div>
        <div className="col-12">
          <strong>Recommended listing</strong>
        </div>
        <FindHandyman />
      </div>
    </>
  );
};
export default HomepageLogged;
