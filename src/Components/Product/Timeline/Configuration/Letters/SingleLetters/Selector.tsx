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
    items: GetBackdropData[];
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
                        <div key={i} className={`cursor-pointer`} onClick={() => onItemClick({ url: item.Image, id: item["@row.id"].toString(), name: item.Item })}>
                            {item.Image ?
                                <Image src={imageUrl(item["@row.id"], item.Image, 43480466)} width={258} height={258} alt={item.Item} className="rounded-lg aspect-[1/1]" /> :
                                <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                    <Image src="/images/preview.png" width={32} height={32} alt={item.Item} className="mx-auto" />
                                </div>}
                        </div>
                    ))}
                </div>
            </div>
        </Dialog>
    );
};

export default Backdrop;