import Plunk from "@plunk/node";

//Interface
interface Props {
    html: string;
    to: string[];
    subject: string;
}

const plunk = new Plunk("sk_32b01bee7174310b533c6903fc10ff58b5c56e078c455037");

export const sentEmail = async ({ html, to, subject }: Props) => {
    return plunk.emails.send({
        to: to,
        name: "We do greetings",
        type: "html",
        subject: subject,
        body: html
    });
}