import { useState } from "react";
import { UserInfo } from "../../interfaces/Interfaces";

const EditingProfile = ({
  userInfo,
  setIsEditingProfile,
  setUserInfo,
}: {
  userInfo: UserInfo;
  setIsEditingProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
}) => {
  const [name, setName] = useState(userInfo.currUserName || "");
  const [email, setEmail] = useState(userInfo.currUserEmail || "");
  const [city, setCity] = useState(userInfo.currUserCity || "");
  const [phone, setPhone] = useState(userInfo.currUserPhone || "");
  const [photoUrl, setPhotoUrl] = useState(userInfo.currUserPhotoUrl || "");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingCity, setIsEditingCity] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingPhotoUrl, setIsEditingPhotoUrl] = useState(false);
  const handlePhotoUrlSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/loggedUser/${userInfo.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ photoUrl }),
        }
      );
      if (!res.ok) throw new Error("Failed to update photo URL");
      const updatedUserPhoto = { ...userInfo, currUserPhotoUrl: photoUrl };
      setUserInfo(updatedUserPhoto);
      setIsEditingPhotoUrl(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleNameSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/loggedUser/${userInfo.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!res.ok) throw new Error("Failed to update name");
      setName(name);
      setIsEditingName(false);
      const updatedUserName = {
        ...userInfo,
        currUserName: name,
      };
      setUserInfo(updatedUserName);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEmailSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/loggedUser/${userInfo.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (!res.ok) throw new Error("Failed to update email");
      setEmail(email);
      setIsEditingEmail(false);
      const updatedUserEmail = { ...userInfo, currUserEmail: email };
      setUserInfo(updatedUserEmail);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCitySave = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/loggedUser/${userInfo.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ city }),
        }
      );
      if (!res.ok) throw new Error("Failed to update city");
      setCity(city);
      setIsEditingCity(false);
      const updatedUserCity = { ...userInfo, currUserCity: city };
      setUserInfo(updatedUserCity);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhoneSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/loggedUser/${userInfo.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone }),
        }
      );
      if (!res.ok) throw new Error("Failed to update phone");
      setPhone(phone);
      setIsEditingPhone(false);
      const updatedUserPhone = { ...userInfo, currUserPhone: phone };
      setUserInfo(updatedUserPhone);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container with-bottom-padding">
      <div className="row pt-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div
            onClick={() => {
              setIsEditingProfile(false);
            }}
          >
            <i className="fa-solid fa-chevron-left cursor-pointer"></i>
          </div>
          <h4 className="mb-0 main-color">Edit Account</h4>
          <i className="fa-regular fa-bell text-primary fa-2x"></i>
        </div>
        <div className="col-12 d-flex justify-content-center mt-5">
          <div className="edit-img">
            <img
              className="clientProfile-img "
              src={photoUrl || userInfo.currUserPhotoUrl || "/logo.png"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/logo.png";
              }}
              alt="Profile"
            />
            <div
              className="edit-overlay fw-bold "
              onClick={() => setIsEditingPhotoUrl(true)}
            >
              {!isEditingPhotoUrl ? "Edit" : ""}
            </div>
          </div>
        </div>
        <div className="col-12 text-center mt-3">
          {isEditingPhotoUrl && (
            <>
              <input
                id="photoUrl"
                type="text"
                placeholder="Enter Image URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="form-control mb-1"
              />
              <button
                className="btn btn-sm btn-primary"
                onClick={handlePhotoUrlSave}
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
      <div className="row mt-5 d-md-flex flex-md-row row-gap-md-4 ">
        <div className="col-12 d-md-none">
          <div className="border my-3"></div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <p className="mb-0 ">
              Full Name <span className="main-color">*</span>
            </p>
            {!isEditingName ? (
              <div className="text-secondary">{name}</div>
            ) : (
              <input
                type="text"
                name={name}
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              ></input>
            )}
          </div>
          <button
            className="btn edit-btn"
            onClick={
              !isEditingName ? () => setIsEditingName(true) : handleNameSave
            }
          >
            {!isEditingName ? "Edit" : "Save"}
          </button>
        </div>
        <div className="col-12 d-md-none">
          <div className="border my-3"></div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <p className="mb-0 ">
              Email Address <span className="main-color">*</span>
            </p>
            {!isEditingEmail ? (
              <div className="text-secondary">{userInfo.currUserEmail}</div>
            ) : (
              <input
                type="text"
                name={email}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              ></input>
            )}
          </div>
          <button
            className="btn edit-btn"
            onClick={
              !isEditingEmail ? () => setIsEditingEmail(true) : handleEmailSave
            }
          >
            {!isEditingEmail ? "Edit" : "Save"}
          </button>
        </div>
        <div className="col-12 d-md-none">
          <div className="border my-3"></div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <p className="mb-0 ">
              Location (city) <span className="main-color">*</span>
            </p>
            {!isEditingCity ? (
              <div className="text-secondary">{userInfo.currUserCity}</div>
            ) : (
              <input
                type="text"
                name={city}
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
              ></input>
            )}
          </div>
          <button
            className="btn edit-btn"
            onClick={
              !isEditingCity ? () => setIsEditingCity(true) : handleCitySave
            }
          >
            {!isEditingCity ? "Edit" : "Save"}
          </button>
        </div>
        <div className="col-12 d-md-none">
          <div className="border my-3"></div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <p className="mb-0 ">
              Phone Number <span className="main-color">*</span>
            </p>
            {!isEditingPhone ? (
              <div className="text-secondary">{userInfo.currUserPhone}</div>
            ) : (
              <input
                type="tel"
                name={phone}
                value={phone}
                onChange={(e) => setPhone(e.currentTarget.value)}
              ></input>
            )}
          </div>
          <button
            className="btn edit-btn"
            onClick={
              !isEditingPhone ? () => setIsEditingPhone(true) : handlePhoneSave
            }
          >
            {!isEditingPhone ? "Edit" : "Save"}
          </button>
        </div>
        <div className="col-12 d-md-none">
          <div className="border my-3"></div>
        </div>
        <div className="col-12 col-md-6 col-lg-4 d-flex flex-column justify-content-start  d-lg-none">
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              name="notify-email"
              id="notify-email"
            />
            <label className="ms-2" htmlFor="notify-email">
              Notify via Email
            </label>
          </div>
          <small className="mb-0 ps-4 text-muted">
            Get notified via email when something happens
          </small>
        </div>
      </div>
    </div>
  );
};

export default EditingProfile;
