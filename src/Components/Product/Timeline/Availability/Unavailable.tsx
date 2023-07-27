import { useState } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { SetStateAction, Dispatch } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

//Notification
import { Notification } from "@/Components/Common/Notification";

//Query
import { useMutation } from "@tanstack/react-query";
import { ADD_CUSTOM_REQUEST } from "@/Query/Function/Product/product.function";

//Interface
interface Props {
    setAvailability: Dispatch<SetStateAction<null | boolean>>;
}

interface Inputs {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const Unavailable = ({ setAvailability }: Props) => {
    //State
    const [notification, setNotification] = useState(false);

    //Initializing Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();

    //Query
    const { mutate, data, isPending, error } = useMutation({
        mutationKey: ["AddCustomRequest"], mutationFn: (formData: Inputs) => ADD_CUSTOM_REQUEST(formData),
        onSuccess() {
            setNotification(true)
            reset()
        },
        onError() {
            setNotification(true)
        }
    });

    //Submit Form
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        mutate(value)
    };

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div className="mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg text-center w-[70%] mx-auto">
            {(error || data) &&
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity={error?.message ? "error" : "success"}
                >
                    {error?.message ?? "Custom request placed successfully!"}
                </Notification>
            }
            <h4 className="text-4xl font-bold text-c-deep-sky">REGRETTABLY</h4>
            <p className="text-base text-c-novel mt-5">We are fully booked on the requested date. Could you do these dates instead?</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Input
                            label="Name"
                            color="cyan"
                            className="rounded-md"
                            {...register("name", { required: true })}
                            error={errors.name ? true : false}
                        />
                    </div>
                    <div>
                        <Input
                            label="Email"
                            color="cyan"
                            className="rounded-md"
                            {...register("email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })}
                            error={errors.email ? true : false}
                        />
                    </div>
                    <div className="col-span-2">
                        <Input
                            label="Phone"
                            color="cyan"
                            className="rounded-md"
                            {...register("phone", { required: true })}
                            error={errors.phone ? true : false}
                        />
                    </div>
                    <div className="col-span-2">
                        <Textarea
                            label="Message"
                            color="cyan"
                            rows={3}
                            className="rounded-md"
                            {...register("message", { required: true })}
                            error={errors.message ? true : false}
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-center mt-6">
                    <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" onClick={() => setAvailability(null)} type="button">
                        Back
                    </button>
                    <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md relative" type="submit" disabled={isPending}>
                        Submit
                        <div className="absolute top-1/2 right-3 -translate-y-1/2">
                            {isPending &&
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-c-novel">Are you want to be a franchisee
                        ? <Link href="/become-a-seller" className="text-c-deep-sky font-semibold">
                            Become a Franchisee.</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Unavailable;