import Link from "next/link";
import { Icon } from "@iconify/react";

const FooterOne = () => {
    return (
        <div className="col-span-4">
            <h5 className="text-2xl font-bold mb-3">Get in Touch</h5>
            <p className="text-sm"><span className="font-semibold">Address:</span> Unit A, 82 James Carter Road, Mildenhall, Suffolk, United Kingdom, IP28 7DE</p>
            <ul className="mt-4">
                <li className="mb-4">
                    <Link href="tel:+4401908965066" className="flex gap-2 items-center">
                        <Icon className="text-[17px]" icon="logos:whatsapp-icon" />
                        <span className="text-sm">+44 01908 965 066</span>
                    </Link>
                </li>
                <li>
                    <Link href="mailto:info@wedogreetings.co.uk" className="flex gap-2 items-center">
                        <Icon className="text-base" icon="twemoji:e-mail" />
                        <span className="text-sm">info@wedogreetings.co.uk</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default FooterOne;