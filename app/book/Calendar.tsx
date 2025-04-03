"use client";
import React, { useState } from "react";

interface CalendarProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  selectedTime: string;
  bookedTimes: { [key: string]: string[] };
}

export const Calendar = ({
  selectedDate,
  setSelectedDate,
  setSelectedTime,
  selectedTime,
  bookedTimes,
}: CalendarProps) => {
  // Convert the current date to UK time first
  const nowParts = new Date()
    .toLocaleString("en-GB", { timeZone: "Europe/London" })
    .split(",")[0]
    .split("/");
  const [day, month, year] = nowParts.map(Number);
  const nowUK = new Date(year, month - 1, day);

  const [currentYear, setCurrentYear] = useState(nowUK.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(nowUK.getMonth());
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Determine the weekday of the first day of the current month
  // In JavaScript, getDay() returns 0 for Sunday, 1 for Monday, etc.
  // Since we want Monday to be the first column, we treat Sunday (0) as 7.
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  let startDay = firstDayOfMonth.getDay();
  if (startDay === 0) startDay = 7;
  // Number of cells from the previous month to show
  const prevMonthDaysToShow = startDay - 1;

  // Days in the current month
  const daysInCurrentMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  // Calculate total cells (weeks) for the grid
  const totalCells =
    Math.ceil((prevMonthDaysToShow + daysInCurrentMonth) / 7) * 7;

  // Get previous month/year values
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

  // Prepare the calendar cells
  const calendarCells = Array.from({ length: totalCells }, (_, i) => {
    let cellDate: Date;
    let isCurrentMonth = true;
    if (i < prevMonthDaysToShow) {
      // Days from previous month
      const dayNum = daysInPrevMonth - prevMonthDaysToShow + i + 1;
      cellDate = new Date(prevYear, prevMonth, dayNum);
      isCurrentMonth = false;
    } else if (i < prevMonthDaysToShow + daysInCurrentMonth) {
      // Days in current month
      const dayNum = i - prevMonthDaysToShow + 1;
      cellDate = new Date(currentYear, currentMonth, dayNum);
    } else {
      // Days from next month
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dayNum = i - (prevMonthDaysToShow + daysInCurrentMonth) + 1;
      cellDate = new Date(nextYear, nextMonth, dayNum);
      isCurrentMonth = false;
    }
    // Format date string using "en-CA" for YYYY-MM-DD format in UK time.
    const dateStr = cellDate.toLocaleDateString("en-CA", {
      timeZone: "Europe/London",
    });
    return { day: cellDate.getDate(), dateStr, isCurrentMonth };
  });

  const timeSlots = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  // Define days of the week header
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="w-[95%] sm:w-3/5 flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 border rounded transition duration-300 bg-white text-black hover:bg-[#fff0fb]"
        >
          &lt;
        </button>
        <div className="text-xl font-bold text-black">
          {monthNames[currentMonth]} {currentYear}
        </div>
        <button
          onClick={handleNextMonth}
          className="p-2 border rounded transition duration-300 bg-white text-black hover:bg-[#fff0fb]"
        >
          &gt;
        </button>
      </div>
      {/* Days of the week header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-bold text-black">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map(({ day, dateStr, isCurrentMonth }, index) => (
          <button
            key={`${dateStr}-${index}`}
            onClick={() => setSelectedDate(dateStr)}
            disabled={!isCurrentMonth}
            className={`p-2 border rounded transition duration-300 ${
              selectedDate === dateStr
                ? "bg-deep-pink text-white font-bold"
                : isCurrentMonth
                ? "bg-pale-pink text-black"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      {selectedDate && (
        <div className="mt-6 w-full">
          <label className="font-montserrat font-bold sm:text-2xl text-sm mb-2 block text-black">
            Available Times for {selectedDate}:
          </label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((time) => {
              const isBooked = bookedTimes[selectedDate]?.includes(time);
              return (
                <button
                  key={time}
                  disabled={isBooked}
                  onClick={() => {
                    if (!isBooked) {
                      setSelectedTime(time);
                    }
                  }}
                  className={`${
                    selectedTime === time
                      ? "bg-deep-pink text-white font-bold"
                      : "bg-pale-pink text-black"
                  } p-2 border rounded transition duration-300 ${
                    isBooked && "opacity-40"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
