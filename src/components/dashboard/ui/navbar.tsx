"use client";
import { dashboardLinks } from "@/lib/data/navbarLinks.data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NavbarDropdown from "./navbarDropdown";
import NavDropdown from "./navDropdown";
import logo from "../../../../public/images/logos/logo1.png";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-[#3933a0] px-2 py-4 w-full">
      <div className="max-w-[1200px] mx-auto flex items-center gap-2 justify-between">
        <Link href={"/"}>
          <Image src={logo} width={150} height={100} alt="logo" />
        </Link>

        <div
          className={`hidden md:block z-[5] bg-[#3933a0] md:w-auto md:h-auto `}
        >
          <ul className="flex items-center justify-center md:gap-16  md:flex-row">
            {dashboardLinks?.map((link, index) => {
              return (
                <li key={index} className="md:py-0">
                  <Link
                    href={link.href}
                    className={`hover:font-bold py-3 px-4 text-white md:text-[.75rem] uppercase ${
                      pathname.includes(link.href) && "font-bold"
                    }`}
                  >
                    {link.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <NavbarDropdown />
          <NavDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
