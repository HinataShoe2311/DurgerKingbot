// pages/api/payment-detail.js

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { plink_id } = req.query;

    if (!plink_id) {
        return res.status(400).json({ error: "Missing p_link in query parameters" });
    }
    const { RAZORPAY_KEY, RAZORPAY_SECRET } = process.env;

    const authHeader = Buffer.from(`${RAZORPAY_KEY}:${RAZORPAY_SECRET}`).toString("base64");


    const response = await fetch(`https://api.razorpay.com/v1/payment_links/${plink_id}`, {
        method: "GET",
        headers: {
            "Authorization": `Basic ${authHeader}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        return res.status(response.status).json({ error: data });
    }


    return res.status(200).json(data);
}
