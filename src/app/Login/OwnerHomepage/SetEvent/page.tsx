"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Components/HostHeader";
import { contract_reader,contract_writer } from "@/app/load_contract";

type InputKey = "eventName" | "eventDate";

const Page = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [electionTime, setElectionTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchElectionTime = async () => {
      try {
        const data = await contract_reader.getElection_time();
        const timeInSeconds = Number(data); // Ensure it's a number
        localStorage.setItem('election_time', timeInSeconds.toString());
        setElectionTime(timeInSeconds);
      } catch (error) {
        console.error("Error fetching election time:", error);
        setError("Failed to fetch election time.");
      }
    };

    fetchElectionTime();
  }, []);

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
  
    // Convert the eventDate into weeks, days, hours, minutes, and seconds
    // Here is a simplistic example of how you might calculate these values
    const eventDate = new Date(input.eventDate);
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
  console.log(difference)
    try {

      
      await contract_writer.startElection(weeks, days % 7, hours % 24, minutes % 60, seconds % 60);
      setSubmitSuccess("Election started successfully!");
  
      setInput({
        eventName: "",
        eventDate: "",
      });
  
      setTimeout(() => {
        setSubmitSuccess(null);
      }, 3000);
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
        {electionTime != null ? <Card className="bg-transparent border-0 shadow-none relative">
          <div>Event Started</div>
          <Button
              type="submit"
              variant={"default"}
              className="flex mx-auto bg-[#C39898] text-white rounded-full hover:bg-white hover:text-black p-5"
            >
              Reset
            </Button>
        </Card> : <Card className="bg-transparent border-0 shadow-none relative">
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
        </Card>}
        

        
      </div>
    </div>
  );
};

export default Page;
