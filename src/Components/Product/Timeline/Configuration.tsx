import { useContext, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { Icon } from "@iconify/react";

//Components
import Backdrop from "./Configuration/Backdrop";
import Letters from "./Configuration/Letters";
import Emojis from "./Configuration/Emojis";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Interface
export interface Inputs {
    name: string;
    backdrop: {
        url: string;
        id: string;
        name: string;
    };
}

const Configuration = () => {
    //State
    const [openBackdrop, setBackdrop] = useState<boolean>(false);
    const [step, setStep] = useState<string>("step0");

    //Form Initializing
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger
    } = useForm<Inputs>();

    //FormData
    const backdrop = watch().backdrop

    //Context
    const { handlePrev, setConfigureData } = useContext(TimelineContext);

    //On Submit Handler
    const onSubmit: SubmitHandler<Inputs> = (value) => {
        setConfigureData?.({ formData: value })
        setStep("step1")
    }

    //On Item Click Change
    const onItemChange = (e: { url: string, id: string, name: string }) => {
        setValue("backdrop", e);
        trigger("backdrop");
    }

    //Lifecycle Hook
    useEffect(() => {
        register("backdrop", { required: "Backdrop is required field!" })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={`mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg w-[60%] mx-auto ${step === "step0" ? "block" : "hidden"}`}>
                <p className="text-c-novel text-base text-center">Enter <span className="text-black">your name</span> or choose <span className="text-black">your backdrop image</span></p>
                <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-6 gap-5 items-center">
                            <div className="col-span-1">
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="col-span-5">
                                <input
                                    placeholder="Name"
                                    className="focus:outline-none bg-c-white-smoke w-full py-3 px-4 rounded-lg placeholder:text-sm"
                                    maxLength={16}
                                    {...register("name", { required: "Name is required field!" })}
                                />
                                {errors.name &&
                                    <p className="text-red-600 text-sm flex gap-1.5 items-start mt-1.5">
                                        <Icon className="text-base flex-[0_0_5%] mt-[3px]" icon="mdi:error" />
                                        <span>{errors.name?.message}</span>
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-6 gap-5 items-center">
                            <div className="col-span-1">
                                <label htmlFor="backdrop">Backdrop</label>
                            </div>
                            <div className="col-span-5">
                                {!backdrop &&
                                    <div className="bg-c-white-smoke text-center rounded-lg cursor-pointer aspect-[6/1] justify-center items-center flex" onClick={() => setBackdrop(true)}>
                                        <div>
                                            <Image src="/images/preview.png" alt="Preview Image" width={32} height={32} className="mx-auto opacity-75" />
                                            <p className="text-c-novel opacity-80 mt-2">Tap or click to select</p>
                                        </div>
                                    </div>
                                }
                                {backdrop &&
                                    <Image src={backdrop.url} alt="Preview Image" width={600} height={100} className="rounded-lg cursor-pointer aspect-[6/1]" onClick={() => setBackdrop(true)} />
                                }
                                <Backdrop
                                    open={openBackdrop}
                                    onClose={() => setBackdrop(false)}
                                    selected={watch().backdrop}
                                    onChange={(item) => onItemChange(item)}
                                />
                                {errors.backdrop &&
                                    <p className="text-red-600 text-sm flex gap-1.5 items-start mt-1.5">
                                        <Icon className="text-base flex-[0_0_5%] mt-[3px]" icon="mdi:error" />
                                        <span>{errors.backdrop?.message}</span>
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-3 justify-center mt-8">
                            <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={handlePrev}>
                                Back
                            </button>
                            <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md" type="submit">
                                Next
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={`mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg w-[60%] mx-auto ${step === "step1" ? "block" : "hidden"}`}>
                <Letters setStep={setStep} />
            </div>
            <div className={`mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg w-[70%] mx-auto ${step === "step2" ? "block" : "hidden"}`}>
                <Emojis setStep={setStep} />
            </div>
        </>
    );
};

export default Configuration;