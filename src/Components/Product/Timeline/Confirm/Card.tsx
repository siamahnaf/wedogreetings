import { Dispatch, SetStateAction, useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import moment from "moment";

//Helpers Function
import { getOrderId } from "@/Helper/uniqueId";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Query
import { useQuery, useMutation } from "@tanstack/react-query";
import { GET_PAYMENT_RESPONSE, PLACE_ORDER } from "@/Query/Function/Product/product.function";

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

    //Query
    const responseData = useQuery({ queryKey: ["paymentResponse", uniqueId], queryFn: () => GET_PAYMENT_RESPONSE(uniqueId), refetchInterval: 1000 });
    const { mutate, data } = useMutation({
        mutationKey: ["placeOrder"], mutationFn: (formData: AddOrderPlaceData) => PLACE_ORDER(formData),
        onSuccess(data) {
            if (data[0].status === 201) {
                setStep("step3")
            }
        },
        onError() {
        }
    });
    console.log(data);

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

    //Payment Submit Window
    const onPaymentSubmit = () => {
        setFetching(true)
        const uniqueID = getOrderId();
        setUniqId(uniqueID);
        const url = `https://secure-test.worldpay.com/wcc/purchase?instId=1471088&cartId=${uniqueID}&amount=${getTotalPrice()}&currency=GBP&testMode=100&accId1=WEGREETLTDM1`
        const newPopupWindow = window.open(url, 'mini-popup', 'width=780,height=600');
        setPopupWindow(newPopupWindow)
    }

    useEffect(() => {
        if (responseData.data?.[0]?.cartId === uniqueId) {
            if (popupWindow) {
                popupWindow.close();
            }
        }
    }, [responseData])

    useEffect(() => {
        if (responseData.data?.[0]?.cartId === uniqueId && hasRunEffect === false) {
            const backdropString = `${configureData?.formData.backdrop?.id}|FS|1`
            const letterString = letters?.map((letter) => `${letter.id}|BS|${letter.index + 2}`).join(',');
            const emojiString = emojis?.filter((emoji) => emoji.id !== "").map((emoji) => `${emoji.id}|${emoji.index < 3 ? "LS" : "RS"}|${emoji.index + Number(letters?.length)}`).join(', ');
            const rentalString = `${backdropString},${letterString},${emojiString}`;
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
                "Customer String": customer?.customerString as string
            }
            mutate(formData)
            setHasRunEffect(true);
        }
    }, [responseData])

    return (
        <div>
            <div className="text-center mb-12">
                <h5 className="text-3xl font-bold text-c-deep-sky uppercase">Payment</h5>
                <p className="text-base text-c-novel mt-2">Choose payment method below</p>
            </div>
            <div>
                <div className="bg-c-white-smoke w-[50%] mx-auto py-8 px-10 rounded relative border border-solid border-[#0AFFB1] cursor-pointer">
                    <Image src="/images/pay.png" alt="World Pay" width={326} height={62} />
                    <div className="w-[30px] h-[30px] bg-[#0AFFB1] absolute -top-3 -right-3 flex justify-center items-center text-white rounded-xl">
                        <Icon icon="mingcute:check-fill" />
                    </div>
                </div>
            </div>
            <div className="flex gap-3 justify-center mt-8">
                <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={() => setStep("step1")} disabled={fetching}>
                    Back
                </button>
                <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md relative" onClick={onPaymentSubmit} disabled={fetching}>
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