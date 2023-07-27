import { Dispatch, SetStateAction, useContext } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Interface
interface Props {
    setStep: Dispatch<SetStateAction<string>>;
}
const Card = ({ setStep }: Props) => {
    //Context
    const { customer, availableData } = useContext(TimelineContext);

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
    }

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
            <form action='https://secure-test.worldpay.com/wcc/purchase' method="POST" target="_blank">
                <input type='hidden' name='instId' value='1471088' />
                <input type='hidden' name='amount' value='10.99' />
                <input type='hidden' name='cartId' value="franchisee name" />
                <input type='hidden' name='currency' value='GBP' />
                <input type='hidden' name='testMode' value='100' />
                <input type='hidden' name='name' value='uniqueID' />
                <input type='hidden' name='accId1' value='WEGREETLTDM1' />
                <div>
                    <div className="flex gap-3 justify-center mt-8">
                        <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={() => setStep("step1")}>
                            Back
                        </button>
                        <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md" type="submit">
                            Pay £{getTotalPrice()}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Card;