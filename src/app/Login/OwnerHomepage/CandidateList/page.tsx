"use client";

import Header from "@/components/ui/Components/HostHeader";
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
import { getCandidates, removeCandidate } from "../../../../../pages/interact";
import { Button } from "@/components/ui/Button";

interface Candidate {
  id: string; // or number if you convert to number
  name: string;
  voteCount: string; // or number if you convert to number
}

const Page = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Specify the type for state

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const fetchedCandidates = await getCandidates(); // Fetch candidates
        console.log("Fetched Candidates:", fetchedCandidates);
        setCandidates(fetchedCandidates); // Set fetched candidates to state
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates(); // Call the fetch function
  }, []); // Runs once when the component mounts

  const handleRemoveCandidate = async (id: string) => {
    try {
      await removeCandidate(parseInt(id)); // Remove candidate from the blockchain
      // Update local state to remove candidate
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate.id !== id)
      );
      console.log("Candidate removed successfully");
    } catch (error) {
      console.error("Error removing candidate:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-5 pb-0">Voting Code: ADSDSDDS</div>
      <div className="flex h-screen justify-center p-10 pt-0">
        <Table>
          <TableCaption>A list of your recent Candidates.</TableCaption>
          <TableHeader className="bg-[#C39898]">
            <TableRow>
              <TableHead className="text-black">Number</TableHead>
              <TableHead className="text-black">Candidate Name</TableHead>
              <TableHead className="text-black">Vote Count</TableHead>
              <TableHead className="text-black">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {candidates.map((candidate: Candidate, index) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>{" "}
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.voteCount}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveCandidate(candidate.id)} // Call the remove function
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
