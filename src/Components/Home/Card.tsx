//Query
import { useQuery } from "@tanstack/react-query";
import { GET_EVENTS_LIST } from "@/Query/Function/events.function";

const Card = () => {
    //Query
    const { data } = useQuery({ queryKey: ["events"], queryFn: GET_EVENTS_LIST });

    return (
        <div className="grid grid-cols-4 gap-3">
            {data?.map((item, i) =>
                <div key={i} className="shadow-3xl rounded-md py-5 px-5">
                    <div className="text-center">
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