"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import React, { useState } from "react";
import { addCandidate } from "../../../../../pages/interact";

// Define a type for the input keys
type InputKey = "name" | "id";

const Page = () => {
  const [input, setInput] = useState({
    name: "",
    id: 0,
  });

  console.log(input);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInput(
      (prevInput) =>
        ({
          ...prevInput,
          [id]: id === "id" ? parseInt(value) : value,
        } as { [K in InputKey]: K extends "id" ? number : string })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", input);

    try {
      const tx = await addCandidate(input.name, input.id);
      console.log("Candidate added successfully:", tx);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="bg-transparent border-0 shadow-none relative">
        <form onSubmit={handleSubmit}>
          <CardContent className="flex ">
            <div className="flex flex-col space-y-3">
              {[
                { label: "Name", type: "text", placeholder: "Enter your name" },
                { label: "id", type: "number", placeholder: "Enter your ID" },
              ].map(({ label, type, placeholder }, index) => (
                <div
                  key={index}
                  className="flex w-full max-w-lg items-center gap-1"
                >
                  <Label htmlFor={label.toLowerCase()} className="flex-1">
                    {label}:
                  </Label>
                  <Input
                    type={type}
                    id={label.toLowerCase()}
                    placeholder={placeholder}
                    className="flex-1"
                    value={input[label.toLowerCase() as InputKey]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <Button
            type="submit"
            variant={"default"}
            className="absolute -bottom-5 right-10"
          >
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Page;
