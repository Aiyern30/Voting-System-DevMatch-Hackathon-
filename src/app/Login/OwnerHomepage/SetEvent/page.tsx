"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import React, { useState } from "react";
import Header from "@/components/ui/Components/HostHeader";

type InputKey = "eventName" | "eventDate";

const Page = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const [input, setInput] = useState<{
    eventName: string;
    eventDate: string;
  }>({
    eventName: "",
    eventDate: "",
  });

  console.log(input.eventDate);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      eventName: input.eventName,
      eventDate: input.eventDate,
    };

    try {
      const response = await fetch("/api/setEvent", {
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

        setInput({
          eventName: "",
          eventDate: "",
        });

        setTimeout(() => {
          setSubmitSuccess(null);
        }, 3000);
      } else {
        const data = await response.json();
        setSubmitError(data.message || "Submission failed. Please try again.");
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
              <div className="flex w-full max-w-lg items-center gap-3">
                <Label
                  htmlFor="eventName"
                  className="w-32 text-lg font-medium whitespace-nowrap"
                >
                  Event Name:
                </Label>
                <Input
                  type="text"
                  id="eventName"
                  placeholder="Enter your event name"
                  className="flex-1 text-lg font-medium"
                  value={input.eventName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex w-full max-w-lg items-center gap-3">
                <Label
                  htmlFor="eventDate"
                  className="w-32 text-lg font-medium whitespace-nowrap"
                >
                  Event Date:
                </Label>
                <Input
                  type="datetime-local"
                  id="eventDate"
                  placeholder="Select Date and Time"
                  className="flex-1 text-lg font-medium"
                  value={input.eventDate}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            <Button
              type="submit"
              variant={"default"}
              className="flex mx-auto bg-[#C39898] text-white rounded-full hover:bg-white hover:text-black p-5"
            >
              Create
            </Button>
            {submitSuccess && (
              <div className="text-green-500 text-center mt-4">
                {submitSuccess}
              </div>
            )}
            {submitError && (
              <div className="text-red-500 text-center mt-4">{submitError}</div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Page;
