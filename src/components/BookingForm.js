
import { useState } from "react";

function BookingForm({ availableTimes, dispatch, submitForm }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("");
  


const handleSubmit = (e) => {
  e.preventDefault();

  if (!date || !time || !occasion || guests < 1 || guests > 10) {
    return;
  }

  const formData = {
    date,
    time,
    guests,
    occasion,
  };

  submitForm(formData);
};



  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Book Now</h1>
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          value={date}
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
  onChange={(e) => setTime(e.target.value)}
  required
>
  <option value="" disabled>
    Select a time
  </option>

  {availableTimes.map((time) => (
    <option key={time} value={time}>
      {time}
    </option>
  ))}
</select>
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          required
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
        />
        <label htmlFor="occasion">Occasion</label>

        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          required
        >
          <option value="" disabled>
            Select an occasion
          </option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>

        <input type="submit" value="Make Your reservation"></input>
      </form>
    </>
  );
}

export default BookingForm;
