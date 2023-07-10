import Image from "next/image";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_EVENTS_LIST } from "@/Query/Function/events.function";

const Card = () => {
    //Query
    const { data } = useQuery({ queryKey: ["events"], queryFn: GET_EVENTS_LIST });

    return (
        <div className="grid grid-cols-4 gap-8">
            {data?.map((item, i) =>
                <div key={i} className="shadow-3xl rounded-md">
                    <Image src={imageUrl(item["@row.id"], item["Image 1"], 43476316)} alt={item.title} width={600} height={600} />
                    <div className="text-center py-5">
                        <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                        <p className="text-[15px] mb-2">Include {item.additions}</p>
                        <button className="border border-solid border-black py-1 px-7 rounded-md">
                            Book
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;