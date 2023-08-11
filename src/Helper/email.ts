import { Resend } from "resend";

//Interface
interface Props {
    html: string;
    to: string[];
    cc?: string[];
    subject: string;
}

const resend = new Resend("re_F3HD81FF_JrZk3wkX1C6LCGzQqzQq7aa7");

export const sentEmail = async ({ html, to, subject, cc }: Props) => {
    return resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'siamahnaf198@gmail.com',
        subject: 'Hello World',
        html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
}