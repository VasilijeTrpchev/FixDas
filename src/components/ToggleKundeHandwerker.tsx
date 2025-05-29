import { useState } from "react";

const ToggleKundeHandwerker = () => {
  const [isKunde, setIsKunde] = useState(true);
  if (!isKunde) {
    window.location.href = "/handwerker";
  }

  const toggleKunde = () => {
    setIsKunde(!isKunde);
  };

  return (
    <div className="container mt-5">
      <div className="row mt-4">
        <div className="col-5  d-flex justify-content-center align-items-center p-0 ">
          <h6 className="mb-0">Für Handwerker</h6>
        </div>
        <div className="col-2  d-flex justify-content-center align-items-center p-0 ">
          <label className="switch" onChange={toggleKunde}>
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="col-5 d-flex justify-content-center align-items-center  p-0 ">
          <h6 className="mb-0">Für Kunden</h6>
        </div>
      </div>
    </div>
  );
};

export default ToggleKundeHandwerker;
