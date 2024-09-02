import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import mql from "@microlink/mql";
import { LinkType } from "@/types";
import corsMiddleware from "@/lib/corsMiddleware";
import { getLinkMeta } from "@/lib/linkmeta";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // await runMiddleware(req, res, cors);

  const extensionId = req.headers["x-extension-id"];

  if (extensionId !== "alglfcchpihiepimpbkjflbhniilbnca") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { id, pinned, searchTerm, bulk, linkId, linkIds, folderId } = req.query;

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
      console.log(objectId);
    } catch (err) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    if (req.method === "PUT") {
      const data = req.body;

      if (folderId && Array.isArray(data) && linkIds) {
        // Second instance: Add multiple links to a folder and remove them from the main links array

        const ids = [linkIds]
          .join(",")
          .split(",")
          .map((id) => parseInt(id));
        console.log(ids);
        const updateResult = await usersCollection.updateOne(
          { _id: objectId, "folders.id": parseInt(folderId as string) },
          {
            $push: { "folders.$.links": { $each: data, $position: 0 } },
            $pull: { links: { id: { $in: ids } } },
          } as any
        );

        if (updateResult.modifiedCount === 0) {
          return res.status(404).json({ error: "Folder or links not found" });
        }

        return res
          .status(200)
          .json({ message: "Links moved to folder successfully" });
      } else if (linkId) {
        // Third instance: Replace a link in the main links array
        const updateResult = await usersCollection.updateOne(
          { _id: objectId, "links.id": parseInt(linkId as string) },
          {
            $set: { "links.$": data },
          }
        );

        if (updateResult.modifiedCount === 0) {
          return res.status(404).json({ error: "Link not found" });
        }

        return res.status(200).json({ message: "Link updated successfully" });
      } else {
        return res
          .status(400)
          .json({ error: "Invalid request parameters for PUT" });
      }
    } else if (req.method === "DELETE") {
      if (linkId) {
        // Delete a single link by ID
        const updateResult = await usersCollection.updateOne(
          { _id: objectId },
          { $pull: { links: { id: parseInt(linkId as string) } } } as any
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "Link not found or no update made" });
        }

        return res.status(200).json({ message: "Link deleted successfully" });
      } else if (linkIds) {
        // Delete multiple links by IDs

        const ids = [linkIds]
          .join(",")
          .split(",")
          .map((id) => parseInt(id));

        const updateResult = await usersCollection.updateOne(
          { _id: objectId },
          { $pull: { links: { id: { $in: ids } } } } as any
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "Links not found or no update made" });
        }

        return res.status(200).json({ message: "Links deleted successfully" });
      } else {
        return res
          .status(400)
          .json({ error: "Missing linkId or linkIds query parameter" });
      }
    } else if (req.method === "GET") {
      const { recent } = req.query;

      const user = await usersCollection.findOne(
        { _id: objectId },
        { projection: { links: 1 } }
      );
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      let links: LinkType[] = user.links || [];
      const now = new Date();
      const startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ).getTime();

      // Filter links based on searchTerm
      if (searchTerm) {
        links = links.filter(
          (link) =>
            link.name
              .toLowerCase()
              .includes((searchTerm as string).toLowerCase()) ||
            link.url
              .toLowerCase()
              .includes((searchTerm as string).toLowerCase())
        );
      }

      // Filter by pinned status if `pinned=true` is present in the query
      if (pinned === "true") {
        links = links.filter((link) => link.pinned);
      }

      // Add createdToday property to each link
      links = links.map((link) => ({
        ...link,
        createdToday: link.createdAt >= startOfDay,
      }));

      if (recent && links.length > 0) {
        links = links.slice(0, 5); // Get the first 5 `recent` links
      }

      return res.status(200).json({ links: links.length > 0 ? links : null });
    } else if (req.method === "POST") {
      const data = req.body;
      if (bulk === "true") {
        if (!Array.isArray(data) || data.length === 0) {
          return res
            .status(400)
            .json({ error: "Invalid data format or empty array" });
        }

        const results = await getLinkMeta(data);

        const linksToInsert = data.map((link, index) => ({
          ...link,
          ...results[index],
          id: Math.floor(Math.random() * 1000000),
          createdAt: Date.now(),
        }));

        const updateResult = await usersCollection.updateOne(
          { _id: objectId },
          {
            $push: {
              links: {
                $each: linksToInsert,
                $position: 0,
              },
            },
          } as any
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .json({ error: "User not found or no update made" });
        }

        return res.status(200).json({
          message: "Links added successfully",
          links: linksToInsert,
        });
      } else {
        const { url } = data;
        try {
          const { data: metadata } = await mql(url, { meta: true });

          const linkData: LinkType = {
            ...data,
            id: Math.floor(Math.random() * 1000000),
            url,
            image: metadata.image?.url || metadata.logo?.url || null,
            title: metadata.title || null,
            description: metadata.description || null,
            createdAt: Date.now(),
          };

          const updateResult = await usersCollection.updateOne(
            { _id: objectId },
            {
              $push: {
                links: {
                  $each: [linkData],
                  $position: 0,
                },
              },
            } as any
          );

          if (updateResult.modifiedCount === 0) {
            return res
              .status(404)
              .json({ error: "User not found or no update made" });
          }

          return res
            .status(200)
            .json({ message: "Link added successfully", link: linkData });
        } catch (error) {
          console.error(`Error processing ${url}:`, error);
          return res.status(500).json({ error: "Error fetching metadata" });
        }
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
export default corsMiddleware(handler);
