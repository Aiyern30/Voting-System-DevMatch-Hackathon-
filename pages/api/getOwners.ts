// pages/api/getOwners.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getOwners } from '@/lib/owner';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API route hit'); // Add this line to check if the route is being called
  try {
    const owners = await getOwners(); // Fetch owners from the database
    console.log('Owners fetched:', owners); // Log the fetched owners

    res.status(200).json(owners); // Respond with the owners data
  } catch (error) {
    console.error('Error fetching owners:', error);
    res.status(500).json({ error: 'Error fetching owners' }); // Handle errors
  }
}
