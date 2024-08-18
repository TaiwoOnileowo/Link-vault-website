import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { runMiddleware, cors } from "@/app/middleware";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  // Ensure the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }



  const extensionId = req.headers["x-extension-id"];

  if (extensionId !== "alglfcchpihiepimpbkjflbhniilbnca") {
    return res.status(403).json({ error: "Forbidden" });
  }
  const { id, links } = req.body;
  if (!id || !Array.isArray(links)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    console.log("setting to db");
    const client = await clientPromise;
    const db = client.db("linkvault");
    const usersCollection = db.collection("users");
    // Convert the id to ObjectId if it's a valid string
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (err) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const user = await usersCollection.findOne({ _id: objectId });

    console.log("user", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await usersCollection.updateOne({ _id: objectId }, { $set: { links } });
    return res.status(200).json({ message: "Links updated successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
