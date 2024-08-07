import type { NextApiRequest, NextApiResponse } from "next";
import { getHost } from "../../../../pages/interact";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const host = await getHost();
    res.status(200).json({ host });
  } catch (error: any) {
    // Explicitly type the error as any to handle it properly
    res.status(500).json({ error: error.message });
  }
}
