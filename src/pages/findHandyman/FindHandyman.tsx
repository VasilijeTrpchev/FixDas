import { useEffect, useState } from "react";
import "./FindHandyman.css";
import { AvailableHandyman } from "../../interfaces/Interfaces";
import FindHandymanCard from "./FindHandymanCard";
import { useLocation, useNavigate } from "react-router-dom";
import SearchAndFilterHandymen from "../../components/SearchAndFilterHandymen";

const FindHandyman = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const zipCodeParam = searchParams.get("zipCode") || "";
  const categoryParam = searchParams.get("category_like");

  const [searchTerm, setSearchTerm] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [availableHandyman, setAvailableHandyman] = useState<
    AvailableHandyman[]
  >([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? categoryParam.split(",") : []
  );

  const [viewHandyman, setViewHandyman] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 3;

  const fetchAvailableHandyman = async (
    pageNum: number,
    q?: string,
    categories?: string[],
    zipCode?: string
  ) => {
    if (q) {
      const url = new URL(
        `https://api-fixdas.onrender.com/availableHandyman?_limit=${limit}&_page=${pageNum}`
      );
      url.searchParams.set("q", q);
      const response = await fetch(url.toString());
      const availableHandyman = await response.json();
      setAvailableHandyman((prev) => [...prev, ...availableHandyman]);
      setPage(pageNum);
      if (availableHandyman.length < limit) {
        setHasMore(false);
      }
      return;
    }

    // Filter by categories and/or zip code
    if ((categories && categories.length > 0) || zipCode) {
      const response = await fetch(
        `https://api-fixdas.onrender.com/availableHandyman`
      );
      const all = await response.json();

      let filtered = all;

      if (categories && categories.length > 0) {
        filtered = filtered.filter((h: AvailableHandyman) =>
          h.specialty.some((cat) =>
            categories.some(
              (selected) => selected.toLowerCase() === cat.toLowerCase()
            )
          )
        );
      }

      if (zipCode) {
        filtered = filtered.filter((h: AvailableHandyman) =>
          h.zipCode?.toString().startsWith(zipCode.toString())
        );
      }

      setAvailableHandyman(filtered);
      setHasMore(false);
      setPage(1);
      return;
    }

    // Default initial fetch (first 3 handymen)
    const url = new URL(
      `https://api-fixdas.onrender.com/availableHandyman?_limit=${limit}&_page=${pageNum}`
    );
    const response = await fetch(url.toString());
    const availableHandyman = await response.json();
    setAvailableHandyman((prev) => [...prev, ...availableHandyman]);
    setPage(pageNum);
    if (availableHandyman.length < limit) {
      setHasMore(false);
    }
    return;
  };
  useEffect(() => {
    try {
      const q = query || undefined;
      const categories =
        selectedCategories.length > 0 ? selectedCategories : undefined;
      const zip = zipCodeParam || undefined;

      if (zipCodeParam) {
        setZipCode(zipCodeParam);
      }

      setAvailableHandyman([]);
      setPage(1);
      setHasMore(true);

      fetchAvailableHandyman(1, q, categories, zip);
    } catch (error) {
      console.error(error);
    }
  }, [query, zipCodeParam, categoryParam]);

  const handleViewHideHandyman = () => {
    setViewHandyman(!viewHandyman);
  };

  const handleSeemore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAvailableHandyman(
      nextPage,
      query || undefined,
      selectedCategories.length ? selectedCategories : undefined
    );
  };
  const handleSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setSelectedCategories([]);
      setAvailableHandyman([]);
      if (location.pathname === "/findHandyman" || location.pathname === "/") {
        navigate(`/findHandyman?q=${searchTerm}`, { replace: true });
      }

      if (location.pathname === "/homepageLogged") {
        navigate(`/homepageLogged?q=${searchTerm}`, { replace: true });
      }
      fetchAvailableHandyman(1, searchTerm);
      setSearchTerm("");
    }
  };

  const handleApplyFilters = async (categories: string[], zip: string) => {
    const params = new URLSearchParams();
    setSelectedCategories(categories);
    setZipCode(zip);
    fetchAvailableHandyman(1, undefined, categories, zip);
    if (location.pathname === "/findHandyman" || location.pathname === "/") {
      if (categories.length > 0) {
        params.set("category_like", categories.join(","));
      }
      if (!categories) {
        params.delete("category_like");
      }
      if (zip) {
        params.set("zipCode", zip);
      }
      if (!zip) {
        params.delete("zipCode");
      }
      navigate(`/findHandyman?${params.toString()}`);
    }
    if (location.pathname === "/homepageLogged") {
      if (categories.length > 0) {
        params.set("category_like", categories.join(","));
      }
      if (!categories) {
        params.delete("category_like");
      }
      if (zip) {
        params.set("zipCode", zip);
      }
      if (!zip) {
        params.delete("zipCode");
      }
      navigate(`/homepageLogged?${params.toString()}`);
    }
  };
  return (
    <div className="container">
      {location.pathname === "/findHandyman" && (
        <>
          <div className="mt-5">
            <h2 className="text-center my-4">Find a Handwerker</h2>
          </div>
        </>
      )}

      <div className="row my-4">
        <div className="col-12 text-center">
          <SearchAndFilterHandymen
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
            onApplyFilters={handleApplyFilters}
          />
        </div>
      </div>
      {/* available handwerker */}
      <div className="row ">
        <div className="col-12">
          <div className="col-12 d-flex justify-content-between align-items-center">
            {viewHandyman ? (
              <div className="text-secondary">
                {availableHandyman.length} results
              </div>
            ) : (
              <div> </div>
            )}
            <div className="text-secondary">
              {viewHandyman ? "Hide" : "Show"}
              <span>
                <i
                  className="fa-solid fa-chevron-down ps-1 show-handyman-icon "
                  onClick={handleViewHideHandyman}
                ></i>
              </span>
            </div>
          </div>

          {/* available handy mans */}

          <div className="border border-ligth my-3"></div>
          <div className="col-12 d-md-flex justify-content-md-start flex-md-wrap align-items-md-center">
            {viewHandyman && availableHandyman.length > 0 ? (
              availableHandyman.map((handyman) => (
                <div
                  className="col-12 col-md-6 col-lg-4 p-md-3"
                  key={handyman.id}
                >
                  <FindHandymanCard handyman={handyman} />
                </div>
              ))
            ) : (
              <p className="text-center">No available handyman</p>
            )}
          </div>
        </div>
      </div>

      <div className="col-12 text-center my-2">
        <button
          className={`btn text-dark seeMore-btn ${!hasMore ? "disabled" : ""}`}
          onClick={handleSeemore}
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default FindHandyman;
