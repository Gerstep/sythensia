// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../db';

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase();
  const collection = db.collection('mycollection');

  const data = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 35,
  };

  try {
    const result = await collection.insertOne(data);
    res.status(200).json({ message: 'Data inserted successfully', result });
  } catch (error) {
    console.error('Error inserting data into MongoDB', error);
    res.status(500).json({ message: 'Error inserting data into MongoDB', error });
  }
}
