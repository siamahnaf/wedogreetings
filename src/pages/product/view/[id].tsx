import type { GetServerSideProps } from "next";

//Layout
import Layout from "@/Layout";

//Components
import Container from "@/Components/Common/Container";
import Header from "@/Components/Product/Header";
import Images from "@/Components/Product/Images";
import Details from "@/Components/Product/Details";
import Timeline from "@/Components/Product/Timeline";


//Query
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GET_SINGLE_PRODUCT } from "@/Query/Function/Product/product.function";

const ProductView = () => {
    return (
        <Layout title="We do Greetings" active="home">
            <Container className="py-10">
                <Header />
            </Container>
            <Container className="bg-c-deep-sky bg-opacity-10 py-12">
                <div className="grid grid-cols-2 gap-10">
                    <Images />
                    <Details />
                </div>
            </Container>
            <Container className="py-10">
                <Timeline />
            </Container>
        </Layout>
    );
};

export default ProductView;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //Initialize Function
    const queryClient = new QueryClient();

    //Fetching Data
    await queryClient.prefetchQuery({ queryKey: ["product", ctx.query.id], queryFn: () => GET_SINGLE_PRODUCT(Number(ctx.query.id)) });

    return {
        props: { dehydratedState: dehydrate(queryClient) }
    }
}