// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware, cors } from "@/app/middleware";
import ogs from "open-graph-scraper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const extensionId = req.headers["x-extension-id"];

  if (extensionId !== "alglfcchpihiepimpbkjflbhniilbnca") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { links } = req.body;
  console.log("Links:", links);
  if (!links || !Array.isArray(links)) {
    return res.status(400).json({ error: "An array of links is required" });
  }

  try {
    const results = await Promise.all(
      links.map(async ({ url, id }) => {
        const options = { url };
        console.log("Fetching metadata for:", options);
        try {
          const data = await ogs(options);
          const { error, result } = data;
          if (error) {
            console.log("error at 1", error);
            console.error(`Error fetching metadata for ${url}:`, error);
            return { id, url, image: null, title: null, description: null };
          }
          // Extract the meta image, title, and description
          const { ogImage, ogTitle, ogDescription, favicon } = result;
          console.log("result", result);
          return {
            id,
            url,
            image: (ogImage && ogImage[0].url) || favicon || null,
            title: ogTitle || null,
            description: ogDescription || null,
          };
        } catch (error) {
          console.error(`Error processing ${url}:`, error);
          return { id, url, image: null, title: null, description: null };
        }
      })
    );
    console.log("Results:", results);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error processing the links:", error);
    res.status(500).json({ error: "Error processing the links" });
  }
}
