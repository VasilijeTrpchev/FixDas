import "./Categories.css";

export default function Categories() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center position-relative custom-underline mb-5 display-4 fw-bold">
            Warum Menschen uns mögen
          </h2>
        </div>
      </div>
      <div className="row gap-3 ps-3">
        <div className="col-12 d-flex justify-content-center align-items-center ">
          <div className="pe-3">
            <i className="fa-solid fa-circle-check text-primary"></i>
          </div>
          <p className="mb-0">Kalenderbuchung und einfache Kommunikation.</p>
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div className="pe-3">
            <i className="fa-solid fa-circle-check text-primary"></i>
          </div>
          <p className="mb-0">Zertifizierte Profis für höchste Qualität.</p>
        </div>
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div className="pe-3">
            <i className="fa-solid fa-circle-check text-primary"></i>
          </div>
          <p className="mb-0">
            Verfügbare Handwerker für dringende Reparaturen.
          </p>
        </div>
      </div>

      {/* categories */}
      <div className="row d-flex justify-content-center align-items-center mt-5 row-gap-3 row-gap-lg-5">
        <h2 className="text-center my-4">Wir decken alles ab</h2>
        <div className="col-4 ">
          <div className="card p-1 text-center categorie-container">
            <img
              src="/categories/categorie-1.svg"
              className="image-fluid w-100 h-100 "
              alt="..."
            />
            <p className="mb-0 categorie-text pt-2">Construction</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-1 text-center categorie-container">
            <img
              src="/categories/categorie-2.svg"
              className="image-fluid w-100 h-100 "
              alt="..."
            />
            <p className="mb-0 categorie-text pt-2 ">Carpenter</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-1  text-center categorie-container">
            <img
              src="/categories/categorie-3.svg"
              className="image-fluid w-100 h-100 "
              alt="..."
            />
            <p className="mb-0 categorie-text pt-2 ">Assembly</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-1  text-center categorie-container">
            <img
              src="/categories/categorie-4.svg"
              className="image-fluid w-100 h-100 "
              alt="..."
            />
            <p className="mb-0 categorie-text pt-2 ">Cleaning</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-1  text-center categorie-container">
            <img
              src="/categories/categorie-5.svg"
              className="image-fluid w-100 h-100 "
              alt="..."
            />
            <p className="mb-0 categorie-text pt-2 ">Home repair</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-1 text-center categorie-container">
            <img
              src="/categories/categorie-6.svg"
              className="image-fluid w-100 h-100 "
              alt="..."
            />
            <p className="mb-0 categorie-text pt-2 ">A/C</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-1 text-center categorie-container">
            <img
              src="/categories/categorie-7.svg"
              className="image-fluid w-100 h-100 "
              alt="..."
            />
            <p className="mb-0 categorie-text pt-2 ">Electrician</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-1 text-center categorie-container">
            <img
              src="/categories/categorie-8.svg"
              className="image-fluid w-100 h-100 "
              alt="..."
            />
            <p className="mb-0 categorie-text pt-2 ">Painter</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card p-1 text-center categorie-container">
            <img
              src="/categories/categorie-9.svg"
              className="image-fluid w-100 h-100 "
              alt="..."
            />
            <p className="mb-0 categorie-text pt-2 ">Windows</p>
          </div>
        </div>
      </div>
    </div>
  );
}
