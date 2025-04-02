import React from "react";
import BookClient from "./BookClient";

export interface Service {
  title: string;
  desc?: string;
  price: number;
  duration: number;
}

const page = () => {
  const services: Service[] = [
    { title: "Brow Tint", price: 5, duration: 60 },
    { title: "Eyelash Tint", price: 5, duration: 60 },
    { title: "Brow Wax", price: 8, duration: 60 },
    { title: "Brow&Lash Tint", price: 9, duration: 60 },
    {
      title: "Full Service",
      desc: "Brow Wax, Brow Tint, and Eyelash Tint",
      price: 16,
      duration: 60,
    },
  ];

  return <BookClient services={services} />;
};

export default page;
