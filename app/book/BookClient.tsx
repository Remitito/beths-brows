"use client";

import React, { useState } from "react";
import { Service } from "./page";
import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked,
} from "react-icons/md";
import { Calendar } from "./Calendar";

interface BookClientProps {
  services: Service[];
}

const BookClient = ({ services }: BookClientProps) => {
  const [selectedService, setSelectedService] = useState<string>("Brow Tint");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  });
  const [selectedTime, setSelectedTime] = useState<string>("");

  const [bookedTimes] = useState({
    "2025-05-04": ["10:00", "14:00"],
    "2025-04-10": ["09:00", "13:00"],
    "2025-05-05": ["10:00"],
  });
  const [selectedCity, setSelectedCity] = useState<string>("Hereford");
  const [firstLineAddress, setFirstLineAddress] = useState<string>("");
  const [secondLineAddress, setSecondLineAddress] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");

  const headingStyle = "font-montserrat font-bold sm:text-2xl text-sm ";
  const inputStyle =
    "focus:ring-1 focus:ring-purple-pop focus:outline-none border-2 border-pale-pink rounded-lg p-2 mt-2";
  const buttonStyle =
    "border sm:text-lg text-sm font-semibold rounded-lg p-2  transform transition duration-300";

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
          selectedService === title ? "bg-deep-pink text-white" : "border-1"
        } border-brand-pink rounded-lg justify-between items-center p-3 ${
          isLast ? "col-span-2 sm:col-span-2" : ""
        }`}
      >
        <div className="flex flex-col">
          <label className="sm:text-lg text-sm font-semibold">{title}</label>
          {desc && (
            <span
              className={`${
                selectedService === title ? "text-white" : "text-gray-700"
              } text-sm`}
            >
              ({desc})
            </span>
          )}
          <label
            className={`${
              selectedService === title ? "text-white" : "text-gray-700"
            } text-sm`}
          >
            £{price}
          </label>
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
      <div className="flex flex-col w-[95%] sm:w-3/5 items-center py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
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

      {/* Calendar part now comes first and uses the pink background */}
      <div className="flex flex-col items-center bg-brand-pink w-full py-8">
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          bookedTimes={bookedTimes}
          setSelectedTime={setSelectedTime}
          selectedTime={selectedTime}
        />
      </div>

      {/* Location part now appears after and no longer has the pink background */}
      <div className="flex flex-col items-center min-h-96 w-full">
        <div className="flex flex-row w-3/4 justify-evenly items-center">
          <div className="flex flex-row w-4/5 justify-between items-center py-5">
            <button
              onClick={() => setSelectedCity("Hereford")}
              className={`${buttonStyle} ${
                selectedCity === "Hereford"
                  ? "scale-130 bg-deep-pink text-white"
                  : "scale-90"
              }`}
            >
              Hereford
            </button>
            <button
              onClick={() => setSelectedCity("Presteigne")}
              className={`${buttonStyle} ${
                selectedCity === "Presteigne"
                  ? "scale-130 bg-deep-pink text-white"
                  : "scale-90"
              }`}
            >
              Presteigne
            </button>
          </div>
        </div>
        <div className="flex flex-col w-3/4">
          <label className={headingStyle}>Address</label>
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
          <label className={`${headingStyle} mt-4`}>Contact Information</label>

          <input
            type="text"
            placeholder="Name"
            className={inputStyle}
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className={inputStyle}
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className={inputStyle}
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
        </div>
      </div>
      <button className="my-4 p-2 bg-deep-pink text-white rounded-lg font-bold text-lg sm:hover:bg-deep-pink transition duration-300">
        Confirm
      </button>
    </div>
  );
};

export default BookClient;
