
/* global fetchAPI, submitAPI */
import { useReducer } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import HomePage from "./HomePage";
import ConfirmedBooking from "./ConfirmedBooking";

export function initializeTimes() {
  const today = new Date();
  return fetchAPI(today);
}

export function updateTimes(state, date) {
  return fetchAPI(new Date(date));
}

function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  const navigate = useNavigate();

  function submitForm(formData) {
    const success = submitAPI(formData);

    if (success) {
      // Save the reservation locally if you still need localStorage.
      const savedReservations = JSON.parse(
        localStorage.getItem("reservations") || "[]"
      );

      localStorage.setItem(
        "reservations",
        JSON.stringify([...savedReservations, formData])
      );

      navigate("/confirmed");
    }
  }

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/reservations"
          element={
            <BookingForm
              availableTimes={availableTimes}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        />

        <Route
          path="/confirmed"
          element={<ConfirmedBooking />}
        />
      </Routes>
    </main>
  );
}

export default Main;
