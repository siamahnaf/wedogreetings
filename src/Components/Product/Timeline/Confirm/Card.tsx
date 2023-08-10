import { Dispatch, SetStateAction, useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import moment from "moment";
import crypto from "crypto";
import { useRouter } from "next/router";
import { render } from "@react-email/components";

//Handler
import { sentEmail } from "@/Helper/email";

//Template
import Template from "./Template";

//Helpers Function
import { getOrderId } from "@/Helper/uniqueId";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Query
import { useQuery, useMutation } from "@tanstack/react-query";
import { GET_PAYMENT_RESPONSE, PLACE_ORDER, GET_SINGLE_PRODUCT } from "@/Query/Function/Product/product.function";

//Interface Import
import { AddOrderPlaceData } from "@/Query/Types/Product/product.types";

//Interface
interface Props {
    setStep: Dispatch<SetStateAction<string>>;
}

const Card = ({ setStep }: Props) => {
    //State
    const [uniqueId, setUniqId] = useState<string>("");
    const [popupWindow, setPopupWindow] = useState<Window | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);
    const [hasRunEffect, setHasRunEffect] = useState(false);

    //Context
    const { customer, availableData, configureData, letters, emojis } = useContext(TimelineContext);

    //Initialize Router
    const router = useRouter();


    //Handler get total price
    const getTotalPrice = () => {
        const totalPrice = Number(availableData?.surcharge) + (Number(availableData?.formData.rental) * 25);
        const midWeekPrice = availableData?.details?.["MidWk Price"]!;
        const wekndPrice = availableData?.details?.["Wknd Price"]!;
        const publicHolidayPrice = 40;
        if (availableData?.formData.option === "mid-week") {
            return totalPrice + midWeekPrice
        } else if (availableData?.formData.option === "weekend") {
            return totalPrice + wekndPrice
        } else if (availableData?.formData.option === "public-holiday") {
            return totalPrice + publicHolidayPrice;
        }
    };

    //Query
    const products = useQuery({ queryKey: ["product", router.query.id], queryFn: () => GET_SINGLE_PRODUCT(Number(router.query.id)) });
    const responseData = useQuery({ queryKey: ["paymentResponse", uniqueId], queryFn: () => GET_PAYMENT_RESPONSE(uniqueId), refetchInterval: 1500 });
    const { mutate } = useMutation({
        mutationKey: ["placeOrder"], mutationFn: (formData: AddOrderPlaceData) => PLACE_ORDER(formData),
        async onSuccess(data) {
            if (data[0].status === 201) {
                setStep("step3")
                const nextStepElement = document.getElementById("timeline-container");
                if (nextStepElement) {
                    nextStepElement.scrollIntoView({ block: "start" });
                }
                const emailData = {
                    customerName: `${customer?.formData["First Name"]} ${customer?.formData["Last Name"]}` as string,
                    event: products.data?.[0]["Product Name"] as string,
                    franchiseName: availableData?.details["Public Name"] as string,
                    cost: getTotalPrice() as number,
                    rental: availableData?.formData.rental as string,
                    date: availableData?.formData.rental as string,
                    time: availableData?.formData.setUpTime as string,
                    location: configureData?.formData.location as string,
                    base: configureData?.formData.base as string,
                    removalTime: availableData?.formData.removalTime as string,
                    number: availableData?.details.Phone as string,
                    email: availableData?.details["Email for Orders"] as string,
                    transId: responseData.data?.[0].transId as string
                }
                const emailHtml = render(<Template {...emailData} />);
                await sentEmail({ html: emailHtml, from: "info@wedogreetings.co.uk", to: [`${customer?.formData.Email}`], cc: [`${availableData?.details["Email Opt-Out"]}`, "simon@wedogreetings.co.uk"], subject: "Your order is confirmed!" })
            }
        },
        onError() {
        }
    });

    //Payment Submit Window    
    const onPaymentSubmit = () => {
        setFetching(true)
        const uniqueID = getOrderId();
        setUniqId(uniqueID);
        const width = 770
        const height = 550
        const screenLeft = window.screenLeft || window.screenX || 0;
        const screenTop = window.screenTop || window.screenY || 0;
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
        const screenHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
        const left = (screenWidth - width) / 2 + screenLeft;
        const top = (screenHeight - height) / 2 + screenTop;
        const createMD5Signature = (data: string) => {
            return crypto.createHash('md5').update(data).digest('hex');
        };
        const billing = `&name=${customer?.formData["First Name"]}&address1=${customer?.formData["Address line"]}&town=${customer?.formData.County}&postcode=${customer?.formData["Post Code"]}&country=UK&tel=${customer?.formData.Phone}&email=${customer?.formData.Email}`
        const url = `https://secure-test.worldpay.com/wcc/purchase?instId=1471088&cartId=${uniqueID}&amount=${getTotalPrice()}&currency=GBP&testMode=100&accId1=44606504&signature=${createMD5Signature(getTotalPrice()?.toString() as string)}${customer?.formData["Billing Address"] && billing}`;
        const newPopupWindow = window.open(url, 'mini-popup', `width=${width},height=${height},top=${top},left=${left}`);
        setPopupWindow(newPopupWindow)
    }

    //Handler
    const onBackHandler = () => {
        setStep("step1");
        const nextStepElement = document.getElementById("timeline-container");
        if (nextStepElement) {
            nextStepElement.scrollIntoView({ block: "start" });
        }
    }

    useEffect(() => {
        if (responseData.data?.[0]?.cartId === uniqueId) {
            if (popupWindow) {
                popupWindow.close();
            }
            if (responseData.data?.[0]?.transId === null) {
                setFetching(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseData])

    useEffect(() => {
        if (popupWindow && (!responseData.data || responseData.error)) {
            const checkPopupStatus = () => {
                if (popupWindow.closed) {
                    setFetching(false);
                    clearInterval(pollingInterval);
                }
            };
            const pollingInterval = setInterval(checkPopupStatus, 500);
            return () => {
                clearInterval(pollingInterval);
            };
        }
    }, [popupWindow]);

    useEffect(() => {
        if (responseData.data?.[0]?.cartId === uniqueId && hasRunEffect === false) {
            const result: { id: string, position: string }[] = [];
            if (configureData?.formData.backdrop?.id) {
                const objectEntry = { id: configureData.formData.backdrop.id, position: "BS" };
                result.push(objectEntry);
            }
            letters?.forEach((item) => {
                if (item.id) {
                    const entry = { id: item.id, position: "FS" };
                    result.push(entry);
                }
            });
            emojis?.forEach((item) => {
                if (item.id) {
                    const entry = { id: item.id, position: item.index < 3 ? "LS" : "RS" };
                    result.push(entry);
                }
            });
            const rentalString = result.map((item, i) => `${item.id}|${item.position}|${i + 1}`).join(",")
            const datetimeString = availableData?.formData.date?.endDate + " " + availableData?.formData.setUpTime;
            const rentalDate = moment(datetimeString, "YYYY-MM-DD hh:mm A").format("YYYY-MM-DDTHH:mm:ss")
            const formData = {
                "Transaction Amount": getTotalPrice() as number,
                "Signage Message": configureData?.formData.name as string,
                "Rental Date": rentalDate,
                "Rental Days": Number(availableData?.formData.rental),
                "WP Authcode": responseData.data?.[0]?.transId,
                "Reference to Admin - User Property": availableData?.details["Record Owner"] as string,
                "id": responseData.data[0].cartId as string,
                "Reference to Web Product Listing": availableData?.formData.event as string,
                "Rentals String": rentalString,
                "Customer String": customer?.customerString as string,
                "Location": configureData?.formData.location,
                "Base": configureData?.formData.base,
                "Name of Recipient": customer?.formData.Recipient as string,
                "Transaction Failed": responseData.data[0].Status === "Success" ? false : true
            }
            mutate(formData)
            setHasRunEffect(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseData])

    return (
        <div>
            <div className="text-center mb-12">
                <h5 className="text-3xl font-bold text-c-deep-sky uppercase">Payment</h5>
                <p className="text-base text-c-novel mt-2">Please select your preferred payment method from the options below.</p>
            </div>
            <div>
                <div className="bg-c-white-smoke w-1/2 sm:w-1/2 xxs:w-full mx-auto py-8 px-10 rounded relative border border-solid border-[#0AFFB1] cursor-pointer">
                    <Image src="/images/pay.png" alt="World Pay" width={326} height={62} className="mx-auto" />
                    <div className="w-[30px] h-[30px] bg-[#0AFFB1] absolute -top-3 -right-3 flex justify-center items-center text-white rounded-xl">
                        <Icon icon="mingcute:check-fill" />
                    </div>
                </div>
            </div>
            <div className="flex gap-3 justify-center mt-8">
                <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={onBackHandler} disabled={fetching}>
                    Back
                </button>
                <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md relative" onClick={onPaymentSubmit}>
                    <span className={`${fetching ? "opacity-30" : "opacity-100"}`}>Pay £{getTotalPrice()}</span>
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        {fetching &&
                            <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                        }
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Card;