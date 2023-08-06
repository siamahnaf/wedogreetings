import { useState, ChangeEvent } from "react";
import { Input, Textarea, Checkbox } from "@material-tailwind/react";
import { SetStateAction, Dispatch } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

//Notification
import { Notification } from "@/Components/Common/Notification";

//Query
import { useMutation } from "@tanstack/react-query";
import { ADD_CUSTOM_REQUEST } from "@/Query/Function/Product/product.function";

//Interface
import { AddCustomRequestData } from "@/Query/Types/Product/product.types";

interface Props {
    setAvailability: Dispatch<SetStateAction<null | boolean>>;
}

interface Inputs {
    "Title": string;
    "First Name": string;
    "Last Name": string;
    "Phone": string;
    "Email": string;
    "Address line": string;
    "Post Code": string;
    "County": string;
    "Opt-in Marketing": boolean;
    "Opt-in Terms": boolean;
    "Opt-in Seek Installer": boolean;
    "Opt-in Franchise Op": boolean;
}

const Unavailable = ({ setAvailability }: Props) => {
    //State
    const [notification, setNotification] = useState(false);

    //Initializing Form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<Inputs>();

    //Query
    const { mutate, data, isPending, error } = useMutation({
        mutationKey: ["AddCustomRequest"], mutationFn: (formData: AddCustomRequestData) => ADD_CUSTOM_REQUEST(formData),
        onSuccess(data) {
            if (data?.[0].status === 201) {
                setNotification(true)
                reset({})
            }
        },
        onError() {
            setNotification(true)
        }
    });

    //Submit Form
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const customerData = {
            ...value,
            "Opt-in Marketing": value["Opt-in Marketing"] === true ? new Date().toISOString() : "",
            "Opt-in Terms": value["Opt-in Terms"] === true ? new Date().toISOString() : "",
            "Opt-in Seek Installer": value["Opt-in Seek Installer"] === true ? new Date().toISOString() : "",
            "Opt-in Franchise Op": value["Opt-in Franchise Op"] ? new Date().toISOString() : ""
        }
        mutate(customerData)
    };

    //Handler -- notification
    const onNotification = () => {
        setNotification(false);
    };

    return (
        <div className="mt-16 sm:mt-16 xxs:mt-5 bg-white shadow-3xl py-12 px-8 msm:px-8 xxs:px-5 msm:py-12 xxs:py-5 rounded-lg text-center w-[70%] lg-max:w-[70%] xxs:w-full mx-auto">
            {(error || data?.[0].status === 201) &&
                <Notification
                    open={notification}
                    handleClose={onNotification}
                    severity={error?.message ? "error" : "success"}
                >
                    {error?.message ?? "Your request placed successfully!"}
                </Notification>
            }
            <h4 className="text-4xl sm:text-4xl xxs:text-2xl font-bold text-c-deep-sky">REGRETTABLY</h4>
            <p className="text-base text-c-novel mt-5"><span className="text-black">Oh no!</span> It looks like we don&apos;t currently have an installer in your area.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <Input
                            label="Title"
                            color="cyan"
                            id="title"
                            {...register("Title", { required: true })}
                            error={errors["Title"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\|/g, '')
                            }}
                        />
                    </div>
                    <div className="xxs:max-msm:col-span-2">
                        <Input
                            label="First Name"
                            color="cyan"
                            id="firstName"
                            {...register("First Name", { required: true })}
                            error={errors["First Name"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\|/g, '')
                            }}
                        />
                    </div>
                    <div className="xxs:max-msm:col-span-2">
                        <Input
                            label="Last Name"
                            color="cyan"
                            id="lastName"
                            {...register("Last Name", { required: true })}
                            error={errors["Last Name"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\|/g, '')
                            }}
                        />
                    </div>
                    <div className="xxs:max-msm:col-span-2">
                        <Input
                            label="Phone Number"
                            color="cyan"
                            id="phone"
                            {...register("Phone", { required: true })}
                            error={errors["Phone"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\|/g, '')
                            }}
                        />
                    </div>
                    <div className="xxs:max-msm:col-span-2">
                        <Input
                            label="Email"
                            color="cyan"
                            id="email"
                            {...register("Email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })}
                            error={errors["Email"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\|/g, '')
                            }}
                        />
                    </div>
                    <div className="xxs:max-msm:col-span-2">
                        <Input
                            label="Post Code"
                            color="cyan"
                            id="postCode"
                            {...register("Post Code", { required: true })}
                            error={errors["Post Code"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\|/g, '')
                            }}
                        />
                    </div>
                    <div className="xxs:max-msm:col-span-2">
                        <Input
                            label="Country"
                            color="cyan"
                            id="country"
                            {...register("County", { required: true })}
                            error={errors["County"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\|/g, '')
                            }}
                        />
                    </div>
                    <div className="col-span-2">
                        <Textarea
                            label="Customer Address"
                            color="cyan"
                            id="address"
                            {...register("Address line", { required: true })}
                            error={errors["Address line"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                e.target.value = e.target.value.replace(/\n/g, '');
                                e.target.value = e.target.value.replace(/\|/g, '');
                            }}
                        />
                    </div>
                </div>
                <div className="mt-2 -ml-3">
                    <div className="text-left">
                        <Checkbox
                            label="I allow the processing of my date to talk more about the franchisee opportunity."
                            id="franchisee"
                            className="w-4 h-4 rounded"
                            color="cyan"
                            labelProps={{
                                className: "text-[15px] text-c-novel"
                            }}
                            {...register("Opt-in Franchise Op")}
                        />
                    </div>
                    <div className="text-left">
                        <Checkbox
                            label="I am seeking any installer in my area!"
                            id="installer"
                            className="w-4 h-4 rounded"
                            color="cyan"
                            labelProps={{
                                className: "text-[15px] text-c-novel"
                            }}
                            {...register("Opt-in Seek Installer")}
                        />
                    </div>
                    <div className="text-left">
                        <Checkbox
                            label="Option me into promotional materials."
                            id="promotional"
                            className="w-4 h-4 rounded"
                            color="cyan"
                            labelProps={{
                                className: "text-[15px] text-c-novel"
                            }}
                            {...register("Opt-in Marketing")}
                        />
                    </div>
                    <div className="text-left">
                        <Checkbox
                            label={<p>I’ve read the <Link href="/site-terms-and-conditions" className="text-c-deep-sky" target="_blank">Site Terms & Conditions</Link>, <Link href="/rental-terms-and-conditions" className="text-c-deep-sky" target="_blank">Rental Terms & Conditions</Link> and <Link href="/privacy-and-cookie-policy" className="text-c-deep-sky" target="_blank">Privacy & Cookie Policy</Link></p>}
                            id="privacy"
                            className="w-4 h-4 rounded"
                            color="cyan"
                            labelProps={{
                                className: "text-[15px] text-c-novel"
                            }}
                            {...register("Opt-in Terms", { required: true })}
                        />
                    </div>
                </div>
                <div className="flex gap-5 justify-center mt-6">
                    <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" onClick={() => setAvailability(null)} type="button">
                        Back
                    </button>
                    <button className={`bg-c-deep-sky py-1.5 px-12 text-white rounded-md relative ${watch()["Opt-in Terms"] !== true && "opacity-50"}`} type="submit" disabled={isPending || watch("Opt-in Terms") !== true}>
                        Submit
                        <div className="absolute top-1/2 right-3 -translate-y-1/2">
                            {isPending &&
                                <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin ml-auto"></div>
                            }
                        </div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Unavailable;