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
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

interface Candidate {
  id: string;
  name: string;
  voteCount: string;
}

const Page = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: "1", name: "Alice", voteCount: "10" },
    { id: "2", name: "Bob", voteCount: "15" },
    { id: "3", name: "Charlie", voteCount: "7" },
  ]);

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    setSelectedCandidates((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((candidateId) => candidateId !== id)
        : [...prevSelected, id]
    );
  };

  const handleRemoveSelected = () => {
    setCandidates((prevCandidates) =>
      prevCandidates.filter(
        (candidate) => !selectedCandidates.includes(candidate.id)
      )
    );
    setSelectedCandidates([]); // Clear selection after removal
  };

  const handleVerifySelected = () => {
    console.log("Verify selected");
  };

  const handleFilter = () => {
    console.log("Filter");
  };
  return (
    <div>
      <Header />
      <div className=" flex flex-col h-screen p-10 pt-10">
        <Table>
          <TableHeader className="bg-[#C39898]">
            <TableRow>
              <TableHead className="text-white"></TableHead>
              <TableHead className="text-white">Number</TableHead>
              <TableHead className="text-white">Candidate Name</TableHead>
              <TableHead className="text-white">Vote Count</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {candidates.map((candidate: Candidate, index) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <Checkbox
                    id={`checkbox-${candidate.id}`}
                    onCheckedChange={() => handleCheckboxChange(candidate.id)}
                    checked={selectedCandidates.includes(candidate.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.voteCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-center">
          <Button
            className="mx-5 bg-green-500 "
            variant="default"
            onClick={handleVerifySelected} // Remove selected candidates
            disabled={selectedCandidates.length === 0} // Disable if no candidates selected
          >
            Verify
          </Button>
          <Button
            className="mx-5"
            variant="destructive"
            onClick={handleRemoveSelected} // Remove selected candidates
            disabled={selectedCandidates.length === 0} // Disable if no candidates selected
          >
            Remove Selected
          </Button>
          <Button
            className="mx-5"
            variant="secondary"
            onClick={handleFilter} // Remove selected candidates
            // disabled={selectedCandidates.length === 0} // Disable if no candidates selected
          >
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
