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
  // Get current UK date and time.
  const nowUKString = new Date().toLocaleString("en-GB", {
    timeZone: "Europe/London",
  });
  // Example output: "04/04/2025, 14:30:15" (DD/MM/YYYY, HH:MM:SS)
  const [datePart, timePart] = nowUKString.split(", ");
  const [day, month, year] = datePart.split("/").map(Number);
  // Create a Date object representing today (set to midnight)
  const nowUK = new Date(year, month - 1, day);
  // Parse current UK time in minutes
  const [currentHour, currentMinute] = timePart.split(":").map(Number);
  const currentTimeMinutes = currentHour * 60 + currentMinute;

  // Today's date string in YYYY-MM-DD format for comparisons
  const todayStr = nowUK.toLocaleDateString("en-CA", {
    timeZone: "Europe/London",
  });

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
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  let startDay = firstDayOfMonth.getDay();
  if (startDay === 0) startDay = 7;
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

  // Prepare the calendar cells and include the full cellDate for comparisons
  const calendarCells = Array.from({ length: totalCells }, (_, i) => {
    let cellDate: Date;
    let isCurrentMonth = true;
    if (i < prevMonthDaysToShow) {
      const dayNum = daysInPrevMonth - prevMonthDaysToShow + i + 1;
      cellDate = new Date(prevYear, prevMonth, dayNum);
      isCurrentMonth = false;
    } else if (i < prevMonthDaysToShow + daysInCurrentMonth) {
      const dayNum = i - prevMonthDaysToShow + 1;
      cellDate = new Date(currentYear, currentMonth, dayNum);
    } else {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dayNum = i - (prevMonthDaysToShow + daysInCurrentMonth) + 1;
      cellDate = new Date(nextYear, nextMonth, dayNum);
      isCurrentMonth = false;
    }
    // Format date string as "YYYY-MM-DD"
    const dateStr = cellDate.toLocaleDateString("en-CA", {
      timeZone: "Europe/London",
    });
    return { day: cellDate.getDate(), dateStr, isCurrentMonth, cellDate };
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

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="w-[95%] sm:w-2/5 flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 border rounded transition duration-300 bg-white text-black hover:bg-[#fff0fb]"
        >
          &lt;
        </button>
        <div className="text-xl font-semibold text-black">
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
          <div key={day} className="text-center font-semibold text-black">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map(
          ({ day, dateStr, isCurrentMonth, cellDate }, index) => {
            // Disable the cell if it's not part of the current month OR if it's before today
            const isBeforeToday = cellDate < nowUK;
            const isDisabled = !isCurrentMonth || isBeforeToday;
            return (
              <button
                key={`${dateStr}-${index}`}
                onClick={() => setSelectedDate(dateStr)}
                disabled={isDisabled}
                className={`p-2 border rounded transition duration-300 ${
                  selectedDate === dateStr
                    ? "bg-deep-pink text-white font-bold"
                    : !isDisabled
                    ? "bg-pale-pink text-black"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {day}
              </button>
            );
          }
        )}
      </div>
      {selectedDate && (
        <div className="mt-6 ml-8 w-full">
          <label className="font-montserrat font-semibold sm:text-xl text-sm mb-2 block text-black">
            Available Times for{" "}
            {new Date(selectedDate).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            :
          </label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((time) => {
              const isBooked = bookedTimes[selectedDate]?.includes(time);
              // For times on today's date, disable if the slot is before now or within 2 hours.
              let disableTime = false;
              if (selectedDate === todayStr) {
                const [slotHour, slotMinute] = time.split(":").map(Number);
                const slotTimeMinutes = slotHour * 60 + slotMinute;
                if (slotTimeMinutes <= currentTimeMinutes + 120) {
                  disableTime = true;
                }
              }
              const isTimeDisabled = isBooked || disableTime;
              return (
                <button
                  key={time}
                  disabled={isTimeDisabled}
                  onClick={() => {
                    if (!isTimeDisabled) {
                      setSelectedTime(time);
                    }
                  }}
                  className={`p-2 border rounded transition duration-300 ${
                    selectedTime === time
                      ? "bg-deep-pink text-white font-bold"
                      : "bg-pale-pink text-black"
                  } ${isTimeDisabled && "opacity-40"}`}
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
