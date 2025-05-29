import Logout from "./Logout";
import UserPosts from "./UserPosts";
import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import EditingProfile from "./EditingProfile";
import { useUser } from "../../UserInfoContext/UserInfoContext";
import CreateNewPost from "./CreateNewPost";

const Profile = () => {
  const { userInfo: authUserInfo, setUserInfo: setAuthUserInfo } = useUser();

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isCreatingNewPost, setIsCreatingNewPost] = useState(false);
  return (
    <>
      {!authUserInfo && <LoadingSpinner />}

      {authUserInfo && isCreatingNewPost && (
        <CreateNewPost
          setIsCreatingNewPost={setIsCreatingNewPost}
          userInfo={authUserInfo}
          setUserInfo={setAuthUserInfo}
        />
      )}

      {isEditingProfile && authUserInfo && (
        <EditingProfile
          setIsEditingProfile={setIsEditingProfile}
          userInfo={authUserInfo}
          setUserInfo={setAuthUserInfo}
        />
      )}

      {!isEditingProfile && !isCreatingNewPost && authUserInfo && (
        <>
          <div className="container with-bottom-padding">
            <div className="row pt-4">
              <div className="col-12 d-flex justify-content-between">
                <h2 className="m-0 main-color">Client Account</h2>
                <i className="fa-regular fa-bell text-primary fa-2x"></i>
              </div>
            </div>
            <div className="row mt-4">
              <div className=" d-flex justify-content-end align-items-start ">
                <i
                  className="fa-solid fa-pencil me-1 text-primary cursor-pointer"
                  onClick={() => setIsEditingProfile(true)}
                ></i>
              </div>
              <div className="col-12 d-flex justify-content-around justify-content-md-center flex-md-column align-items-md-center">
                <div className=" d-flex flex-column align-items-start justify-content-center">
                  <img
                    className="clientProfile-img"
                    src={authUserInfo?.currUserPhotoUrl || "/logo.png"}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/logo.png";
                    }}
                    alt={authUserInfo.currUserName || "Profile picture"}
                  />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-start align-items-md-center gap-md-1">
                  <h6 className="mb-1 fw-bold">{authUserInfo?.currUserName}</h6>
                  <p className="mb-1 user-profile-infos">
                    {authUserInfo?.currUserEmail}
                  </p>
                  <div className="d-flex justify-content-start align-items-center mb-0">
                    <span>
                      <i className="fa-solid fa-location-dot me-2 text-primary "></i>
                    </span>
                    <p className="mb-0 user-profile-infos ps-1">
                      {authUserInfo?.currUserCity}
                    </p>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <span>
                      <i className="fa-sharp fa-solid fa-phone me-2 text-primary"></i>
                    </span>
                    <p className="mb-0 user-profile-infos">
                      {authUserInfo?.currUserPhone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12 text-md-center">
                <h5 className="mb-2">Post a new Ad</h5>
                <p className="mb-0 text-muted">
                  Need help? Quickly create a new ad to request a service.
                </p>
                <div className="col-12 col-md-6 mx-md-auto ">
                  <button
                    className="btn contact-btn w-100 mt-4"
                    onClick={() => setIsCreatingNewPost(true)}
                  >
                    Create new Post
                  </button>
                </div>

                <h5 className="mb-2 mt-4">My active posts</h5>
                <p className="mb-0 text-muted">
                  View and manage your active posts.
                </p>
              </div>
            </div>
            <UserPosts />
            <Logout />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
