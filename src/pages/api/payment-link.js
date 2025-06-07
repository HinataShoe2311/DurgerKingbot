// pages/api/payment-link.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { RAZORPAY_KEY, RAZORPAY_SECRET } = process.env;

  const authHeader = Buffer.from(`${RAZORPAY_KEY}:${RAZORPAY_SECRET}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/payment_links", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${authHeader}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });
  const data = await response.json();
  if (!response.ok) {
    return res.status(response.status).json({ error: data });
  }

  return res.status(200).json(data);
}
