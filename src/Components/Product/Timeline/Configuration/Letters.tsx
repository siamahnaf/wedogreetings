import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Context
import SingleLetters from "./Letters/SingleLetters";

//Interface Import
import { LetterTypes } from "./Letters/SingleLetters/Selector";

//Interface
interface Props {
    setStep: Dispatch<SetStateAction<string>>;
}

const Letters = ({ setStep }: Props) => {
    //Context
    const { configureData, setLetters } = useContext(TimelineContext);

    //State
    const [names, setNames] = useState<string[]>([]);
    const [selected, setSelected] = useState<LetterTypes[]>([]);

    //OnSubmit
    const onSubmit = () => {
        setLetters?.(selected);
        setStep("step2");
    }

    //Lifecycle Hook
    useEffect(() => {
        if (configureData?.formData.name) {
            const chars = Array(16).fill("");
            const names = configureData.formData.name.split("");
            const initialData = names.map((item, i) => ({ index: i, url: selected[i]?.url || "", id: selected[i]?.id || "", name: selected[i]?.name || "", letter: item }));
            setSelected(initialData);
            names.forEach((char, index) => {
                chars[index] = char;
            });
            setNames(chars);
        }
    }, [configureData?.formData.name]);

    return (
        <div>
            <p className="text-base text-c-novel text-center">
                Tap or click the letter to changes to <span className="text-black">UPPER</span> or <span className="text-black">LOWER</span> case and also <span className="text-black">Color</span>.
            </p>
            <div className="grid grid-cols-8 gap-4 mt-8">
                {names.map((item, i) => (
                    <SingleLetters item={item} key={i} setSelected={setSelected} selected={selected} index={i} />
                ))}
            </div>
            <div>
                <div className="flex gap-3 justify-center mt-8">
                    <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={() => setStep("step0")}>
                        Back
                    </button>
                    <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md" type="button" onClick={onSubmit}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Letters;