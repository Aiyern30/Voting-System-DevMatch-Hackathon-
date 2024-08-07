"use client";

import React from "react";
import { Button } from "../Button";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Overview", href: "/Overview" },
    { name: "How it works", href: "/How-it-works" },
    { name: "Features", href: "/Features" },
    { name: "About Us", href: "/About-us" },
  ];

  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-[#DBB5B5]">
      <div className="flex items-center space-x-4">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>{pathname?.split("/")[1]}</div>
      </div>
      <div className="flex items-center space-x-4 cursor-pointer">
        {links.map((link) => (
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
        <a href="/Login">
          <Button className="bg-[#C39898] border border-[#2A2929] text-black">
            Login / Register
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Header;
