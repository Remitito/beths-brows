import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="h-12 sm:h-20 flex bg-brand-pink z-50 w-screen items-center flex-row justify-between">
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
        <Link href={"/prices"}>Prices</Link>
        <Link href={"/contact"}>Contact</Link>
      </div>
      <div className="w-1/2 sm:hidden flex flex-row justify-end items-center">
        <GiHamburgerMenu className="mr-6 text-2xl" />
      </div>
    </nav>
  );
};

export default Navbar;
