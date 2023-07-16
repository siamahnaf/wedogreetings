import Link from "next/link";
import Rive from "@rive-app/react-canvas";
import { Icon } from "@iconify/react";


const Navs = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Book Greetings", url: "/book-greetings" },
    { name: "Contact Us", url: "/contact-us" },
]

const Socials = [
    { name: "Facebook", icon: "fa6-brands:facebook-f", url: "/" },
    { name: "Twitter", icon: "fa6-brands:twitter", url: "/" },
    { name: "Instagram", icon: "fa6-brands:square-instagram", url: "/" },
    { name: "Linkedin", icon: "fa6-brands:linkedin", url: "/" },
]

const FooterTwo = () => {
    return (
        <div className="col-span-5 text-center">
            <div>
                <Link href="/" className="block h-[80px] w-[320px] mx-auto">
                    <Rive src="/rive/logo.riv" width="100%" height="100%" />
                </Link>
            </div>
            <ul className="flex gap-4 justify-center mb-5">
                {Navs.map((item, i) => (
                    <li>
                        <Link href={item.url} className="text-base font-medium">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className="flex gap-3 justify-center">
                {Socials.map((item, i) => (
                    <li>
                        <Link href={item.url} className="bg-c-deep-sky w-[32px] h-[32px] rounded-md text-white flex justify-center items-center">
                            <Icon icon={item.icon} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterTwo;