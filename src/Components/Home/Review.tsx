import { Rating } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Components
import Container from "@/Components/Common/Container";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_CUSTOMER_REVIEWS } from "@/Query/Function/Home/hero.function";

const Review = () => {
    //Query
    const { data } = useQuery({ queryKey: ["webReviews"], queryFn: GET_CUSTOMER_REVIEWS });

    return (
        <Container className="pb-10 pt-16 bg-c-hollywood bg-opacity-10">
            <div className="grid grid-cols-12 gap-16 items-center">
                <div className="col-span-5">
                    <h4 className="text-4xl font-bold text-c-hollywood mb-3">What Our Clients Say <br /> About Us</h4>
                    <p className="text-sm text-c-novel mb-7">Our bold deluxe garden include the following greetings for lifes most celebrated occasions</p>
                    <Link href="/" className="bg-c-deep-sky text-white font-medium py-2 px-6 rounded-md text-sm">
                        View More
                    </Link>
                </div>
                <div className="col-span-7">
                    {data && data.length > 0 &&
                        <div className="flex gap-5 items-center">
                            <div className="flex-[0_0_15%]">
                                <Image src={imageUrl(data[0]["@row.id"], data[0]["Reviewee Image"], 43480102)} alt={data[0]["Review Heading"]} width={174} height={200} className="w-full rounded-md" />
                            </div>
                            <div className="flex-[0_0_85%]">
                                <h5 className="text-2xl font-bold mb-1.5">{data[0]["Rentees (customers) Contact Person"]}</h5>
                                <Rating value={data[0]["Star Rating"]} readonly />
                                <p className="text-base text-c-novel mt-2">{data[0]["Review Content"]}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="grid grid-cols-3 gap-10 mt-14">
                {data?.slice(1).map((item, i) => (
                    <div key={i} className="flex gap-5 items-center">
                        <div className="flex-[0_0_30%]">
                            <Image src={imageUrl(item["@row.id"], item["Reviewee Image"], 43480102)} alt={item["Review Heading"]} width={174} height={200} className="aspect-[6/7] rounded-md" />
                        </div>
                        <div className="flex-[0_0_70%]">
                            <h5 className="text-2xl font-bold mb-1.5">{item["Rentees (customers) Contact Person"]}</h5>
                            <Rating value={item["Star Rating"]} readonly />
                            <p className="text-base text-c-novel mt-2">{item["Review Content"]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Review;