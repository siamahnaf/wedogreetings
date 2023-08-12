// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    MessageID: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const email = {
            From: {
                name: "We do greetings",
                email: "noreply@wegreet.co.uk"
            },
            To: req.body.to,
            Cc: req.body.cc,
            Subject: req.body.subject,
            ContentType: "HTML",
            HTMLContent: req.body.html
        }
        const headers = {
            "Authorization": `Bearer ${process.env.MAILER_API}`,
            "Content-Type": "application/json"
        }
        const data = await fetch("https://console.sendlayer.com/api/v1/email", { method: "POST", headers, body: JSON.stringify(email) })
        const response: Data = await data.json()
        res.status(200).json(response)
    }
}