import { SetStateAction, Dispatch, useContext } from "react";
import moment from "moment";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Interface
interface Props {
    firstName: string;
    lastName: string;
    date: Date;
    setAvailability: Dispatch<SetStateAction<null | boolean>>;
}

const Available = ({ firstName, lastName, date, setAvailability }: Props) => {
    //Context
    const { handleNext } = useContext(TimelineContext);

    return (
        <div className="mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg w-[550px] mx-auto text-center">
            <h3 className="text-4xl font-bold text-c-deep-sky">FANTASTIC NEWS!</h3>
            <p className="text-base text-c-novel mt-5">
                We have availability on Sunday <span className="text-black font-medium">{moment(date).format("Do MMMM YYYY")}</span>. Your local installer and franchise owner would be <span className="text-black font-medium">{firstName} {lastName}</span>.
            </p>
            <div className="flex gap-3 justify-center mt-8">
                <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" onClick={() => setAvailability(null)}>
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