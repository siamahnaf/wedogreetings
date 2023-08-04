import * as React from "react";
import { Html, Head, Font, Img, Tailwind, Text, Heading, Section, Link, Container } from "@react-email/components";


//Interface
interface Props {
    url: string;
}

const email = ({ url }: Props) => {
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
                    <Img src="/images/logo.png" alt="cat" width="281" height="42" className="mx-auto w-[400px]" />
                    <Heading as="h3" className="text-center text-2xl font-semibold mt-6">Order Confirmation</Heading>
                    <Text className="text-[17px]">Dear <span className="font-semibold">[Customers Name]</span></Text>
                    <Text className="text-[17px]">Thank you for choosing We Do Greeting for your special event.</Text>
                    <Text className="text-[17px]">We&apos;re delighted to be part of your celebration and will strive to make it even more memorable.</Text>
                    <Text className="text-[17px]">
                        Your order has been successfully processed, and your booking for the <span className="font-semibold">"[Type of Event]"</span> setup has been confirmed. We appreciate your trust in our services.
                    </Text>
                    <Text className="text-[17px]">
                        My name is <span>[Installers Name]</span>. I will be responsible for ensuring everything runs smoothly on the day of your event. If you have any queries, concerns, or if you need to discuss anything regarding the event setup, please feel free to reach out to me. Here are my contact details:
                    </Text>
                    <Section>
                        <Text className="m-0 text-[17px]">Date of installation: <span className="font-semibold">[Install Date]</span></Text>
                        <Text className="m-0 text-[17px]">Time of installation: <span className="font-semibold">[Install Time]</span></Text>
                        <Text className="m-0 text-[17px]">Installation location: <span className="font-semibold">[Installation Location]</span></Text>
                        <Text className="m-0 text-[17px]">Installation base: <span className="font-semibold">[Installation Base]</span></Text>
                        <Text className="m-0 text-[17px]">Contact Number: <span className="font-semibold">[Installers Contact Number]</span></Text>
                        <Text className="m-0 text-[17px]">Email Address: <span className="font-semibold">[Installers Email Address]</span></Text>
                    </Section>
                    <Text className="text-[17px]">Please find attached a detailed invoice for your order. If you have any queries related to the invoice, please don&apos;t hesitate to reach out to me. I will be more than happy to assist.</Text>
                    <Section>
                        <Text className="text-[17px]">You Order Reference: <span className="font-semibold">[Order Reference Number]</span></Text>
                    </Section>
                    <Text className="text-[17px]">For more information about our services and for any other queries you may have, please visit our Frequently Asked Questions (FAQ) page at <Link href="www.siamahnaf.com">FAQ</Link></Text>
                    <Text className="text-[17px]">Once again, thank you for choosing We Do Greetings. We are genuinely excited to bring your vision to life and help add to your special and memorable occasion!</Text>
                    <Text className="text-[17px]">Best Regards,</Text>
                    <Text className="text-[17px]">
                        [Your Name] <br />
                        [Your Position] <br />
                        Letter Rentals Team (???Letter Rentals Team???) <br />
                        Phone: [Your Contact Number] <br />
                        Email: [Your Email Address] <br />
                    </Text>
                </Container>
                <Section className="bg-[#ead1dc] pb-8">
                    <Container className="my-5">
                        <Text className="text-[17px] text-center">Simon to add some terms and conditions here, including GDPR policy etc + Social links</Text>
                        <Section>
                            <Link href="www.facebook.com">
                                <Img src="images/facebook.png" alt="cat" width="144" height="144" className="mx-auto w-[80px]" />
                            </Link>
                        </Section>
                    </Container>
                </Section>
            </Tailwind>
        </Html>
    );
};

export default email;