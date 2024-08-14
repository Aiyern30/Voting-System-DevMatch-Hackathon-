"use client";
import Header from "@/components/ui/Components/Header";
import React from "react";
import Footer from "@/components/ui/Components/Footer";
import Home from "./Home/page";

const page = () => {
  return (
    <div>
      <Header></Header>
      <div>
        <Home />
      </div>
      <div className="bg-[#DBB5B5] h-16 mt-20"></div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
