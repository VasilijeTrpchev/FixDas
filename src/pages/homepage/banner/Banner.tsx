import { useNavigate } from "react-router-dom";
import "./Banner.css";
import { useState } from "react";
import ToggleKundeHandwerker from "../../../components/ToggleKundeHandwerker";
import SearchAndFilterHandymen from "../../../components/SearchAndFilterHandymen";

export default function Banner() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams();

      params.set("q", searchTerm);
      navigate(`/findHandyman?${params.toString()}`);
      setSearchTerm("");
    }
  };

  const handleApplyFilters = (categories: string[], zip: string) => {
    const params = new URLSearchParams();

    if (categories.length > 0) {
      params.set("category_like", categories.join(","));
    }
    if (zip) {
      params.set("zipCode", zip);
    }
    navigate(`/findHandyman?${params.toString()}`);
  };
  return (
    <>
      <div className="container">
        <ToggleKundeHandwerker />

        <h1 className="text-center mt-5 mb-3">
          Handwerker leicht <i>gemacht</i>
        </h1>

        <h3 className="lead text-center mb-5">
          Alle Dienstleistungen, die Sie brauchen, an einem Ort.
        </h3>

        <div className="row  d-md-none">
          <div className="col-12 ">
            <div className="banner-img-container">
              <img
                src="./banner/banner1.png"
                alt=""
                className="ms-auto me-5 d-block"
              />
              <span className="span-description1">Jetzt verfügbar</span>
            </div>
          </div>
        </div>
        <div className="row my-2 d-md-none">
          <div className="col-12">
            <div className="banner-img-container">
              <img
                src="./banner/banner2.png"
                alt=""
                className="ms-4 me-auto d-block"
              />
              <span className="span-description2">Reparieren</span>
            </div>
          </div>
        </div>
        <div className="row d-md-none">
          <div className="col-12">
            <div className="banner-img-container">
              <img
                src="./banner/banner3.png"
                alt=""
                className="ms-auto me-5 d-block"
              />
              <span className="span-description3">
                <i className="fa-solid fa-star text-warning"></i> 4.6
              </span>
            </div>
          </div>
        </div>

        <div className="row mt-3 d-flex justify-content-around">
          <div className="col-5   text-center p-0">
            <button type="button" className="btn banner-btn-l w-100">
              Anfrage Posten
            </button>
          </div>
          <div className="col-5   text-center  p-0">
            <button
              type="button"
              className="btn banner-btn-r  w-100"
              onClick={() => navigate("/findHandyman")}
            >
              Hausmeister Finden
            </button>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12 text-center col-md-11 mx-md-auto px-0">
            <SearchAndFilterHandymen
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
              onApplyFilters={handleApplyFilters}
            />
          </div>
        </div>
      </div>
    </>
  );
}
