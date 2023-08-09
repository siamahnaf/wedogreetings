import { useContext, useState, Dispatch, SetStateAction, useMemo, Fragment } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import moment from "moment";

//Component-
import Letters from "./Emoji/Letters";
import MobileBackdrop from "./Emoji/MobileBackdrop";
import MobileLetters from "./Emoji/MobileLetters";
import Selector from "./Emoji/Selector";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_EMOJIS } from "@/Query/Function/Product/product.function";
import { GetProductData } from "@/Query/Types/Product/product.types";

//Interface Import
import { OnChangeUpdateTypes } from "./Emoji/Selector";

//Initial Data
const initialData = Array.from({ length: 6 }, (_, index) => ({
    index: index,
    url: "",
    id: "",
    name: ""
}));

//Interface
export interface EmojiTypes {
    index: number;
    url: string;
    id: string;
    name: string;
}
//Interface
interface Props {
    setStep: Dispatch<SetStateAction<string>>;
}

const Emojis = ({ setStep }: Props) => {
    //Context
    const { availableData, setEmojis, handleNext } = useContext(TimelineContext);

    //State
    const [emoji, setEmoji] = useState<EmojiTypes[]>(initialData);
    const [items, setItems] = useState<GetProductData[]>([]);
    const [open, setOpen] = useState<number | null>(null);
    const [highlight, setHighlight] = useState<string>("");

    //Query
    const { data } = useQuery({ queryKey: ["emojis", availableData?.franchiseeId], queryFn: () => GET_EMOJIS(availableData?.franchiseeId as string) });

    //Handler onItemClick
    const onItemClick = (item: OnChangeUpdateTypes) => {
        setEmoji((prevEmoji) => {
            const newEmoji = [...prevEmoji];
            newEmoji[item.index] = {
                ...newEmoji[item.index],
                url: item.url,
                id: item.id,
                name: item.name,
            };
            return newEmoji;
        });
    };

    //Handler on Submit
    const onSubmit = () => {
        setEmojis?.(emoji);
        handleNext?.();
    }

    //Highlight Handler
    const highlightHandler = (position: string) => {
        if (highlight === position) {
            setHighlight("")
        } else {
            setHighlight(position)
        }
    }

    //Lifecycle Hook
    useMemo(() => {
        if (data) {
            const newData: GetProductData[] = [];
            for (const backdrop of data) {
                const dates: { start: string, end: string }[] | null = JSON.parse(backdrop["Dates Rented Out"]);
                const startDate = moment(availableData?.formData.date?.endDate);
                const endDate = moment(availableData?.formData.date?.endDate).add(availableData?.formData.rental, "days");
                let count = 0;
                if (dates) {
                    for (const dateRange of dates) {
                        const rangeStart = moment(dateRange.start, "DD/MM/YYYY");
                        const rangeEnd = moment(dateRange.end, "DD/MM/YYYY");

                        if (startDate.isSameOrBefore(rangeEnd) && endDate.isSameOrAfter(rangeStart)) {
                            count++;
                        }
                    }
                }
                const quantityInStock = backdrop["Quantity in Stock"] - count;
                if (quantityInStock > 0) {
                    newData.push(backdrop);
                }
            }
            setItems(newData)
        }
    }, [data]);

    return (
        <div>
            <p className="text-c-novel text-base text-center mb-12 w-[70%] sm:w-[70%] xxs:w-full mx-auto">Select a icons classes from the drop down then tap on the tiles to select your choice. <span className="text-black">If you are not sure which would look best the physical printed items on the day of installing.</span></p>
            <div className="flex justify-center px-6 lg-max:flex xxs:hidden">
                <div className="grid grid-cols-12 gap-4 items-center justify-center">
                    <div className="col-span-2">
                        <div className="mb-3">
                            {emoji.slice(0, 1).map((item) => (
                                <Fragment key={item.index}>
                                    <div key={item.id} className={`w-[70px] h-[70px] rounded-md bg-c-gainsboro cursor-pointer p-2 border-2 border-solid mx-auto ${highlight === "left" ? "border-black" : "border-transparent"}`} onClick={() => setOpen(item.index)}>
                                        <div className="flex justify-center items-center h-full">
                                            {item.url === null &&
                                                <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                            }
                                            {item.url &&
                                                <div>
                                                    <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                </div>
                                            }
                                            {!item.url && item.url !== null &&
                                                <Icon className="text-xl text-c-novel" icon="majesticons:plus-line" />
                                            }
                                        </div>
                                    </div>
                                    <Selector
                                        open={open === item.index}
                                        onClose={() => console.log("clicked")}
                                        items={items}
                                        selected={emoji}
                                        onChange={onItemClick}
                                        index={item.index}
                                    />
                                </Fragment>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {emoji.slice(1, 3).map((item) => (
                                <Fragment key={item.index}>
                                    <div key={item.id} className={`w-[70px] h-[70px] rounded-md bg-c-gainsboro cursor-pointer p-2 border-2 border-solid ${highlight === "left" ? "border-black" : "border-transparent"}`} onClick={() => setOpen(item.index)}>
                                        <div className="flex justify-center items-center h-full">
                                            {item.url === null &&
                                                <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                            }
                                            {item.url &&
                                                <div>
                                                    <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                </div>
                                            }
                                            {!item.url && item.url !== null &&
                                                < Icon className="text-xl text-c-novel" icon="majesticons:plus-line" />
                                            }
                                        </div>
                                    </div>
                                    <Selector
                                        open={open === item.index}
                                        onClose={() => console.log("clicked")}
                                        items={items}
                                        selected={emoji}
                                        onChange={onItemClick}
                                        index={item.index}
                                    />
                                </Fragment>
                            ))}
                        </div>
                        <div className="text-center mt-3">
                            <p className="font-semibold text-base">Left Side</p>
                            <button className="text-xs font-medium text-c-deep-sky select-none" onClick={() => highlightHandler("left")}>{highlight === "left" ? "Click to Hide" : "Click to Select"}</button>
                        </div>
                    </div>
                    <div className="col-span-8">
                        <div className="text-center mb-3">
                            <p className="font-semibold text-base">Top of display</p>
                            <button className="text-xs font-medium text-c-deep-sky select-none" onClick={() => highlightHandler("top")}>{highlight === "top" ? "Click to Hide" : "Click to Select"}</button>
                        </div>
                        <div className="mb-3">
                            <Letters highlight={highlight} />
                        </div>
                        <div className="text-center mt-3">
                            <p className="font-semibold text-base">Forefront of display</p>
                            <button className="text-xs font-medium text-c-deep-sky select-none" onClick={() => highlightHandler("bottom")}>{highlight === "bottom" ? "Click to Hide" : "Click to Select"}</button>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="mb-3">
                            {emoji.slice(3, 4).map((item) => (
                                <Fragment key={item.index}>
                                    <div key={item.id} className={`w-[70px] h-[70px] rounded-md bg-c-gainsboro cursor-pointer p-2 border-2 border-solid mx-auto ${highlight === "right" ? "border-black" : "border-transparent"}`} onClick={() => setOpen(item.index)}>
                                        <div className="flex justify-center items-center h-full">
                                            {item.url === null &&
                                                <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                            }
                                            {item.url &&
                                                <div>
                                                    <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                </div>
                                            }
                                            {!item.url && item.url !== null &&
                                                <Icon className="text-xl text-c-novel" icon="majesticons:plus-line" />
                                            }
                                        </div>
                                    </div>
                                    <Selector
                                        open={open === item.index}
                                        onClose={() => console.log("clicked")}
                                        items={items}
                                        selected={emoji}
                                        onChange={onItemClick}
                                        index={item.index}
                                    />
                                </Fragment>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {emoji.slice(4, 6).map((item) => (
                                <Fragment key={item.index}>
                                    <div key={item.id} className={`w-[70px] h-[70px] rounded-md bg-c-gainsboro cursor-pointer p-2 border-2 border-solid ${highlight === "right" ? "border-black" : "border-transparent"}`} onClick={() => setOpen(item.index)}>
                                        <div className="flex justify-center items-center h-full">
                                            {item.url === null &&
                                                <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                            }
                                            {item.url &&
                                                <div>
                                                    <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                </div>
                                            }
                                            {!item.url && item.url !== null &&
                                                <Icon className="text-xl text-c-novel" icon="majesticons:plus-line" />
                                            }
                                        </div>
                                    </div>
                                    <Selector
                                        open={open === item.index}
                                        onClose={() => console.log("clicked")}
                                        items={items}
                                        selected={emoji}
                                        onChange={onItemClick}
                                        index={item.index}
                                    />
                                </Fragment>
                            ))}
                        </div>
                        <div className="text-center mt-3">
                            <p className="font-semibold text-base">Right Side</p>
                            <button className="text-xs font-medium text-c-deep-sky select-none" onClick={() => highlightHandler("right")}>{highlight === "right" ? "Click to Hide" : "Click to Select"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg-max:hidden xxs:block">
                <div className="mb-3">
                    <p className="font-semibold text-base">Top of display</p>
                    <button className="text-xs font-medium text-c-deep-sky select-none" onClick={() => highlightHandler("top")}>{highlight === "top" ? "Click to Hide" : "Click to Select"}</button>
                </div>
                <MobileBackdrop highlight={highlight} />
                <div className="mt-5 mb-3">
                    <p className="font-semibold text-base">Left Side</p>
                    <button className="text-xs font-medium text-c-deep-sky select-none" onClick={() => highlightHandler("left")}>{highlight === "left" ? "Click to Hide" : "Click to Select"}</button>
                </div>
                <div className="flex gap-5 lg:gap-5 md:gap-3 sm:gap-5 xxs:gap-3">
                    {emoji.slice(0, 3).map((item) => (
                        <Fragment key={item.index}>
                            <div key={item.id} className={`w-[70px] h-[70px] sm:w-[70px] xxs:w-[60px] sm:h-[70px] xxs:h-[60px] rounded-md bg-c-gainsboro cursor-pointer p-2 border-2 border-solid ${highlight === "left" ? "border-black" : "border-transparent"}`} onClick={() => setOpen(item.index)}>
                                <div className="flex justify-center items-center h-full">
                                    {item.url === null &&
                                        <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                    }
                                    {item.url &&
                                        <div>
                                            <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                        </div>
                                    }
                                    {!item.url && item.url !== null &&
                                        <Icon className="text-xl text-c-novel" icon="majesticons:plus-line" />
                                    }
                                </div>
                            </div>
                            <Selector
                                open={open === item.index}
                                onClose={() => setOpen(null)}
                                items={items}
                                selected={emoji}
                                onChange={onItemClick}
                                index={item.index}
                            />
                        </Fragment>
                    ))}
                </div>
                <div className="mt-5 mb-3">
                    <p className="font-semibold text-base">Right Side</p>
                    <button className="text-xs font-medium text-c-deep-sky select-none" onClick={() => highlightHandler("right")}>{highlight === "right" ? "Click to Hide" : "Click to Select"}</button>
                </div>
                <div className="flex gap-5 lg:gap-5 md:gap-3 sm:gap-5 xxs:gap-3">
                    {emoji.slice(3, 6).map((item) => (
                        <Fragment key={item.index}>
                            <div key={item.id} className={`w-[70px] h-[70px] sm:w-[70px] xxs:w-[60px] sm:h-[70px] xxs:h-[60px] rounded-md bg-c-gainsboro cursor-pointer p-2 border-2 border-solid ${highlight === "right" ? "border-black" : "border-transparent"}`} onClick={() => setOpen(item.index)}>
                                <div className="flex justify-center items-center h-full">
                                    {item.url === null &&
                                        <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                    }
                                    {item.url &&
                                        <div>
                                            <Image src={item.url} width={258} height={258} alt={item.name} className="w-[70px]" />
                                        </div>
                                    }
                                    {!item.url && item.url !== null &&
                                        <Icon className="text-xl text-c-novel" icon="majesticons:plus-line" />
                                    }
                                </div>
                            </div>
                            <Selector
                                open={open === item.index}
                                onClose={() => setOpen(null)}
                                items={items}
                                selected={emoji}
                                onChange={onItemClick}
                                index={item.index}
                            />
                        </Fragment>
                    ))}
                </div>
                <div className="mt-5 mb-3">
                    <p className="font-semibold text-base">Forefront of display</p>
                    <button className="text-xs font-medium text-c-deep-sky select-none" onClick={() => highlightHandler("bottom")}>{highlight === "bottom" ? "Click to Hide" : "Click to Select"}</button>
                </div>
                <MobileLetters highlight={highlight} />
            </div>
            <div className="mt-12">
                <div className="flex gap-3 justify-center mt-8">
                    <button className="bg-c-gainsboro text-white py-1.5 px-10 rounded-md" type="button" onClick={() => setStep("step1")}>
                        Back
                    </button>
                    <button className="bg-c-deep-sky py-1.5 px-12 text-white rounded-md" type="button" onClick={onSubmit}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Emojis;