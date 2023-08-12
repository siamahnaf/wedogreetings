import postmark from "postmark";

//Interface
interface Props {
    html: string;
    to: string;
    subject: string;
}

export const sentEmail = async ({ html, to, subject }: Props) => {
    const client = new postmark.ServerClient("930f5180-a406-406d-88da-13b2ec6cd9e3")
    const data = await client.sendEmail({
        "To": to,
        "Cc": "mail@siamahnaf.com",
        "Subject": subject,
        "HtmlBody": html,
        "From": "noreply@siamahnaf.com"
    });
    console.log(data)
}