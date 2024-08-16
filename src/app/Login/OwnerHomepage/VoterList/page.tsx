// "use client";

// import React, { useEffect, useState } from "react";
// import Header from "@/components/ui/Components/HostHeader";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/Table";
// import { Button } from "@/components/ui/Button";
// import { Checkbox } from "@/components/ui/Checkbox";
// import { useRouter } from "next/navigation";

// interface Voter {
//   index: string;
//   tac: string;
//   email: string;
//   status: string;
// }

// const Page = () => {
//   const [voters, setVoters] = useState<Voter[]>([]); // Initialize state with empty array
//   const [error, setError] = useState<string | null>(null);
//   const [selectedVoters, setSelectedVoters] = useState<string[]>([]);
//   const [showDropdown, setShowDropdown] = useState<boolean>(false);
//   const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
//   const statusOptions = ["pending", "verified", "voted"];

//   useEffect(() => {
//     const fetchVoters = async () => {
//       try {
//         const response = await fetch("/api/voter", {
//           method: "GET",
//           headers: {
//             "Cache-Control": "no-cache",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(
//             `Network response was not ok: ${response.statusText}`
//           );
//         }

//         const data: Voter[] = await response.json();
//         // Map API response to the Candidate interface
//         const mappedVoters: Voter[] = data.map((item: any) => ({
//           index: item.index,
//           tac: item.votertac,
//           email: item.voteremail,
//           status: item.status,
//         }));

//         console.log("data: ", data);
//         setVoters(mappedVoters);
//       } catch (error) {
//         setError((error as Error).message);
//       }
//     };

//     fetchVoters();
//   }, []);

//   const handleCheckboxChange = (id: string) => {
//     // setSelectedVoters((prevSelected) =>
//     //   prevSelected.includes(id)
//     //     ? prevSelected.filter((candidateId) => candidateId !== id)
//     //     : [...prevSelected, id]
//     // );
//   };

//   const handleRemoveSelected = () => {
//     // setVoters((prevCandidates) =>
//     //   prevCandidates.filter(
//     //     (voter) => !selectedVoters.includes(voter.id)
//     //   )
//     // );
//     // setSelectedVoters([]); // Clear selection after removal
//   };

//   const handleVerifySelected = () => {
//     // setVoters((prevCandidates) =>
//     //   prevCandidates.map((voter) => {
//     //     if (selectedVoters.includes(voter.id)) {
//     //       if (voter.status === "pending") {
//     //         return { ...voter, status: "verified" };
//     //       }
//     //     }
//     //     return voter;
//     //   })
//     // );
//   };

//   const handleFilter = () => {
//     setShowDropdown((prevShowDropdown) => !prevShowDropdown);
//   };

//   const handleFilterChange = (status: string) => {
//     setSelectedFilters((prevSelected) =>
//       prevSelected.includes(status)
//         ? prevSelected.filter((item) => item !== status)
//         : [...prevSelected, status]
//     );
//     // Hide the dropdown after selecting an option
//     setShowDropdown(false);
//   };

//   const handleFilterClear = () => {
//     setSelectedFilters([]);
//     // Hide the dropdown after selecting an option
//     setShowDropdown(false);
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

//   const filteredVoters = voters.filter((voter) =>
//     selectedFilters.length === 0 ? true : selectedFilters.includes(voter.status)
//   );

//   return (
//     <div>
//       <Header />
//       <div className="flex flex-col h-screen p-10 pt-10">
//         <Table>
//           <TableHeader className="bg-[#C39898]">
//             <TableRow>
//               <TableHead className="text-white text-center"></TableHead>
//               <TableHead className="text-white text-center">Index</TableHead>
//               <TableHead className="text-white text-center">TAC</TableHead>
//               <TableHead className="text-white text-center">Email</TableHead>
//               <TableHead className="text-white text-center">Status</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody className="bg-white">
//             {voters.map((voter: Voter, index) => (
//               <TableRow key={voter.index}>
//                 <TableCell>
//                   <Checkbox
//                     id={`checkbox-${voter.index}`}
//                     onCheckedChange={() => handleCheckboxChange(voter.index)}
//                     checked={selectedVoters.includes(voter.index)}
//                   />
//                 </TableCell>
//                 <TableCell className="font-medium text-center">
//                   {voter.index}
//                 </TableCell>
//                 <TableCell className="text-center">{voter.tac}</TableCell>
//                 <TableCell className="text-center">{voter.email}</TableCell>
//                 <TableCell className="text-center">
//                   <Button
//                     variant="add"
//                     className={`${getStatusClass(
//                       voter.status
//                     )} justify-center items-center cursor-default w-[100px] h-8 px-8 no-hover`}
//                     style={{
//                       backgroundColor: getStatusClass(voter.status)
//                         .split(" ")[0]
//                         .split("-")[1],
//                     }}
//                   >
//                     {voter.status}
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
//             disabled={selectedVoters.length === 0}
//           >
//             Verify
//           </Button>
//           <Button
//             className="mx-5"
//             variant="destructive"
//             onClick={handleRemoveSelected}
//             disabled={selectedVoters.length === 0}
//           >
//             Remove Selected
//           </Button>
//           <div className="relative">
//             <Button className="mx-5" variant="secondary" onClick={handleFilter}>
//               Filter
//             </Button>
//             {showDropdown && (
//               <div className="absolute top-10 mt-2 left-0  bg-white border border-gray-300 rounded shadow-lg z-10 w-full">
//                 {statusOptions.map((status) => (
//                   <label key={status} className="flex items-center p-2">
//                     <Checkbox
//                       checked={selectedFilters.includes(status)}
//                       onCheckedChange={() => handleFilterChange(status)}
//                     />
//                     <span className="ml-2">{status}</span>
//                   </label>
//                 ))}
//                 <Button
//                   className="w-full"
//                   disabled={selectedFilters.length === 0}
//                   onClick={handleFilterClear}
//                 >
//                   Clear Filter
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

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

interface Voter {
  index: string;
  tac: string;
  email: string;
  status: string;
}

const Page = () => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedVoters, setSelectedVoters] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const statusOptions = ["pending", "verified", "voted"];

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await fetch("/api/voter", {
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

        const data: Voter[] = await response.json();
        const mappedVoters: Voter[] = data.map((item: any) => ({
          index: item.index,
          tac: item.votertac,
          email: item.voteremail,
          status: item.status,
        }));

        setVoters(mappedVoters);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchVoters();
  }, []);

  const handleCheckboxChange = (id: string) => {
    setSelectedVoters((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((voterId) => voterId !== id)
        : [...prevSelected, id]
    );
  };

  const handleRemoveSelected = async () => {
    try {
      const response = await fetch("/api/voter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "delete",
          formData: { ids: selectedVoters },
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to remove selected voters: ${response.statusText}`
        );
      }

      setVoters((prevVoters) =>
        prevVoters.filter((voter) => !selectedVoters.includes(voter.index))
      );
      setSelectedVoters([]); // Clear selection after removal
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleVerifySelected = () => {
    setVoters((prevVoters) =>
      prevVoters.map((voter) => {
        if (
          selectedVoters.includes(voter.index) &&
          voter.status === "pending"
        ) {
          return { ...voter, status: "verified" };
        }
        return voter;
      })
    );
    setSelectedVoters([]);
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
    setShowDropdown(false);
  };

  const handleFilterClear = () => {
    setSelectedFilters([]);
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

  const filteredVoters = voters.filter((voter) =>
    selectedFilters.length === 0 ? true : selectedFilters.includes(voter.status)
  );

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen p-10 pt-10">
        <Table>
          <TableHeader className="bg-[#C39898]">
            <TableRow>
              <TableHead className="text-white text-center"></TableHead>
              <TableHead className="text-white text-center">Index</TableHead>
              <TableHead className="text-white text-center">TAC</TableHead>
              <TableHead className="text-white text-center">Email</TableHead>
              <TableHead className="text-white text-center">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-white">
            {filteredVoters.map((voter: Voter, index) => (
              <TableRow key={voter.index}>
                <TableCell>
                  <Checkbox
                    id={`checkbox-${voter.index}`}
                    onCheckedChange={() => handleCheckboxChange(voter.index)}
                    checked={selectedVoters.includes(voter.index)}
                  />
                </TableCell>
                <TableCell className="font-medium text-center">
                  {voter.index}
                </TableCell>
                <TableCell className="text-center">{voter.tac}</TableCell>
                <TableCell className="text-center">{voter.email}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="add"
                    className={`${getStatusClass(
                      voter.status
                    )} justify-center items-center cursor-default w-[100px] h-8 px-8 no-hover`}
                    style={{
                      backgroundColor: getStatusClass(voter.status)
                        .split(" ")[0]
                        .split("-")[1],
                    }}
                  >
                    {voter.status}
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
            disabled={selectedVoters.length === 0}
          >
            Verify
          </Button>
          <Button
            className="mx-5"
            variant="destructive"
            onClick={handleRemoveSelected}
            disabled={selectedVoters.length === 0}
          >
            Remove Selected
          </Button>
          <div className="relative">
            <Button className="mx-5" variant="secondary" onClick={handleFilter}>
              Filter
            </Button>
            {showDropdown && (
              <div className="absolute top-10 mt-2 left-0 bg-white border border-gray-300 rounded shadow-lg z-10 w-full">
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
