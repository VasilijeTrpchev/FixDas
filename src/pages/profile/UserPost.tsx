import { ClientPosts } from "../../interfaces/Interfaces";
import { formatDistanceToNow } from "date-fns";
import "./Profile.css";
import { useUser } from "../../UserInfoContext/UserInfoContext";

const UserPost = ({
  post,
  onDeletePost,
}: {
  post: ClientPosts;
  onDeletePost: (id: number) => void;
}) => {
  const { userInfo: authUserInfo } = useUser();

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3 mb-md-0">
      <div className="card post-card p-3 h-100">
        <div className="row">
          <div className="col-9 col-md-8 d-flex justify-content-between align-items-center">
            <img
              className="postProfile-img"
              src={authUserInfo?.currUserPhotoUrl || "/logo.png"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/logo.png";
              }}
              alt={authUserInfo?.currUserPhotoUrl}
            />
            <h6 className="mb-0 ms-2">{authUserInfo?.currUserName}</h6>
          </div>
          <div className="col-3 col-md-4 d-flex justify-content-center align-items-center">
            <div className="badge bg-danger p-2">{post.status}</div>
          </div>
        </div>
        <div className="mt-3">
          <div className="col-12 d-flex justify-content-between align-items-center">
            <div className="col-8">
              <small className="">
                <strong>Category: </strong>
                <span className="badge specialty-badge p-2">
                  {post.category}
                </span>
              </small>
            </div>
            <div className="col-3 text-center">
              <p className="mb-0 text-secondary posted-time">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <div className="border  my-2"></div>
          <p className="">{post.description}</p>
        </div>
        <div className="d-flex ">
          <span>
            <i className="fa-solid fa-location-dot me-1 text-primary"></i>
          </span>
          <p className="city ">{post.city} </p>{" "}
        </div>
        <div className="d-flex justify-content-start  h-100 flex-wrap gap-2 mt-2 ">
          {post.clientImgs.length > 0 ? (
            post.clientImgs.map((image) => {
              return (
                <div className="post-imgs">
                  <img key={crypto.randomUUID()} src={image} alt="" />
                </div>
              );
            })
          ) : (
            <p>No repair images available</p>
          )}
        </div>
        <div className="col-12">
          <button
            className="btn btn-danger w-100 mt-3"
            onClick={() => onDeletePost(post.id)}
          >
            Remove post
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
