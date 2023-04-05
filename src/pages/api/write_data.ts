// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../db';

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase();
  const collection = db.collection('location');

  const data = {
    name: 'The Crypt',
    overview: 'Welcome to "The Crypt", a hidden underground network of tunnels and chambers that serves as a hub for the cypherpunk community in the world of web3. The Crypt is a place of secrecy and intrigue, where hackers, activists, and freedom fighters come together to exchange ideas and plan their next moves.',
    history: 'The history of The Crypt is shrouded in mystery, with rumors of its existence dating back to the early days of the internet. Some say that it was founded by a group of renegade programmers who were disillusioned with the corporate control of the web. Others believe that it was built by a shadowy organization that seeks to use technology to create a new world order.',
    npcs: [
      {
        name: 'The Philosopher',
        description: 'A wise sage who has spent their life contemplating the nature of the internet and the role of technology in society. The Philosopher can offer players quests that involve exploring the deeper questions of the cypherpunk movement and the future of humanity.'
      },
      {
        name: 'The Activist',
        description: 'A passionate advocate for digital rights and freedom. The Activist can offer players quests that involve spreading awareness about censorship and surveillance or staging protests against oppressive governments.'
      },
      {
        name: 'The Trader',
        description: 'A savvy businessperson who deals in cryptocurrency and other decentralized assets. The Trader can offer players quests that involve buying and selling assets or finding ways to invest in new technologies.'
      }
    ]
  };

  try {
    const result = await collection.insertOne(data);
    res.status(200).json({ message: 'Data inserted successfully', result });
  } catch (error) {
    console.error('Error inserting data into MongoDB', error);
    res.status(500).json({ message: 'Error inserting data into MongoDB', error });
  }
}