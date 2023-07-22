import { useContext, useState } from "react";
import Image from "next/image";

//ImageBuilder
import { imageUrl } from "@/Helper/image-builder";

//Context
import { TimelineContext } from "@/Context/timeline.context";

const Letters = () => {
    //Context
    const { letters, configureData } = useContext(TimelineContext);

    return (
        <div className="relative">
            <Image src={configureData?.formData?.backdrop?.url as string} alt={configureData?.formData?.name as string} width={600} height={100} className="aspect-[6/1] rounded-md" />
            <div className="absolute w-full top-1/2 -translate-y-1/2">
                <div className="flex gap-2 justify-center">
                    {letters?.map((item, i) => (
                        <div key={i} className="flex-[0_0_6.25%]">
                            {item.letter !== " " ? (
                                <>
                                    {item.url ?
                                        <Image src={imageUrl(Number(item.id), item.url, 43480466)} width={258} height={258} alt={item.name} className="rounded-lg aspect-[1/1]" /> :
                                        <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center p-1.5">
                                            <Image src="/images/preview.png" width={32} height={32} alt={item.name} className="mx-auto" />
                                        </div>}
                                </>
                            ) : (<div className="bg-red-600 w-full" />)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Letters;