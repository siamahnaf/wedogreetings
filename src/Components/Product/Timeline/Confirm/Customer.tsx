import { Dispatch, SetStateAction, ChangeEvent, useContext, useEffect } from "react";
import { Input, Textarea, Checkbox, Select, Option } from "@material-tailwind/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Link from "next/link";

//Data
import { countryData } from "@/Data/CountryData";

//Context
import { TimelineContext } from "@/Context/timeline.context";

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
    "Address line": string;
    "Post Code": string;
    "Country": string;
    "Opt-in Marketing": boolean;
    "Opt-in Terms": boolean;
    "Billing Address": boolean;
}

const Customer = ({ setStep }: Props) => {
    //Context
    const { setCustomer, availableData } = useContext(TimelineContext);


    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        control
    } = useForm<Inputs>({
        defaultValues: {
            "Post Code": availableData?.formData.postalCode
        }
    });


    //Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        const customerString = Object.values(value).join("|");
        setCustomer?.({ formData: value, customerString })
        setStep("step2")
    }

    useEffect(() => {
        reset({ "Post Code": availableData?.formData.postalCode })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [availableData])
    return (
        <div>
            <div className="text-center mb-12">
                <h5 className="text-3xl font-bold text-c-deep-sky">CUSTOMER INFORMATION</h5>
                <p className="text-base text-c-novel mt-2">Please enter your information</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
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
                    <div>
                        <Controller
                            control={control}
                            name="Country"
                            rules={{ required: true }}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    label="Country"
                                    value={value}
                                    color="cyan"
                                    onChange={(e) => onChange(e as string)}
                                    error={errors.Country ? true : false}
                                >
                                    {countryData.map((item, i) => (
                                        <Option value={item.code} key={i}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
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
                        <p className="text-xs opacity-40">*Please provide the installation address where we will set up the display. Note that this address should fall within the same postcode coverage area as the one you&apos;ve previously supplied for locating a local installer!</p>
                    </div>
                </div>
                <div className="-ml-3 mt-6">
                    <div className="text-left">
                        <Checkbox
                            label="Tick here if the installation address is the same as the billing address"
                            id="billingAddress"
                            className="w-4 h-4 rounded"
                            color="cyan"
                            labelProps={{
                                className: "text-[15px] text-c-novel"
                            }}
                            {...register("Billing Address")}
                        />
                    </div>
                    <div className="text-left">
                        <Checkbox
                            label="I would like to opt in to receive marketing materials."
                            id="cpromotional"
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
                            id="cprivacy"
                            className="w-4 h-4 rounded"
                            color="cyan"
                            labelProps={{
                                className: "text-[15px] text-c-novel"
                            }}
                            {...register("Opt-in Terms", { required: true })}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex gap-3 justify-center mt-8">
                        <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={() => setStep("step0")}>
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