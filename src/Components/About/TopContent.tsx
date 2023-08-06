//Components
import Container from "@/Components/Common/Container";

const TopContent = () => {
    return (
        <Container className="bg-c-deep-sky bg-opacity-5 py-16">
            <div className="text-center mb-16">
                <h4 className="text-4xl font-bold text-black w-max mx-auto relative after:w-16 after:h-1 after:bg-c-deep-sky after:absolute after:top-1/2 after:-right-20 after:-translate-y-1/2 after:rounded before:w-16 before:h-1 before:bg-c-deep-sky before:absolute before:top-1/2 before:-left-20 before:-translate-y-1/2 before:rounded-md xxs:max-sm:before:hidden xxs:max-sm:after:hidden">About Us</h4>
                <p className="text-sm text-c-novel w-[40%] md:w-[40%] msm:w-[60%] xxs:w-[90%] mx-auto mt-4">Let’s get your booking Started</p>
            </div>
            <h4 className="text-lg 4xl:text-xl mb-6 font-bold">We make your special day Memorable.</h4>
            <div className="grid grid-cols-2 lg:grid-cols-2 xxs:grid-cols-1 gap-9">
                <div>
                    <p className="text-c-novel text-base">
                        Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application. We will Plan, Design, Develop, Test and Deploy your idea using your desired or our recommended technology stack while making sure you get the Quality Product without Outspending your budget. <br /><br />
                        Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application
                    </p>
                </div>
                <div>
                    <p className="text-c-novel text-base">
                        Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application. We will Plan, Design, Develop, Test and Deploy your idea using your desired or our recommended technology stack while making sure you get the Quality Product without Outspending your budget, g your desired or our recommended technology stack while making sure you get the Quality Product without Outspending your budget
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default TopContent;