"use client";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Header from "@/components/ui/Components/Header";
import React, { useEffect, useState } from "react";

const Page = () => {
  // const candidates = [
  //   {
  //     name: "Soon Wooi Yik",
  //     position: "Manager",
  //     avatar: "https://github.com/shadcn.png",
  //   },
  //   {
  //     name: "Ian",
  //     position: "Developer",
  //     avatar: "https://github.com/shadcn.png",
  //   },
  //   {
  //     name: "Ivan",
  //     position: "Designer",
  //     avatar: "https://github.com/shadcn.png",
  //   },
  //   {
  //     name: "Ivy",
  //     position: "QA Engineer",
  //     avatar: "https://github.com/shadcn.png",
  //   },
  // ];

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch("/api/getCandidates", {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data: Candidate[] = await response.json();

        // Map API response to the Candidate interface
        const mappedCandidates: Candidate[] = data.map((item: any) => ({
          id: item.cid,
          name: item.candidatename,
          email: item.candidateemail,
          gender: item.candidategender,
          position: item.candidateposition,
          voteCount: item.voteCount || "0", // Adjust if voteCount is not part of the response
        }));

        setCandidates(mappedCandidates);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchCandidates(); // Call the fetch function when the component mounts
  }, []); // Runs whenever candidates changes

  return (
    <div>
      <div className="text-center my-8">
        <h2 className="text-3xl font-semibold">Pick a candidate to vote</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center items-center">
        {candidates.map((candidate, index) => (
          <Card
            key={index}
            className=" h-[420px] relative flex justify-center items-center"
          >
            <div className="flex flex-col text-center space-y-2">
              <div className="text-2xl">{candidate.name}</div>
              <div>{candidate.position}</div>
            </div>
            <Avatar className="absolute -top-6 mx-auto w-[120px] h-[120px]">
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button className="bg-[#FF0505] mx-auto absolute bottom-4 px-5 py-3">
              Vote
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default page;
