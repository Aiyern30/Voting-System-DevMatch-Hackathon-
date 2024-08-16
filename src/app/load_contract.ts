import { ethers } from 'ethers';
import dvs_artifact from '@/DVS/artifacts/contracts/DVS.sol/Voter.json';

function LoadContract() {}

export default LoadContract;

// Ensure 'deployed_address' is not null
const deployedAddress = localStorage.getItem('deployed_address');
if (!deployedAddress) {
    throw new Error('Deployed address not found in localStorage');
}

// Create a provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Initialize contracts
export const contract_reader = new ethers.Contract(deployedAddress, dvs_artifact.abi, provider);
export const contract_writer = new ethers.Contract(deployedAddress, dvs_artifact.abi, signer);
