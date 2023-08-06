import { useState } from "react";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { Icon } from "@iconify/react";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_WEB_FAQ } from "@/Query/Function/Faq/faq.function";

const Card = () => {
    //State
    const [open, setOpen] = useState<number | null>(null);

    //Query
    const { data } = useQuery({ queryKey: ["webFaq"], queryFn: GET_WEB_FAQ });


    //Handler
    const handleOpen = (value: number) => setOpen(open === value ? null : value);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-2 xxs:grid-cols-1 gap-16 lg:gap-16 xxs:gap-0 mt-12">
            <div>
                {data?.slice(0, Math.ceil(data.length / 2)).map((item, i) => (
                    <div key={i}>
                        <Accordion open={open === item["@row.id"]} icon={open === item["@row.id"] ? <Icon icon="majesticons:minus-line" className="text-[#FF5274] text-xl" /> : <Icon icon="majesticons:plus" className="text-c-deep-sky text-xl" />}>
                            <AccordionHeader onClick={() => handleOpen(item["@row.id"])} className="text-base text-black border-b-c-deep-sky border-opacity-20">{item["FAQ Question"]}</AccordionHeader>
                            <AccordionBody>
                                {item["FAQ Answer"]}
                            </AccordionBody>
                        </Accordion>
                    </div>
                ))}
            </div>
            <div>
                {data?.slice(Math.ceil(data.length / 2)).map((item, i) => (
                    <div key={i}>
                        <Accordion open={open === item["@row.id"]} icon={open === item["@row.id"] ? <Icon icon="majesticons:minus-line" className="text-[#FF5274] text-xl" /> : <Icon icon="majesticons:plus" className="text-c-deep-sky text-xl" />}>
                            <AccordionHeader onClick={() => handleOpen(item["@row.id"])} className="text-base text-black border-b-c-deep-sky border-opacity-20">{item["FAQ Question"]}</AccordionHeader>
                            <AccordionBody>
                                {item["FAQ Answer"]}
                            </AccordionBody>
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;