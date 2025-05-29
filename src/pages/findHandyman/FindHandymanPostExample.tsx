const FindHandymanPostExample = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center my-5 p-0">
            <h2 className="text-center position-relative custom-underline mb-5 display-4 fw-bold">
              Are you looking for the right Craftsman?
            </h2>
            <p>
              Let me know how to help you - publish a free advertisement now!
            </p>
          </div>
          {/* card hardcoded */}
          <div className="col-12 col-md-6 mx-md-auto">
            <div className=" card mb-3 shadow-sm">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-start">
                    <img
                      src="/HomepageValueProposition/avatar-1.png"
                      className="postCard-img img-fluid"
                    />
                    <div className="ms-3">
                      <h6 className="fw-bold mb-1">Anna Mueller</h6>
                      <span className="text-muted">Trustworthy</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <span className="badge bg-danger urgent-badge me-2">
                      Urgent
                    </span>
                    <i className="fa-regular fa-bookmark postCard-fav-icon"></i>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-3">Repair a leaky tube</h6>
                    <p className="muted text-secondary mb-3">3 days ago</p>
                  </div>
                  <div className="border-top border-muted border-2 mb-2"></div>
                  <p className="mb-2 postCard-description">
                    Localize the source of the leak, place the water supply from
                    ...
                  </p>
                </div>

                <div className="d-flex align-items-center mb-2 text-muted">
                  <i className="fa-solid fa-location-dot me-2 text-primary"></i>
                  <span>Beethovenstraße 21, 85049 Ingolstadt</span>
                </div>

                <div className="text-end mb-3">
                  <span className="text-primary postCard-map-link">
                    Show on the map
                  </span>
                </div>

                <div className="border-top border-muted border-2 my-3"></div>

                <div className="d-flex justify-content-end">
                  <button className="btn postCard-contact-btn">Contact</button>
                </div>

                <div className="text-center mt-3">
                  <i className="fa-solid fa-chevron-down text-secondary"></i>
                </div>
              </div>
            </div>
            <div className="col-12 text-center my-5 ">
              <button className="btn text-dark seeMore-btn w-100 ">
                Post request
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FindHandymanPostExample;
