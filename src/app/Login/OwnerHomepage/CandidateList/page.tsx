// "use client";

// import Header from "@/components/ui/Components/HostHeader";
// import {
//   Table,
//   TableCaption,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/Table";
// import React, { useEffect, useState } from "react";
// import { getCandidates, removeCandidate } from "../../../../../pages/interact";
// import { Button } from "@/components/ui/Button";
// import { Checkbox } from "@/components/ui/Checkbox";

// interface Candidate {
//   id: string; // or number if you convert to number
//   name: string;
//   voteCount: string; // or number if you convert to number
// }

// const Page = () => {
//   // const [candidates, setCandidates] = useState<Candidate[]>([]); // Specify the type for state

//   // Hardcoded candidates data
//   const [candidates, setCandidates] = useState<Candidate[]>([
//     { id: "1", name: "Alice", voteCount: "10" },
//     { id: "2", name: "Bob", voteCount: "15" },
//     { id: "3", name: "Charlie", voteCount: "7" },
//   ]); // Specify the type for state
//   const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

//   // useEffect(() => {
//   //   const fetchCandidates = async () => {
//   //     try {
//   //       const fetchedCandidates = await getCandidates(); // Fetch candidates
//   //       console.log("Fetched Candidates:", fetchedCandidates);
//   //       setCandidates(fetchedCandidates); // Set fetched candidates to state
//   //     } catch (error) {
//   //       console.error("Error fetching candidates:", error);
//   //     }
//   //   };

//   //   fetchCandidates(); // Call the fetch function
//   // }, []); // Runs once when the component mounts

//   // const handleRemoveCandidate = async (id: string) => {
//   //   try {

//   //     // Update local state to remove candidate
//   //     setCandidates((prevCandidates) =>
//   //       prevCandidates.filter((candidate) => candidate.id !== id)
//   //     );
//   //     console.log("Candidate removed successfully");
//   //   } catch (error) {
//   //     console.error("Error removing candidate:", error);
//   //   }
//   // };

//   const handleRemoveCandidate = () => {
//     setCandidates((prevCandidates) =>
//       prevCandidates.filter(
//         (candidate) => !selectedCandidates.includes(candidate.id)
//       )
//     );
//     setSelectedCandidates([]); // Clear selection after removal
//   };

//   return (
//     <div>
//       <Header />
//       <div className="p-5 pb-0">Voting Code: ADSDSDDS</div>
//       <div className="flex h-screen justify-center p-10 pt-0">
//         <Table>
//           <TableCaption>A list of your recent Candidates.</TableCaption>
//           <TableHeader className="bg-[#C39898]">
//             <TableRow>
//               <TableHead className="text-black"> </TableHead>
//               <TableHead className="text-black">Number</TableHead>
//               <TableHead className="text-black">Candidate Name</TableHead>
//               <TableHead className="text-black">Vote Count</TableHead>
//               {/* <TableHead className="text-black">Action</TableHead> */}
//             </TableRow>
//           </TableHeader>

//           <TableBody className="bg-white">
//             {candidates.map((candidate: Candidate, index) => (
//               <TableRow key={candidate.id}>
//                 <TableCell>
//                   <Checkbox id={`checkbox-${candidate.id}`} />{" "}
//                 </TableCell>
//                 <TableCell className="font-medium">{index + 1}</TableCell>{" "}
//                 <TableCell>{candidate.name}</TableCell>
//                 <TableCell>{candidate.voteCount}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <div className="mt-4 flex justify-center">
//           <Button
//             variant="destructive"
//             // onClick={handleRemoveCandidate}
//             onClick={handleRemoveCandidate} // Remove selected candidates
//             disabled={selectedCandidates.length === 0} // Disable if no candidates selected
//           >
//             Remove
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

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

  return (
    <div>
      <Header />
      <div className="p-5 pb-0 flex justify-end items-center">
        {/* <div>Voting Code: ADSDSDDS</div> */}
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
            variant="destructive"
            onClick={handleRemoveSelected} // Remove selected candidates
            disabled={selectedCandidates.length === 0} // Disable if no candidates selected
          >
            Remove Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
