import Image from "next/image";
import Link from "next/link";

//Layout
import Layout from "@/Layout";

//Components
import Container from "@/Components/Common/Container";
import ContactHeader from "@/Components/Contact/Header";
import Info from "@/Components/Contact/Info";
import Form from "@/Components/Contact/Form";

const ContactUs = () => {
    return (
        <Layout title="Contact us" active="contact">
            <ContactHeader />
            <Container className="bg-[url('/images/contact/bg.png')] bg-no-repeat bg-contain bg-left my-16 lg:bg-[url('/images/contact/bg.png')] xxs:bg-none">
                <div className="grid grid-cols-12 gap-5 py-16">
                    <Info />
                    <Form />
                </div>
                <div className="fixed bottom-[6%] right-[2%]">
                    <Link href="/contact-us">
                        <Image src="/images/contact/whatsapp.png" width={117} height={123} alt="Whatsapp" className="w-[70px]" />
                    </Link>
                </div>
            </Container>
        </Layout>
    );
};

export default ContactUs;