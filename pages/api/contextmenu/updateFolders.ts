// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { allowedOrigins } from "@/app/middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const origin = req.headers.origin || "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle the OPTIONS preflight request
  if (req.method === "OPTIONS") {
    if (isAllowedOrigin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Extension-ID"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.status(204).end();
    } else {
      res.status(403).end();
    }
    return;
  }

  // Ensure the request method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Set CORS headers for the actual request
  if (isAllowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  const { id, folder } = req.body;
  //   if (
  //     !id ||
  //     !folder ||
  //     typeof folder !== "object" ||
  //     folder.folder_name === undefined
  //   ) {
  //     return res.status(400).json({ error: "Invalid request body" });
  //   }
  console.log(folder);

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

    // Append the new folder to the beginning of the folders array
    await usersCollection.updateOne(
      { _id: objectId },
      {
        $push: {
          folders: {
            $each: [folder],
            $position: 0,
          },
        },
      }
    );

    return res.status(200).json({ message: "Folder added successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
