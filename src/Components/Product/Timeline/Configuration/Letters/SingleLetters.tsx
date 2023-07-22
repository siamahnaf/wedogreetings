import { useContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Components
import Selector from "./SingleLetters/Selector";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_LETTERS, GET_INVENTORY_STOCK } from "@/Query/Function/Product/product.function";
import { GetBackdropData } from "@/Query/Types/Product/product.types";

//Interface Import
import { LetterTypes, OnChangeItemTypes } from "./SingleLetters/Selector";

//interface
interface Props {
    item: string;
    selected: LetterTypes[];
    setSelected: Dispatch<SetStateAction<LetterTypes[]>>;
    index: number;
}

const SingleLetters = ({ item, selected, setSelected, index }: Props) => {
    //State
    const [options, setOptions] = useState<GetBackdropData[]>([]);
    const [selector, setSelector] = useState<boolean>(false);

    //Context
    const { availableData, configureData } = useContext(TimelineContext);

    //Query
    const { data, isPending, refetch } = useQuery({ queryKey: ["letters", item], queryFn: () => GET_LETTERS(item), enabled: !!item });
    const stock = useQuery({ queryKey: ["stock", { franchise: availableData?.franchiseeId }], queryFn: () => GET_INVENTORY_STOCK(availableData?.franchiseeId as string) });

    //Handler
    const onItemClick = (item: OnChangeItemTypes) => {
        setSelected((prevSelected) => {
            const updatedSelected = [...prevSelected];
            const { index: prevIndex, letter, ...rest } = updatedSelected[index];
            updatedSelected[index] = { index: prevIndex, letter, ...{ url: item.url as string, id: item.id as string, name: item.name as string } };
            return updatedSelected;
        });
    };

    //Lifecycle Hook
    useEffect(() => {
        if (data && stock.data) {
            const results = data.map((item) => {
                const hasStock = stock.data.filter((f) => f["Inventory Name"] === item["@row.id"].toString());
                return item.Qty > hasStock.length ? item : undefined;
            }).filter(Boolean);
            setOptions(results as GetBackdropData[]);
            setSelected((prevSelected) => {
                const updatedSelected = [...prevSelected];
                if (index >= 0 && index < updatedSelected.length) {
                    const { index: prevIndex, letter, ...rest } = updatedSelected[index];
                    updatedSelected[index] = {
                        index: prevIndex,
                        letter,
                        ...{ url: results[0]?.Image as string, id: results[0]?.["@row.id"].toString() as string, name: results[0]?.Item as string }
                    };
                } else {
                    return prevSelected;
                }
                return updatedSelected;
            });
        }
    }, [data, stock.data, configureData?.formData.name]);

    return (
        <>
            <div className={`w-[65px] h-[65px] rounded-md bg-c-white-smoke cursor-pointer ${(!item || item === " ") ? "pointer-events-none" : ""}`} onClick={() => setSelector(true)}>
                <div className="flex justify-center items-center h-full">
                    {isPending && item &&
                        <div className="w-5 h-5 border-b-2 border-black rounded-full animate-spin"></div>
                    }
                    {item && item !== " " && !isPending &&
                        <>
                            {selected[index]?.url === null &&
                                <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                    <Image src="/images/preview.png" width={32} height={32} alt="selected item" className="mx-auto" />
                                </div>
                            }
                            {selected[index]?.url &&
                                < Image src={imageUrl(Number(selected[index].id), selected[index].url, 43480466)} alt="Selected Letter" width={258} height={258} className="w-[50px]" />
                            }
                        </>
                    }
                </div>
            </div>
            <Selector
                open={selector}
                onClose={() => setSelector(false)}
                items={options}
                index={index}
                selected={selected}
                onChange={onItemClick}
            />
        </>
    );
};

export default SingleLetters;