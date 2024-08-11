"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import React, { useState } from "react";
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

type InputKey = "name" | "id" | "gender" | "position" | "email";

const Page = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const [input, setInput] = useState<{
    name: string;
    id: number;
    gender: string;
    position: string;
    email: string;
  }>({
    name: "",
    id: 0,
    gender: "",
    position: "",
    email: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      candidateName: input.name,
      candidateGender: input.gender,
      candidatePosition: input.position,
      candidateEmail: input.email,
      candidateid: input.id,
    };

    try {
      const response = await fetch("/api/setCandidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data: ", data);
        setSubmitSuccess("Submit successful!");

        // Clear the input fields
        setInput({
          name: "",
          id: 0,
          gender: "",
          position: "",
          email: "",
        });

        setTimeout(() => {
          setSubmitSuccess(null);
        }, 3000);
      } else {
        const data = await response.json();
        setSubmitError(data.message);
        setTimeout(() => {
          setSubmitError(null);
        }, 3000);
      }
    } catch (error) {
      setSubmitError("An error occurred. Please try again.");
      setTimeout(() => {
        setSubmitError(null);
      }, 3000);
    }
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
                  className="flex w-full max-w-lg items-center gap-3"
                >
                  <Label
                    htmlFor={label.toLowerCase()}
                    className="w-32 text-lg font-medium whitespace-nowrap"
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
              <div className="flex w-full max-w-lg items-center gap-3">
                <Label
                  htmlFor="gender"
                  className="w-32 text-lg font-medium whitespace-nowrap"
                >
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
                  className="flex w-full max-w-lg items-center gap-3"
                >
                  <Label
                    htmlFor={key}
                    className="w-32 text-lg font-medium whitespace-nowrap"
                  >
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
