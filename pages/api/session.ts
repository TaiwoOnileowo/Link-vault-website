import { NextApiRequest, NextApiResponse } from "next";
import corsMiddleware from "@/lib/corsMiddleware";
import { auth } from "@/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const extensionId = req.headers["x-extension-id"];

  if (extensionId !== "bbgippochabbclmbgkkbbofljdfnbdop") {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await auth(req, res);
  const data = session;

  res.status(201).json(data);
};

export default corsMiddleware(handler);
