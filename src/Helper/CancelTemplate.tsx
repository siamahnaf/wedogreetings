import * as React from "react";
import { Html, Head, Font, Tailwind, Text, Link, Img, Container } from '@react-email/components';

const CancelTemplate = () => {
    return (
        <Html lang="en">
            <Head>
                <Font
                    fontFamily="Poppins"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecmNE.woff2",
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
                <Font
                    fontFamily="Poppins"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z11lFc-K.woff2",
                        format: 'woff2',
                    }}
                    fontWeight={600}
                    fontStyle="normal"
                />
            </Head>
            <Tailwind>
                <Container className="mt-6 text-center">
                    <Img src="https://res.cloudinary.com/dbceuy3oy/image/upload/v1691944012/Logo_bxg349.png" alt="cat" width="281" height="42" className="mx-auto w-[300px]" />
                    <Text className="text-3xl font-bold">Oh! no your payment failed</Text>
                    <Text className="mb-8">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                    </Text>
                    <Link href="https://staging.wedogreetings.co.uk/" className="bg-[#0AC2FF] text-white text-sm py-2 px-8 rounded-md uppercase font-bold">
                        Continue Shopping
                    </Link>
                </Container>
            </Tailwind>
        </Html>
    );
};

export default CancelTemplate;