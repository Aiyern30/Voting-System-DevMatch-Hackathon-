"use client";
import React, { useEffect, useState } from "react";
import GetHost from "@/components/ui/Components/GetHost";
import { Owner } from "@/types/types"; // Adjust the import path according to your project structure
import { Candidate } from "@/types/types"; // Adjust the import path for Candidate

const Page: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  console.log('candidates',candidates)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch('/api/getOwners', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data: Owner[] = await response.json();
        setOwners(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    const fetchCandidates = async () => {
      try {
        const response = await fetch('/api/getCandidates', {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data: Candidate[] = await response.json();
        setCandidates(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    // Fetch both owners and candidates
    fetchOwners();
    fetchCandidates();

    // Set loading to false after both fetch calls
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Election Host</h1>
      <GetHost />
      
      <h2>Owners</h2>
      {owners.map((owner) => (
        <div key={owner.id}>
          <div>Owner ID: {owner.id}</div>
          <div>Email: {owner.owneremail}</div>
          <div>Password: {owner.ownerpassword}</div>
          <div>Status: {owner.status}</div>
        </div>
      ))}

      <h2>Candidates</h2>
      {candidates.map((candidate) => (
        <div key={candidate.candidateid}>
        <div>Candidate ID: {candidate.candidateid}</div>
        <div>Name: {candidate.candidatename}</div>
        <div>IC: {candidate.candidateic}</div>
        <div>Phone Number: {candidate.candidatephonenumber}</div>
        <div>Address: {candidate.candidateaddress}</div>
      </div>
      
      ))}
    </div>
  );
};

export default Page;
