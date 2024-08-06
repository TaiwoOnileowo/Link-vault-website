// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import { allowedOrigins } from "@/app/middleware";
import ogs from "open-graph-scraper";
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
      res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
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
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  console.log("isAllowedOrigin", isAllowedOrigin);
  console.log("origin", origin);
  console.log(allowedOrigins);
  const extensionId = req.headers["x-extension-id"];

  if (extensionId !== "bbgippochabbclmbgkkbbofljdfnbdop") {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (isAllowedOrigin) {
    console.log("setting headers");
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  //   const extensionId = req.headers["x-extension-id"];

  //   if (extensionId !== "bbgippochabbclmbgkkbbofljdfnbdop") {
  //     return res.status(403).json({ error: "Forbidden" });
  //   }

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
