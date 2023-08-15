import { Dispatch, SetStateAction, ChangeEvent, useContext, useEffect } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

//Context
import { TimelineContext } from "@/Context/timeline.context";


//Query
import { useQuery } from "@tanstack/react-query";
import { GET_POSTCODER_DETAILS } from "@/Query/Function/Postcoder/post.function";


//Interface
interface Props {
    setStep: Dispatch<SetStateAction<string>>;
}

export interface Inputs {
    "Title": string;
    "First Name": string;
    "Last Name": string;
    "Phone": string;
    "Email": string;
    "House no": string;
    "Address line": string;
    "Post Code": string;
    "Recipient": "",
    "County": string;
    "Opt-in Marketing": boolean;
    "Opt-in Terms": boolean;
    "Billing Address": boolean;
}

const Customer = ({ setStep }: Props) => {
    //Context
    const { setCustomer, availableData } = useContext(TimelineContext);

    //Query
    const { data, refetch, error } = useQuery({ queryKey: ["coderPostal", availableData?.formData.postalCode], queryFn: () => GET_POSTCODER_DETAILS(availableData?.formData.postalCode as string) })

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm<Inputs>({
        defaultValues: {
            "Post Code": availableData?.formData.postalCode,
            "Address line": data?.[0].summaryline,
            County: data?.[0].county
        }
    });


    //Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const customerString = `${value.Title}|${value["First Name"]}|${value["Last Name"]}|${value.Phone}|${value.Email}|${value["House no"]}, ${value["Address line"]}|${value["Post Code"]}|${value.County}|${value["Opt-in Marketing"] ? new Date().toISOString() : ''}|${value["Opt-in Terms"] ? new Date().toISOString() : ''}`
        setCustomer?.({ formData: value, customerString, town: data?.[0].posttown as string })
        setStep("step2")
        const nextStepElement = document.getElementById("timeline-container");
        if (nextStepElement) {
            nextStepElement.scrollIntoView({ block: "start" });
        }
    }
    //Handler
    const onBackHandler = () => {
        setStep("step0");
        const nextStepElement = document.getElementById("timeline-container");
        if (nextStepElement) {
            nextStepElement.scrollIntoView({ block: "start" });
        }
    }

    useEffect(() => {
        reset({
            "Post Code": availableData?.formData.postalCode,
            "Address line": data?.[0].summaryline,
            County: data?.[0].county
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availableData, data])

    useEffect(() => {
        refetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availableData])
    return (
        <div>
            <div className="text-center mb-12">
                <h5 className="text-3xl sm:text-3xl xxs:text-2xl font-bold text-c-deep-sky">Installation Information</h5>
                <p className="text-base text-c-novel mt-2">Please enter your information</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
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
                            label="First name"
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
                            label="Last name"
                            color="cyan"
                            id="lastName"
                            {...register("Last Name", { required: true })}
                            error={errors["Last Name"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\|/g, '')
                            }}
                        />
                    </div>
                    <div className="col-span-2">
                        <Input
                            crossOrigin="anonymous"
                            label="Name of recipient"
                            color="cyan"
                            id="Recipient"
                            {...register("Recipient", { required: true })}
                            error={errors.Recipient ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\|/g, '')
                            }}
                        />
                        <p className="text-[13px] 4xl:text-[13px] opacity-40 mt-1.5">*Name of the person who will oversee installation</p>
                    </div>
                    <div className="xxs:max-msm:col-span-2">
                        <Input
                            label="Phone Number"
                            crossOrigin="anonymous"
                            color="cyan"
                            id="phone"
                            maxLength={13}
                            {...register("Phone", {
                                required: true,
                                pattern: /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/
                            })}
                            error={errors["Phone"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/[^0-9+]/g, '')
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
                            label="Post code"
                            color="cyan"
                            id="postCode"
                            readOnly
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
                            id="county"
                            {...register("County", { required: true })}
                            error={errors["County"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLInputElement>) => {
                                e.target.value = e.target.value.replace(/\|/g, '')
                            }}
                        />
                    </div>
                    <div className="col-span-2">
                        <p className="text-blue-gray-300 text-sm mb-2">Where should we install your rental? Input the full street address and postcode.</p>
                        <Input
                            crossOrigin="anonymous"
                            label="House no."
                            color="cyan"
                            id="house"
                            {...register("House no", { required: true })}
                            error={errors["House no"] ? true : false}
                        />
                    </div>
                    <div className="col-span-2">
                        <Textarea
                            label="Installation address"
                            color="cyan"
                            id="address"
                            {...register("Address line", { required: true })}
                            error={errors["Address line"] ? true : false}
                            onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                e.target.value = e.target.value.replace(/\n/g, '');
                                e.target.value = e.target.value.replace(/\|/g, '');
                            }}
                        />
                        <p className="text-[13px] 4xl:text-[13px] opacity-40 mt-1.5">*Note that this address should fall within the same postcode coverage area as the one you supplied for locating a local installer e.g. {availableData?.formData.postalCode}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex gap-x-3 md:gap-x-3 xxs:gap-x-4 items-center md:items-center xxs:items-start mb-3">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="billingAddress"
                                className="peer appearance-none border border-blue-gray-200 w-4 h-4 rounded align-middle block checked:bg-c-deep-sky checked:border-c-deep-sky cursor-pointer"
                                {...register("Billing Address")}
                            />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white p-px pointer-events-none opacity-0 invisible peer-checked:opacity-100 peer-checked:visible">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </span>
                        </div>
                        <div className="text-left xxs:max-lg:-mt-[7px]">
                            <label htmlFor="billingAddress" className="text-[15px] text-c-novel cursor-pointer select-none">Tick here if the installation address is the same as the billing address</label>
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
                            <label htmlFor="promotional" className="text-[15px] text-c-novel cursor-pointer select-none">I would like to opt in to receive marketing materials.</label>
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
                <div>
                    <div className="flex gap-3 justify-center mt-8">
                        <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={onBackHandler}>
                            Back
                        </button>
                        <button className={`bg-c-deep-sky py-1.5 px-12 text-white rounded-md ${watch()["Opt-in Terms"] !== true && "opacity-50"}`} type="submit" disabled={watch("Opt-in Terms") !== true}>
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Customer;