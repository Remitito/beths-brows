"use client";

import React, { useState } from "react";
import { Service } from "./page";
import {
  MdOutlineRadioButtonUnchecked,
  MdOutlineRadioButtonChecked,
} from "react-icons/md";
import { Calendar } from "./Calendar";
import { FaAsterisk } from "react-icons/fa6";

const inputStyle =
  "focus:ring-1 w-[95%] focus:ring-purple-pop focus:outline-none border-2 border-brand-pink rounded-lg p-2 mt-2";

type TextInputProps = {
  placeholder: string;
  required?: boolean;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function TextInput({
  placeholder,
  required = false,
  value,
  type = "text",
  onChange,
}: TextInputProps) {
  return (
    <div className="w-full flex flex-row">
      <input
        type={type}
        placeholder={placeholder}
        className={inputStyle}
        required={required}
        value={value}
        onChange={onChange}
      />
      {required && <FaAsterisk className="text-purple-pop pt-1 mt-1" />}
    </div>
  );
}

interface ModalProps {
  message: string;
  onClose: () => void;
}

function Modal({ message, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-4/5">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-deep-pink text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

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
  const [confirmed, setConfirmed] = useState(false);

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

  const [errorModal, setErrorModal] = useState<string>("");

  const handleConfirm = () => {
    if (!selectedDate.trim()) {
      setErrorModal("Please select a date.");
      return;
    }
    if (!selectedTime.trim()) {
      setErrorModal("Please select a time.");
      return;
    }
    if (!firstLineAddress.trim()) {
      setErrorModal("Please fill in the first line of your address.");
      return;
    }
    if (!postcode.trim()) {
      setErrorModal("Please fill in your postcode.");
      return;
    }
    if (!contactName.trim()) {
      setErrorModal("Please fill in your name.");
      return;
    }
    if (!contactEmail.trim()) {
      setErrorModal("Please fill in your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      setErrorModal("Please enter a valid email address.");
      return;
    }
    setConfirmed(true);
  };

  const headingStyle = "font-montserrat font-bold sm:text-2xl text-sm ";
  const buttonStyle =
    "border sm:text-lg text-sm font-semibold rounded-lg p-2 transform transition duration-300";

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
          <MdOutlineRadioButtonChecked className="pl-2 text-brand-pink text-3xl sm:text-5xl" />
        ) : (
          <MdOutlineRadioButtonUnchecked className="pl-2 text-brand-pink text-3xl sm:text-5xl" />
        )}
      </div>
    );
  };

  return (
    <div className="w-screen font-raleway flex flex-col min-h-96 justify-center items-center">
      {/* Render modal if there is an error */}
      {errorModal && (
        <Modal message={errorModal} onClose={() => setErrorModal("")} />
      )}

      {confirmed ? (
        <div className="flex flex-col  p-4">
          <h1 className="text-3xl text-center font-montserrat my-8">
            Thanks for your Booking!
          </h1>
          <span className="">See you at:</span>
          <div className="font-semibold mb-4">
            <p>{firstLineAddress}</p>
            {secondLineAddress && <p>{secondLineAddress}</p>}
            <p>{selectedCity}</p>
            <p>{postcode}</p>
          </div>
          <span className="mb-8">
            On{" "}
            <span className="font-semibold">
              {new Date(selectedDate + "T" + selectedTime).toLocaleString(
                "en-GB",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>
          </span>
          <span className="mb-2 text-center">
            A confirmation email has been sent to: {contactEmail}
          </span>
        </div>
      ) : (
        <>
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

          <div className="flex flex-col items-center bg-brand-pink w-full py-8">
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              bookedTimes={bookedTimes}
              setSelectedTime={setSelectedTime}
              selectedTime={selectedTime}
            />
          </div>

          <div className="flex flex-col items-center min-h-96 w-5/6 sm:w-3/5 py-8">
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
            <div className="flex flex-col w-5/6 py-5">
              <label className={headingStyle}>Address</label>
              <TextInput
                placeholder="1st line of address"
                value={firstLineAddress}
                onChange={(e) => setFirstLineAddress(e.target.value)}
                required
              />
              <TextInput
                placeholder="2nd line of address (optional)"
                value={secondLineAddress}
                onChange={(e) => setSecondLineAddress(e.target.value)}
              />
              <div className="flex flex-row w-full">
                <input
                  type="text"
                  value={selectedCity}
                  className={inputStyle}
                  readOnly
                />
              </div>
              <TextInput
                placeholder="Postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
              />

              <label className={`${headingStyle} mt-4`}>
                Contact Information
              </label>
              <TextInput
                placeholder="Name"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
              <TextInput
                placeholder="Email"
                required
                value={contactEmail}
                type="email"
                onChange={(e) => setContactEmail(e.target.value)}
              />
              <TextInput
                placeholder="Phone Number (optional)"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleConfirm}
            className="mt-4 mb-8 p-2 bg-deep-pink text-white rounded-lg font-bold text-lg sm:hover:bg-deep-pink transition duration-300"
          >
            Confirm
          </button>
        </>
      )}
    </div>
  );
};

export default BookClient;
