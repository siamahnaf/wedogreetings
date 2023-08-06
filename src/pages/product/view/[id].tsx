import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";

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
import { useQuery } from "@tanstack/react-query";
import { GET_SINGLE_PRODUCT, GET_ALL_PRODUCT } from "@/Query/Function/Product/product.function";

const ProductView = () => {
    //Initialize
    const router = useRouter();

    //Query
    const { data } = useQuery({ queryKey: ["product", router.query.id], queryFn: () => GET_SINGLE_PRODUCT(Number(router.query.id)) });

    //Converting Data Array to Data Object
    const dataObject = data?.find(() => true);

    return (
        <Layout title={dataObject?.["Product Name"]} active="home">
            <Container className="py-10">
                <Header />
            </Container>
            <Container className="bg-c-deep-sky bg-opacity-10 py-12">
                <div className="grid grid-cols-12 gap-10 lsm:gap-10 xxs:gap-0 xxs:max-sm:gap-y-5">
                    <Images />
                    <Details />
                </div>
            </Container>
            <Container className="py-16">
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
    await queryClient.prefetchQuery({ queryKey: ["allProduct"], queryFn: GET_ALL_PRODUCT });

    return {
        props: { dehydratedState: dehydrate(queryClient) }
    }
}