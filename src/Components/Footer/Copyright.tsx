import Link from "next/link";
import moment from "moment";

const data = [
    { name: "Terms", url: "/terms-and-conditions" },
    { name: "Privacy", url: "/privacy-and-policy" },
    { name: "Cookies", url: "/cookies" }
]

const Copyright = () => {
    return (
        <div className="flex gap-2 py-7">
            <div className="flex-1">
                <p className="text-[15px]">© {moment().format("YYYY")} We do greetings. All rights reserved. Design by <Link className="hover:text-c-deep-sky" href="https://codestation21.com">Code Station-21</Link></p>
            </div>
            <div>
                <ul className="flex gap-3">
                    {data.map((item, i) => (
                        <li>
                            <Link className="text-[15px] hover:text-c-deep-sky" href={item.url}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Copyright;