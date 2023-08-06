import type { GetServerSideProps } from "next";

//Layout
import Layout from "@/Layout";

//Container
import Container from "@/Components/Common/Container";

//Query
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { GET_WEB_PRIVACY } from "@/Query/Function/Terms/terms.function";

const PrivacyPolicy = () => {
    //Query
    const { data } = useQuery({ queryKey: ["webPrivacy"], queryFn: GET_WEB_PRIVACY });

    //Converting Data Array to Data Object
    const dataObject = data?.find(() => true);

    return (
        <Layout title="Privacy and cookie policy">
            <Container>
                <div className="text-center mt-16">
                    <h4 className="text-4xl font-bold text-black w-max mx-auto relative after:w-16 after:h-1 after:bg-c-deep-sky after:absolute after:top-1/2 after:-right-20 after:-translate-y-1/2 after:rounded before:w-16 before:h-1 before:bg-c-deep-sky before:absolute before:top-1/2 before:-left-20 before:-translate-y-1/2 before:rounded-md xxs:max-sm:before:hidden xxs:max-sm:after:hidden">Privacy and <br /> Cookie Policy</h4>
                    <p className="text-sm text-c-novel w-[40%] md:w-[40%] msm:w-[60%] xxs:w-[90%] mx-auto mt-4">Let’s get your booking Started</p>
                </div>
                <div className="my-16">
                    <div className="prose mx-auto">
                        <div dangerouslySetInnerHTML={{ __html: dataObject?.Html as string }} />
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default PrivacyPolicy;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //Initialize Function
    const queryClient = new QueryClient();

    //Fetching Data
    await queryClient.prefetchQuery({ queryKey: ["webPrivacy"], queryFn: GET_WEB_PRIVACY });

    return {
        props: { dehydratedState: dehydrate(queryClient) }
    }
}