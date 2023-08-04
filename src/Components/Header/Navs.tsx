import Link from "next/link";

//Data
const data = [
    { name: "Home", id: "home", url: "/" },
    { name: "About", id: "about", url: "/about-us" },
    { name: "FAQ's", id: "faq", url: "/faq" }
]

//Interface
interface Props {
    active?: string;
}

const Navs = ({ active }: Props) => {
    return (
        <div className="flex-1 text-center">
            <ul className="flex gap-2 justify-center">
                {data.map((item, i) => (
                    <li key={i} className="mx-px">
                        <Link href={item.url} className={`text-base py-2 px-4 rounded-lg ${active === item.id ? "bg-c-deep-sky bg-opacity-10 text-c-deep-sky font-semibold" : "font-medium text-c-novel"}`}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navs;