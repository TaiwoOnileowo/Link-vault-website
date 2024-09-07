// @ts-nocheck
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

const cors = Cors({
  origin: [
    "http://localhost:5173",
    "chrome-extension://alglfcchpihiepimpbkjflbhniilbnca",
    "https://www.linkvaultapp.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Extension-ID",
    "Access-Control-Allow-Origin",
  ],
  credentials: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default function corsMiddleware(handler) {
  return async (req, res) => {
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
      console.log("req.headers.origin", req.headers.origin);
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Extension-ID"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.status(204).end();
      return;
    }
    await runMiddleware(req, res, cors);
    return handler(req, res);
  };
}
