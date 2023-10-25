import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNav from "@/components/MainNav";
import StoreSwitcher from "./store-switcher";

const Navbar = () => {
  return (
    <>
      <div className="border-b ">
        <div className="flex items-center h-16 px-4">
          <StoreSwitcher />
          <MainNav />
          <div className="flex items-center ml-auto space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
