// pages/api/session.ts
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware, cors } from "@/app/middleware";

// In-memory storage for session data
let storedSession: any = null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const extensionId = req.headers["x-extension-id"];

  if (extensionId !== "alglfcchpihiepimpbkjflbhniilbnca") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    if (req.method === "POST") {
      console.log("Request body:", req.body);
      // Store the session from the request body
      const { session } = req.body;

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      storedSession = session; // Save the session data
      console.log("Stored session:", storedSession);

      return res.status(200).json({ message: "Session stored successfully" });
    } else if (req.method === "GET") {
      // Retrieve the stored session
      if (!storedSession) {
        return res.status(404).json({ message: "No session found" });
      }

      return res.status(200).json({ session: storedSession });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error handling session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
