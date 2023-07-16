import Link from "next/link";
import { Icon } from "@iconify/react";

const FooterOne = () => {
    return (
        <div className="col-span-4">
            <h5 className="text-2xl font-bold mb-3">Get in Touch</h5>
            <p className="text-sm"><span className="font-semibold">Address:</span> Our bold deluxe garden include the following greetings for lifes most celebrated occasions</p>
            <ul className="mt-4">
                <li className="mb-4">
                    <Link href="tel:+8801600000000" className="flex gap-2 items-center">
                        <Icon className="text-base" icon="gg:phone" />
                        <span className="text-sm">+88 01600 000000</span>
                    </Link>
                </li>
                <li>
                    <Link href="mailto:Demo@Gmail.com" className="flex gap-2 items-center">
                        <Icon className="text-base" icon="material-symbols:mail-sharp" />
                        <span className="text-sm">Demo@Gmail.com</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default FooterOne;