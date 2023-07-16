import Image from "next/image";
import Link from "next/link";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";


//Components
import Container from "@/Components/Common/Container";


//Query
import { useQuery } from "@tanstack/react-query";
import { GET_WEB_PRODUCTS } from "@/Query/Function/Home/hero.function";

const Card = () => {
    //Query
    const { data } = useQuery({ queryKey: ["webProduct"], queryFn: GET_WEB_PRODUCTS });

    return (
        <Container className="py-10 bg-[url('/images/bgs/product-bg.png')] bg-no-repeat bg-cover bg-center bg-c-light-slate bg-opacity-10">
            <div className="text-center">
                <h4 className="text-4xl font-bold text-c-light-slate w-max mx-auto relative after:w-16 after:h-1 after:bg-c-deep-sky after:absolute after:top-1/2 after:-right-20 after:-translate-y-1/2 after:rounded before:w-16 before:h-1 before:bg-c-deep-sky before:absolute before:top-1/2 before:-left-20 before:-translate-y-1/2 before:rounded-md">We Have Display <br /> For Most Occasions </h4>
                <p className="text-sm text-c-novel w-[40%] mx-auto mt-4">Our bold deluxe garden include the following greetings for lifes most celebrated occasions</p>
            </div>
            <div className="grid grid-cols-4 gap-6 mt-12">
                {data?.map((item, i) => (
                    <div className="bg-white shadow-3xl rounded-lg overflow-hidden" key={i}>
                        <Image src={imageUrl(item["@row.id"], item["Prod Img Small"], 43477765)} alt={item["Product Name"]} width={341} height={228} />
                        <div className="text-center py-6 px-3">
                            <h5 className="text-lg uppercase font-bold mb-2">{item["Product Name"]}</h5>
                            <p className="text-sm text-c-novel mt-3 mb-6 line-clamp-2">{item["Poduct Description Small"]}</p>
                            <Link href={`/product/view/${item["@row.id"]}`} className="py-1.5 px-6 bg-c-deep-sky text-white rounded-md ">
                                Book Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <button className="border border-solid border-c-deep-sky py-2 px-6 rounded-md text-c-deep-sky font-medium">
                    View More
                </button>
            </div>
        </Container >
    );
};

export default Card;