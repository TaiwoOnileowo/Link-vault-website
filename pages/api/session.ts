// pages/api/session.js

import { NextApiRequest, NextApiResponse } from "next";

import { allowedOrigins } from "@/app/middleware";
import { auth } from "@/auth";
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
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
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

  // const extensionId = req.headers["x-extension-id"];

  // if (extensionId !== "bbgippochabbclmbgkkbbofljdfnbdop") {
  //   return res.status(403).json({ error: "Forbidden" });
  // }
  const session = await auth(req, res);
  console.log("session", session);
  if (isAllowedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.status(200).json({ session });
}
