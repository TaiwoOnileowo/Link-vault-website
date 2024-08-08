import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { runMiddleware, cors } from "@/app/middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const extensionId = req.headers["x-extension-id"];
  if (extensionId !== "bbgippochabbclmbgkkbbofljdfnbdop") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { id } = req.query;
  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid request query" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("linkvault");
    const usersCollection = db.collection("users");

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (err) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const user = await usersCollection.findOne(
      { _id: objectId },
      { projection: { folders: 1 } }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ folders: user.folders.length > 0 ? user.folders : [] });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
