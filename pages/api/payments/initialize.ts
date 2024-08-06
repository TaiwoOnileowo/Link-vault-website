import https from "https";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, amount, plan } = req.body;
    console.log(email, amount, plan);
    const params = JSON.stringify({
      email,
      amount,
      plan,
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const paystackReq = https.request(options, (paystackRes) => {
      let data = "";

      paystackRes.on("data", (chunk) => {
        data += chunk;
      });

      paystackRes.on("end", () => {
        const response = JSON.parse(data);
        if (response.status) {
          res.status(200).json(response.data);
        } else {
          res.status(400).json(response);
        }
      });
    });

    paystackReq.on("error", (error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });

    paystackReq.write(params);
    paystackReq.end();
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
