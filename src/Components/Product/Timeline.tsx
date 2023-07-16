import { useState } from "react";
import { Stepper, Step } from "@material-tailwind/react";

//Components
import Availability from "./Timeline/Availability";
import Configuration from "./Timeline/Configuration";
import Confirm from "./Timeline/Confirm";

const Timeline = () => {
    //State
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

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
            <div className="mt-16 bg-white shadow-3xl py-5 px-6 rounded-lg">
                {activeStep === 0 &&
                    <Availability />
                }
                {activeStep === 1 &&
                    <Configuration />
                }
                {activeStep === 2 &&
                    <Confirm />
                }
            </div>
        </div>
    );
};

export default Timeline;