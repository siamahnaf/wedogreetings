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
            <div className="max-h-[400px] overflow-auto">
                <div className="grid grid-cols-5 gap-4 mt-5 pb-3">
                    {isPending ? (
                        <>
                            {Array.from({ length: 20 }, (_, index) => (
                                <div key={index} className="bg-gray-200 aspect-[1/1] animate-pulse rounded-2xl"></div>
                            ))}
                        </>
                    ) : (
                        <>
                            {data?.map((item, i) => (
                                <div key={i}>
                                    {item.Image ?
                                        <Image src={imageUrl(item["@row.id"], item.Image, 43480466)} width={258} height={258} alt={item.Item} className="rounded-lg aspect-[1/1]" /> :
                                        <div className="bg-c-white-smoke rounded-lg aspect-[1/1] text-center flex justify-center items-center">
                                            <Image src="/images/preview.png" width={32} height={32} alt={item.Item} className="mx-auto" />
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