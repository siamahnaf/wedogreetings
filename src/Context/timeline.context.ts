import { createContext, SetStateAction, Dispatch } from "react";

//Interface Import
import { Inputs as AvailabilityTypes } from "@/Components/Product/Timeline/Availability";
import { Inputs as ConfigureTypes } from "@/Components/Product/Timeline/Configuration";
import { LetterTypes } from "@/Components/Product/Timeline/Configuration/Letters/SingleLetters/Selector";
import { EmojiTypes } from "@/Components/Product/Timeline/Configuration/Emojis";


//Interface
export interface AvailableDataTypes {
    formData: AvailabilityTypes;
    franchiseeId: string | null;
    franchiseeName: string | null;
    surcharge: number | null;
}
export interface ConfigureDataTypes {
    formData: ConfigureTypes;
}
interface Context {
    activeStep: number;
    isLastStep: boolean;
    isFirstStep: boolean;
    handleNext?: () => void;
    handlePrev?: () => void;
    availableData?: AvailableDataTypes;
    setAvailableData?: Dispatch<SetStateAction<AvailableDataTypes>>;
    configureData?: ConfigureDataTypes;
    setConfigureData?: Dispatch<SetStateAction<ConfigureDataTypes>>;
    letters?: LetterTypes[];
    setLetters?: Dispatch<SetStateAction<LetterTypes[]>>;
    emojis?: EmojiTypes[];
    setEmojis?: Dispatch<SetStateAction<EmojiTypes[]>>;
}


export const TimelineContext = createContext<Context>({
    activeStep: 0,
    isLastStep: false,
    isFirstStep: false
});