"use client";

import React, { useState } from "react";
import { Service } from "./page";
import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked,
} from "react-icons/md";

interface BookClientProps {
  services: Service[];
}

interface FancyCalendarProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  bookedTimes: { [key: string]: string[] };
}

const FancyCalendar = ({
  selectedDate,
  setSelectedDate,
  bookedTimes,
}: FancyCalendarProps) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
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
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const dates = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateObj = new Date(currentYear, currentMonth, day);
    const dateStr = dateObj.toISOString().split("T")[0];
    return { day, dateStr };
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
  return (
    <div className="w-[95%] sm:w-3/5 mt-10 flex flex-col items-center">
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
      <div className="grid grid-cols-7 gap-2">
        {dates.map(({ day, dateStr }) => (
          <button
            key={dateStr}
            onClick={() => setSelectedDate(dateStr)}
            className={`p-2 border rounded transition duration-300 ${
              selectedDate === dateStr
                ? "bg-[#ffaae5] text-white"
                : "bg-white text-black hover:bg-[#fff0fb]"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      {selectedDate && (
        <div className="mt-6 w-full">
          <label className="font-montserrat font-bold sm:text-2xl text-sm mb-2 block text-black">
            Available Times
          </label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((time) => {
              const isBooked = bookedTimes[selectedDate]?.includes(time);
              return (
                <button
                  key={time}
                  disabled={isBooked}
                  className={`p-2 border rounded transition duration-300 ${
                    isBooked
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-[#fff0fb]"
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

const BookClient = ({ services }: BookClientProps) => {
  const [selectedService, setSelectedService] = useState<string>("Brow Tint");
  const [selectedDate, setSelectedDate] = useState("");
  const [bookedTimes] = useState({
    "2025-04-05": ["10:00", "14:00"],
    "2025-04-10": ["09:00", "13:00"],
  });
  const [selectedCity, setSelectedCity] = useState<string>("Hereford");
  const [firstLineAddress, setFirstLineAddress] = useState<string>("");
  const [secondLineAddress, setSecondLineAddress] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const headingStyle = "font-montserrat font-bold sm:text-2xl text-sm ";
  const inputStyle =
    "focus:ring-1 focus:ring-purple-pop focus:outline-none border-2 border-pale-pink rounded-lg p-2 mt-2";
  const buttonStyle =
    "border sm:text-lg text-sm font-semibold rounded-lg p-2 bg-light-pink transform transition duration-300";

  const ServiceItem = ({
    title,
    desc,
    price,
    isLast,
    selectedService,
    onSelect,
  }: Service & {
    isLast: boolean;
    selectedService: string;
    onSelect: (title: string) => void;
  }) => {
    return (
      <div
        onClick={() => onSelect(title)}
        className={`flex flex-row h-16 sm:h-24 w-full ${
          selectedService === title ? "border-3" : "border-1"
        } border-brand-pink rounded-lg justify-between items-center p-3 ${
          isLast ? "col-span-2 sm:col-span-2" : ""
        }`}
      >
        <div className="flex flex-col">
          <label className="sm:text-lg text-sm font-semibold">{title}</label>
          {desc && <span className="text-gray-700 text-sm">({desc})</span>}
          <label className="text-sm text-gray-500">£{price}</label>
        </div>
        {selectedService === title ? (
          <MdOutlineRadioButtonChecked className="text-brand-pink text-3xl sm:text-5xl" />
        ) : (
          <MdOutlineRadioButtonUnchecked className="text-brand-pink text-3xl sm:text-5xl" />
        )}
      </div>
    );
  };

  return (
    <div className="w-screen font-raleway flex flex-col min-h-96 justify-center items-center">
      <div className="flex flex-col w-[95%] sm:w-3/5 mt-10 sm:mt-20">
        <label className={headingStyle}>SERVICE</label>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 my-4">
          {services.map((service, index) => (
            <ServiceItem
              key={service.title}
              {...service}
              isLast={index === services.length - 1}
              selectedService={selectedService}
              onSelect={setSelectedService}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col pb-8 items-center min-h-96 bg-brand-pink w-full">
        <div className="w-[95%] sm:w-3/5 mt-10 sm:mt-20 flex flex-col">
          <label className={headingStyle}>LOCATION</label>
        </div>
        <div className="flex flex-row mt-8 w-3/4 justify-evenly items-center">
          <div className="flex flex-row w-4/5 justify-between items-center">
            <button
              onClick={() => setSelectedCity("Hereford")}
              className={`${buttonStyle} ${
                selectedCity === "Hereford" ? "scale-140" : "scale-90"
              }`}
            >
              Hereford
            </button>
            <button
              onClick={() => setSelectedCity("Presteigne")}
              className={`${buttonStyle} ${
                selectedCity === "Presteigne" ? "scale-140" : "scale-90"
              }`}
            >
              Presteigne
            </button>
          </div>
        </div>
        <div className="flex flex-col w-3/4 mt-10">
          <label className={headingStyle}>Enter your Address</label>
          <input
            type="text"
            placeholder="1st line of address"
            className={inputStyle}
            value={firstLineAddress}
            onChange={(e) => setFirstLineAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="2nd line of address"
            className={inputStyle}
            value={secondLineAddress}
            onChange={(e) => setSecondLineAddress(e.target.value)}
          />
          <input
            type="text"
            value={selectedCity}
            className={inputStyle}
            readOnly
          />
          <input
            type="text"
            placeholder="Postcode"
            className={inputStyle}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>
      </div>
      {/* Calendar */}
      <div className="flex flex-col items-center min-h-96  w-full">
        <div className="w-[95%] sm:w-3/5 mt-10 sm:mt-20 flex flex-col">
          <label className={headingStyle}>TIME</label>
        </div>{" "}
        <FancyCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          bookedTimes={bookedTimes}
        />
      </div>
    </div>
  );
};

export default BookClient;
