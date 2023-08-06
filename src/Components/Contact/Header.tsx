const ContactHeader = () => {
    return (
        <div className="text-center mt-16">
            <h4 className="text-4xl font-bold text-black w-max mx-auto relative after:w-16 after:h-1 after:bg-c-deep-sky after:absolute after:top-1/2 after:-right-20 after:-translate-y-1/2 after:rounded before:w-16 before:h-1 before:bg-c-deep-sky before:absolute before:top-1/2 before:-left-20 before:-translate-y-1/2 before:rounded-md xxs:max-sm:before:hidden xxs:max-sm:after:hidden">Contact Us</h4>
            <p className="text-sm text-c-novel w-[40%] md:w-[40%] msm:w-[60%] xxs:w-[90%] mx-auto mt-4">Let’s get your booking Started</p>
        </div>
    );
};

export default ContactHeader;