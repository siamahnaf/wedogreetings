import Link from "next/link";
import moment from "moment";

const data = [
    { name: "Site Terms & Conditions", url: "/site-terms-and-conditions" },
    { name: "Rental Terms & Conditions", url: "/rental-terms-and-conditions" },
    { name: "Privacy & Cookie Policy", url: "/privacy-and-cookie-policy" }
]

const Copyright = () => {
    return (
        <div className="flex gap-2 py-7 xxs:max-lg:flex-wrap">
            <div className="flex-1 xxs:max-lg:text-center xxs:max-lg:basis-full">
                <p className="text-[15px]">© {moment().format("YYYY")} We Do Greetings Ltd.</p>
            </div>
            <div className="xxs:max-lg:basis-full xxs:max-lg:mt-2">
                <ul className="flex gap-5 xxs:max-lsm:gap-y-2 xxs:max-lg:justify-center xxs:max-lsm:flex-wrap">
                    {data.map((item, i) => (
                        <li key={i}>
                            <Link className="text-[15px] hover:text-c-deep-sky" href={item.url}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Copyright;