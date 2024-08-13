import { NextApiResponse, NextApiRequest } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({ error: "Missing reference" });
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();
  console.log(data);
  if (data.status === true) {
    return res.status(200).json({ status: "success", data });
  } else {
    return res.status(400).json({ status: "failed", data });
  }
}
