// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase, client } from "@/lib/neonClient";
// import { getVoters } from "@/lib/voter";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   await connectToDatabase();
//   console.log("I am here", req.method);

//   const { action, formData } = req.body;
//   console.log("Received formData inside api:", formData); // Log the received data
//   console.log("Received action inside api:", action);
//   if (req.method === "POST") {
//     try {
//       if (action === "register") {
//         //debug
//         if (
//           !formData ||
//           !formData.candidateName ||
//           !formData.candidateGender ||
//           !formData.candidatePosition ||
//           !formData.candidateEmail
//         ) {
//           return res.status(400).json({ message: "Missing required fields." });
//         }

//         const insertQuery = `
//           INSERT INTO Candidate (candidateName, candidateGender, candidatePosition, candidateEmail)
//           VALUES ($1, $2, $3, $4) RETURNING cid
//         `;

//         const insertValues = [
//           formData.candidateName,
//           formData.candidateGender,
//           formData.candidatePosition,
//           formData.candidateEmail,
//         ];

//         const result = await client.query(insertQuery, insertValues);

//         return res.status(201).json({
//           message: "Candidate registered successfully!",
//           cid: result.rows[0].cid, // Return the generated cid }
//         });
//       } else if (action === "delete") {
//         console.log("Data received for deletion: ", formData.ids);

//         if (!Array.isArray(formData.ids) || formData.ids.length === 0) {
//           return res
//             .status(400)
//             .json({ message: "No candidate IDs provided for deletion." });
//         }

//         const deleteQuery = "DELETE FROM Candidate WHERE cid = ANY($1)";
//         const deleteValues = [formData.ids];
//         console.log("deleteValues in api: ", formData.ids);

//         await client.query(deleteQuery, deleteValues);

//         console.log("res in dlt: ", res);

//         return res
//           .status(200)
//           .json({ message: "Candidates removed successfully!" });
//       } else {
//         return res.status(400).json({ message: "Invalid action specified." });
//       }
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ message: "An error occurred. Please try again." });
//     }
//   } else if (req.method === "GET") {
//     try {
//       // await connectToDatabase();
//       console.log("I am here", formData);
//       const voters = await getVoters();
//       return res.status(200).json(voters);
//     } catch (error) {
//       console.error("Error retrieving voters:", error);
//       return res
//         .status(500)
//         .json({ message: "Failed to retrieve voters. Please try again." });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default handler;

// // import { NextApiRequest, NextApiResponse } from "next";
// // import { connectToDatabase, client } from "@/lib/neonClient";

// // const handler = async (req: NextApiRequest, res: NextApiResponse) => {
// //   if (req.method === "POST") {
// //     const { action, formData } = req.body;
// //     console.log("Received formData inside api:", formData);
// //     console.log("Received action inside api:", action);
// //     try {
// //       await connectToDatabase();
// //       if (action === "register") {
// //         if (
// //           !formData ||
// //           !formData.index ||
// //           !formData.voterName ||
// //           !formData.voterEmail ||
// //           !formData.status
// //         ) {
// //           return res.status(400).json({ message: "Missing required fields." });
// //         }

// //         const insertQuery = `
// //           INSERT INTO Candidate (candidateName, candidateGender, candidatePosition, candidateEmail)
// //           VALUES ($1, $2, $3, $4) RETURNING cid
// //         `;

// //         const insertValues = [
// //           formData.candidateName,
// //           formData.candidateGender,
// //           formData.candidatePosition,
// //           formData.candidateEmail,
// //         ];

// //         const result = await client.query(insertQuery, insertValues);

// //         return res.status(201).json({
// //           message: "Candidate registered successfully!",
// //           cid: result.rows[0].cid,
// //         });
// //       } else if (action === "delete") {
// //         console.log("Data received for deletion:", formData.ids);

// //         if (!Array.isArray(formData.ids) || formData.ids.length === 0) {
// //           return res
// //             .status(400)
// //             .json({ message: "No candidate IDs provided for deletion." });
// //         }

// //         const deleteQuery = "DELETE FROM Candidate WHERE cid = ANY($1)";
// //         const deleteValues = [formData.ids];
// //         console.log("deleteValues in api:", formData.ids);

// //         await client.query(deleteQuery, deleteValues);

// //         return res
// //           .status(200)
// //           .json({ message: "Candidates removed successfully!" });
// //       } else {
// //         return res.status(400).json({ message: "Invalid action specified." });
// //       }
// //     } catch (error) {
// //       console.error("Error retrieving voters:", error);
// //       return res
// //         .status(500)
// //         .json({ message: "Failed to retrieve voters. Please try again." });
// //     }
// //   } else {
// //     res.setHeader("Allow", ["POST"]);
// //     res.status(405).end(`Method ${req.method} Not Allowed`);
// //   }
// // };

// // export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, client } from "@/lib/neonClient";
import { getVoters } from "@/lib/voter";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  const { action, formData } = req.body;

  if (req.method === "POST") {
    try {
      if (action === "register") {
        if (
          !formData ||
          !formData.candidateName ||
          !formData.candidateGender ||
          !formData.candidatePosition ||
          !formData.candidateEmail
        ) {
          return res.status(400).json({ message: "Missing required fields." });
        }

        const insertQuery = `
          INSERT INTO Candidate (candidateName, candidateGender, candidatePosition, candidateEmail)
          VALUES ($1, $2, $3, $4) RETURNING cid
        `;

        const insertValues = [
          formData.candidateName,
          formData.candidateGender,
          formData.candidatePosition,
          formData.candidateEmail,
        ];

        const result = await client.query(insertQuery, insertValues);

        return res.status(201).json({
          message: "Candidate registered successfully!",
          cid: result.rows[0].cid, // Return the generated cid
        });
      } else if (action === "delete") {
        if (!formData || !formData.ids || formData.ids.length === 0) {
          return res.status(400).json({ message: "No voter IDs provided." });
        }

        const deleteQuery = `
          DELETE FROM Voter WHERE index = ANY($1::int[])
        `;
        const deleteValues = [formData.ids];

        await client.query(deleteQuery, deleteValues);

        return res
          .status(200)
          .json({ message: "Voters removed successfully!" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Error handling the request." });
    }
  } else if (req.method === "GET") {
    try {
      const voters = await getVoters();
      return res.status(200).json(voters);
    } catch (error) {
      return res.status(500).json({ error: "Error retrieving voter data." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
