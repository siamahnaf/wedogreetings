import { createContext, SetStateAction, Dispatch } from "react";

//Interface Import
import { Inputs as AvailabilityTypes } from "@/Components/Product/Timeline/Availability";
import { Inputs as ConfigureTypes } from "@/Components/Product/Timeline/Configuration";
import { LetterTypes } from "@/Components/Product/Timeline/Configuration/Letters/SingleLetters/Selector";
import { EmojiTypes } from "@/Components/Product/Timeline/Configuration/Emojis";
import { Inputs as CustomerTypes } from "@/Components/Product/Timeline/Confirm/Customer";
//Types
import { FranchiseeDetailsData } from "@/Query/Types/Product/product.types";


//Interface
export interface AvailableDataTypes {
    formData: AvailabilityTypes;
    franchiseeId: string | null;
    franchiseeName: string | null;
    surcharge: number | null;
    details: FranchiseeDetailsData;
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
    customer?: CustomerTypes;
    setCustomer?: Dispatch<SetStateAction<CustomerTypes | undefined>>;
}


export const TimelineContext = createContext<Context>({
    activeStep: 0,
    isLastStep: false,
    isFirstStep: false
});