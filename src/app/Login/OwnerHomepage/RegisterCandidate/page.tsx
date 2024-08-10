"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import React, { useState } from "react";
import { addCandidate } from "../../../../../pages/interact";
import Header from "@/components/ui/Components/Header";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

// Define a type for the input keys
type InputKey = "name" | "id" | "gender" | "position" | "email" | "picture";

const Page = () => {
  const [input, setInput] = useState<{
    name: string;
    id: number;
    gender: string;
    position: string;
    email: string;
    picture: string;
  }>({
    name: "",
    id: 0,
    gender: "",
    position: "",
    email: "",
    picture: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: id === "id" ? parseInt(value) : value,
    }));
  };

  const handleGenderChange = (value: string) => {
    setInput((prevInput) => ({
      ...prevInput,
      gender: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prevInput) => ({
        ...prevInput,
        picture: file.name, // or store the file object itself if needed
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", input);

    // try {
    //   const tx = await addCandidate(input.name, input.id);
    //   console.log("Candidate added successfully:", tx);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <div>
      <Header />
      <div className="flex h-screen justify-center items-center">
        <Card className="bg-transparent border-0 shadow-none relative">
          <form onSubmit={handleSubmit}>
            <CardContent className="flex flex-col space-y-3 text-lg font-medium">
              {[
                { label: "Id", type: "number", placeholder: "Enter your ID" },
                { label: "Name", type: "text", placeholder: "Enter your name" },
              ].map(({ label, type, placeholder }, index) => (
                <div
                  key={index}
                  className="flex w-full max-w-lg items-center gap-1"
                >
                  <Label
                    htmlFor={label.toLowerCase()}
                    className="flex-1 text-lg font-medium"
                  >
                    {label}:
                  </Label>
                  <Input
                    type={type}
                    id={label.toLowerCase()}
                    placeholder={placeholder}
                    className="flex-1 text-lg font-medium"
                    value={input[label.toLowerCase() as InputKey]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="flex w-full max-w-lg items-center gap-1">
                <Label htmlFor="gender" className="flex-1 text-lg font-medium">
                  Gender:
                </Label>
                <Select onValueChange={handleGenderChange}>
                  <SelectTrigger className="flex-1 text-lg font-medium">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {[
                {
                  label: "Position",
                  type: "text",
                  placeholder: "Enter your position",
                  key: "position",
                },
                {
                  label: "Email Address",
                  type: "email",
                  placeholder: "Enter your email address",
                  key: "email",
                },
              ].map(({ label, type, placeholder, key }, index) => (
                <div
                  key={index}
                  className="flex w-full max-w-lg items-center gap-1"
                >
                  <Label htmlFor={key} className="flex-1 text-lg font-medium">
                    {label}:
                  </Label>
                  <Input
                    type={type}
                    id={key}
                    placeholder={placeholder}
                    className="flex-1 text-lg font-medium"
                    value={input[key as "position" | "email"]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="flex w-full max-w-lg items-center gap-1">
                <Label htmlFor="picture" className="flex-1 text-lg font-medium">
                  Picture:
                </Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.png"
                  className="flex-1 text-lg font-medium p-3"
                />
              </div>
            </CardContent>
            <Button
              type="submit"
              variant={"default"}
              className="flex mx-auto bg-[#C39898] text-white rounded-full hover:bg-white hover:text-black p-5"
            >
              Register
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Page;
