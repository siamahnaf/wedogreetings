import { Dispatch, SetStateAction } from "react";

//Interface
interface Props {
    setStep: Dispatch<SetStateAction<string>>;
}
const Card = ({ setStep }: Props) => {
    return (
        <div>
            <div className="text-center mb-12">
                <h5 className="text-3xl font-bold text-c-deep-sky uppercase">CARD DETAILS</h5>
                <p className="text-base text-c-novel mt-2">Please enter your credit or debit card information</p>
            </div>
            <div>
                <div className="flex gap-3 justify-center mt-8">
                    <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={() => setStep("step1")}>
                        Back
                    </button>
                    <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md" type="button" onClick={() => setStep("step3")}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;