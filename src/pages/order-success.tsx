import Link from "next/link";
import Rive from "@rive-app/react-canvas";

//Layout
import Layout from "@/Layout";

const OrderSuccess = () => {
    return (
        <Layout title="Order Success" active="order-success">
            <div className="w-[50%] mx-auto text-center py-12">
                <h2 className="text-3xl text-c-deep-sky font-bold mb-2">Congratulation!🥰</h2>
                <p className="text-c-novel text-base">Your order has been successfully placed.</p>
                <div className="my-6 w-[250px] h-[250px] mx-auto">
                    <Rive src="/rive/success.riv" width="100%" height="100%" />
                </div>
                <p className="text-c-novel text-[15px]">
                    Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application.
                </p>
                <Link href="/" className="bg-c-deep-sky py-2 px-8 rounded-lg text-white block w-max mx-auto uppercase font-medium text-[15px] mt-8">
                    Continue Shopping
                </Link>
            </div>
        </Layout>
    );
};

export default OrderSuccess;