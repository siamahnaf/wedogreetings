import { useContext, useState, Dispatch, SetStateAction, useMemo, Fragment } from "react";
import Image from "next/image";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Component-
import Letters from "./Emoji/Letters";
import Selector from "./Emoji/Selector";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_EMOJIS, GET_INVENTORY_STOCK } from "@/Query/Function/Product/product.function";
import { GetBackdropData } from "@/Query/Types/Product/product.types";

//Interface Import
import { OnChangeUpdateTypes } from "./Emoji/Selector";

//Initial Data
const initialData = Array.from({ length: 16 }, (_, index) => ({
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
    const [items, setItems] = useState<GetBackdropData[]>([]);
    const [open, setOpen] = useState<number | null>(null);

    //Query
    const { data } = useQuery({ queryKey: ["emojis"], queryFn: GET_EMOJIS });
    const stock = useQuery({ queryKey: ["stock", { franchise: availableData?.franchiseeId }], queryFn: () => GET_INVENTORY_STOCK(availableData?.franchiseeId as string) });

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

    //Lifecycle Hook
    useMemo(() => {
        if (data && stock.data) {
            const results = data.map((item) => {
                const hasStock = stock.data.filter((f) => f["Inventory Name"] === item["@row.id"].toString());
                return item.Qty > hasStock.length ? item : undefined;
            }).filter(Boolean);
            setItems(results as GetBackdropData[])
        }
    }, [data, stock.data]);

    return (
        <div>
            <p className="text-c-novel text-base text-center mb-10">Select a icons classes from the drop down then tap on the tiles to select your choice. <span className="text-black">If you are not sure which would look best the physical printed items on the day of installing.</span></p>
            <p className="text-center font-semibold text-base mb-3">Top of display</p>
            <div className="flex justify-center px-6">
                <div className="grid grid-cols-8 gap-4 items-center">
                    <div className="col-span-1">
                        <div className="grid grid-cols-1 gap-4">
                            {emoji.slice(14, 16).reverse().map((item) => (
                                <Fragment key={item.index}>
                                    <div key={item.id} className="w-[75px] h-[75px] rounded-md bg-c-white-smoke cursor-pointer" onClick={() => setOpen(item.index)}>
                                        <div className="flex justify-center items-center h-full">
                                            {item.url === null &&
                                                <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                    <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                </div>
                                            }
                                            {item.url &&
                                                <div>
                                                    <Image src={imageUrl(Number(item.id), item.url, 43480466)} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <Selector
                                        open={open === item.index}
                                        onClose={() => setOpen(null)}
                                        items={items}
                                        selected={item}
                                        onChange={onItemClick}
                                        index={item.index}
                                    />
                                </Fragment>
                            ))}
                        </div>
                        <p className="text-center font-semibold text-[13px] mt-3">Left Side</p>
                    </div>
                    <div className="col-start-2 col-span-6">
                        <div className="grid grid-cols-6 gap-4">
                            {emoji.slice(0, 6).map((item) => (
                                <Fragment key={item.index}>
                                    <div key={item.id} className="w-[75px] h-[75px] rounded-md bg-c-white-smoke cursor-pointer" onClick={() => setOpen(item.index)}>
                                        <div className="flex justify-center items-center h-full">
                                            {item.url === null &&
                                                <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                    <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                </div>
                                            }
                                            {item.url &&
                                                <div>
                                                    <Image src={imageUrl(Number(item.id), item.url, 43480466)} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <Selector
                                        open={open === item.index}
                                        onClose={() => setOpen(null)}
                                        items={items}
                                        selected={item}
                                        onChange={onItemClick}
                                        index={item.index}
                                    />
                                </Fragment>
                            ))}
                        </div>
                        <div className="my-4">
                            <Letters />
                        </div>
                        <div className="grid grid-cols-6 gap-4">
                            {emoji.slice(8, 14).reverse().map((item) => (
                                <Fragment key={item.index}>
                                    <div key={item.id} className="w-[75px] h-[75px] rounded-md bg-c-white-smoke cursor-pointer" onClick={() => setOpen(item.index)}>
                                        <div className="flex justify-center items-center h-full">
                                            {item.url === null &&
                                                <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                    <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                </div>
                                            }
                                            {item.url &&
                                                <div>
                                                    <Image src={imageUrl(Number(item.id), item.url, 43480466)} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <Selector
                                        open={open === item.index}
                                        onClose={() => setOpen(null)}
                                        items={items}
                                        selected={item}
                                        onChange={onItemClick}
                                        index={item.index}
                                    />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="grid grid-cols-1 gap-4">
                            {emoji.slice(6, 8).map((item) => (
                                <Fragment key={item.index}>
                                    <div key={item.id} className="w-[75px] h-[75px] rounded-md bg-c-white-smoke cursor-pointer" onClick={() => setOpen(item.index)}>
                                        <div className="flex justify-center items-center h-full">
                                            {item.url === null &&
                                                <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                    <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                                </div>
                                            }
                                            {item.url &&
                                                <div>
                                                    <Image src={imageUrl(Number(item.id), item.url, 43480466)} width={258} height={258} alt={item.name} className="w-[70px]" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <Selector
                                        open={open === item.index}
                                        onClose={() => setOpen(null)}
                                        items={items}
                                        selected={item}
                                        onChange={onItemClick}
                                        index={item.index}
                                    />
                                </Fragment>
                            ))}
                        </div>
                        <p className="text-center font-semibold text-[13px] mt-3">Right Side</p>
                    </div>
                </div>
            </div>
            <p className="text-center font-semibold text-base mt-3">Forefront of display</p>
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