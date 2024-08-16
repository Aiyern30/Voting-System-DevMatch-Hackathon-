"use client";

import React from "react";
import { Button } from "../Button";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/AuthContext"; // Adjust the import path
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/Dropdown-menu";

const Header = () => {
  const pathname = usePathname();
  const { isLoggedIn, loading, logout } = useAuth();

  const links = [
    { name: "Home", href: "/Login/OwnerHomepage" },
    { name: "Candidate", href: "/Login/OwnerHomepage/CandidateList" },
    { name: "Voter", href: "/Login/OwnerHomepage/VoterList" },
    { name: "Set Event", href: "/Login/OwnerHomepage/SetEvent" },
    // ...(isLoggedIn ? [{ name: "Home", href: "/Login/OwnerHomepage" }] : []),
  ];

  return (
    <div className="h-[64px] flex justify-between items-center p-4 shadow-md bg-[#DBB5B5]">
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>{pathname?.split("/")[1]}</div>
      </div>
      <div className="flex items-center space-x-4 cursor-pointer">
        {links
          //   .filter((link) => pathname === "/" || link.href === "/") // Only show "Home" link if pathname is "/Home"
          .map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-black ${
                pathname === link.href ? "font-bold underline" : ""
              }`}
            >
              {link.name}
            </a>
          ))}
        {!isLoggedIn &&
          !loading &&
          pathname !== "/" && ( // Show login button only if not on Home, not logged in, and not loading
            <a href="/Login">
              <Button className="bg-[#C39898] border border-[#2A2929] text-black">
                Login / Register
              </Button>
            </a>
          )}
      </div>
    </div>
  );
};

export default Header;
