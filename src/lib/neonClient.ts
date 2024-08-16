// src/lib/neonClient.ts
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL, // Use your NeonDB connection string
  ssl: {
    rejectUnauthorized: false, // This may be required for self-signed certificates
  },
});

let isConnected = false;

const connectToDatabase = async () => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log("Connected to NeonDB");
  }
  return client; // Return the client instance after connecting

};

const disconnectFromDatabase = async () => {
  if (isConnected) {
    await client.end();
    isConnected = false;
    console.log("Disconnected from NeonDB");
  }
};

export { client, connectToDatabase, disconnectFromDatabase };
