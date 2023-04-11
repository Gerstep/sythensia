import type { NextApiRequest } from "next";
import type { NextApiResponse } from "next";

import {
  summarizeAgent,
  extractArray,
} from "../../utils/chain";

export interface SummarizeAPIRequest extends NextApiRequest {
  body: {
    task: string;
  };
}

export interface SummarizeAPIResponse extends NextApiResponse {
  body: {
    quest: string;
  };
}

export default async function handler(
  req: SummarizeAPIRequest,
  res: SummarizeAPIResponse
) {
  const completion = await summarizeAgent(
    req.body.task
  );
  console.log(completion.text);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.status(200).json(completion.text);
}