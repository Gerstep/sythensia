import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase();
  const collection = db.collection('location');

  try {
    const result = await collection.find().toArray();
    res.status(200).json({ message: 'Data queried successfully', result });
  } catch (error) {
    console.error('Error querying data in MongoDB', error);
    res.status(500).json({ message: 'Error qerying data from MongoDB', error });
  }
}