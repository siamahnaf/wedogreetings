import * as React from "react";
import { Html, Head, Font, Tailwind, Text, Section, Link, Container } from '@react-email/components';

//Interface
import { Inputs } from "@/Components/Contact/Form";

const ContactTemplate = (data: Inputs) => {
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
                <Container className="mt-6">
                    <Text className="text-3xl text-center font-bold">New Contact Message</Text>
                    <Section className="mt-12">
                        <Text className="text-base !m-0">First Name: <span className="font-bold">{data.firstName}</span></Text>
                        <Text className="text-base !m-0">Last Name: <span className="font-bold">{data.lastName}</span></Text>
                        <Text className="text-base !m-0">Email: <span className="font-bold"><Link href={`mailto:${data.email}`}>{data.email}</Link></span></Text>
                        <Text className="text-base !m-0">Phone: <span className="font-bold">{data.phone}</span></Text>
                        <Text className="text-base !m-0">Message: <span className="font-bold">{data.message}</span></Text>
                    </Section>
                </Container>
                <Section className="bg-[#ead1dc] mt-10">
                    <Container className="my-5">
                        <Text className="text-[17px] text-center">Sent from contact us page!</Text>
                    </Container>
                </Section>
            </Tailwind>
        </Html>
    );
};

export default ContactTemplate;