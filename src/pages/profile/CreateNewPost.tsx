import { useState } from "react";
import { UserInfo } from "../../interfaces/Interfaces";

const CreateNewPost = ({
  userInfo,
  setIsCreatingNewPost,
  setUserInfo,
}: {
  userInfo: UserInfo;
  setIsCreatingNewPost: React.Dispatch<React.SetStateAction<boolean>>;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
}) => {
  const [uploadedUrl, setUploadedUrl] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState("");

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({
    category: "",
    description: "",
    city: "",
  });
  const handleSubmit = async () => {
    const newErrors = {
      category:
        category && category !== "Select Category"
          ? ""
          : "Please select a category.",
      description: description.trim() ? "" : "Please enter a description.",
      city: city.trim() ? "" : "Please enter your city or address.",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) return;

    const newPost = {
      category,
      description,
      city,
      clientImgs: uploadedUrl,
      loggedUserId: userInfo.loggedUserId,
      createdAt: new Date().toISOString(),
      status: "Urgent",
      img: userInfo.currUserPhotoUrl,
    };

    try {
      const res = await fetch(`http://localhost:3001/clientPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error("Failed to post job");
      const updatedUser = { ...userInfo, ...newPost };
      setUserInfo(updatedUser);
      setIsCreatingNewPost(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container with-bottom-padding">
      <div className="row pt-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div
            className="cursor-pointer"
            onClick={() => {
              setIsCreatingNewPost(false);
            }}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </div>
          <h4 className="mb-0 main-color">Create new post</h4>
          <img src={"/icons/notification-icon.png"} alt="" />
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 text-md-center my-md-2">
          Fill in all required fields to post a job.
        </div>
      </div>
      <div className="row d-md-flex flex-md-column justify-content-md-center align-items-md-center">
        <div className="col-12 col-md-6">
          <label className="mb-1 fw-bold" htmlFor="category">
            Select a service category: <span className="text-danger">*</span>
          </label>
          <select
            className="form-control"
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option defaultValue={"Select Category"} value="Select Category">
              Select Category
            </option>
            <option value="plumbing">Plumbing</option>
            <option value="electric">Electric</option>
            <option value="painting">Painting</option>
            <option value="home repairing">Home Repairing</option>
            <option value="gardening">Gardening</option>
            <option value="carpenting">Carpenting</option>
            <option value="roofing">Roofing</option>
          </select>
          {errors.category && (
            <div className="invalid-feedback d-block">{errors.category}</div>
          )}
        </div>

        <div className="col-12 mt-4  col-md-6">
          <label className="mb-1 fw-bold" htmlFor="description">
            Description: <span className="text-danger">*</span>
          </label>
          <textarea
            id="description"
            placeholder="Describe your problem here"
            className=" form-control"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && (
            <div className="invalid-feedback d-block">{errors.description}</div>
          )}
        </div>
        <div className="col-12 mt-4  col-md-6">
          <label className="fw-bold mb-1" htmlFor="city">
            City or Address: <span className="text-danger">*</span>
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="City or Address"
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && (
            <div className="invalid-feedback d-block">{errors.city}</div>
          )}
        </div>
        <div className="col-12 mt-4  col-md-6">
          <label className="fw-bold mb-1" htmlFor="city">
            Upload photos:
          </label>
          <div className="col-12 text-center mt-3">
            <input
              id="photoUrl"
              type="text"
              placeholder="Enter Image URL"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              className="form-control mb-1"
            />
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                if (currentUrl.trim()) {
                  setUploadedUrl([...(uploadedUrl || []), currentUrl.trim()]);
                  setCurrentUrl("");
                }
              }}
            >
              Upload
            </button>
          </div>
        </div>
        <div className="col-12 col-md-6">
          {uploadedUrl.length > 0 && (
            <div className="mt-3">
              <h6 className="fw-bold">Uploaded Images:</h6>
              <div className="">
                {uploadedUrl?.map((url, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-start  align-items-center mb-2"
                  >
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="repair-img"
                    />
                    <button
                      className="btn btn-sm btn-danger ms-3"
                      onClick={() =>
                        setUploadedUrl(
                          uploadedUrl.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="col-12 col-md-6">
          <button className="btn contact-btn w-100 mt-4" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPost;
