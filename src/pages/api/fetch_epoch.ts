import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('epochs');
    const epoch = await collection.findOne({}, { sort: { $natural: -1 } });
    res.status(200).json({ currentEpoch: epoch ? epoch.epoch : 0 });
    console.log("fetched:" + epoch.epoch)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve current epoch' });
  }
}