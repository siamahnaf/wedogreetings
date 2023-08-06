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

const MobileBackdrop = ({ highlight }: Props) => {
    //Context
    const { configureData } = useContext(TimelineContext);

    return (
        <div className="relative">
            {configureData?.formData.backdrop &&
                <div className={`border-2 border-solid mb-2 rounded ${highlight === "top" ? "border-black" : "border-transparent"}`}>
                    <Image src={configureData?.formData?.backdrop?.url as string} alt={configureData?.formData?.name as string} width={600} height={100} className="aspect-[7/2] rounded-md mx-auto object-cover object-center" />
                </div>
            }
        </div>
    );
};

export default MobileBackdrop;