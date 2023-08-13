import { useContext } from "react";
import { Dialog } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import moment from "moment";

//Fonts
import { poppins } from "@/Fonts";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Query
import { GetProductData } from "@/Query/Types/Product/product.types";

//Interface
export interface LetterTypes {
    index: number;
    url: string,
    id: string;
    name: string;
    letter: string;
}
export interface OnChangeItemTypes {
    url: string;
    id: string;
    name: string;
}
interface Props {
    open: boolean;
    onClose: () => void;
    items: GetProductData[];
    onChange: (item: OnChangeItemTypes) => void;
    selected: LetterTypes[];
    index: number;
}

const Backdrop = ({ open, onClose, items, onChange, selected, index }: Props) => {
    //Handler onItem click
    const onItemClick = (item: OnChangeItemTypes) => {
        onChange(item);
        onClose();
    }

    //Context
    const { availableData } = useContext(TimelineContext)

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
                <h6 className="text-lg font-semibold">Select Letters</h6>
                <hr className="mt-3" />
            </div>
            <div className="aspect-[4/2] overflow-auto">
                <div className="grid grid-cols-5 sm:grid-cols-5 xxs:grid-cols-4 gap-4 mt-5 pb-3">
                    {items?.map((item, i) => (
                        <div key={i} className={`cursor-pointer p-4 rounded-lg ${selected.find(sec => sec.id === item["Item Id"] && sec.index === index) ? "bg-c-deep-sky bg-opacity-40" : ""}`} onClick={() => onItemClick({ url: item["Image Address"], id: item["Item Id"], name: item.Item })}>
                            {item.Image ?
                                <Image src={item["Image Address"]} width={258} height={258} alt={item.Item} className="rounded-lg aspect-[1/1]" /> :
                                <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                    <Image src="/images/preview.png" width={32} height={32} alt={item.Item} className="mx-auto" />
                                </div>}
                        </div>
                    ))}
                </div>
                {items.length === 0 &&
                    <div className="text-center ">
                        <h3 className="text-2xl mb-1"><span className="font-bold">Oh!</span> no</h3>
                        <p className="text-base text-c-novel">There is no letters in stock for your selected date <span className="font-semibold text-black">{moment(availableData?.formData.date?.endDate).format("Do MMMM YYYY")}</span></p>
                    </div>
                }
            </div>
        </Dialog>
    );
};

export default Backdrop;