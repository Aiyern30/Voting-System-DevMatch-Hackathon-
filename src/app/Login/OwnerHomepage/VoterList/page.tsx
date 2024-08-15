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
  status: string;
}

const Page = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: "1", name: "Alice", voteCount: "10", status: "pending" },
    { id: "2", name: "Bob", voteCount: "15", status: "verified" },
    { id: "3", name: "Charlie", voteCount: "7", status: "voted" },
    { id: "4", name: "Jerry", voteCount: "10", status: "pending" },
    { id: "5", name: "Tom", voteCount: "88", status: "pending" },
  ]);

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [errorVerifyVoter, setErrorVerifyVoter] = useState([]);


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
    try {
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) => {
          if (selectedCandidates.includes(candidate.id)) {
            if (candidate.status === "pending") {
              // Update the status to "verified" if the candidate is "pending"
              return { ...candidate, status: "verified" };
            } else {
              // // Set the error for invalid candidates
              // setErrorVerifyVoter((prevErrors) => [
              //   ...prevErrors,
              //   // { id: candidate.id, name: candidate.name },
              // ]);
              // // Log the invalid candidate's id and name
              // console.log(`Invalid candidate: ID=${candidate.id}, Name=${candidate.name}`);
              return candidate;
            }
          }
          return candidate; // If the candidate is not selected, return unchanged
        })
      );
    } catch (err) {
      console.log("An error occurred:", err);
    }
  };
  
    // };

    // prevCandidates.filter((candidate) =>
    //  !selectedCandidates.includes(candidate.id)
    // )
    // );
    // console.log("Verify selected: ", candidates);
  };

  const handleFilter = () => {
    console.log("Filter");
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-500/50"; // Solid orange
      case "verified":
        return "bg-green-50 "; // Solid green
      case "voted":
        return "bg-[#987070] no-hover"; // Solid custom color
      default:
        return "";
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen p-10 pt-10">
        <Table>
          <TableHeader className="bg-[#C39898]">
            <TableRow>
              <TableHead className="text-white text-center"></TableHead>
              <TableHead className="text-white text-center">Number</TableHead>
              <TableHead className="text-white text-center">
                Candidate Name
              </TableHead>
              <TableHead className="text-white text-center">
                Vote Count
              </TableHead>
              <TableHead className="text-white text-center">Status</TableHead>
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
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="text-center">{candidate.name}</TableCell>
                <TableCell className="text-center">
                  {candidate.voteCount}
                </TableCell>
                <TableCell className="text-center">
                  {/* <Button
                    className={`${getStatusClass(
                      candidate.status
                    )} justify-center items-center cursor-default hover:bg-[inherit]`}
                    // disabled
                  > */}
                  <Button
                    variant="add"
                    className={`${getStatusClass(
                      candidate.status
                    )} justify-center items-center cursor-default w-[100px] h-8 px-8 no-hover`}
                    style={{
                      backgroundColor: getStatusClass(candidate.status)
                        .split(" ")[0]
                        .split("-")[1],
                    }}
                    // disabled
                    //the "voted" color is not remain when hover
                  >
                    {candidate.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-center">
          <Button
            className="mx-5 bg-green-500"
            variant="default"
            onClick={handleVerifySelected}
            disabled={selectedCandidates.length === 0}
          >
            Verify
          </Button>
          <Button
            className="mx-5"
            variant="destructive"
            onClick={handleRemoveSelected}
            disabled={selectedCandidates.length === 0}
          >
            Remove Selected
          </Button>
          <Button className="mx-5" variant="secondary" onClick={handleFilter}>
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
