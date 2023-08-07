import { Dialog } from "@material-tailwind/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Fonts
import { poppins } from "@/Fonts";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_EXAMPLE_LETTERS } from "@/Query/Function/Product/product.function";

//Interface
interface Props {
    open: boolean;
    onClose: () => void;
}

const Inspire = ({ open, onClose }: Props) => {
    //Query
    const { data, isPending } = useQuery({ queryKey: ["exampleLetters"], queryFn: GET_EXAMPLE_LETTERS, enabled: !open });

    return (
        <Dialog
            open={open}
            handler={onClose}
            animate={{
                mount: { y: 0 },
                unmount: { y: -10 },
            }}
            size="lg"
            style={{ fontFamily: poppins.style.fontFamily }}
            className="rounded-lg p-5 text-black"
        >
            <div className="text-right">
                <button className="w-[30px] h-[30px] rounded-md bg-c-white-smoke text-red-600 flex justify-center items-center ml-auto" onClick={onClose}>
                    <Icon icon="maki:cross" />
                </button>
            </div>
            <div>
                <h6 className="text-lg font-semibold">Example Letters</h6>
                <hr className="mt-3" />
            </div>
            <div className="aspect-[4/2] overflow-auto">
                <div className="grid grid-cols-4 lg-max:grid-cols-4 lg:grid-cols-3 msm:grid-cols-2 xxs:grid-cols-1 gap-4 mt-5 pb-3">
                    {isPending ? (
                        <>
                            {Array.from({ length: 20 }, (_, index) => (
                                <div key={index} className="bg-gray-200 aspect-[11/8] animate-pulse rounded-2xl"></div>
                            ))}
                        </>
                    ) : (
                        <>
                            {data?.map((item, i) => (
                                <div key={i}>
                                    {item.Image ?
                                        <Image src={imageUrl(item["@row.id"], item.Image, 43488611)} width={385} height={280} alt={item.Image} className="rounded-lg aspect-[11/8]" /> :
                                        <div className="bg-c-white-smoke rounded-lg aspect-[11/8] text-center flex justify-center items-center">
                                            <Image src="/images/preview.png" width={32} height={32} alt={item.Type} className="mx-auto" />
                                        </div>}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </Dialog>
    );
};

export default Inspire;