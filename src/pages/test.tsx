import { render } from '@react-email/render';
import { SES } from '@aws-sdk/client-ses';
import Email from "@/Helper/email";

const ses = new SES({ region: process.env.AWS_SES_REGION });
const emailHtml = render(<Email url="https://example.com" />);

const Test = () => {
    //Handler
    const onSent = async () => {
        const params = {
            Source: "info@wedogreeting.co.uk",
            Destination: {
                ToAddresses: ['siamahnaf198@gmail.com'],
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: emailHtml,
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: 'hello world',
                },
            },
        };
        await ses.sendEmail(params);
    }

    return (
        <div>

        </div>
    );
};

export default Test;