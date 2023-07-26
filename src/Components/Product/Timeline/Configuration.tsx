import { useContext, useState, useEffect, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { Icon } from "@iconify/react";

//Components
import Backdrop, { Items } from "./Configuration/Backdrop";
import Inspire from "./Configuration/Inspires";
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
    } | null;
}

const Configuration = () => {
    //State
    const [openBackdrop, setBackdrop] = useState<boolean>(false);
    const [inspire, setInspire] = useState<boolean>(false);
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

    //FormData
    const displayText = watch().name

    //Display Text Formatter
    const formateName = (value: string): string => {
        let inputValue = value;
        inputValue = inputValue.toUpperCase();
        return inputValue;
    };
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const formattedValue = formateName(inputValue);
        event.target.value = formattedValue;
    };

    useEffect(() => {
        if (displayText) {
            trigger("name")
        }
    }, [displayText])

    return (
        <>
            <div className={`mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg w-[60%] mx-auto ${step === "step0" ? "block" : "hidden"}`}>
                <p className="text-c-novel text-base text-center w-[70%] mx-auto">
                    Enter <span className="text-black">the words</span> you want <span className="text-black">(uppercase only)</span> to be
                    displayed and <span className="text-black">choose a backdrop image.</span>
                </p>
                <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-6 gap-5 items-center">
                            <div className="col-span-1">
                                <label htmlFor="name">Display Text</label>
                            </div>
                            <div className="col-span-5">
                                <div className="flex gap-2 items-center">
                                    <div className="flex-[0_0_70%] relative">
                                        <input
                                            placeholder="Display Text"
                                            className="focus:outline-none bg-c-white-smoke w-full py-4 px-4 rounded-lg placeholder:text-sm"
                                            maxLength={16}
                                            {...register("name", {
                                                required: "Display text is required field!",
                                                pattern: {
                                                    value: /^([A-Z0-9&£@?!,%#\-]|(TH)|(ST)|(RD)|(ND))+$/,
                                                    message: "You can type only uppercase letters (A-Z), numbers (0-9), and the special characters &, £, @, ?, !, ,, %, #, and - (dash), as well as the  uppercase strings 'TH', 'ST', 'RD', and 'ND'"
                                                }
                                            })}
                                            autoComplete="off"
                                            onInput={handleInput}
                                        />
                                        <p className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3] text-sm">{watch().name?.length}/16</p>
                                    </div>
                                    <div className="flex-[0_0_30%]">
                                        <p className="text-center select-none cursor-pointer text-sm text-c-deep-sky font-semibold" onClick={() => setInspire(true)}>Inspire me with examples</p>
                                        <Inspire
                                            open={inspire}
                                            onClose={() => setInspire(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-5 col-start-2 -mt-4">
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
                            <div className="col-span-5 relative group">
                                {!backdrop &&
                                    <div className="bg-c-white-smoke text-center rounded-lg cursor-pointer aspect-[7/2] justify-center items-center flex" onClick={() => setBackdrop(true)}>
                                        <div>
                                            <Image src="/images/preview.png" alt="Preview Image" width={32} height={32} className="mx-auto opacity-75" />
                                            <p className="text-c-novel opacity-80 mt-2">Tap or click to select</p>
                                        </div>
                                    </div>
                                }
                                {backdrop &&
                                    <Image src={backdrop.url} alt="Preview Image" width={600} height={600} className="rounded-lg cursor-pointer aspect-[7/2]" onClick={() => setBackdrop(true)} />
                                }
                                {backdrop &&
                                    <div className="absolute top-2 right-2 p-1.5 bg-red-50 rounded cursor-pointer select-none opacity-0 transition-all invisible group-hover:opacity-100 group-hover:visible" onClick={() => setValue("backdrop", null)}>
                                        <Icon className="text-xl text-red-600" icon="fluent:delete-48-filled" />
                                    </div>
                                }
                                <Backdrop
                                    open={openBackdrop}
                                    onClose={() => setBackdrop(false)}
                                    selected={watch().backdrop as Items}
                                    onChange={(item) => onItemChange(item)}
                                />
                            </div>
                            <div className="col-span-5 col-start-2 -mt-4">
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
            <div className={`mt-16 bg-white shadow-3xl py-12 px-8 rounded-lg w-[90%] mx-auto ${step === "step2" ? "block" : "hidden"}`}>
                <Emojis setStep={setStep} />
            </div>
        </>
    );
};

export default Configuration;