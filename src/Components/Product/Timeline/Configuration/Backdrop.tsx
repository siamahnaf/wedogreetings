import { useContext, useState, useMemo } from "react";
import { Dialog } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import moment from "moment";

//Fonts
import { poppins } from "@/Fonts";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_BACKDROP } from "@/Query/Function/Product/product.function";
import { GetProductData } from "@/Query/Types/Product/product.types";

//Interface
export interface Items {
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
    const [backdrops, setBackdrops] = useState<GetProductData[]>([]);

    //Context
    const { availableData } = useContext(TimelineContext);

    //Query
    const { data } = useQuery({ queryKey: ["backdrop", availableData?.franchiseeId], queryFn: () => GET_BACKDROP(availableData?.franchiseeId as string) });

    //Handler onChange
    const onItemClick = async (url: string, id: number, name: string) => {
        onChange({ url, id: id.toString(), name })
        onClose()
    }
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
            setBackdrops(newData)
        }
    }, [data]);

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
            <div className="aspect-[4/2] overflow-auto">
                <div className="grid grid-cols-2 lg:grid-cols-2 xxs:grid-cols-1 gap-4 mt-5 pb-3">
                    {backdrops?.map((item, i) => (
                        <div key={i} onClick={() => onItemClick(item["Image Address"] || "/images/preview.png", item["@row.id"], item.Item)} className="cursor-pointer">
                            {item.Image ?
                                <Image src={item["Image Address"]} width={600} height={600} alt={item.Item} className="rounded-lg aspect-[7/2]" /> :
                                <div className="bg-c-white-smoke rounded-lg aspect-[7/2] text-center flex justify-center items-center">
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