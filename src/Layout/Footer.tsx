
//Components
import Container from "@/Components/Common/Container";
import FooterOne from "@/Components/Footer/FooterOne";
import FooterTwo from "@/Components/Footer/FooterTwo";
import FooterThree from "@/Components/Footer/FooterThree";
import Copyright from "@/Components/Footer/Copyright";

const Footer = () => {
    return (
        <Container className="bg-[url('/images/bgs/footer-bg.png')] pt-16 bg-no-repeat bg-cover bg-center bg-c-deep-sky bg-opacity-10">
            <div className="grid grid-cols-12 gap-4 items-center">
                <FooterOne />
                <FooterTwo />
                <FooterThree />
            </div>
            <hr className="mt-10" />
            <Copyright />
        </Container>
    );
};

export default Footer;