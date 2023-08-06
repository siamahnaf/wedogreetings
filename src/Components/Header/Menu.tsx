import { useState } from "react";
import { Drawer } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Rive from "@rive-app/react-canvas";

//Components
import Logo from "./Logo";

//Data
const data = [
    { name: "Home", id: "home", url: "/" },
    { name: "About", id: "about", url: "/about-us" },
    { name: "FAQ's", id: "faq", url: "/faq" }
]

const Terms = [
    { name: "Site Terms & Conditions", url: "/site-terms-and-conditions" },
    { name: "Rental Terms & Conditions", url: "/rental-terms-and-conditions" },
    { name: "Privacy & Cookie Policy", url: "/privacy-and-cookie-policy" }
]


const Menu = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="flex-1 text-right lg-max:hidden xxs:block">
            <button className="bg-c-deep-sky p-1 text-white rounded-md" onClick={() => setOpen(true)}>
                <Icon className="text-2xl" icon="mi:menu" />
            </button>
            <Drawer
                placement="right"
                open={open}
                onClose={() => setOpen(false)}
                className="p-4"
            >
                <div className="relative">
                    <Link href="/" className="block h-[60px] w-[250px] 4xl:w-[280px] mx-auto">
                        <Rive src="/rive/logo.riv" width="100%" height="100%" />
                    </Link>
                    <hr className="mt-2" />
                    <ul className="text-left mt-6">
                        {data.map((item, i) => (
                            <li key={i} className="my-1">
                                <Link href={item.url} className={`text-base py-1.5 px-4 rounded-lg bg-opacity-10 w-full block`}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="absolute bottom-4 right-3 left-3">
                    <ul className="flex gap-5 xxs:max-lsm:gap-y-2 xxs:max-lg:justify-center xxs:max-lsm:flex-wrap mb-10">
                        {Terms.map((item, i) => (
                            <li key={i}>
                                <Link className="text-[15px] hover:text-c-deep-sky" href={item.url}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="/contact-us" className="bg-c-deep-sky text-white py-3 px-6 rounded-lg font-semibold text-base w-full block text-center">
                        Contact Us
                    </Link>
                </div>
            </Drawer>
        </div>
    );
};

export default Menu;