// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import backendAPI from "../../utils/backendAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // console.log(req);
    const backendResponse = await backendAPI.get("/history/",{params: {...req.query}});
    res.status(201).json(backendResponse.data);

  } else res.status(405).json({ detail: "Method Not Allowed" });
}