import { UserStorage } from "@/lib/utils/localStorage";
import { User } from "@/schema/interfaces/user.interface";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { logout } from "@/services/auth.service";

const NavbarDropdown = () => {
  const [tabOpened, setTabOpened] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const toggleTab = () => setTabOpened((prev) => !prev);

  useEffect(() => {
    setUser(UserStorage.get());
  }, []);

  return (
    <div className="relative">
      <Image
        src={user?.profilePicture as string}
        alt="profile"
        width={40}
        height={40}
        className="w-[40px] h-[40px] object-center object-cover rounded-full cursor-pointer"
        onClick={toggleTab}
      />

      {tabOpened && (
        <div className="absolute scale-up-center top-[105%] right-0 w-[150px] bg-[#f7f7f7] rounded-md overflow-hidden z-20">
          <Link
            href={"/dashboard/profile"}
            onClick={toggleTab}
            className="w-full bg-transparent hover:bg-[#f2f2f2] block text-[.8rem] py-4 font-semibold px-4 cursor-pointer"
          >
            Profile
          </Link>
          <div
            className="w-full bg-transparent hover:bg-[#f2f2f2] block text-[.8rem] py-4 font-semibold text-red-700 px-4 cursor-pointer"
            onClick={() => {
              logout();
              toggleTab();
            }}
          >
            Log Out
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarDropdown;
