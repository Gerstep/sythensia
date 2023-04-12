import type { NextApiRequest, NextApiResponse } from "next";
import { extractArray, advanceAgent } from "../../utils/chain";

export interface ChainAPIRequest extends NextApiRequest {
  body: {
    goal: string;
    options: string;
  };
}

export interface ChainAPIResponse extends NextApiResponse {
  body: { tasks: string[] };
}

export default async function handler(
  req: ChainAPIRequest,
  res: ChainAPIResponse
) {
  const completion = await advanceAgent(req.body.goal, req.body.options);
  console.log(completion.text);
  res.status(200).json({ response: completion.text as string });
}