
import { useState } from "react";

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("1");
  const [occasion, setOccasion] = useState("");

  // Get today's date in local time as YYYY-MM-DD.
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  // React client-side validation.
  const isDateValid = date !== "" && date >= today;

  const isGuestsValid =
    guests !== "" &&
    Number.isInteger(Number(guests)) &&
    Number(guests) >= 1 &&
    Number(guests) <= 10;

  const isFormValid =
    isDateValid &&
    time !== "" &&
    isGuestsValid &&
    occasion !== "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    const formData = {
      date,
      time,
      guests: Number(guests),
      occasion,
    };

    submitForm(formData);
  };

  return (
    <div className="Booking-page">
    <form className="booking-form" onSubmit={handleSubmit}>
      <h1>Book Now</h1>

      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        min={today}
        required
        onChange={(e) => {
          const selectedDate = e.target.value;
          setDate(selectedDate);
          setTime("");
          dispatch(selectedDate);
        }}
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        required
        onChange={(e) => setTime(e.target.value)}
      >
        <option value="" disabled>
          Select a time
        </option>

        {availableTimes.map((availableTime) => (
          <option key={availableTime} value={availableTime}>
            {availableTime}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        value={guests}
        min="1"
        max="10"
        step="1"
        required
        onChange={(e) => setGuests(e.target.value)}
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        required
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="" disabled>
          Select an occasion
        </option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <button type="submit" disabled={!isFormValid}>
        Make Your Reservation
      </button>
    </form>
    </div>
  );
}

export default BookingForm;
