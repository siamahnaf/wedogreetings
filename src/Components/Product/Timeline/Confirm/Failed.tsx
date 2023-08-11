import Image from "next/image";
import Link from "next/link";

const Failed = () => {
    return (
        <div>
            <Image src="/images/failed.png" alt="Success" width={247} height={210} className="w-[45%] 4xl:w-[35%] mx-auto" />
            <div className="text-center mt-8">
                <h5 className="text-4xl sm:text-4xl xxs:text-3xl font-bold text-[#FF1632] uppercase">Transaction Failed</h5>
                <p className="text-base text-c-novel mt-4 mb-10"><span className="text-black">Oh no!</span> It looks like your transaction got something wrong or failed!</p>
                <Link href="/" className="bg-c-deep-sky text-white py-2.5 px-6 rounded">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Failed;