import { Input } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Interface
interface Inputs {
    event: string;
    option: string;
    date: string;
    rental: string;
    code: string;
}

const Availability = () => {
    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm<Inputs>();

    //Form Submit
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        console.log(value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
                <div>
                    <select className="w-full focus:outline-none py-2 px-3 bg-c-white-smoke rounded-lg">
                        <option>Hello 1</option>
                        <option>Hello 2</option>
                        <option>Hello 3</option>
                        <option>Hello 4</option>
                        <option>Hello 5</option>
                        <option>Hello 6</option>
                    </select>
                </div>
                <div>
                    <select className="w-full focus:outline-none py-2 px-3 bg-c-white-smoke rounded-lg">
                        <option>Mid-week</option>
                        <option>Weekend</option>
                        <option>Public Holiday</option>
                    </select>
                </div>
                <div>
                    <Input
                        label="Rental"
                        color="blue"
                        className="bg-c-novel"
                    />
                </div>
            </form>
        </div>
    );
};

export default Availability;