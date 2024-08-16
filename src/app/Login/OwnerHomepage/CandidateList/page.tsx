"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/ui/Components/HostHeader";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useRouter } from "next/navigation";
import { getCandidates } from "@/lib/candidate";
// import { getCandidates } from "../../../../../pages/interact";

interface Candidate {
  id: string; // or use candidateid if preferred
  name: string; // or use candidatename if preferred
  email?: string; // Add optional properties if needed
  gender?: string;
  position?: string;
  voteCount?: string; // Include other properties if needed
}

const Page = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Initialize state with empty array
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  const handleCheckboxChange = (id: string) => {
    // setSelectedCandidates((prevSelected) =>
    //   prevSelected.includes(id)
    //     ? prevSelected.filter((candidateId) => candidateId !== id)
    //     : [...prevSelected, id]
    // );
    setSelectedCandidates((prevSelected) => {
      const newSelection = prevSelected.includes(id)
        ? prevSelected.filter((candidateId) => candidateId !== id)
        : [...prevSelected, id];

      return newSelection;
    });
  };

  const handleRemoveSelected = async () => {
    try {
      const response = await fetch("/api/setCandidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete",
          formData: { ids: selectedCandidates },
        }),
      });
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.message); // Handle success message

      // Remove deleted candidates from state
      setCandidates((prevCandidates) =>
        prevCandidates.filter(
          (candidate) => !selectedCandidates.includes(candidate.id)
        )
      );
      setSelectedCandidates([]); // Clear selection after removal
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-5 pb-0 flex justify-end items-center">
        <a href="/Login/OwnerHomepage/RegisterCandidate">
          <Button
            variant="ghost"
            className="bg-[#987070] text-white border border-[#2A2929] ml-auto mx-5 mb-5"
          >
            Register Candidate
          </Button>
        </a>
      </div>

      <div className="flex flex-col h-screen p-10 pt-0">
        <Table>
          <TableHeader className="bg-[#C39898]">
            <TableRow>
              <TableHead className="text-white"></TableHead>
              <TableHead className="text-white">Id</TableHead>
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
                <TableCell className="font-medium">{candidate.id}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.voteCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-center">
          <Button
            variant="destructive"
            onClick={handleRemoveSelected}
            disabled={selectedCandidates.length === 0}
          >
            Remove Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
