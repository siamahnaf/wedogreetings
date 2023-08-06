import { Dialog } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Fonts
import { poppins } from "@/Fonts";

//Query
import { GetBackdropData } from "@/Query/Types/Product/product.types";

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
    items: GetBackdropData[];
    onChange: (item: OnChangeUpdateTypes) => void;
    selected: EmojiTypes;
    index: number;
}

const Backdrop = ({ open, onClose, items, onChange, selected, index }: Props) => {
    //Handler onItem click
    const onItemClick = (item: OnChangeItemTypes) => {
        onChange({ ...item, index: index });
        onClose()
    }
    const groupedArray: { [key: string]: GetBackdropData[] } = items.reduce((acc, item) => {
        const { Category, ...rest } = item;
        if (!acc[Category]) {
            acc[Category] = [];
        }
        acc[Category].push(item);
        return acc;
    }, {} as { [key: string]: GetBackdropData[] });



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
                            <h5 className={`text-lg font-bold mb-10 ${i > 0 && "mt-16"}`}>{category}</h5>
                            <div className="grid grid-cols-5 sm:grid-cols-5 xxs:grid-cols-3 gap-4">
                                {groupedArray[category].map((item, it) => (
                                    <div key={it} className={`cursor-pointer ${item["@row.id"].toString() === selected.id && "bg-c-deep-sky p-3 rounded-lg"}`} onClick={() => onItemClick({ url: item.Image, id: item["@row.id"].toString(), name: item.Item })}>
                                        {item.Image ?
                                            <Image src={imageUrl(item["@row.id"], item.Image, 43480466)} width={258} height={258} alt={item.Item} className="aspect-[1/1]" /> :
                                            <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                                <Image src="/images/preview.png" width={32} height={32} alt={item.Item} className="mx-auto" />
                                            </div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Dialog>
    );
};

export default Backdrop;