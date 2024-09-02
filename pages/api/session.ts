import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware, cors } from "@/app/middleware";
import { auth } from "@/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const extensionId = req.headers["x-extension-id"];

  if (extensionId !== "alglfcchpihiepimpbkjflbhniilbnca") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    if (req.method === "POST") {
      console.log("Request body:", req.body);
      const { session } = req.body;

      if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Store session in a more persistent way if needed
      // e.g., in a database or Redis

      console.log("Stored session:", session);

      return res.status(200).json({ message: "Session stored successfully" });
    } else if (req.method === "GET") {
      const session = await auth(req, res); // Pass the request and response objects

      return res.status(200).json({ session });
    } else if (req.method === "DELETE") {
      console.log("Clearing session");
      // Clear session from persistent storage

      return res.status(200).json({ message: "Session cleared successfully" });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error handling session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
