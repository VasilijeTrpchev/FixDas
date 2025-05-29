import {
  LoadScript,
  Autocomplete,
  GoogleMap,
  OverlayView,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import "./KarteLogged.css";
import { AvailableHandyman } from "../../interfaces/Interfaces";
import { Link, useNavigate, useParams } from "react-router-dom";
import useContactHandyman from "../../hooks/useContactHandyman";

const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const places: "places"[] = ["places"];

const KarteLogged = () => {
  const { lat, lng } = useParams();
  const latNum = Number(lat);
  const lngNum = Number(lng);

  const navigate = useNavigate();

  const [availableHandymans, setAvailableHandymans] = useState<
    AvailableHandyman[]
  >([]);
  const [map, setMap] = useState<google.maps.Map | undefined>();
  const [selectedHandyman, setSelectedHandyman] =
    useState<AvailableHandyman | null>(null);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { handleContactClick } = useContactHandyman();

  useEffect(() => {
    const fetchAvailableHandymans = async () => {
      const response = await fetch(
        "https://api-fixdas.onrender.com/availableHandyman"
      );
      const handyMans = await response.json();
      setAvailableHandymans(handyMans);
    };

    fetchAvailableHandymans();

    // get user lat,lng
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Error getting user location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (selectedHandyman && map) {
      map.panTo({
        lat: selectedHandyman.coordinates.lat,
        lng: selectedHandyman.coordinates.lng,
      });
    }
  }, [selectedHandyman, map]);

  const onPlaceChange = () => {
    if (autoCompleteRef.current && map) {
      const place = autoCompleteRef.current.getPlace();
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();

      if (lat && lng) {
        const newCenter = { lat, lng };
        map.panTo(newCenter);
        map.setZoom(15);
        navigate(`/karte/${lat}/${lng}`);
      }
    }
  };

  const onLoadMap = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  const getRouteLink = (handymanLat: number, handymanLng: number) => {
    if (userLocation) {
      return `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${handymanLat},${handymanLng}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${handymanLat},${handymanLng}`;
  };

  return (
    <div className="container">
      <LoadScript googleMapsApiKey={VITE_GOOGLE_API_KEY} libraries={places}>
        <Autocomplete
          onPlaceChanged={onPlaceChange}
          onLoad={(ref) => (autoCompleteRef.current = ref)}
        >
          <div className="input-group mb-3 mt-1">
            <span className="input-group-text custom-icon-search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 border-end-0 search-address-input"
              placeholder="Search Address"
              aria-label="Search Address"
            />
            <span className="input-group-text custom-icon-search">
              <i className="fa-solid fa-sliders"></i>
            </span>
          </div>
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={{ height: "80vh", width: "100%" }}
          center={
            latNum && lngNum
              ? { lat: latNum, lng: lngNum }
              : { lat: 52.0221, lng: 8.5279 }
          }
          zoom={10}
          onLoad={onLoadMap}
        >
          {availableHandymans.map((handyman) => {
            return (
              <OverlayView
                key={handyman.id}
                position={{
                  lat: handyman.coordinates.lat,
                  lng: handyman.coordinates.lng,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div onClick={() => setSelectedHandyman(handyman)}>
                  <div className="user-img-container">
                    <img src={handyman.img} alt={handyman.user} />
                  </div>
                  <div className="user-name">{handyman.user}</div>
                </div>
              </OverlayView>
            );
          })}
          {selectedHandyman && (
            <OverlayView
              position={{
                lat: selectedHandyman.coordinates.lat,
                lng: selectedHandyman.coordinates.lng,
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="handyman-popup-card">
                <button
                  className="popup-close-btn"
                  onClick={() => setSelectedHandyman(null)}
                >
                  ❌
                </button>
                <h5>{selectedHandyman.user}</h5>
                <div className="d-flex flex-column justify-content-center align-items-start">
                  <div className="pop-up-img-container ms-2">
                    <img
                      src={selectedHandyman.img}
                      alt={selectedHandyman.user}
                    />
                  </div>
                  <div>
                    <Link
                      to={`/profileHandyman/${selectedHandyman.user}`}
                      className="show-profile-text"
                    >
                      Show profile
                    </Link>
                  </div>
                </div>
                <p className="my-2">
                  <strong>Specialties:</strong>{" "}
                  {selectedHandyman.specialty.join(", ")}
                </p>
                <p className="mb-2">
                  <strong>City:</strong> {selectedHandyman.city}
                </p>
                <p>
                  <strong>Description: </strong>
                  {selectedHandyman.description}
                </p>
                <button
                  className="btn text-dark seeMore-btn"
                  onClick={() => handleContactClick(selectedHandyman)}
                >
                  Contact
                </button>
                <span className="ms-5 text-primary">
                  <a
                    className="a-show-route"
                    href={getRouteLink(
                      selectedHandyman.coordinates.lat,
                      selectedHandyman.coordinates.lng
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Route zeigen
                  </a>
                </span>
              </div>
            </OverlayView>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default KarteLogged;
