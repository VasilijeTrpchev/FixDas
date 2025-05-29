const Features = () => {
  return (
    <div className="container mt-5">
      <div className="col-md-12 d-flex flex-column flex-md-row justify-content-center align-items-center">
        <div className="col-12 col-md-6">
          <div className="row mt-5">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <h2 className="text-center mb-5 display-4 fw-bold">
                Instant Messaging für mühelose Buchungen
              </h2>
            </div>
            <div className="text-center">
              <img
                className="img-fluid"
                src="/HomepageFeatures/iphone-mockup.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="row d-flex flex-md-column mt-5">
            <div className="col-12 d-flex  flex-column justify-content-center align-items-center ">
              <div>
                <img src="/HomepageFeatures/checkmark-2.svg" alt="" />
              </div>
              <h5 className="pt-3">Beschreiben Sie Ihr Projekt</h5>
              <p className="text-center mb-0">
                Teilen Sie die Details des Auftrags und Ihre Wünsche mit.
              </p>
            </div>
            <div className="col-12 d-flex  flex-column justify-content-center align-items-center my-5">
              <div>
                <img src="/HomepageFeatures/checkmark-1.svg" alt="" />
              </div>
              <h5 className="pt-3 text-center">
                Stellen Sie Fragen & Senden Sie Fotos
              </h5>
              <p className="text-center mb-0">
                Klären Sie offene Fragen und senden Sie Fotos für ein besseres
                Verständnis.
              </p>
            </div>
            <div className="col-12 d-flex  flex-column justify-content-center align-items-center">
              <div>
                <img src="/HomepageFeatures/checkmark-3.svg" alt="" />
              </div>
              <h5 className="pt-3">Bestätigen & Buchen</h5>
              <p className="text-center mb-0">
                Finalisieren Sie die Details und vereinbaren Sie sofort einen
                Termin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
