import { useState } from "react";
import Calendar from "react-calendar";

import { AvailableHandyman, AvailableTime } from "../../interfaces/Interfaces";
import NavbarLogged from "../navbarLogged/NavbarLogged";
import BookMeInfos from "./BookMeInfos";
import userFormatTime from "../../hooks/userFormatTime";

const BookMe = ({
  handymanProfile,
  availableDates,
  setIsBooking,
}: {
  handymanProfile: AvailableHandyman;
  availableDates: AvailableTime[];
  setIsBooking: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const [isFurther, setIsFurther] = useState(false);
  const { formatTime } = userFormatTime();

  const enabledDates = availableDates.map((entry) => entry.date);

  const handleDateChange = async (value: Date[] | any) => {
    const date = Array.isArray(value) ? value[0] : value;
    setSelectedDate(date);
    setSelectedTimeSlot(null);

    const formatted = date.toLocaleDateString("sv-SE");

    const res = await fetch(
      `https://api-fixdas.onrender.com/bookedClients?handymanId=${handymanProfile.id}&date=${formatted}`
    );
    const data = await res.json();
    const bookedTime = data.map((booking: any) => booking.time);

    setBookedTimes(bookedTime);
  };

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("sv-SE")
    : null;
  const availableTimeSlots =
    availableDates.find((entry) => entry.date === formattedDate)?.timeSlots ||
    [];

  const handleOnFurther = () => {
    setIsFurther(true);
  };

  return (
    <>
      {isFurther ? (
        <BookMeInfos
          handymanProfile={handymanProfile}
          setIsFurther={setIsFurther}
          date={selectedDate}
          time={selectedTimeSlot}
        />
      ) : (
        <>
          <div className="container with-bottom-padding">
            <div className="row mt-4">
              <div
                onClick={() => {
                  setIsBooking(false);
                }}
                className="col-12 d-flex justify-content-start align-items-center"
              >
                <i className="fa-solid fa-chevron-left"></i>
                <h6 className="m-0 ms-2 ">To the Profile</h6>
              </div>
              <div className="col-12 d-flex justify-content-md-center ">
                <Calendar
                  className="mt-4 calendar-bg w-100"
                  onChange={handleDateChange}
                  value={selectedDate}
                  tileClassName={({ date, view }) => {
                    if (view === "month") {
                      const formatted = date.toLocaleDateString("sv-SE");
                      if (enabledDates.includes(formatted)) {
                        return "highlight-available rounded";
                      }
                    }
                    return null;
                  }}
                />
              </div>
            </div>
            <h3 className="mt-4 mb-2 text-center ">Available time slots:</h3>
            <div className="row d-flex row-gap-3 mt-md-4">
              {formattedDate && availableTimeSlots.length > 0 && (
                <>
                  {availableTimeSlots.map((slot, idx) => (
                    <div key={idx} className="col-12 col-md-4 available-slots">
                      <button
                        disabled={bookedTimes.includes(slot)}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`btn btn-outline-success w-100 ${
                          selectedTimeSlot === slot
                            ? "btn-outline-success"
                            : "btn-outline-secondary"
                        }`}
                      >
                        <span className="time-span">{formatTime(slot)}</span>
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="col-12">
              {formattedDate && availableTimeSlots.length === 0 && (
                <p className="mt-4 text-center fw-bold text-gray">
                  No time slots available for {formattedDate}
                </p>
              )}
            </div>
            <div className="row my-4 d-md-flex justify-content-md-center mt-md-5">
              <div className="col-12 col-md-6">
                <button
                  className="btn contact-btn w-100"
                  onClick={handleOnFurther}
                  disabled={!selectedDate || !selectedTimeSlot}
                >
                  Further
                </button>
              </div>
            </div>
          </div>

          <NavbarLogged />
        </>
      )}
    </>
  );
};
export default BookMe;
