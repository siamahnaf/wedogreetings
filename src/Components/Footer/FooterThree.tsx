import { Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";

//Fonts
import { poppins } from "@/Fonts";

const FooterThree = () => {
    return (
        <div className="col-span-3 lg:col-span-3 lsm:col-span-6 xxs:col-span-12 xxs:max-lsm:mt-6">
            <div className="mb-1">
                <Popover>
                    <PopoverHandler className="cursor-pointer w-[60%] 4xl:w-[50%] 3xl:w-[55%] lsm:w-[60%] msm:w-[30%] sm:w-[35%] block ml-auto xxs:max-lsm:mx-auto">
                        <Image src="/images/google.png" alt="Google Play" width={365} height={115} className="w-full" />
                    </PopoverHandler>
                    <PopoverContent className="bg-black text-white">
                        <div style={{ fontFamily: poppins.style.fontFamily }}>
                            Coming Soon
                        </div>
                    </PopoverContent>
                </Popover>
                {/* <Link href="/" className="w-[60%] 4xl:w-[50%] 3xl:w-[55%] lsm:w-[60%] msm:w-[30%] sm:w-[35%] block ml-auto xxs:max-lsm:mx-auto">
                    <Image src="/images/google.png" alt="Google Play" width={365} height={115} className="w-full" />
                </Link> */}
            </div>
            <div>
                <Popover
                    placement="bottom"
                >
                    <PopoverHandler className="cursor-pointer w-[60%] 4xl:w-[50%] 3xl:w-[55%] lsm:w-[60%] msm:w-[30%] sm:w-[35%] block ml-auto xxs:max-lsm:mx-auto">
                        <Image src="/images/app.png" alt="App Store" width={365} height={115} className="w-full" />
                    </PopoverHandler>
                    <PopoverContent className="bg-black text-white">
                        <div style={{ fontFamily: poppins.style.fontFamily }}>
                            Coming Soon
                        </div>
                    </PopoverContent>
                </Popover>
                {/* <Link href="/" className="w-[60%] 4xl:w-[50%] 3xl:w-[55%] lsm:w-[60%] msm:w-[30%] sm:w-[35%] block ml-auto xxs:max-lsm:mx-auto">
                    <Image src="/images/app.png" alt="App Store" width={365} height={115} className="w-full" />
                </Link> */}
            </div>
        </div >
    );
};

export default FooterThree;