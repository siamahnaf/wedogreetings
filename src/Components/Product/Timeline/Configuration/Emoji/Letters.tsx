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

const Letters = ({ highlight }: Props) => {
    //Context
    const { letters, configureData } = useContext(TimelineContext);

    return (
        <div className="relative">
            {configureData?.formData.backdrop &&
                <div className={`border-2 border-solid mb-2 rounded ${highlight === "top" ? "border-black" : "border-transparent"}`}>
                    <Image src={configureData?.formData?.backdrop?.url as string} alt={configureData?.formData?.name as string} width={600} height={100} className="aspect-[7/2] rounded-md mx-auto object-cover object-center" />
                </div>
            }
            <div className="">
                <div className="grid grid-cols-8 gap-4">
                    {letters?.map((item, i) => (
                        <div key={i} className={`w-[70px] h-[70px] mx-auto rounded-md bg-c-white-smoke p-3 border-2 border-solid ${highlight === "bottom" ? "border-black" : "border-transparent"}`}>
                            {item.url &&
                                <Image src={imageUrl(Number(item.id), item.url, 43480466)} width={258} height={258} alt={item.name} className="rounded-lg aspect-[1/1]" />
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

export default Letters;