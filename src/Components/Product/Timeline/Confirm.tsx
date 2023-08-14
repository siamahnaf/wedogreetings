import { useState, useContext, Fragment } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import Image from "next/image";

//Component-
import Letters from "./Configuration/Emoji/Letters";
import MobileBackdrop from "./Configuration/Emoji/MobileBackdrop";
import MobileLetters from "./Configuration/Emoji/MobileLetters";
import Customer from "./Confirm/Customer";
import Card from "./Confirm/Card";

//Timeline
import { TimelineContext } from "@/Context/timeline.context";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_SINGLE_PRODUCT } from "@/Query/Function/Product/product.function";

const Confirm = () => {
    //State
    const [step, setStep] = useState<string>("step0");

    //Initializing Hook
    const router = useRouter();

    //Context
    const { availableData, configureData, emojis, handlePrev } = useContext(TimelineContext);

    //Query
    const { data } = useQuery({ queryKey: ["product", router.query.id], queryFn: () => GET_SINGLE_PRODUCT(Number(router.query.id)) });

    //Converting Data Array to Data Object
    const dataObject = data?.find(() => true);

    //Handler get total price
    const getOnlyCost = () => {
        const midWeekPrice = availableData?.details?.["MidWk Price"]!;
        const wekndPrice = availableData?.details?.["Wknd Price"]!;
        const publicHolidayPrice = 40;
        if (availableData?.formData.option === "mid-week") {
            return midWeekPrice
        } else if (availableData?.formData.option === "weekend") {
            return wekndPrice
        } else if (availableData?.formData.option === "public-holiday") {
            return publicHolidayPrice;
        }
    }
    const getTotalPrice = () => {
        const totalPrice = Number(availableData?.surcharge) + (Number(availableData?.formData.rental) * 25);
        const midWeekPrice = availableData?.details?.["MidWk Price"]!;
        const wekndPrice = availableData?.details?.["Wknd Price"]!;
        if (availableData?.formData.option === "mid-week") {
            return totalPrice + midWeekPrice
        } else if (availableData?.formData.option === "weekend") {
            return totalPrice + wekndPrice
        } else if (availableData?.formData.option === "bank-holiday") {
            return totalPrice + wekndPrice;
        }
    }

    //Handler
    const onNextHandler = () => {
        setStep("step1");
        const nextStepElement = document.getElementById("timeline-container");
        if (nextStepElement) {
            nextStepElement.scrollIntoView({ block: "start" });
        }
    }

    return (
        <>
            <div className={`mt-16 sm:mt-16 xxs:mt-5 bg-white shadow-3xl py-12 px-8 msm:px-8 xxs:px-5 msm:py-12 xxs:py-5 rounded-lg w-[90%] lg:w-[90%] xxs:w-full mx-auto ${step === "step0" ? "block" : "hidden"}`}>
                <div className="text-center mb-8">
                    <h3 className="text-3xl sm:text-3xl xxs:text-2xl font-bold text-c-deep-sky">ORDER CONFIRMATION!</h3>
                    <p className="text-base text-c-novel mt-3">
                        Please check your order summary below
                    </p>
                </div>
                <hr className="mb-16" />
                <div className="flex justify-center lg-max:flex xxs:hidden">
                    <div className="grid grid-cols-12 gap-4 items-center justify-center">
                        <div className="col-span-2">
                            <div className="mb-3">
                                {emojis?.slice(0, 1).map((item) => (
                                    <Fragment key={item.index}>
                                        <div key={item.id} className="w-[70px] h-[70px] rounded-md bg-c-gainsboro mx-auto p-2">
                                            <div className="flex justify-center items-center h-full">
                                                {item.url === null &&
                                                    <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                        <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                    </div>
                                                }
                                                {item.url &&
                                                    <div>
                                                        <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {emojis?.slice(1, 3).map((item) => (
                                    <Fragment key={item.index}>
                                        <div key={item.id} className="w-[70px] h-[70px] rounded-md bg-c-gainsboro p-2">
                                            <div className="flex justify-center items-center h-full">
                                                {item.url === null &&
                                                    <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                        <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                    </div>
                                                }
                                                {item.url &&
                                                    <div>
                                                        <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                            <p className="text-center font-semibold text-[13px] mt-3">Left Side</p>
                        </div>
                        <div className="col-span-8">
                            <p className="text-center font-semibold text-base mb-3">Top of display</p>
                            <div className="mb-3">
                                <Letters highlight="" />
                            </div>
                            <p className="text-center font-semibold text-base mt-3">Forefront of display</p>
                        </div>
                        <div className="col-span-2">
                            <div className="mb-3">
                                {emojis?.slice(3, 4).map((item) => (
                                    <Fragment key={item.index}>
                                        <div key={item.id} className="w-[70px] h-[70px] rounded-md bg-c-gainsboro mx-auto p-2">
                                            <div className="flex justify-center items-center h-full">
                                                {item.url === null &&
                                                    <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                        <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                    </div>
                                                }
                                                {item.url &&
                                                    <div>
                                                        <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {emojis?.slice(4, 6).map((item) => (
                                    <Fragment key={item.index}>
                                        <div key={item.id} className="w-[70px] h-[70px] rounded-md bg-c-gainsboro p-2">
                                            <div className="flex justify-center items-center h-full">
                                                {item.url === null &&
                                                    <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                        <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                    </div>
                                                }
                                                {item.url &&
                                                    <div>
                                                        <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
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
                <div className="lg-max:hidden xxs:block">
                    <div className="mb-3">
                        <p className="font-semibold text-base">Top of display</p>
                    </div>
                    <MobileBackdrop highlight="" />
                    <div className="mt-5 mb-3">
                        <p className="font-semibold text-base">Left Side</p>
                    </div>
                    <div className="flex gap-5 lg:gap-5 md:gap-3">
                        {emojis?.slice(0, 3).map((item) => (
                            <Fragment key={item.index}>
                                <div key={item.id} className="w-[70px] h-[70px] rounded-md bg-c-gainsboro p-2 border-2 border-solid">
                                    <div className="flex justify-center items-center h-full">
                                        {item.url === null &&
                                            <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                            </div>
                                        }
                                        {item.url &&
                                            <div>
                                                <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                    <div className="mt-5 mb-3">
                        <p className="font-semibold text-base">Right Side</p>
                    </div>
                    <div className="flex gap-5 lg:gap-5 md:gap-3">
                        {emojis?.slice(3, 6).map((item) => (
                            <Fragment key={item.index}>
                                <div key={item.id} className="w-[70px] h-[70px] rounded-md bg-c-gainsboro p-2 border-2 border-solid">
                                    <div className="flex justify-center items-center h-full">
                                        {item.url === null &&
                                            <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                            </div>
                                        }
                                        {item.url &&
                                            <div>
                                                <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                    <div className="mt-5 mb-3">
                        <p className="font-semibold text-base">Forefront of display</p>
                    </div>
                    <MobileLetters highlight="" />
                </div>
                <div className="mt-16 w-1/2 lg-max:w-1/2 xxs:w-full mx-auto">
                    <p className="mb-1.5 text-c-novel flex xxs:max-sm:text-sm"><span className="flex-1">Cost:</span> <span className="font-semibold text-black">£{getOnlyCost()}</span></p>
                    <p className="mb-1.5 text-c-novel flex xxs:max-sm:text-sm"><span className="flex-1">Surcharge:</span> <span className="font-semibold text-black">£{availableData?.surcharge || 0}</span></p>
                    <p className="mb-1.5 text-c-novel flex xxs:max-sm:text-sm"><span className="flex-1">Extended charge:</span> <span className="font-semibold text-black">{availableData?.formData.rental} × £25</span></p>
                    <p className="mb-1.5 text-c-novel flex xxs:max-sm:text-sm"><span className="flex-1">Selected option:</span> <span className="font-semibold text-black">{availableData?.formData.option}</span></p>
                    <p className="mb-1.5 text-c-novel flex xxs:max-sm:text-sm"><span className="flex-1">When:</span> <span className="text-black font-semibold">{moment(availableData?.formData.date?.endDate).format('Do MMMM YYYY')}</span></p>
                    <p className="mb-1.5 text-c-novel flex xxs:max-sm:text-sm"><span className="flex-1">Greeting Types:</span> <span className="font-semibold text-black">{dataObject?.["Product Name"]}</span></p>
                    <p className="mb-1.5 text-c-novel flex xxs:max-sm:text-sm"><span className="flex-1">Greeting Message:</span> <span className="text-black font-semibold">{configureData?.formData.name}</span></p>
                    <hr className="border-c-deep-sky border-opacity-10 my-5" />
                    <p className="mb-1.5 text-c-novel flex"><span className="flex-1">Total:</span> <span className="text-black font-semibold">£{getTotalPrice()}</span></p>
                    <div className="flex gap-3 mt-12 justify-center">
                        <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={handlePrev}>
                            Back
                        </button>
                        <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md" type="button" onClick={onNextHandler}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
            <div className={`mt-16 sm:mt-16 xxs:mt-5 bg-white shadow-3xl py-12 px-8 msm:px-8 xxs:px-5 msm:py-12 xxs:py-5 rounded-lg w-[60%] 4xl:w-[55%] lg-max:w-[60%] xxs:w-full mx-auto ${step === "step1" ? "block" : "hidden"}`}>
                <Customer setStep={setStep} />
            </div>
            <div className={`mt-16 sm:mt-16 xxs:mt-5 bg-white shadow-3xl py-12 px-8 msm:px-8 xxs:px-5 msm:py-12 xxs:py-5 rounded-lg w-[60%] lg-max:w-[60%] lg:w-[80%] xxs:w-full mx-auto ${step === "step2" ? "block" : "hidden"}`}>
                <Card setStep={setStep} />
            </div>
        </>
    );
};

export default Confirm;