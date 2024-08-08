// pages/api/session.ts
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { auth } from "@/auth";

// Initializing the cors middleware
const cors = Cors({
  origin: [
    "http://localhost:5173",
    "chrome-extension://*",
    "https://linkvaultapp.vercel.app",
  ],
  credentials: true, // Allow credential
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for middleware to execute before continuing
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

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
