// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { render } from '@react-email/render';

//Templates
import ContactTemplate from "@/Helper/ContactTemplate";
import ConfirmTemplate from "@/Helper/ConfirmTemplate";

type Data = {
    MessageID: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        let html: string = ""
        if (req.body.templateName === "contact") {
            const value = req.body.value
            html = render(ContactTemplate({ ...value }));
        } else if (req.body.templateName === "confirm") {
            const value = req.body.value
            html = render(ConfirmTemplate({ ...value }));
        }
        const email = {
            From: {
                name: "We do greetings",
                email: "noreply@wegreet.co.uk"
            },
            To: req.body.to,
            Cc: req.body.cc,
            Bcc: req.body.bcc,
            Subject: req.body.subject,
            ContentType: "HTML",
            HTMLContent: html
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