import { render } from '@react-email/components';
import { SES } from '@aws-sdk/client-ses';
import Email from "@/Helper/template";

const ses = new SES({
    region: "eu-west-2",
    credentials: {
        accessKeyId: "AKIASXVIUFVMXF7F4HGQ",
        secretAccessKey: "KGHk6dY73pQkrpVo/ecOtDbIjHFlxhJPsosTV5x2",
    }
});
const emailHtml = render(<Email url="https://example.com" />);

const Test = () => {
    //Handler
    const onSent = async () => {
        const params = {
            Source: "mail@siamahnaf.com",
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
                    Data: "",
                },
            },
        };
        await ses.sendEmail(params);
    }

    return (
        <div className="bg-gray-400">
            <button onClick={onSent}>
                Sent Email
            </button>
            <div className="w-[55%] mx-auto bg-white">
                <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
            </div>
        </div>
    );
};

export default Test;