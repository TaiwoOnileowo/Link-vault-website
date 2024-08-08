// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { runMiddleware, cors } from "@/app/middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  // Ensure the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id, links } = req.body;
  if (
    !id ||
    !links ||
    typeof links !== "object" ||
    !links.url ||
    links.url_name === undefined ||
    links.tags === undefined
  ) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
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
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Append the new link to the beginning of the links array
    await usersCollection.updateOne(
      { _id: objectId },
      {
        $push: {
          links: {
            $each: [links],
            $position: 0,
          },
        },
      }
    );

    return res.status(200).json({ message: "Link added successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
