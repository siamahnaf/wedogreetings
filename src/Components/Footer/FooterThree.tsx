import Link from "next/link";
import Image from "next/image";

const FooterThree = () => {
    return (
        <div className="col-span-3">
            <div className="mb-1">
                <Link href="/" className="w-[60%] block ml-auto">
                    <Image src="/images/google.png" alt="Google Play" width={365} height={115} className="w-full" />
                </Link>
            </div>
            <div>
                <Link href="/" className="w-[60%] block ml-auto">
                    <Image src="/images/app.png" alt="App Store" width={365} height={115} className="w-full" />
                </Link>
            </div>
        </div>
    );
};

export default FooterThree;