// lib/neonClient.js
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL, // Use your NeonDB connection string
  ssl: {
    rejectUnauthorized: false, // This may be required for self-signed certificates
  },
});

const connectToDatabase = async () => {
  await client.connect();
  console.log('Connected to NeonDB');
};

const disconnectFromDatabase = async () => {
  await client.end();
  console.log('Disconnected from NeonDB');
};

module.exports = {
  client,
  connectToDatabase,
  disconnectFromDatabase,
};
