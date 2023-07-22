import { Dispatch, SetStateAction } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

//Interface
interface Props {
    setStep: Dispatch<SetStateAction<string>>;
}
interface Inputs {
    "First Name": string;
    "Last Name": string;
    "Phone": string;
    "Email": string;
    "Address line": string;
    "Post Code": string;
    "Country": string;
}

const Customer = ({ setStep }: Props) => {
    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();


    //Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        setStep("step2")
    }

    return (
        <div>
            <div className="text-center mb-12">
                <h5 className="text-3xl font-bold text-c-deep-sky">CUSTOMER INFORMATION</h5>
                <p className="text-base text-c-novel mt-2">Please enter your information</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Input
                            label="First Name"
                            color="cyan"
                            id="firstName"
                            {...register("First Name", { required: true })}
                            error={errors["First Name"] ? true : false}
                        />
                    </div>
                    <div>
                        <Input
                            label="Last Name"
                            color="cyan"
                            id="lastName"
                            {...register("Last Name", { required: true })}
                            error={errors["Last Name"] ? true : false}
                        />
                    </div>
                    <div>
                        <Input
                            label="Phone Number"
                            color="cyan"
                            id="phone"
                            {...register("Phone", { required: true })}
                            error={errors["Phone"] ? true : false}
                        />
                    </div>
                    <div>
                        <Input
                            label="Email"
                            color="cyan"
                            id="email"
                            {...register("Email", { required: true })}
                            error={errors["Email"] ? true : false}
                        />
                    </div>
                    <div>
                        <Input
                            label="Post Code"
                            color="cyan"
                            id="postCode"
                            {...register("Post Code", { required: true })}
                            error={errors["Post Code"] ? true : false}
                        />
                    </div>
                    <div>
                        <Input
                            label="Country"
                            color="cyan"
                            id="country"
                            {...register("Country", { required: true })}
                            error={errors["Country"] ? true : false}
                        />
                    </div>
                    <div className="col-span-2">
                        <Textarea
                            label="Customer Address"
                            color="cyan"
                            id="address"
                            {...register("Address line", { required: true })}
                            error={errors["Address line"] ? true : false}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex gap-3 justify-center mt-8">
                        <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={() => setStep("step0")}>
                            Back
                        </button>
                        <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md" type="submit">
                            Next
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Customer;