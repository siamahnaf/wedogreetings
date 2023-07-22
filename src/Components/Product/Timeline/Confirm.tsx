import { useState, useContext, Fragment } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import Image from "next/image";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Component-
import Letters from "./Configuration/Emoji/Letters";
import Customer from "./Confirm/Customer";
import Card from "./Confirm/Card";
import Success from "./Confirm/Success";

//Timeline
import { TimelineContext } from "@/Context/timeline.context";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_SINGLE_PRODUCT, GET_FRANCHISEE_PRICING } from "@/Query/Function/Product/product.function";

const Confirm = () => {
    //State
    const [step, setStep] = useState<string>("step0");

    //Initializing Hook
    const router = useRouter();

    //Context
    const { availableData, emojis, handlePrev } = useContext(TimelineContext);

    //Query
    const { data } = useQuery({ queryKey: ["product", router.query.id], queryFn: () => GET_SINGLE_PRODUCT(Number(router.query.id)) });
    const price = useQuery({ queryKey: ["franchiseePricing", availableData?.franchiseeId], queryFn: () => GET_FRANCHISEE_PRICING(availableData?.franchiseeId as string) });

    //Converting Data Array to Data Object
    const dataObject = data?.find(() => true);

    //Handler get total price
    const getTotalPrice = () => {
        const totalPrice = Number(availableData?.surcharge) + (Number(availableData?.formData.rental) * 25);
        const midWeekPrice = price?.data?.[0]?.["MidWk Price"]!;
        const wekndPrice = price?.data?.[0]?.["Wknd Price"]!;
        const publicHolidayPrice = 40;
        if (availableData?.formData.option === "mid-week") {
            return totalPrice + midWeekPrice
        } else if (availableData?.formData.option === "weekend") {
            return totalPrice + wekndPrice
        } else if (availableData?.formData.option === "public-holiday") {
            return totalPrice + publicHolidayPrice;
        }
    }

    return (
        <>
            <div className={`mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg w-full mx-auto ${step === "step0" ? "block" : "hidden"}`}>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4 mt-6">
                        <p className="mb-1.5 text-c-novel">Cost: <span className="font-semibold text-black">£{getTotalPrice()}</span></p>
                        <p className="mb-1.5 text-c-novel">When: <span className="text-black font-semibold">{moment(availableData?.formData.date?.endDate).format('Do MMMM YYYY')}</span></p>
                        <p className="mb-1.5 text-c-novel">Greeting Types: <span className="font-semibold text-black">{dataObject?.["Product Name"]}</span></p>
                        <p className="mb-1.5 text-c-novel">Greeting Message: <span className="text-black font-semibold">{availableData?.franchiseeName}</span></p>
                        <div className="flex gap-3 mt-10">
                            <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={handlePrev}>
                                Back
                            </button>
                            <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md" type="button" onClick={() => setStep("step1")}>
                                Confirm
                            </button>
                        </div>
                    </div>
                    <div className="col-span-8">
                        <p className="text-center font-semibold text-base mb-3">Top of display</p>
                        <div className="flex justify-center px-6">
                            <div className="grid grid-cols-8 gap-4 items-center">
                                <div className="col-span-1">
                                    <div className="grid grid-cols-1 gap-4">
                                        {emojis?.slice(14, 16).reverse().map((item) => (
                                            <Fragment key={item.index}>
                                                <div key={item.id} className="w-[75px] h-[75px] rounded-md bg-c-white-smoke">
                                                    <div className="flex justify-center items-center h-full">
                                                        {item.url === null &&
                                                            <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                                <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                            </div>
                                                        }
                                                        {item.url &&
                                                            <div>
                                                                <Image src={imageUrl(Number(item.id), item.url, 43480466)} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))}
                                    </div>
                                    <p className="text-center font-semibold text-[13px] mt-3">Left Side</p>
                                </div>
                                <div className="col-start-2 col-span-6">
                                    <div className="grid grid-cols-6 gap-4">
                                        {emojis?.slice(0, 6).map((item) => (
                                            <Fragment key={item.index}>
                                                <div key={item.id} className="w-[75px] h-[75px] rounded-md bg-c-white-smoke">
                                                    <div className="flex justify-center items-center h-full">
                                                        {item.url === null &&
                                                            <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                                <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                            </div>
                                                        }
                                                        {item.url &&
                                                            <div>
                                                                <Image src={imageUrl(Number(item.id), item.url, 43480466)} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))}
                                    </div>
                                    <div className="my-4">
                                        <Letters />
                                    </div>
                                    <div className="grid grid-cols-6 gap-4">
                                        {emojis?.slice(8, 14).reverse().map((item) => (
                                            <Fragment key={item.index}>
                                                <div key={item.id} className="w-[75px] h-[75px] rounded-md bg-c-white-smoke">
                                                    <div className="flex justify-center items-center h-full">
                                                        {item.url === null &&
                                                            <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                                <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                            </div>
                                                        }
                                                        {item.url &&
                                                            <div>
                                                                <Image src={imageUrl(Number(item.id), item.url, 43480466)} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-span-1">
                                    <div className="grid grid-cols-1 gap-4">
                                        {emojis?.slice(6, 8).map((item) => (
                                            <Fragment key={item.index}>
                                                <div key={item.id} className="w-[75px] h-[75px] rounded-md bg-c-white-smoke">
                                                    <div className="flex justify-center items-center h-full">
                                                        {item.url === null &&
                                                            <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                                <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                            </div>
                                                        }
                                                        {item.url &&
                                                            <div>
                                                                <Image src={imageUrl(Number(item.id), item.url, 43480466)} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </Fragment>
                                        ))}
                                    </div>
                                    <p className="text-center font-semibold text-[13px] mt-3">Right Side</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-center font-semibold text-base mt-3">Forefront of display</p>
                    </div>
                </div>
            </div>
            <div className={`mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg w-[60%] mx-auto ${step === "step1" ? "block" : "hidden"}`}>
                <Customer setStep={setStep} />
            </div>
            <div className={`mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg w-[60%] mx-auto ${step === "step2" ? "block" : "hidden"}`}>
                <Card setStep={setStep} />
            </div>
            <div className={`mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg w-[45%] mx-auto ${step === "step3" ? "block" : "hidden"}`}>
                <Success setStep={setStep} />
            </div>
        </>
    );
};

export default Confirm;