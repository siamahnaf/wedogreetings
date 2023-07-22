import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";

//Interface
interface Props {
    setStep: Dispatch<SetStateAction<string>>;
}

const Success = ({ setStep }: Props) => {
    return (
        <div>
            <Image src="/images/success.png" alt="Success" width={276} height={276} className="w-[45%] mx-auto" />
            <div className="text-center mt-8">
                <h5 className="text-4xl font-bold text-c-deep-sky uppercase">Order confirmed</h5>
                <p className="text-base text-c-novel mt-4 mb-10">Thank you! Your order has gone through. Thank you for choosing us</p>
                <Link href="/" className="bg-c-deep-sky text-white py-2.5 px-6 rounded">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Success;