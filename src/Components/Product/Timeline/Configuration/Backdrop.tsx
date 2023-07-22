import { useContext, useState, useMemo } from "react";
import { Dialog } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Fonts
import { poppins } from "@/Fonts";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_BACKDROP, GET_INVENTORY_STOCK } from "@/Query/Function/Product/product.function";
import { GetBackdropData } from "@/Query/Types/Product/product.types";

//Interface
interface Items {
    url: string,
    id: string;
    name: string;
}
interface Props {
    open: boolean;
    onClose: () => void;
    selected: Items;
    onChange: (item: Items) => void;
}


const Backdrop = ({ open, onClose, selected, onChange }: Props) => {
    //State
    const [backdrops, setBackdrops] = useState<GetBackdropData[]>([]);

    //Context
    const { availableData } = useContext(TimelineContext);

    //Query
    const { data } = useQuery({ queryKey: ["backdrop"], queryFn: GET_BACKDROP });
    const stock = useQuery({ queryKey: ["stock", { franchise: availableData?.franchiseeId }], queryFn: () => GET_INVENTORY_STOCK(availableData?.franchiseeId as string) });

    //Handler onChange
    const onItemClick = async (url: string, id: number, name: string) => {
        onChange({ url, id: id.toString(), name })
        onClose()
    }

    useMemo(() => {
        if (data && stock.data) {
            const results = data.map((item) => {
                const hasStock = stock.data.filter((f) => f["Inventory Name"] === item["@row.id"].toString());
                return item.Qty > hasStock.length ? item : undefined;
            }).filter(Boolean);
            setBackdrops(results as GetBackdropData[])
        }
    }, [data, stock.data]);

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
                <h6 className="text-lg font-semibold">Select Backdrop</h6>
                <hr className="mt-3" />
            </div>
            <div className="max-h-[400px] overflow-auto">
                <div className="grid grid-cols-2 gap-4 mt-5 pb-3">
                    {backdrops?.map((item, i) => (
                        <div key={i} onClick={() => onItemClick((imageUrl(item["@row.id"], item.Image, 43480466)) || "/images/preview.png", item["@row.id"], item.Item)} className="cursor-pointer">
                            {item.Image ?
                                <Image src={imageUrl(item["@row.id"], item.Image, 43480466)} width={600} height={100} alt={item.Item} className="rounded-lg aspect-[6/1]" /> :
                                <div className="bg-c-white-smoke rounded-lg aspect-[6/1] text-center flex justify-center items-center">
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