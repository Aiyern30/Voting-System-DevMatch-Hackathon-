// interact.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// For Hardhat
const contract = require("../artifacts/contracts/DVS_v1.sol/Election.json");

// ethers.js
const ethers = require("ethers");

// Provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const ElectionContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function getHost() {
  try {
    const host = await ElectionContract.getHost();
    return host;
  } catch (error) {
    throw new Error("Failed to fetch host");
  }
}

module.exports = { getHost };
