import { useContext, useState, useMemo } from "react";
import Image from "next/image";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Components
import Selector from "./SingleLetters/Selector";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_LETTERS, GET_INVENTORY_STOCK } from "@/Query/Function/Product/product.function";
import { GetBackdropData } from "@/Query/Types/Product/product.types";

//interface
interface Props {
    item: string;
}

const SingleLetters = ({ item }: Props) => {
    //State
    const [letters, setLetters] = useState<GetBackdropData[]>([]);
    const [selector, setSelector] = useState<boolean>(false);

    //Context
    const { availableData } = useContext(TimelineContext);

    //Query
    const { data, isPending } = useQuery({ queryKey: ["letters", item], queryFn: () => GET_LETTERS(item), enabled: !!item });
    const stock = useQuery({ queryKey: ["stock", { franchise: availableData?.franchiseeId }], queryFn: () => GET_INVENTORY_STOCK(availableData?.franchiseeId as string) });

    useMemo(() => {
        if (data && stock.data) {
            const results = data.map((item) => {
                const hasStock = stock.data.filter((f) => f["Inventory Name"] === item["@row.id"].toString());
                return item.Qty > hasStock.length ? item : undefined;
            }).filter(Boolean);
            setLetters(results as GetBackdropData[])
        }
    }, [data, stock.data]);

    return (
        <>
            <div className={`w-[65px] h-[65px] rounded-md bg-c-white-smoke cursor-pointer ${(!item || item === " ") ? "pointer-events-none" : ""}`} onClick={() => setSelector(true)}>
                <div className="flex justify-center items-center h-full">
                    {isPending && item &&
                        <div className="w-5 h-5 border-b-2 border-black rounded-full animate-spin"></div>
                    }
                    {item && item !== " " && !isPending &&
                        <>
                            {letters[0]?.Image ?
                                <Image src={letters[0].Image} alt="Selected Letter" width={258} height={258} /> : <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                    <Image src="/images/preview.png" width={32} height={32} alt="selected item" className="mx-auto" />
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
            <Selector
                open={selector}
                onClose={() => setSelector(false)}
                items={letters}
            />
        </>
    );
};

export default SingleLetters;