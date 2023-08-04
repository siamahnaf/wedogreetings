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
            <div className="grid grid-cols-12 lg-max:gap-14 xxs:gap-0 items-center">
                <div className="col-span-5 lg-max:col-span-5 xxs:col-span-12">
                    <h4 className="text-4xl lg:text-4xl lsm:text-3xl xxs:text-2xl font-bold text-c-hollywood mb-3">What Our Clients Say About Us</h4>
                    <p className="text-sm 4xl:text-base lg-max:text-sm lg:text-[15px] md:text-base sm:text-base text-c-novel mb-7">See what our customers have to say. Create your own messages and celebrate anywhere, indoors or out, creating lasting memories just like our happy customers below.</p>
                    {data && data?.length > 7 &&
                        <Link href="/" className="bg-c-deep-sky text-white font-medium py-2 px-6 rounded-md text-sm">
                            View More
                        </Link>
                    }
                </div>
                <div className="col-span-7 lg-max:block xxs:hidden">
                    {data && data.length > 0 &&
                        <div className="flex gap-5 items-center bg-white p-5  rounded-md">
                            <div className="flex-[0_0_25%]">
                                <Image src={imageUrl(data[0]["@row.id"], data[0]["Reviewee Image"], 43480102)} alt={data[0]["Review Heading"]} width={174} height={200} className="w-full rounded-md aspect-[87/100] object-cover object-center" />
                            </div>
                            <div className="flex-[0_0_75%]">
                                <h5 className="text-2xl font-bold mb-3">{data[0]["Review Heading"]}</h5>
                                <Rating value={data[0]["Star Rating"]} readonly />
                                <p className="text-base text-c-novel mt-2">
                                    {data[0]["Review Content"]}
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="lg-max:block xxs:hidden">
                <div className="grid grid-cols-3 gap-5 mt-14">
                    {data?.slice(1, 7).map((item, i) => (
                        <div key={i} className="flex gap-5 items-center bg-white p-4 rounded-md">
                            <div className="flex-[0_0_35%]">
                                <Image src={imageUrl(item["@row.id"], item["Reviewee Image"], 43480102)} alt={item["Review Heading"]} width={174} height={200} className="aspect-[87/100] rounded-md" />
                            </div>
                            <div className="flex-[0_0_65%]">
                                <h5 className="text-base 4xl:text-lg lg-max:text-base font-bold mb-1.5 w-[90%]">{item["Review Heading"]}</h5>
                                <Rating value={item["Star Rating"]} readonly />
                                <p className="text-sm 4xl:text-base lg-max:text-sm text-c-novel mt-2 w-[90%]">{item["Review Content"]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid gap-5 mt-14 lg:hidden lg:grid-cols-2 xxs:grid-cols-1">
                {data?.slice(0, 7).map((item, i) => (
                    <div key={i} className="flex gap-5 items-center bg-white p-4 rounded-md">
                        <div className="flex-[0_0_35%]">
                            <Image src={imageUrl(item["@row.id"], item["Reviewee Image"], 43480102)} alt={item["Review Heading"]} width={174} height={200} className="aspect-[87/100] rounded-md" />
                        </div>
                        <div className="flex-[0_0_65%]">
                            <h5 className="text-base 4xl:text-lg lg-max:text-base font-bold mb-1.5 w-[90%]">{item["Review Heading"]}</h5>
                            <Rating value={item["Star Rating"]} readonly />
                            <p className="text-sm 4xl:text-base lg-max:text-sm text-c-novel mt-2 w-[90%]">{item["Review Content"]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Review;