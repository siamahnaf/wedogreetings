import Link from "next/link";
import Rive from "@rive-app/react-canvas";
import { Icon } from "@iconify/react";


const Navs = [
    { name: "Home", url: "/" },
    // { name: "About", url: "/about-us" },
    { name: "FAQ's", url: "/faq" },
    { name: "Contact Us", url: "/contact-us" },
]

const Socials = [
    { name: "Facebook", icon: "fa6-brands:facebook-f", url: "https://www.facebook.com/profile.php?id=100094442037677" },
    { name: "Twitter", icon: "fa6-brands:twitter", url: "https://twitter.com/WeDoGreetingsHQ" },
    { name: "Instagram", icon: "fa6-brands:square-instagram", url: "https://www.instagram.com/wedogreetings_hq/" },
    { name: "Linkedin", icon: "fa6-brands:linkedin", url: "http://linkedin.com/company/we-do-greetings-hq" }
]

const FooterTwo = () => {
    return (
        <div className="col-span-5 lg:col-span-5 lsm:col-span-6 xxs:col-span-12 text-center xxs:max-lsm:mt-6">
            <div>
                <Link href="/" className="block h-[80px] xs:h-[80px] xxs:h-[50] w-[320px] xs:w-[320px] xxs:w-[250px] mx-auto">
                    <Rive src="/rive/logo.riv" width="100%" height="100%" />
                </Link>
            </div>
            <ul className="flex gap-4 justify-center mb-5">
                {Navs.map((item, i) => (
                    <li key={i}>
                        <Link href={item.url} className="text-base xs:text-base xxs:text-setTimeout(() => {
                            
                        }, timeout); font-medium">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <ul className="flex gap-3 justify-center">
                {Socials.map((item, i) => (
                    <li key={i}>
                        <Link href={item.url} className="bg-c-deep-sky w-[32px] h-[32px] rounded-md text-white flex justify-center items-center" target="_blank">
                            <Icon icon={item.icon} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterTwo;