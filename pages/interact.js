require('dotenv').config();
const ethers = require('ethers');

const contract_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getHost","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUsers","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"logUser","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint8","name":"id","type":"uint8"}],"name":"setID","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_API_URL);

async function main() {
    const DVS = new ethers.Contract('0xc97a6Cac4EcDBDf7c07CD229259e3d6B743ee99b', contract_abi, provider);

    const Host = await DVS.getHost();
    console.log(Host);
}

main(); 