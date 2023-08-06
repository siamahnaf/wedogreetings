import { useRouter } from "next/router";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_SINGLE_PRODUCT } from "@/Query/Function/Product/product.function";

const Details = () => {
    //Initializing Hook
    const router = useRouter();

    //Query
    const { data } = useQuery({ queryKey: ["product", router.query.id], queryFn: () => GET_SINGLE_PRODUCT(Number(router.query.id)) });

    //Converting Data Array to Data Object
    const dataObject = data?.find(() => true);

    //Null return
    if (!dataObject) return null;

    return (
        <div className="col-span-6 4xl:col-span-8 3xl:col-span-7 lg-max:col-span-6 xxs:col-span-12">
            <h3 className="text-3xl font-semibold mb-8">{dataObject["Product Name"]}</h3>
            <div className="grid grid-cols-2 msm:grid-cols-2 xxs:grid-cols-1 gap-5 mb-4">
                <div className="border border-solid border-c-gainsboro py-3 px-5 rounded-xl">
                    <p className="text-base font-semibold"><span className="mr-1">From:</span> <span className="text-c-deep-sky">£{dataObject["Price From"]}</span></p>
                </div>
                <div className="border border-solid border-c-gainsboro py-3 px-5 rounded-xl">
                    <p className="text-base font-semibold"><span className="mr-1">Duration:</span> <span className="text-c-deep-sky">{dataObject["Rental Duration"]}</span> <span className="text-c-novel font-normal">rental</span></p>
                </div>
                <div className="border border-solid border-c-gainsboro py-3 px-5 rounded-xl">
                    <p className="text-base font-semibold"><span className="mr-1">Set up:</span> <span className="text-c-deep-sky">{dataObject["Set-up"]}</span></p>
                </div>
                <div className="border border-solid border-c-gainsboro py-3 px-5 rounded-xl">
                    <p className="text-base font-semibold"><span className="mr-1">Additions:</span> <span className="text-c-deep-sky">{dataObject.Additions}</span></p>
                </div>
            </div>
            <p className="mt-5">
                <span className="font-medium">Overview:</span>{" "}
                <span className="text-c-novel">{dataObject["Product Description Large"]}</span>
            </p>
        </div>
    );
};

export default Details;