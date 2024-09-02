import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { runMiddleware, cors } from "@/app/middleware";
import { ObjectId } from "mongodb";
import { FolderType, LinkType } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  const extensionId = req.headers["x-extension-id"];
  if (extensionId !== "alglfcchpihiepimpbkjflbhniilbnca") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { id, searchTerm } = req.query;

  if (!id || Array.isArray(id) || !searchTerm || Array.isArray(searchTerm)) {
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

    const user = await usersCollection.findOne({ _id: objectId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { folders = [], links = [] } = user;

    const lowerSearchTerm = searchTerm.toLowerCase();
    let searchResults: {
      matchedFolders: { folder: FolderType; matchedLinks: LinkType[] }[];
      matchedLinks: LinkType[];
      folderLinkMatches: any[];
    } = {
      matchedFolders: [],
      matchedLinks: [],
      folderLinkMatches: [],
    };

    // Search in folders
    folders.forEach((folder: FolderType) => {
      const folderNameMatch: boolean = folder.name
        ?.toLowerCase()
        .includes(lowerSearchTerm);

      const matchedLinksInFolder: LinkType[] =
        folder.links.length > 0
          ? folder.links.filter(
              (link: LinkType) =>
                link.name?.toLowerCase().includes(lowerSearchTerm) ||
                link.url?.toLowerCase().includes(lowerSearchTerm)
            )
          : [];

      if (folderNameMatch || matchedLinksInFolder.length > 0) {
        searchResults.matchedFolders.push({
          folder,
          matchedLinks: matchedLinksInFolder,
        });
      }
    });

    // Search in top-level links
    const matchedLinks = links.filter(
      (link: LinkType) =>
        link.name?.toLowerCase().includes(lowerSearchTerm) ||
        link.url?.toLowerCase().includes(lowerSearchTerm)
    );

    searchResults.matchedLinks = matchedLinks;

    // If there's any match, return the results
    if (
      searchResults.matchedFolders.length > 0 ||
      searchResults.matchedLinks.length > 0
    ) {
      return res.status(200).json(searchResults);
    } else {
      return res.status(200).json(searchResults);
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
