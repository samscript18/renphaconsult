import Link from "next/link";
import React, { useState } from "react";
import { dashboardLinks } from "@/lib/data/navbarLinks.data";
import { usePathname } from "next/navigation";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

const NavDropdown = () => {
  const [tabOpened, setTabOpened] = useState<boolean>(false);
  const toggleTab = () => setTabOpened((prev) => !prev);
  const pathname = usePathname();

  return (
    <div className="relative md:hidden">
      {tabOpened ? (
        <RiCloseLine
          size={35}
          className="text-white cursor-pointer md:hidden"
          onClick={toggleTab}
        />
      ) : (
        <HiOutlineMenu
          size={35}
          className="text-white cursor-pointer md:hidden"
          onClick={toggleTab}
        />
      )}

      {tabOpened && (
        <div className="absolute scale-up-center top-[115%] right-0 w-[180px] text-center h-auto bg-[#f7f7f7] rounded-lg shadow-md z-10">
          {dashboardLinks?.map((link, index) => {
            return (
              <li
                onClick={toggleTab}
                key={index}
                className="py-6 md:py-0 list-none"
              >
                <Link
                  href={link.href}
                  className={`hover:font-bold py-3 px-4 text-[.9rem] text-center uppercase ${
                    pathname.includes(link.href) && "font-bold text-primary"
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavDropdown;
