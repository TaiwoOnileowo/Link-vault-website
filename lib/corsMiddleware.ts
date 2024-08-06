// @ts-nocheck
import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize the cors middleware with the desired options
const cors = Cors({
  origin: [
    "http://localhost:5173",
    "chrome-extension://jchegagelggnljjchmgnogddehfcoecp",
    "https://linkvaultapp.netlify.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Extension-ID"],
  credentials: true,
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn) {
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
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors);
    return handler(req, res);
  };
}
