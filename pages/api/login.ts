// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, client } from "@/lib/neonClient"; // Adjust the import path accordingly
import { compare } from "bcrypt"; // Import the compare function from bcrypt

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      await connectToDatabase(); // Ensure the client is connected

      const query = "SELECT OwnerPassword FROM Owner WHERE OwnerEmail = $1";
      const values = [email];
      const result = await client.query(query, values);

      if (result.rows.length > 0) {
        const hashedPassword = result.rows[0].OwnerPassword; // Get the stored hashed password

        console.log("Entered Password:", password); // Log entered password
        console.log("Hashed Password:", hashedPassword); // Log hashed password

        // Compare the entered password with the hashed password
        const isMatch = await compare(password, hashedPassword);

        if (isMatch) {
          // Create a session or token here (for simplicity, we are just sending a success message)
          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(401).json({ message: "Invalid email or password" });
        }
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      // Do not disconnect here to reuse the connection
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
