import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { render } from "@react-email/components";

//Handler
import { sentEmail } from "@/Helper/email";

//Components
import Success from "../Common/Success";

//Template
import Template from "./Template";

//Interface
export interface Inputs {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

const Form = () => {
    //State
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<{ text: string, severity: boolean | null }>({ text: "", severity: null });

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();

    //Submit Handler
    const onSubmit: SubmitHandler<Inputs> = async (value) => {
        // await setLoading(true)
        const emailHtml = render(<Template {...value} />);
        sentEmail({ html: emailHtml, to: ["simon@wedogreetings.co.uk"], subject: `New contact message arrived from ${value.firstName}` })
            .then((data) => {
                console.log(data)
                setOpen(true)
                setMessage({ text: "We will contact your soon!", severity: true })
                setLoading(false)
                reset()
            }).catch((err) => {
                console.log(err)
                setOpen(true)
                setMessage({ text: "Something went wrong!", severity: false })
                setLoading(false)
            });

    }

    return (
        <div className="col-span-8 3xl:col-span-9 lg:col-span-8 xxs:col-span-12 bg-c-deep-sky bg-opacity-10 p-7 sm:p-7 xxs:p-4 rounded-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5 sm:gap-5 xxs:gap-3">
                    <div className="xxs:max-sm:col-span-2">
                        <input
                            className={`bg-white focus:outline-none py-3 px-4 rounded-md w-full border border-solid ${errors.firstName ? "border-red-600" : "border-transparent"}`}
                            placeholder="First Name"
                            {...register("firstName", { required: true })}
                        />
                    </div>
                    <div className="xxs:max-sm:col-span-2">
                        <input
                            className={`bg-white focus:outline-none py-3 px-4 rounded-md w-full border border-solid ${errors.lastName ? "border-red-600" : "border-transparent"}`}
                            placeholder="Last Name"
                            {...register("lastName", { required: true })}
                        />
                    </div>
                    <div className="col-span-2">
                        <input
                            className={`bg-white focus:outline-none py-3 px-4 rounded-md w-full border border-solid ${errors.email ? "border-red-600" : "border-transparent"}`}
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                    </div>
                    <div className="col-span-2">
                        <input
                            className={`bg-white focus:outline-none py-3 px-4 rounded-md w-full border border-solid ${errors.phone ? "border-red-600" : "border-transparent"}`}
                            placeholder="Phone number"
                            {...register("phone", { required: true })}
                        />
                    </div>
                    <div className="col-span-2">
                        <textarea
                            className={`bg-white focus:outline-none py-3 px-4 rounded-md w-full border border-solid ${errors.message ? "border-red-600" : "border-transparent"}`}
                            placeholder="Message"
                            {...register("message", { required: true })}
                            rows={6}
                        />
                    </div>
                </div>
                <div className="text-center mt-7">
                    <button type="submit" className="bg-c-deep-sky py-2 px-16 4xl:px-24 4xl:py-3.5 3xl:py-2.5 rounded-md text-white font-semibold uppercase text-sm relative" disabled={loading}>
                        <span className={`${loading ? "opacity-30" : "opacity-100"}`}>send</span>
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            {loading &&
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>
                </div>
            </form>
            <Success
                open={open}
                onClose={() => setOpen(false)}
                message={message}
            />
        </div>
    );
};

export default Form;