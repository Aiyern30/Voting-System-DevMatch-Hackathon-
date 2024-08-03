import React from "react";
import { Button } from "../Button";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 shadow-md bg-[#DBB5B5]">
      <div className="flex items-center space-x-4">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>Home Page</div>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#home" className="text-black">
          Home
        </a>
        <a href="#overview" className="text-black">
          Overview
        </a>
        <a href="#how-it-works" className="text-black">
          How it works
        </a>
        <a href="#features" className="text-black">
          Features
        </a>
        <a href="#about-us" className="text-black">
          About Us
        </a>
        <Button className="bg-[#C39898] border border-[#2A2929] text-black">
          Login / Register
        </Button>
      </div>
    </div>
  );
};

export default Header;
