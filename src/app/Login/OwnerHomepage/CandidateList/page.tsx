"use client";

import Header from "@/components/ui/Components/Header";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import React, { useEffect, useState } from "react";

const candidate = [
  {
    CandidateID: "C0001",
    CandidateName: "Aaron Chia",
    CandidateEmail: "bJNQK@example.com",
  },
];

const Page = () => {
  const [candidateInfo, setCandidateInfo] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Your API call logic here
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      <Header />
      <div className="p-5 pb-0">Voting Code: ADSDSDDS</div>
      <div className="flex h-screen justify-center p-10 pt-0">
        <Table>
          <TableCaption>A list of your recent Candidates.</TableCaption>
          <TableHeader className="bg-[#C39898]">
            <TableRow>
              <TableHead className="text-black">Candidate ID</TableHead>
              <TableHead className="text-black">Candidate Name</TableHead>
              <TableHead className="text-black">Email Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {candidate.map((Candidates) => (
              <TableRow key={Candidates.CandidateID}>
                <TableCell className="font-medium">
                  {Candidates.CandidateID}
                </TableCell>
                <TableCell>{Candidates.CandidateName}</TableCell>
                <TableCell>{Candidates.CandidateEmail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
