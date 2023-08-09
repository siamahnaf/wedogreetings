import { useContext, useState } from "react";
import Image from "next/image";

//ImageBuilder
import { imageUrl } from "@/Helper/image-builder";

//Context
import { TimelineContext } from "@/Context/timeline.context";


//Interface
interface Props {
    highlight: string;
}

const MobileLetters = ({ highlight }: Props) => {
    //Context
    const { letters } = useContext(TimelineContext);

    return (
        <div className="relative">
            <div className="">
                <div className="flex flex-wrap gap-5 sm:gap-5 xxs:gap-3 lg:gap-5 md:gap-3">
                    {letters?.map((item, i) => (
                        <div key={i} className={`w-[70px] h-[70px] sm:w-[70px] xxs:w-[60px] sm:h-[70px] xxs:h-[60px] rounded-md bg-c-white-smoke p-3 border-2 border-solid ${highlight === "bottom" ? "border-black" : "border-transparent"}`}>
                            {item.url &&
                                <Image src={item.url} width={258} height={258} alt={item.name} className="rounded-lg aspect-[1/1]" />
                            }
                            {item.url === null &&
                                <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center p-1.5">
                                    <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileLetters;