
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookingForm from "./components/BookingForm";
import { initializeTimes, updateTimes } from "./components/Main";

beforeEach(() => {
  localStorage.clear();
});

// Mock the API functions provided by the external script.
const mockTimes = ["17:00", "18:00", "19:00", "20:00"];

beforeEach(() => {
  global.fetchAPI = jest.fn(() => mockTimes);
});

afterEach(() => {
  jest.clearAllMocks();
});

// Test 1: BookingForm renders the heading and available times.
test("renders the BookingForm heading and available times", () => {
  const initialTimes = ["17:00", "18:00", "19:00"];
  const dispatch = jest.fn();

  render(
    <BookingForm
      availableTimes={initialTimes}
      dispatch={dispatch}
    />
  );

  expect(screen.getByText("Book Now")).toBeInTheDocument();
  expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();

  initialTimes.forEach((time) => {
    expect(
      screen.getByRole("option", { name: time })
    ).toBeInTheDocument();
  });
});

// Test 2: initializeTimes gets times from the API for today's date.
test("initializeTimes fetches available times for today", () => {
  const times = initializeTimes();

  expect(global.fetchAPI).toHaveBeenCalledTimes(1);
  expect(global.fetchAPI).toHaveBeenCalledWith(expect.any(Date));
  expect(times).toEqual(mockTimes);
});

// Test 3: updateTimes fetches times for the selected date.
test("updateTimes fetches available times for the selected date", () => {
  const selectedDate = "2026-10-24";

  const times = updateTimes(["old time"], selectedDate);

  expect(global.fetchAPI).toHaveBeenCalledTimes(1);
  expect(global.fetchAPI).toHaveBeenCalledWith(
    new Date(selectedDate)
  );
  expect(times).toEqual(mockTimes);
});

// Test 4: selecting a date dispatches that date.
test("dispatches the selected date", () => {
  const dispatch = jest.fn();

  render(
    <BookingForm
      availableTimes={["17:00", "18:00"]}
      dispatch={dispatch}
    />
  );

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2026-10-24" },
  });

  expect(dispatch).toHaveBeenCalledWith("2026-10-24");
});

// Test 5: submitting the form passes the entered data to the API.

test("submits the booking form with the entered data", () => {
  const submitForm = jest.fn();
  const dispatch = jest.fn();

  render(
    <BookingForm
      availableTimes={["17:00", "18:00"]}
      dispatch={dispatch}
      submitForm={submitForm}
    />
  );

  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2026-11-15" },
  });

  fireEvent.change(screen.getByLabelText(/choose time/i), {
    target: { value: "18:00" },
  });

  fireEvent.change(screen.getByLabelText(/number of guests/i), {
    target: { value: "2" },
  });

  fireEvent.change(screen.getByLabelText(/occasion/i), {
    target: { value: "Birthday" },
  });

  fireEvent.click(
    screen.getByRole("button", {
      name: /make your reservation/i,
    })
  );

  expect(submitForm).toHaveBeenCalledTimes(1);

  expect(submitForm).toHaveBeenCalledWith({
    date: "2026-11-15",
    time: "18:00",
    guests: 2,
    occasion: "Birthday",
  });
});

test("returns an empty array when no reservations are saved", () => {
  localStorage.removeItem("reservations");

  const savedReservations = JSON.parse(
    localStorage.getItem("reservations") || "[]"
  );

  expect(savedReservations).toEqual([]);
});


describe("BookingForm input validation", () => {
  const availableTimes = ["17:00", "18:00", "19:00"];
  let dispatch;
  let submitForm;

  beforeEach(() => {
    dispatch = jest.fn();
    submitForm = jest.fn();
  });

  const renderBookingForm = () => {
    render(
      <BookingForm
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
      />
    );
  };

  test("submit button is disabled when the form is empty", () => {
    renderBookingForm();

    expect(
      screen.getByRole("button", {
        name: /make your reservation/i,
      })
    ).toBeDisabled();
  });

  test("date input has a minimum date of today", () => {
    renderBookingForm();

    const now = new Date();
    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    expect(screen.getByLabelText(/choose date/i)).toHaveAttribute(
      "min",
      today
    );
  });

  test("submit button remains disabled when the date is in the past", () => {
    renderBookingForm();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const pastDate = [
      yesterday.getFullYear(),
      String(yesterday.getMonth() + 1).padStart(2, "0"),
      String(yesterday.getDate()).padStart(2, "0"),
    ].join("-");

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: pastDate },
    });

    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: "18:00" },
    });

    fireEvent.change(screen.getByLabelText(/occasion/i), {
      target: { value: "Birthday" },
    });

    expect(
      screen.getByRole("button", {
        name: /make your reservation/i,
      })
    ).toBeDisabled();
  });

  test.each(["0", "11", "1.5", "-1"])(
    "submit button is disabled when guests is %s",
    (guestCount) => {
      renderBookingForm();

      const now = new Date();
      const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");

      fireEvent.change(screen.getByLabelText(/choose date/i), {
        target: { value: today },
      });

      fireEvent.change(screen.getByLabelText(/choose time/i), {
        target: { value: "18:00" },
      });

      fireEvent.change(screen.getByLabelText(/number of guests/i), {
        target: { value: guestCount },
      });

      fireEvent.change(screen.getByLabelText(/occasion/i), {
        target: { value: "Birthday" },
      });

      expect(
        screen.getByRole("button", {
          name: /make your reservation/i,
        })
      ).toBeDisabled();
    }
  );

  test("submit button is disabled when occasion is missing", () => {
    renderBookingForm();

    const now = new Date();
    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: today },
    });

    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: "18:00" },
    });

    expect(
      screen.getByRole("button", {
        name: /make your reservation/i,
      })
    ).toBeDisabled();
  });

  test("submit button is enabled when all inputs are valid", () => {
    renderBookingForm();

    const now = new Date();
    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: today },
    });

    fireEvent.change(screen.getByLabelText(/choose time/i), {
      target: { value: "18:00" },
    });

    fireEvent.change(screen.getByLabelText(/number of guests/i), {
      target: { value: "2" },
    });

    fireEvent.change(screen.getByLabelText(/occasion/i), {
      target: { value: "Birthday" },
    });

    expect(
      screen.getByRole("button", {
        name: /make your reservation/i,
      })
    ).toBeEnabled();
  });

  test("does not call submitForm when the form is invalid", () => {
    renderBookingForm();

    fireEvent.submit(
      screen.getByRole("button", {
        name: /make your reservation/i,
      }).closest("form")
    );

    expect(submitForm).not.toHaveBeenCalled();
  });
});
