import { useContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import moment from "moment";

//Context
import { TimelineContext } from "@/Context/timeline.context";

//Components
import Selector from "./SingleLetters/Selector";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_LETTERS } from "@/Query/Function/Product/product.function";
import { GetProductData } from "@/Query/Types/Product/product.types";

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
    const [options, setOptions] = useState<GetProductData[]>([]);
    const [selector, setSelector] = useState<boolean>(false);

    //Context
    const { availableData, configureData } = useContext(TimelineContext);

    //Query
    const { data, isPending } = useQuery({ queryKey: ["letters", item, availableData?.franchiseeId], queryFn: () => GET_LETTERS(item, availableData?.franchiseeId as string), enabled: !!item });

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
            setOptions(newData)
            setSelected((prevSelected) => {
                const updatedSelected = [...prevSelected];
                if (index >= 0 && index < updatedSelected.length) {
                    const { index: prevIndex, letter, ...rest } = updatedSelected[index];
                    updatedSelected[index] = {
                        index: prevIndex,
                        letter,
                        ...{ url: newData[0]?.["Image Address"] as string, id: newData[0]?.["Item Id"] as string, name: newData[0]?.Item as string }
                    };
                } else {
                    return prevSelected;
                }
                return updatedSelected;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, configureData?.formData.name]);

    return (
        <>
            <div className={`w-[65px] h-[65px] sm:w-[65px] xxs:w-[60px] sm:h-[65px] xxs:h-[60px] sm:p-2.5 xxs:p-2 rounded-md bg-c-white-smoke cursor-pointer ${(!item || item === " ") ? "pointer-events-none" : ""}`} onClick={() => setSelector(true)}>
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
                                < Image src={selected[index].url} alt="Selected Letter" width={258} height={258} className="w-[50px]" />
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