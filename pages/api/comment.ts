import type { NextApiRequest, NextApiResponse } from "next";

import { craftFunnyComment, fetchDeveloperSummary } from "@/lib/moltbook";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const summary = await fetchDeveloperSummary();
  const comment = craftFunnyComment(summary);

  res.status(200).json({ comment, summary });
}
