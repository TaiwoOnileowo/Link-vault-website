import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

import { FolderType, LinkType } from "@/types";

import corsMiddleware from "@/lib/corsMiddleware";

import { getLinkMeta } from "@/lib/linkmeta";
const now = new Date();
const startOfDay = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate()
).getTime();
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const extensionId = req.headers["x-extension-id"];

  if (extensionId !== "alglfcchpihiepimpbkjflbhniilbnca") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const {
    id,
    pinned,
    searchTerm,
    folderId,
    folderIds,
    folderLinkId,
    folderLinkIds,
  } = req.query;

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

    if (req.method === "PUT") {
      const { addLink } = req.query;

      if (folderId && addLink === "true") {
        // then add a link to a folder
        const data = req.body;

        let linksWithMeta: LinkType[] = [];
        if (data.links.length > 0) {
          linksWithMeta = await getLinkMeta(data.links);
        }

        // Prepare the folder data
        const folderData: FolderType = {
          ...data,
          id: Math.floor(Math.random() * 1000000), // Generate a random ID
          name: data.name,
          links: linksWithMeta,
          createdAt: Date.now(), // Set the creation time
        };
        console.log(folderData);
        const updateResult = await usersCollection.updateOne(
          { _id: objectId, "folders.id": parseInt(folderId as string) },
          {
            $set: {
              "folders.$": folderData,
            },
          }
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "Folder not found or no update made" });
        }

        return res
          .status(200)
          .json({ message: "Link added to folder successfully" });
      } else if (folderId && folderLinkId) {
        // then update a link within a folder
        const data = req.body;
        if (!data || typeof data !== "object") {
          return res.status(400).json({ error: "Invalid data format" });
        }

        const updateResult = await usersCollection.updateOne(
          { _id: objectId, "folders.id": parseInt(folderId as string) },
          {
            $set: {
              "folders.$.links.$[link]": {
                ...data,
                id: parseInt(folderLinkId as string),
              },
            },
          },
          {
            arrayFilters: [{ "link.id": parseInt(folderLinkId as string) }],
          }
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "Folder link not found or no update made" });
        }

        return res
          .status(200)
          .json({ message: "Folder link updated successfully" });
      } else if (folderId) {
        // then update a folder
        const data = req.body;
        if (!data || typeof data !== "object") {
          return res.status(400).json({ error: "Invalid data format" });
        }

        const updateResult = await usersCollection.updateOne(
          { _id: objectId, "folders.id": parseInt(folderId as string) },
          {
            $set: {
              "folders.$.name": data.name,
              "folders.$.pinned": data.pinned,
              "folders.$.icon": data.icon,
            },
          }
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "Folder not found or no update made" });
        }

        return res.status(200).json({ message: "Folder updated successfully" });
      } else {
        return res.status(400).json({
          error: "Missing folderId, folderLinkId, or addLink query parameters",
        });
      }
    } else if (req.method === "DELETE") {
      if (folderId) {
        // Delete a single folder by ID
        const updateResult = await usersCollection.updateOne(
          { _id: objectId },
          { $pull: { folders: { id: parseInt(folderId as string) } } } as any
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "Folder not found or no update made" });
        }

        return res.status(200).json({ message: "Folder deleted successfully" });
      } else if (folderIds) {
        // Delete multiple folders by IDs
        const ids = (folderIds as string)
          .split(",")
          .map((id) => parseInt(id.trim()));

        const updateResult = await usersCollection.updateOne(
          { _id: objectId },
          { $pull: { folders: { id: { $in: ids } } } } as any
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "Folders not found or no update made" });
        }

        return res
          .status(200)
          .json({ message: "Folders deleted successfully" });
      } else if (folderLinkId) {
        // Delete a single link within a folder by ID
        const updateResult = await usersCollection.updateOne(
          { _id: objectId, "folders.id": parseInt(folderId as string) },
          {
            $pull: {
              "folders.$.links": { id: parseInt(folderLinkId as string) },
            },
          } as any
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "Folder link not found or no update made" });
        }

        return res
          .status(200)
          .json({ message: "Folder link deleted successfully" });
      } else if (folderLinkIds) {
        // Delete multiple links within a folder by IDs
        const ids = (folderLinkIds as string)
          .split(",")
          .map((id) => parseInt(id.trim()));

        const updateResult = await usersCollection.updateOne(
          { _id: objectId, "folders.id": parseInt(folderId as string) },
          { $pull: { "folders.$.links": { id: { $in: ids } } } } as any
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "Folder links not found or no update made" });
        }

        return res
          .status(200)
          .json({ message: "Folder links deleted successfully" });
      } else {
        return res.status(400).json({
          error:
            "Missing folderId, folderIds, folderLinkId, or folderLinkIds query parameter",
        });
      }
    } else if (req.method === "GET") {
      const { max } = req.query;

      const user = await usersCollection.findOne(
        { _id: objectId },
        { projection: { folders: 1 } }
      );
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      let folders: FolderType[] = user.folders || [];
      // Filter folders based on searchTerm
      if (searchTerm) {
        folders = folders.filter((folder) =>
          folder.name
            .toLowerCase()
            .includes((searchTerm as string).toLowerCase())
        );
      }

      // Filter by pinned status if `pinned=true` is present in the query
      if (pinned === "true") {
        folders = folders.filter((folder) => folder.pinned);
      }

      // Handle folderId & searchTerm for links within a folder
      if (folderId && searchTerm) {
        const folder = folders.find(
          (folder) => folder._id.toString() === folderId
        );
        if (folder && folder.links) {
          folder.links = folder.links.filter(
            (link) =>
              link.name
                .toLowerCase()
                .includes((searchTerm as string).toLowerCase()) ||
              link.url
                .toLowerCase()
                .includes((searchTerm as string).toLowerCase())
          );
          return res
            .status(200)
            .json({ links: folder.links.length > 0 ? folder.links : null });
        }
        return res.status(200).json({ links: null });
      }

      // Add createdToday property to each folder
      folders = folders.map((folder) => ({
        ...folder,
        createdToday: folder.createdAt >= startOfDay,
      }));

      if (max && folders.length > 0) {
        folders = folders.slice(0, parseInt(max as string));
      }

      return res.status(200).json({ folders: folders || [] });
    } else if (req.method === "POST") {
      const data = req.body;

      if (!data || typeof data !== "object") {
        return res.status(400).json({ error: "Invalid data format" });
      }

      // Fetch metadata for each link
      let linksWithMeta: LinkType[] = [];
      if (data.links.length > 0) {
        linksWithMeta = await getLinkMeta(data.links);
      }
      // Prepare the folder data
      const folderData: FolderType = {
        ...data,
        id: Math.floor(Math.random() * 1000000), // Generate a random ID
        links: linksWithMeta,
        createdAt: Date.now(), // Set the creation time
      };

      // Store the folder with metadata in the user's folders array
      const updateResult = await usersCollection.updateOne({ _id: objectId }, {
        $push: {
          folders: {
            $each: [folderData],
            $position: 0,
          },
        },
      } as any);

      if (updateResult.modifiedCount === 0) {
        return res
          .status(404)
          .json({ error: "User not found or no update made" });
      }

      return res.status(200).json({ message: "Folder added successfully" });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export default corsMiddleware(handler);
