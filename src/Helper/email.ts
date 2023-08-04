import { SES } from "@aws-sdk/client-ses";

//Interface
interface Props {
    html: string;
    to: string[];
    from: string;
    cc?: string;
    subject: string;
}

const ses = new SES({
    region: process.env.NEXT_PUBLIC_API_AWS_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_API_AWS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_PUBLIC_API_AWS_ACCESS_KEY as string
    }
});

export const sentEmail = async ({ html, to, from, subject, cc }: Props) => {
    const params = {
        Source: from,
        Destination: {
            ToAddresses: to,
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: html,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
        },
    };
    return ses.sendEmail(params);
}