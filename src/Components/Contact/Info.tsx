import Image from "next/image";
import Rive from "@rive-app/react-canvas";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Socials = [
    { name: "Facebook", icon: "fa6-brands:facebook-f", url: "https://www.facebook.com/profile.php?id=100094442037677" },
    { name: "Twitter", icon: "fa6-brands:twitter", url: "https://twitter.com/WeDoGreetingsHQ" },
    { name: "Instagram", icon: "fa6-brands:square-instagram", url: "https://www.instagram.com/wedogreetings_hq/" },
    { name: "Linkedin", icon: "fa6-brands:linkedin", url: "http://linkedin.com/company/we-do-greetings-hq" }
]

const Info = () => {
    return (
        <div className="col-span-4 bg-white shadow-3xl rounded-lg pb-7 px-7">
            <Image src="/images/contact/contact.png" alt="Contact us" width={688} height={608} className="mx-auto" />
            <div className="block h-[60px] w-[250px]">
                <Rive src="/rive/logo.riv" width="100%" height="100%" />
            </div>
            <p className="text-c-novel text-base mb-5">Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution.</p>
            <ul className="flex gap-2">
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

export default Info;