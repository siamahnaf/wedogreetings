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
                            crossOrigin="anonymous"
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
                            crossOrigin="anonymous"
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
                            crossOrigin="anonymous"
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
                            crossOrigin="anonymous"
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
                            crossOrigin="anonymous"
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
                            crossOrigin="anonymous"
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
                            crossOrigin="anonymous"
                            label="County"
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
                <div className="mt-4 md:mt-4 xxs:mt-7">
                    <div className="flex gap-x-3 md:gap-x-3 xxs:gap-x-4 items-center md:items-center xxs:items-start mb-3">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="franchisee"
                                className="peer appearance-none border border-blue-gray-200 w-4 h-4 rounded align-middle block checked:bg-c-deep-sky checked:border-c-deep-sky cursor-pointer"
                                {...register("Opt-in Franchise Op")}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </span>
                        </div>
                        <div className="text-left xxs:max-lg:-mt-[7px]">
                            <label htmlFor="franchisee" className="text-[15px] text-c-novel cursor-pointer select-none">I allow the processing of my date to talk more about the franchisee opportunity.</label>
                        </div>
                    </div>
                    <div className="flex gap-x-3 md:gap-x-3 xxs:gap-x-4 items-center md:items-center xxs:items-start mb-3">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="installer"
                                className="peer appearance-none border border-blue-gray-200 w-4 h-4 rounded align-middle block checked:bg-c-deep-sky checked:border-c-deep-sky cursor-pointer"
                                {...register("Opt-in Seek Installer")}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </span>
                        </div>
                        <div className="text-left xxs:max-lg:-mt-[7px]">
                            <label htmlFor="installer" className="text-[15px] text-c-novel cursor-pointer select-none">I am seeking any installer in my area!</label>
                        </div>
                    </div>
                    <div className="flex gap-x-3 md:gap-x-3 xxs:gap-x-4 items-center md:items-center xxs:items-start mb-3">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="promotional"
                                className="peer appearance-none border border-blue-gray-200 w-4 h-4 rounded align-middle block checked:bg-c-deep-sky checked:border-c-deep-sky cursor-pointer"
                                {...register("Opt-in Marketing")}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </span>
                        </div>
                        <div className="text-left xxs:max-lg:-mt-[7px]">
                            <label htmlFor="promotional" className="text-[15px] text-c-novel cursor-pointer select-none">Option me into promotional materials.</label>
                        </div>
                    </div>
                    <div className="flex gap-x-3 md:gap-x-3 xxs:gap-x-4 items-center md:items-center xxs:items-start mb-3">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="privacy"
                                className="peer appearance-none border border-blue-gray-200 w-4 h-4 rounded align-middle block checked:bg-c-deep-sky checked:border-c-deep-sky cursor-pointer"
                                {...register("Opt-in Terms", { required: true })}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </span>
                        </div>
                        <div className="text-left xxs:max-lg:-mt-[7px]">
                            <label htmlFor="privacy" className="text-[15px] text-c-novel cursor-pointer select-none">
                                I’ve read the <Link href="/site-terms-and-conditions" className="text-c-deep-sky" target="_blank">Site Terms & Conditions</Link>, <Link href="/rental-terms-and-conditions" className="text-c-deep-sky" target="_blank">Rental Terms & Conditions</Link> and <Link href="/privacy-and-cookie-policy" className="text-c-deep-sky" target="_blank">Privacy & Cookie Policy</Link>
                            </label>
                        </div>
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