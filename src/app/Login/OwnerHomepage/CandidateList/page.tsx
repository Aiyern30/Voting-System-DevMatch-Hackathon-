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
  TableFooter,
} from "@/components/ui/Table";
import React, { useEffect, useState } from "react";

const candidate = [
  {
    CandidateID: "C0001",
    CandidateName: "Aaron Chia",
    CandidateEmail: "bJNQK@example.com",
  },
];
const page = () => {
  const [candidateInfo, setCandidateInfo] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
      } catch (error) {}
    };
  });

  return (
    <div>
      <Header></Header>
      <div className="p-5 pb-0">Voting Code: ADSDSDDS</div>
      <div className="flex h-screen justify-center  p-10 pt-0">
        <Table>
          <TableCaption>A list of your recent Candidatess.</TableCaption>
          <TableHeader className="bg-[#C39898] ">
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

export default page;
