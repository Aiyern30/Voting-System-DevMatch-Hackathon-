"use client";

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
// import React, { useState } from "react";
// import { Button } from "@/components/ui/Button";
// import { Checkbox } from "@/components/ui/Checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/Form";

// interface Candidate {
//   id: string;
//   name: string;
//   voteCount: string;
//   status: string;
// }

// const Page = () => {
//   const [candidates, setCandidates] = useState<Candidate[]>([
//     { id: "1", name: "Alice", voteCount: "10", status: "pending" },
//     { id: "2", name: "Bob", voteCount: "15", status: "verified" },
//     { id: "3", name: "Charlie", voteCount: "7", status: "voted" },
//     { id: "4", name: "Jerry", voteCount: "10", status: "pending" },
//     { id: "5", name: "Tom", voteCount: "88", status: "pending" },
//   ]);

//   const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
//   const [errorVerifyVoter, setErrorVerifyVoter] = useState([]);
//   const [filterStatus, setFilterStatus] = useState<string>("all"); // Default to showing all candidates

//   const handleCheckboxChange = (id: string) => {
//     setSelectedCandidates((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((candidateId) => candidateId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   const handleRemoveSelected = () => {
//     setCandidates((prevCandidates) =>
//       prevCandidates.filter(
//         (candidate) => !selectedCandidates.includes(candidate.id)
//       )
//     );
//     setSelectedCandidates([]); // Clear selection after removal
//   };

//   const handleVerifySelected = () => {
//     try {
//       setCandidates((prevCandidates) =>
//         prevCandidates.map((candidate) => {
//           if (selectedCandidates.includes(candidate.id)) {
//             if (candidate.status === "pending") {
//               // Update the status to "verified" if the candidate is "pending"
//               console.log("Verify selected: ", ...candidates);
//               return { ...candidate, status: "verified" };
//             } else {
//               return candidate;
//             }
//           }
//           return candidate; // If the candidate is not selected, return unchanged
//         })
//       );
//     } catch (err) {
//       console.log("An error occurred:", err);
//     }
//   };

//   const handleFilter = (status: string) => {
//     setFilterStatus(status);
//     console.log("Filter status: ", filterStatus);
//   };

//   const getStatusClass = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-orange-500/50"; // Solid orange
//       case "verified":
//         return "bg-green-50 "; // Solid green
//       case "voted":
//         return "bg-[#987070] no-hover"; // Solid custom color
//       default:
//         return "";
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col h-screen p-10 pt-10">
//         <Table>
//           <TableHeader className="bg-[#C39898]">
//             <TableRow>
//               <TableHead className="text-white text-center"></TableHead>
//               <TableHead className="text-white text-center">Number</TableHead>
//               <TableHead className="text-white text-center">
//                 Candidate Name
//               </TableHead>
//               <TableHead className="text-white text-center">
//                 Vote Count
//               </TableHead>
//               <TableHead className="text-white text-center">Status</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody className="bg-white">
//             {candidates.map((candidate: Candidate, index) => (
//               <TableRow key={candidate.id}>
//                 <TableCell>
//                   <Checkbox
//                     id={`checkbox-${candidate.id}`}
//                     onCheckedChange={() => handleCheckboxChange(candidate.id)}
//                     checked={selectedCandidates.includes(candidate.id)}
//                   />
//                 </TableCell>
//                 <TableCell className="font-medium text-center">
//                   {index + 1}
//                 </TableCell>
//                 <TableCell className="text-center">{candidate.name}</TableCell>
//                 <TableCell className="text-center">
//                   {candidate.voteCount}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {/* <Button
//                     className={`${getStatusClass(
//                       candidate.status
//                     )} justify-center items-center cursor-default hover:bg-[inherit]`}
//                     // disabled
//                   > */}
//                   <Button
//                     variant="add"
//                     className={`${getStatusClass(
//                       candidate.status
//                     )} justify-center items-center cursor-default w-[100px] h-8 px-8 no-hover`}
//                     style={{
//                       backgroundColor: getStatusClass(candidate.status)
//                         .split(" ")[0]
//                         .split("-")[1],
//                     }}
//                   >
//                     {candidate.status}
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <div className="mt-4 flex justify-center">
//           <Button
//             className="mx-5 bg-green-500"
//             variant="default"
//             onClick={handleVerifySelected}
//             disabled={selectedCandidates.length === 0}
//           >
//             Verify
//           </Button>
//           <Button
//             className="mx-5"
//             variant="destructive"
//             onClick={handleRemoveSelected}
//             disabled={selectedCandidates.length === 0}
//           >
//             Remove Selected
//           </Button>
//           <Button className="mx-5" variant="secondary" onClick={handleFilter}>
//             Filter
//           </Button>
//         </div>
//         {/* create a checkbox list for the status filter */}
//         <div>
//           <div className="mb-4 flex justify-center">
//             <Button
//               className={`mx-2 ${
//                 filterStatus === "all" ? "bg-blue-500 text-white" : ""
//               }`}
//               onClick={() => handleFilter("all")}
//             >
//               All
//             </Button>
//             <Button
//               className={`mx-2 ${
//                 filterStatus === "pending" ? "bg-blue-500 text-white" : ""
//               }`}
//               onClick={() => handleFilter("pending")}
//             >
//               Pending
//             </Button>
//             <Button
//               className={`mx-2 ${
//                 filterStatus === "verified" ? "bg-blue-500 text-white" : ""
//               }`}
//               onClick={() => handleFilter("verified")}
//             >
//               Verified
//             </Button>
//             <Button
//               className={`mx-2 ${
//                 filterStatus === "voted" ? "bg-blue-500 text-white" : ""
//               }`}
//               onClick={() => handleFilter("voted")}
//             >
//               Voted
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

import React, { useState } from "react";
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
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const statusOptions = ["pending", "verified", "voted"];

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
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) => {
        if (selectedCandidates.includes(candidate.id)) {
          if (candidate.status === "pending") {
            return { ...candidate, status: "verified" };
          }
        }
        return candidate;
      })
    );
  };

  const handleFilter = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleFilterChange = (status: string) => {
    setSelectedFilters((prevSelected) =>
      prevSelected.includes(status)
        ? prevSelected.filter((item) => item !== status)
        : [...prevSelected, status]
    );
    // Hide the dropdown after selecting an option
    setShowDropdown(false);
  };

  const handleFilterClear = (status: string) => {
    setSelectedFilters([]);
    // Hide the dropdown after selecting an option
    setShowDropdown(false);
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

  const filteredCandidates = candidates.filter((candidate) =>
    selectedFilters.length === 0
      ? true
      : selectedFilters.includes(candidate.status)
  );

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
            {filteredCandidates.map((candidate: Candidate, index) => (
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
          <div className="relative">
            <Button className="mx-5" variant="secondary" onClick={handleFilter}>
              Filter
            </Button>
            {showDropdown && (
              <div className="absolute top-10 mt-2 left-0 w-48 bg-white border border-gray-300 rounded shadow-lg z-10 w-full">
                {statusOptions.map((status) => (
                  <label key={status} className="flex items-center p-2">
                    <Checkbox
                      checked={selectedFilters.includes(status)}
                      onCheckedChange={() => handleFilterChange(status)}
                    />
                    <span className="ml-2">{status}</span>
                  </label>
                ))}
                <Button
                  className="w-full"
                  disabled={selectedFilters.length === 0}
                  onClick={handleFilterClear}
                >
                  Clear Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
