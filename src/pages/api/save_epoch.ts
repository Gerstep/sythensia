import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { epoch } = req.body;

  try {
    const db = await connectToDatabase();
    const collection = db.collection('epochs');
    const result = await collection.insertOne({ epoch: epoch });
    res.status(201).json({ message: "Epoch saved successfully", data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}