import { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { render } from "@react-email/render";

//Components
import Success from "../Common/Success";

//Template
import Template from "./Template";

//Query
import { useMutation } from "@tanstack/react-query";
import { SENT_EMAIL } from "@/Query/Function/Email/email.function";
import { SentEmailData } from "@/Query/Types/Email/email.types";

//Test function
const sentEmail = async (data: SentEmailData) => {
    const headers = {
        "Content-Type": "application/json"
    }
    const response = await fetch("/api/email", { method: "POST", headers, body: JSON.stringify(data) })
    if (!response.ok) {
        throw new Error("Something went wrong")
    }
    return response.json()
}

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
    const [message, setMessage] = useState<{ text: string, severity: boolean }>({ text: "", severity: false })

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>();

    //Query
    const { data, error, mutate, isPending } = useMutation({
        mutationKey: ["contactEmail"],
        mutationFn: (formData: SentEmailData) => SENT_EMAIL(formData),
        onSuccess(data) {
            setOpen(true)
            if (data.MessageID) {
                setMessage({ text: "We receive your email successfully, we will contact you soon!", severity: true })
                reset()
            } else {
                setMessage({ text: "Something went wrong!", severity: false })
            }
        },
        onError() {
            setOpen(true)
            setMessage({ text: "Something went wrong!", severity: false })
        }
    })

    //Submit Handler
    const onSubmit: SubmitHandler<Inputs> = async (value) => {
        const emailHtml = render(<Template {...value} />)
        const formData = {
            to: [{ name: "Simon Parker", email: "simon@wedogreetings.co.uk" }],
            cc: [{ name: value.firstName, email: value.email }],
            subject: `New contact message arrived from ${value.firstName}`,
            html: emailHtml
        }
        mutate(formData)
    }

    return (
        <div className="col-span-8 3xl:col-span-9 lg:col-span-8 xxs:col-span-12 bg-c-deep-sky bg-opacity-10 p-7 sm:p-7 xxs:p-4 rounded-md">
            {JSON.stringify(data)}
            {JSON.stringify(error)}
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
                            {...register("email", {
                                required: true,
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                            })}
                        />
                    </div>
                    <div className="col-span-2">
                        <input
                            className={`bg-white focus:outline-none py-3 px-4 rounded-md w-full border border-solid ${errors.phone ? "border-red-600" : "border-transparent"}`}
                            placeholder="Phone number"
                            {...register("phone", {
                                required: true,
                                pattern: /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/
                            })}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9+]/g, '');
                            }}
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
                    <button type="submit" className="bg-c-deep-sky py-2 px-16 4xl:px-24 4xl:py-3.5 3xl:py-2.5 rounded-md text-white font-semibold uppercase text-sm relative" disabled={isPending}>
                        <span className={`${isPending ? "opacity-30" : "opacity-100"}`}>send</span>
                        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                            {isPending &&
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