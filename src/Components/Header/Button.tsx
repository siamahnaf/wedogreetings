import Link from "next/link";

const Button = () => {
    return (
        <div>
            <Link href="/contact-us" className="bg-c-deep-sky text-white py-2 px-6 rounded-md font-semibold text-base">
                Contact Us
            </Link>
        </div>
    );
};

export default Button;