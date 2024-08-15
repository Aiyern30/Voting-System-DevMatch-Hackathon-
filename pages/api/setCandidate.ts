// import { NextApiRequest, NextApiResponse } from "next";
// import { connectToDatabase, client } from "@/lib/neonClient";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const {
//       candidateName,
//       candidateGender,
//       candidatePosition,
//       candidateEmail,
//       candidateid,
//     } = req.body;

//     console.log(
//       "Data received: ",

//       candidateName,
//       candidateGender,
//       candidatePosition,
//       candidateEmail,
//       candidateid
//     );

//     try {
//       await connectToDatabase();

//       const existingUserQuery =
//         "SELECT * FROM Candidate WHERE candidateid = $1";
//       const existingUserValues = [candidateid];
//       const existingUserResult = await client.query(
//         existingUserQuery,
//         existingUserValues
//       );

//       if (existingUserResult.rows.length > 0) {
//         return res.status(400).json({ message: "Candidate already exists." });
//       }

//       const insertQuery =
//         "INSERT INTO Candidate (candidateName, candidateGender, candidatePosition, candidateEmail, candidateid ) VALUES ($1, $2, $3, $4, $5)";
//       const insertValues = [
//         candidateName,
//         candidateGender,
//         candidatePosition,
//         candidateEmail,
//         candidateid,
//       ];
//       await client.query(insertQuery, insertValues);

//       return res
//         .status(201)
//         .json({ message: "Candidate registered successfully!" });
//     } catch (error) {
//       console.error("Error inserting candidate:", error);
//       return res
//         .status(500)
//         .json({ message: "An error occurred. Please try again." });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, client } from "@/lib/neonClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const {
      action,
      candidateName,
      candidateGender,
      candidatePosition,
      candidateEmail,
      candidateid,
      ids,
    } = req.body;

    try {
      await connectToDatabase();

      if (action === "register") {
        console.log(
          "Data received for registration: ",
          candidateName,
          candidateGender,
          candidatePosition,
          candidateEmail,
          candidateid
        );

        const existingUserQuery =
          "SELECT * FROM Candidate WHERE candidateid = $1";
        const existingUserValues = [candidateid];
        const existingUserResult = await client.query(
          existingUserQuery,
          existingUserValues
        );

        if (existingUserResult.rows.length > 0) {
          return res.status(400).json({ message: "Candidate already exists." });
        }

        const insertQuery =
          "INSERT INTO Candidate (candidateName, candidateGender, candidatePosition, candidateEmail, candidateid) VALUES ($1, $2, $3, $4, $5)";
        const insertValues = [
          candidateName,
          candidateGender,
          candidatePosition,
          candidateEmail,
          candidateid,
        ];
        await client.query(insertQuery, insertValues);

        return res
          .status(201)
          .json({ message: "Candidate registered successfully!" });
      } else if (action === "delete") {
        console.log("Data received for deletion: ", ids);

        if (!Array.isArray(ids) || ids.length === 0) {
          return res
            .status(400)
            .json({ message: "No candidate IDs provided for deletion." });
        }

        const deleteQuery = "DELETE FROM Candidate WHERE candidateid = ANY($1)";
        const deleteValues = [ids];
        await client.query(deleteQuery, deleteValues);

        return res
          .status(200)
          .json({ message: "Candidates removed successfully!" });
      } else {
        return res.status(400).json({ message: "Invalid action specified." });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      return res
        .status(500)
        .json({ message: "An error occurred. Please try again." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
