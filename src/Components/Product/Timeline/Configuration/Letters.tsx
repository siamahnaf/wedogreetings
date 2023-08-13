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
        const nextStepElement = document.getElementById("timeline-container");
        if (nextStepElement) {
            nextStepElement.scrollIntoView({ block: "start" });
        }
    }

    //Lifecycle Hook
    useEffect(() => {
        if (configureData?.formData.name) {
            const chars = Array(16).fill("");
            const pattern = /(\d*)(ST|ND|RD|TH)|(.)/g;
            const result = [];
            let match;
            while ((match = pattern.exec(configureData.formData.name))) {
                const [, number, ordinal, character] = match;

                if (number) {
                    result.push(number);
                }

                if (ordinal) {
                    result.push(ordinal);
                }

                if (character) {
                    result.push(character);
                }
            }
            const initialData = result.map((item, i) => ({ index: i, url: selected[i]?.url || "", id: selected[i]?.id || "", name: selected[i]?.name || "", letter: item }));
            setSelected(initialData);
            result.forEach((char, index) => {
                chars[index] = char;
            });
            console.log(chars)
            setNames(chars);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configureData?.formData.name]);

    const onBackHandler = () => {
        setStep("step0");
        const nextStepElement = document.getElementById("timeline-container");
        if (nextStepElement) {
            nextStepElement.scrollIntoView({ block: "start" });
        }
    }

    return (
        <div>
            <p className="text-base text-c-novel text-center">
                <span className="text-black">Tap/click letters</span> to adjust options. <span className="text-black">Only these color options</span> are available for <span className="text-black">rent on this day.</span>
            </p>
            <div className="lg:block xxs:hidden">
                <div className="grid grid-cols-8 gap-4 mt-8">
                    {names.map((item, i) => (
                        <SingleLetters item={item} key={i} setSelected={setSelected} selected={selected} index={i} />
                    ))}
                </div>
            </div>
            <div className="flex gap-4 flex-wrap lg:hidden xxs:flex mt-8">
                {names.map((item, i) => (
                    <SingleLetters item={item} key={i} setSelected={setSelected} selected={selected} index={i} />
                ))}
            </div>
            <div>
                <div className="flex gap-3 justify-center mt-8">
                    <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={onBackHandler}>
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