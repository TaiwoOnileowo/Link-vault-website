// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import { runMiddleware, cors } from "@/app/middleware";
import ogs from "open-graph-scraper";

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

    const extensionId = req.headers["x-extension-id"];

    if (extensionId !== "bbgippochabbclmbgkkbbofljdfnbdop") {
      return res.status(403).json({ error: "Forbidden" });
    }

  if (req.method === "GET") {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const options = { url };
    console.log("options", options);
    try {
      const data = await ogs(options);
      const { error, result } = data;
      if (error) {
        return res.status(500).json({ error: "Failed to fetch metadata" });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching the link metadata:", error);
      res.status(500).json({ error: "Error fetching the link metadata" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
