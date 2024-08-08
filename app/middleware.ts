import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
export const cors = Cors({
  origin: [
    "http://localhost:5173",
    "chrome-extension://*",
    "chrome-extension://jchegagelggnljjchmgnogddehfcoecp",
    "https://linkvaultapp.vercel.app",
  ],
  credentials: true, // Allow credential
  methods: ["POST", "GET", "HEAD"],
});
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
