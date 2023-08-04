import type { GetServerSideProps } from "next";

//Layout
import Layout from "@/Layout";

//Components
import Container from "@/Components/Common/Container";
import FaqHeader from "@/Components/Faq/Header";
import Card from "@/Components/Faq/Card";

//Query
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GET_WEB_FAQ } from "@/Query/Function/Faq/faq.function";

const Faq = () => {
    return (
        <Layout title="FAQ" active="faq">
            <Container className="py-16">
                <FaqHeader />
                <Card />
            </Container>
        </Layout>
    );
};

export default Faq;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //Initialize Function
    const queryClient = new QueryClient();

    //Fetching Data
    await queryClient.prefetchQuery({ queryKey: ["webFaq"], queryFn: GET_WEB_FAQ });

    return {
        props: { dehydratedState: dehydrate(queryClient) }
    }
}