import { X } from "lucide-react";

require("dotenv").config();
const ethers = require("ethers");

const contract_abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "host_",
        type: "address",
      },
    ],
    name: "constructor_",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "resetCount",
        type: "uint256",
      },
    ],
    name: "resetElection_",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "endTime_",
        type: "uint256",
      },
    ],
    name: "setElection_time_",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "string", name: "name", type: "string" },
      {
        indexed: true,
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    name: "vote_",
    type: "event",
  },
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "uint256", name: "id_", type: "uint256" },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "clearTAC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    name: "getCandidates_votecount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getElection_status",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getElection_time",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getResetElection_count",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "id_", type: "uint256" }],
    name: "removeCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "TAC_", type: "uint256" }],
    name: "removeTAC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "resetElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256[]", name: "TAC_", type: "uint256[]" }],
    name: "setTAC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "weeks_", type: "uint256" },
      { internalType: "uint256", name: "days_", type: "uint256" },
      { internalType: "uint256", name: "hours_", type: "uint256" },
      { internalType: "uint256", name: "minutes_", type: "uint256" },
      { internalType: "uint256", name: "seconds_", type: "uint256" },
    ],
    name: "startElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "TAC_", type: "uint256" }],
    name: "updateTAC",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifyTAC",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "index", type: "uint8" }],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
console.log("Private Key:", process.env.NEXT_PUBLIC_PRIVATE_KEY); // For debugging, remove in production

const provider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_API_URL
);

// Function to verify TAC
export async function verifyTAC() {
  const signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    provider
  );
  const DVS = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contract_abi,
    signer
  );

  const result = await DVS.verifyTAC();
  console.log("result", result);

  return result;
}

// Function to add a candidate
export async function addCandidate(name: string, id: number) {
  const signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    provider
  );
  const DVS = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contract_abi,
    signer
  );

  try {
    const tx = await DVS.addCandidate(name, id);
    await tx.wait();
    console.log("Candidate added successfully:", tx);
    return tx;
  } catch (error) {
    console.error("Error calling addCandidate:", error);
    throw error;
  }
}
export async function getElection_time() {
  const signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    provider
  );
  const DVS = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contract_abi,
    signer
  );

  const getElection_time = await DVS.getElection_time();
  console.log("result", getElection_time);

  return getElection_time;
}
export async function getElection_status() {
  const signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    provider
  );
  const DVS = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contract_abi,
    signer
  );

  const getElection_status = await DVS.getElection_status();
  console.log("result", getElection_status);

  return getElection_status;
}
export async function getCandidates_votecount(id: number) {
  const signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    provider
  );
  const DVS = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contract_abi,
    signer
  );

  const voteCount = await DVS.getCandidates_votecount(id);
  console.log("Vote Count for Candidate ID", id, ":", voteCount.toNumber()); // Assuming it's a BigNumber

  return voteCount.toNumber();
}

export async function getResetElection_count() {
  const signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_PRIVATE_KEY,
    provider
  );
  const DVS = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contract_abi,
    signer
  );

  const getResetElection_count = await DVS.getResetElection_count();
  console.log("getResetElection_count", getResetElection_count);

  return getResetElection_count;
}
