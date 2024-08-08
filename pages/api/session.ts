// pages/api/session.ts
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware, cors } from "@/app/middleware";
import { auth } from "@/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const extensionId = req.headers["x-extension-id"];

  if (extensionId !== "bbgippochabbclmbgkkbbofljdfnbdop") {
    return res.status(403).json({ error: "Forbidden" });
  }
  
  try {
    const session = await auth(req, res);
    console.log("session", session);

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
