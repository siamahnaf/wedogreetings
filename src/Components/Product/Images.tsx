import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_SINGLE_PRODUCT } from "@/Query/Function/Product/product.function";

const Images = () => {
    //Initializing Hook
    const router = useRouter();

    //Query
    const { data } = useQuery({ queryKey: ["product", router.query.id], queryFn: () => GET_SINGLE_PRODUCT(Number(router.query.id)) });

    //Converting Data Array to Data Object
    const dataObject = data?.find(() => true);

    //State
    const [selected, setSelected] = useState<string>(imageUrl(dataObject?.["@row.id"] as number, dataObject?.["Prod Img Large 1"] as string, 43477766) || "")

    //Null return
    if (!dataObject) return null;

    //Check a function
    const checkPrintable = () => {
        let count = 0;
        if (dataObject["Prod Img Large 1"] !== null) {
            count++
        }
        if (dataObject["Prod Img Large 2"] !== null) {
            count++
        }
        if (dataObject["Prod Img Large 3"] !== null) {
            count++
        }
        if (dataObject["Prod Img Large 4"] !== null) {
            count++
        }
        if (count >= 2) {
            return true
        } else return false;
    }

    return (
        <div className="col-span-6 4xl:col-span-4 3xl:col-span-5 lg-max:col-span-6 xxs:col-span-12">
            <div className="mb-5">
                <Image src={selected} alt="Selected" width={1024} height={680} className="aspect-[128/85] rounded-lg" />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {checkPrintable() &&
                    <>
                        {dataObject["Prod Img Large 1"] !== null &&
                            <div>
                                <Image src={imageUrl(dataObject?.["@row.id"], dataObject?.["Prod Img Large 1"], 43477766)} width={512} height={340} alt={dataObject["Product Name"]} className="aspect-[128/85] rounded-lg cursor-pointer" onClick={() => setSelected(imageUrl(dataObject?.["@row.id"], dataObject?.["Prod Img Large 1"], 43477766))} />
                            </div>
                        }
                        {dataObject["Prod Img Large 2"] !== null &&
                            <div>
                                <Image src={imageUrl(dataObject?.["@row.id"], dataObject?.["Prod Img Large 2"], 43482390)} width={512} height={340} alt={dataObject["Product Name"]} className="aspect-[128/85] rounded-lg cursor-pointer" onClick={() => setSelected(imageUrl(dataObject?.["@row.id"], dataObject?.["Prod Img Large 2"], 43482390))} />
                            </div>
                        }
                        {dataObject["Prod Img Large 3"] !== null &&
                            <div>
                                <Image src={imageUrl(dataObject?.["@row.id"], dataObject?.["Prod Img Large 3"], 43482391)} width={512} height={340} alt={dataObject["Product Name"]} className="aspect-[128/85] rounded-lg cursor-pointer" onClick={() => setSelected(imageUrl(dataObject?.["@row.id"], dataObject?.["Prod Img Large 3"], 43482391))} />
                            </div>
                        }
                        {dataObject["Prod Img Large 4"] !== null &&
                            <div>
                                <Image src={imageUrl(dataObject?.["@row.id"], dataObject?.["Prod Img Large 4"], 43482392)} width={512} height={340} alt={dataObject["Product Name"]} className="aspect-[128/85] rounded-lg cursor-pointer" onClick={() => setSelected(imageUrl(dataObject?.["@row.id"], dataObject?.["Prod Img Large 4"], 43482392))} />
                            </div>
                        }
                    </>}
            </div>
        </div>
    );
};

export default Images;