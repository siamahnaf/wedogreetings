import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Context
import SingleLetters from "./Letters/SingleLetters";


//Interface
interface Props {
    setStep: Dispatch<SetStateAction<string>>;
}

const Letters = ({ setStep }: Props) => {
    //Context
    const { configureData } = useContext(TimelineContext);

    //State
    const [letters, setLetters] = useState<string[]>([]);

    //Lifecycle Hook
    useEffect(() => {
        if (configureData?.formData.name) {
            const chars = Array(16).fill("");
            const names = configureData.formData.name.split("");
            names.forEach((char, index) => {
                chars[index] = char;
            });
            setLetters(chars);
        }
    }, [configureData]);

    return (
        <div>
            <p className="text-base text-c-novel text-center">
                Tap or click the letter to changes to <span className="text-black">UPPER</span> or <span className="text-black">LOWER</span> case and also <span className="text-black">Color</span>.
            </p>
            <div className="grid grid-cols-8 gap-4 mt-8">
                {letters.map((item, i) => (
                    <SingleLetters item={item} />
                ))}
            </div>
            <div>
                <div className="flex gap-3 justify-center mt-8">
                    <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={() => setStep("step0")}>
                        Back
                    </button>
                    <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md" type="submit">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Letters;