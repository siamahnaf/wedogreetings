import Link from "next/link";
import Rive from "@rive-app/react-canvas";

//Layout
import Layout from "@/Layout";

const TransactionFailed = () => {
    return (
        <Layout title="Order Success" active="order-success">
            <div className="w-[50%] mx-auto text-center py-12">
                <h2 className="text-3xl text-[#FE3636] font-bold mb-2">Payment Failed!😌</h2>
                <p className="text-c-novel text-base">Your payment was failed!</p>
                <div className="my-6 w-[250px] h-[250px] mx-auto">
                    <Rive src="/rive/failed.riv" width="100%" height="100%" />
                </div>
                <p className="text-c-novel text-[15px]">
                    We&apos;re sorry, but it appears there was an issue processing your payment. Your transaction has not been completed successfully. This could be due to a variety of reasons, including an incorrect payment method, insufficient funds, or a technical glitch. If you continue to experience problems booking your rental, please use our <Link href="/contact-us" className="text-c-deep-sky">Contact Us</Link> form.
                </p>
                <Link href="/" className="bg-c-deep-sky py-2 px-8 rounded-lg text-white block w-max mx-auto uppercase font-medium text-[15px] mt-8">
                    Continue Shopping
                </Link>
            </div>
        </Layout>
    );
};

export default TransactionFailed;