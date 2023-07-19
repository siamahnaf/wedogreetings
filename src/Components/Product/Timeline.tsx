import { useState } from "react";
import { Stepper, Step } from "@material-tailwind/react";

//Components
import Availability from "./Timeline/Availability";
import Configuration from "./Timeline/Configuration";
import Confirm from "./Timeline/Confirm";

//Context
import { TimelineContext, AvailableDataTypes, ConfigureDataTypes } from "@/Context/timeline.context";

//Interface Import
import { Inputs as AvailabilityTypes } from "@/Components/Product/Timeline/Availability";
import { Inputs as ConfigureTypes } from "@/Components/Product/Timeline/Configuration";

const Timeline = () => {
    //State
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    //Data Storing
    const [availableData, setAvailableData] = useState<AvailableDataTypes>({
        formData: {} as AvailabilityTypes,
        franchiseeId: null
    });
    const [configureData, setConfigureData] = useState<ConfigureDataTypes>({
        formData: {} as ConfigureTypes
    });

    //Handler
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    return (
        <div>
            <div className="w-[60%] mx-auto">
                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                    lineClassName="border border-dashed border-c-novel h-px bg-transparent"
                    activeLineClassName="border-transparent bg-c-deep-sky"
                >
                    <Step className="h-4 w-4 !bg-c-novel" onClick={() => setActiveStep(0)} completedClassName="!bg-c-deep-sky" activeClassName="!bg-c-deep-sky">
                        <div className="absolute -bottom-8 w-max text-center">
                            <p
                                className={`font-medium text-base ${activeStep >= 0 ? "text-c-deep-sky" : "text-black"}`}
                            >
                                Availability
                            </p>
                        </div>
                    </Step>
                    <Step className="h-4 w-4 !bg-c-novel" onClick={() => setActiveStep(1)} completedClassName="!bg-c-deep-sky" activeClassName="!bg-c-deep-sky">
                        <div className="absolute -bottom-8 w-max text-center">
                            <p
                                className={`font-medium text-base ${activeStep >= 1 ? "text-c-deep-sky" : "text-black"}`}
                            >
                                Configuration
                            </p>
                        </div>
                    </Step>
                    <Step className="h-4 w-4 !bg-c-novel" onClick={() => setActiveStep(2)} completedClassName="!bg-c-deep-sky" activeClassName="!bg-c-deep-sky">
                        <div className="absolute -bottom-8 w-max text-center">
                            <p
                                className={`font-medium text-base ${activeStep >= 2 ? "text-c-deep-sky" : "text-black"}`}
                            >
                                Confirm & Pay
                            </p>
                        </div>
                    </Step>
                </Stepper>
            </div>
            <TimelineContext.Provider value={{ activeStep, isLastStep, isFirstStep, handleNext, handlePrev, availableData, setAvailableData, configureData, setConfigureData }}>
                <div>
                    <div className={`${activeStep === 0 ? "block" : "hidden"}`}>
                        <Availability />
                    </div>
                    <div className={`${activeStep === 1 ? "block" : "hidden"}`}>
                        <Configuration />
                    </div>
                    <div className={`${activeStep === 2 ? "block" : "hidden"}`}>
                        <Confirm />
                    </div>
                </div>
            </TimelineContext.Provider>
        </div>
    );
};

export default Timeline;