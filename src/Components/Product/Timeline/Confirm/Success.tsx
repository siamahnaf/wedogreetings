import Link from "next/link";
import Image from "next/image";

const Success = () => {
    return (
        <div>
            <Image src="/images/success.png" alt="Success" width={276} height={276} className="w-[45%] 4xl:w-[35%] mx-auto" />
            <div className="text-center mt-8">
                <h5 className="text-4xl sm:text-4xl xxs:text-3xl font-bold text-c-deep-sky uppercase">Order confirmed</h5>
                <p className="text-base text-c-novel mt-4 mb-10">Thank you! Your order has gone through. Thank you for choosing us</p>
                <Link href="/" className="bg-c-deep-sky text-white py-2.5 px-6 rounded">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Success;