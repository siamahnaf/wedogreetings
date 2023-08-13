import { useContext } from "react";
import { Dialog } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import moment from "moment";

//Fonts
import { poppins } from "@/Fonts";

//Query
import { GetProductData } from "@/Query/Types/Product/product.types";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Interface
interface EmojiTypes {
    index: number;
    url: string;
    id: string;
    name: string;
}
export interface OnChangeItemTypes {
    url: string;
    id: string;
    name: string;
}
export interface OnChangeUpdateTypes {
    url: string;
    id: string;
    name: string;
    index: number;
}
interface Props {
    open: boolean;
    onClose: () => void;
    items: GetProductData[];
    onChange: (item: OnChangeUpdateTypes) => void;
    selected: EmojiTypes[];
    index: number;
}

const Backdrop = ({ open, onClose, items, onChange, selected, index }: Props) => {
    //Handler onItem click
    const onItemClick = (item: OnChangeItemTypes) => {
        onChange({ ...item, index: index });
        onClose()
    }
    const groupedArray: { [category: string]: { [subCategory: string]: GetProductData[] } } = items.reduce((acc, item) => {
        if (!acc[item.Category]) {
            acc[item.Category] = {};
        }
        if (!acc[item.Category][item["Sub-Category"]]) {
            acc[item.Category][item["Sub-Category"]] = [];
        }
        acc[item.Category][item["Sub-Category"]].push(item);
        return acc;
    }, {} as { [category: string]: { [subCategory: string]: GetProductData[] } });

    //Context
    const { availableData } = useContext(TimelineContext);

    return (
        <Dialog
            open={open}
            handler={onClose}
            animate={{
                mount: { y: 0 },
                unmount: { y: -10 },
            }}
            size="lg"
            style={{ fontFamily: poppins.style.fontFamily }}
            className="rounded-lg p-5 text-black"
        >
            <div className="text-right">
                <button className="w-[30px] h-[30px] rounded-md bg-c-white-smoke text-red-600 flex justify-center items-center ml-auto" onClick={onClose}>
                    <Icon icon="maki:cross" />
                </button>
            </div>
            <div>
                <h6 className="text-lg font-semibold">Select Accessories</h6>
                <hr className="mt-3" />
            </div>
            <div className="aspect-[4/2] overflow-auto">
                <div className="mt-5 pb-3">
                    {Object.keys(groupedArray)?.map((category, i) => (
                        <div key={i}>
                            {Object.keys(groupedArray[category]).map((sub, si) => (
                                <div key={si}>
                                    <h5 className={`text-lg font-bold mb-10 ${si > 0 && "mt-16"}`}>{category} - {sub}</h5>
                                    <div className="grid grid-cols-5 sm:grid-cols-5 xxs:grid-cols-3 gap-4">
                                        {groupedArray[category][sub].filter(inc => !selected.some(exc => exc.id === inc["Item Id"])).map((main, mi) => (
                                            <div key={mi} className="cursor-pointer" onClick={() => onItemClick({ url: main["Image Address"], id: main["Item Id"], name: main.Item })}>
                                                {main.Image ?
                                                    <Image src={main["Image Address"]} width={258} height={258} alt={main.Item} className="aspect-[1/1]" /> :
                                                    <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                        <Image src="/images/preview.png" width={32} height={32} alt={main.Item} className="mx-auto" />
                                                    </div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {items.length === 0 &&
                    <div className="text-center ">
                        <h3 className="text-2xl mb-1"><span className="font-bold">Oh!</span> no</h3>
                        <p className="text-base text-c-novel">There is no accessories in stock for your selected date <span className="font-semibold text-black">{moment(availableData?.formData.date?.endDate).format("Do MMMM YYYY")}</span></p>
                    </div>
                }
            </div>
        </Dialog>
    );
};

export default Backdrop;