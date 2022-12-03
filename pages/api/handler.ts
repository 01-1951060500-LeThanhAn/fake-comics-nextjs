// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiHandler } from "next";
import axios from "axios";

var API_URL = `https://thanhan.vercel.app`;
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
