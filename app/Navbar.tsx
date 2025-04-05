"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <nav className="h-[10vh] sm:h-20 flex bg-brand-pink z-50 w-screen items-center flex-row justify-between">
      <div className="h-full flex items-center">
        <Image
          width={250}
          height={250}
          alt="logo"
          src="/logo.png"
          className="object-contain"
        />
      </div>
      <div className="w-1/4"></div>
      <div className="w-1/2 hidden sm:flex flex-row justify-evenly items-center">
        <Link href={"/book"}>Book</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/contact"}>Contact</Link>
      </div>
      <div className="w-1/2 sm:hidden flex flex-row justify-end items-center">
        {!open ? (
          <GiHamburgerMenu
            onClick={() => setOpen(true)}
            className="mr-6 text-2xl"
          />
        ) : (
          <RxCross2 onClick={() => setOpen(false)} className="mr-6 text-2xl" />
        )}
      </div>
      {open && (
        <div className="w-full h-[90vh] sm:hidden flex flex-col bg-brand-pink absolute top-[10vh] left-0 z-40">
          <div className="flex flex-col space-y-8 text-xl mt-12 ml-10">
            <Link href={"/book"} onClick={() => setOpen(false)}>
              Book
            </Link>
            <Link href={"/about"} onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href={"/contact"} onClick={() => setOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
