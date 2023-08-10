import { SetStateAction, Dispatch, useContext } from "react";
import moment from "moment";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Interface
interface Props {
    name: string;
    date: Date;
    setAvailability: Dispatch<SetStateAction<null | boolean>>;
}

const Available = ({ name, date, setAvailability }: Props) => {
    //Context
    const { handleNext } = useContext(TimelineContext);

    //Handler
    const onBackHandler = () => {
        setAvailability(null);
        const nextStepElement = document.getElementById("timeline-container");
        if (nextStepElement) {
            nextStepElement.scrollIntoView({ block: "start" });
        }
    }

    return (
        <div className="mt-16 sm:mt-16 xxs:mt-5 bg-white shadow-3xl py-12 px-8 msm:px-8 xxs:px-5 msm:py-12 xxs:py-5 rounded-lg w-[550px] lsm:w-[550px] xxs:w-full mx-auto text-center">
            <h3 className="text-4xl sm:text-4xl xxs:text-2xl font-bold text-c-deep-sky">FANTASTIC NEWS!</h3>
            <p className="text-base text-c-novel mt-5">
                We have availability on Sunday <span className="text-black font-medium">{moment(date).format("Do MMMM YYYY")}</span>. Your local installer and franchise owner would be <span className="text-black font-medium">{name}</span>.
            </p>
            <div className="flex gap-3 justify-center mt-8">
                <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" onClick={onBackHandler}>
                    Back
                </button>
                <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Available;