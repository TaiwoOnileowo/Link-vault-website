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
  const folder_name = folder.folder_name;
  const link = folder.link;
  console.log(req.body, "body");
  if (!id || !folder_name) {
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

    // Check if the folder exists
    const folderIndex = user.folders.findIndex(
      (folder: {
        folder_name: string;
        links: { url: string; url_name: string; tags: string }[];
        folder_icon: string;
      }) => folder.folder_name === folder_name
    );

    if (folderIndex !== -1) {
      // Folder exists, append the link to the beginning of the links array
      await usersCollection.updateOne(
        { _id: objectId, "folders.folder_name": folder_name },
        { $push: { "folders.$.links": { $each: [link], $position: 0 } } }
      );
      return res.status(200).json({ message: "Link added to existing folder" });
    } else {
      // Folder does not exist, create a new folder and add the link
      const newFolder = {
        folder_name: folder_name,
        links: [link],
        folder_icon: folder.folder_icon,
      };

      await usersCollection.updateOne(
        { _id: objectId },
        { $push: { folders: { $each: [newFolder], $position: 0 } } }
      );
      return res
        .status(200)
        .json({ message: "New folder created and link added" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
