import { useState } from "react";
import "./SearchAndFilterHandymen.css";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (e: React.KeyboardEvent<HTMLElement>) => void;
  onApplyFilters: (selectedCategories: string[], zipCode: string) => void;
}

const categories = [
  "Plumbing",
  "Electric",
  "Painting",
  "Home Repairing",
  "Gardening",
  "Carpenting",
  "Roofing",
];

const SearchAndFilterHandymen = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  onApplyFilters,
}: SearchBarProps) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchedZipCode, setSearchedZipCode] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleOnChangeZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedZipCode(e.currentTarget.value);
  };
  const handleApplyFilters = () => {
    onApplyFilters(selectedCategories, searchedZipCode.trim());
    setShowFilter(false);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSearchedZipCode("");
  };
  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text custom-icon cursor-pointer">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0 border-end-0"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          onKeyDown={onSearch}
          value={searchTerm}
        />
        <span className="input-group-text custom-icon cursor-pointer">
          <i
            className="fa-solid fa-sliders"
            onClick={() => setShowFilter(true)}
          ></i>
        </span>
      </div>
      {/* Filter Panel */}
      {showFilter && (
        <div className=" filter-overlay">
          <div className="filter-content p-4">
            <div className="col-12 text-end pb-2">
              <i
                className="fa-solid fa-xmark cursor-pointer"
                onClick={() => setShowFilter(false)}
              ></i>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Filter</h4>
              <p
                className="text-primary cursor-pointer mb-0"
                onClick={handleResetFilters}
              >
                Reset all
              </p>
            </div>
            <h6 className="text-start text-secondary">Location</h6>
            <div className="col-12 my-3">
              <button className="contact-btn btn w-50 ">Phone prefix</button>
              <button
                disabled
                className="contact-btn btn bg-light text-dark w-50"
              >
                Distance
              </button>
              <input
                className="form-control mt-2"
                type="number"
                placeholder="Zip code"
                onChange={handleOnChangeZipCode}
                value={searchedZipCode}
              />
            </div>
            <h6 className="text-start text-secondary mb-3">Type of service</h6>
            <div className="col-12 d-md-flex flex-md-wrap">
              {categories.map((category) => (
                <div
                  key={category}
                  className="col-12 col-md-3  justify-content-start align-items-center d-flex"
                >
                  <div className="form-check pb-2 ">
                    <label
                      className="form-check-label "
                      htmlFor={`cat-${category}`}
                    >
                      {category}
                    </label>

                    <input
                      className="form-check-input cursor-pointer"
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      id={`cat-${category}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="col-12">
              <button
                className="btn contact-btn w-100 mt-3"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchAndFilterHandymen;
