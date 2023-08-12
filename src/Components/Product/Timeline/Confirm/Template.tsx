import * as React from "react";
import { Html, Head, Font, Img, Tailwind, Text, Heading, Section, Link, Container } from "@react-email/components";


//Interface
interface Props {
    customerName: string;
    event: string;
    franchiseName: string;
    cost: number;
    rental: string;
    date: string;
    time: string;
    location: string;
    base: string;
    removalTime: string;
    number: string;
    email: string;
    transId: string;
}

const email = (data: Props) => {
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
                    <img src="https://wdg.teamdesk.net/secure/db/90582/logo.aspx?v=6" alt="cat" width="281" height="42" className="mx-auto w-[400px]" />
                    <Heading as="h3" className="text-center text-2xl font-semibold mt-6">Order Confirmation</Heading>
                    <Text className="text-[17px]">Dear <span className="font-semibold">{data.customerName}</span></Text>
                    <Text className="text-[17px]">Thank you for choosing We Do Greeting for your special event.</Text>
                    <Text className="text-[17px]">We&apos;re delighted to be part of your celebration and will strive to make it even more memorable.</Text>
                    <Text className="text-[17px]">
                        Your order has been successfully processed, and your booking for the <span className="font-semibold">{data.event}</span> setup has been confirmed. We appreciate your trust in our services.
                    </Text>
                    <Text className="text-[17px]">
                        My name is <span className="font-bold">{data.franchiseName}</span>. I will be responsible for ensuring everything runs smoothly on the day of your event. If you have any queries, concerns, or if you need to discuss anything regarding the event setup, please feel free to reach out to me. Here are my contact details:
                    </Text>
                    <Section>
                        <Text className="m-0 text-[17px]">Cost: <span className="font-semibold">{data.cost}</span></Text>
                        <Text className="m-0 text-[17px]">Rental duration: <span className="font-semibold">{data.rental}</span></Text>
                        <Text className="m-0 text-[17px]">Date of installation: <span className="font-semibold">{data.date}</span></Text>
                        <Text className="m-0 text-[17px]">Time of installation: <span className="font-semibold">[data.time]</span></Text>
                        <Text className="m-0 text-[17px]">Install location: <span className="font-semibold">{data.location}</span></Text>
                        <Text className="m-0 text-[17px]">Install base: <span className="font-semibold">{data.base}</span></Text>
                        <Text className="m-0 text-[17px]">Removal date/time: <span className="font-semibold">{data.removalTime}</span></Text>
                        <Text className="m-0 text-[17px]">Contact Number: <span className="font-semibold">{data.number}</span></Text>
                        <Text className="m-0 text-[17px]">Email Address: <span className="font-semibold">{data.email}</span></Text>
                    </Section>
                    <Text className="text-[17px]">Please find attached a detailed invoice for your order. If you have any queries related to the invoice, please don&apos;t hesitate to reach out to me. I will be more than happy to assist.</Text>
                    <Section>
                        <Text className="text-[17px]">You Order Reference: <span className="font-semibold">{data.transId}</span></Text>
                    </Section>
                    <Text className="text-[17px]">For more information about our services and for any other queries you may have, please visit our Frequently Asked Questions (FAQ) page at <Link href="https://staging.wedogreetings.co.uk/faq" target="_blank">FAQ</Link></Text>
                    <Text className="text-[17px]">Once again, thank you for choosing We Do Greetings. We are genuinely excited to bring your vision to life and help add to your special and memorable occasion!</Text>
                    <Text className="text-[17px]">
                        <span>Best Regards,</span> <br />
                        <span className="font-bold">{data.franchiseName}</span>
                    </Text>
                </Container>
                <Section className="bg-[#ead1dc] pb-8 mt-3">
                    <Container className="my-2">
                        <Text>
                            This email and any attachments are confidential and may be privileged. If you are not the intended recipient, please delete all copies and notify the sender immediately. Your privacy is important to us. As part of our commitment to protecting your data, we comply with the General Data Protection Regulation (GDPR). If you have any questions or requests regarding your data, or if you want to modify or remove your data from our records, please contact us at <Link href="mailto:info@wedogreetings.co.uk">info@wedogreetings.co.uk</Link>.For further information on how we handle your data, please read our <Link target="_blank" href="https://staging.wedogreetings.co.uk/privacy-and-cookie-policy">Privacy Policy</Link>. We also invite you to review our <Link target="_blank" href="https://staging.wedogreetings.co.uk/site-terms-and-conditions">Terms and Conditions</Link> and <Link target="_blank" href="https://staging.wedogreetings.co.uk/privacy-and-cookie-policy">Cookie Policy</Link> to understand how we use cookies and what your choices are. This franchise is owned by We Do Greetings Ltd, Unit A, 82 James Carter Road, Mildenhall, Suffolk, United Kingdom, IP28 7DE company number:14918382
                        </Text>
                    </Container>
                </Section>
            </Tailwind>
        </Html>
    );
};

export default email;