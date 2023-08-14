import { Dispatch, SetStateAction, useContext, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import moment from "moment";

//Helpers Function
import { getOrderId } from "@/Helper/uniqueId";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Query
import { useMutation } from "@tanstack/react-query";
import { PLACE_ORDER } from "@/Query/Function/Product/product.function";

//Interface Import
import { AddOrderPlaceData } from "@/Query/Types/Product/product.types";

//Interface
interface Props {
    setStep: Dispatch<SetStateAction<string>>;
}

const Card = ({ setStep }: Props) => {
    //State
    const [uniqueId, setUniqId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    //Context
    const { customer, availableData, configureData, letters, emojis } = useContext(TimelineContext);


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
        } else if (availableData?.formData.option === "bank-holiday") {
            return totalPrice + publicHolidayPrice;
        }
    };

    //Query
    const { isPending, mutate } = useMutation({
        mutationKey: ["placeOrder"], mutationFn: (formData: AddOrderPlaceData) => PLACE_ORDER(formData),
        async onSuccess() {
            // const createMD5Signature = (data: string) => {
            //     return crypto.createHash('md5').update(data).digest('hex');
            // };
            const billing = `&name=${customer?.formData["First Name"]}&address1=${customer?.formData["Address line"]}&town=${customer?.town}&postcode=${customer?.formData["Post Code"]}&country=UK&tel=${customer?.formData.Phone}&email=${customer?.formData.Email}`
            const url = `https://secure-test.worldpay.com/wcc/purchase?instId=1471088&cartId=${uniqueId}&amount=${getTotalPrice()}&currency=GBP&testMode=100&accId1=${availableData?.details["WP-M#"] || 44606504}${customer?.formData["Billing Address"] && billing}`;
            window.location.href = url;
        }
    });

    //Payment Submit Window    
    const onPaymentSubmit = () => {
        setLoading(true)
        const uniqueID = getOrderId();
        setUniqId(uniqueID)
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
            "WP Authcode": "",
            "Reference to Admin - User Property": availableData?.details["Record Owner"] as string,
            "id": uniqueID,
            "Reference to Web Product Listing": availableData?.formData.event as string,
            "Rentals String": rentalString,
            "Customer String": customer?.customerString as string,
            "Location": configureData?.formData.location,
            "Base": configureData?.formData.base,
            "Name of Recipient": customer?.formData.Recipient as string,
            "Payment Status": "Unknown",
            "cartId": uniqueID
        }
        mutate(formData)
    }

    //Handler
    const onBackHandler = () => {
        setStep("step1");
        const nextStepElement = document.getElementById("timeline-container");
        if (nextStepElement) {
            nextStepElement.scrollIntoView({ block: "start" });
        }
    }

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
                <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={onBackHandler} disabled={isPending}>
                    Back
                </button>
                <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md relative" onClick={onPaymentSubmit} disabled={(isPending || loading)}>
                    <span className={`${(isPending || loading) ? "opacity-30" : "opacity-100"}`}>Pay £{getTotalPrice()}</span>
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                        {(isPending || loading) &&
                            <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                        }
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Card;