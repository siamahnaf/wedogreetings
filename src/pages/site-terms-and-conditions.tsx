import type { GetServerSideProps } from "next";

//Layout
import Layout from "@/Layout";

//Query
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { GET_WEB_SITE_TERMS } from "@/Query/Function/Terms/terms.function";

const SiteTerms = () => {
    //Query
    const { data } = useQuery({ queryKey: ["siteTerms"], queryFn: GET_WEB_SITE_TERMS });

    //Converting Data Array to Data Object
    const dataObject = data?.find(() => true);

    return (
        <Layout title="Site terms and conditions">
            <div className="text-center mt-16">
                <h4 className="text-4xl font-bold text-black w-max mx-auto relative after:w-16 after:h-1 after:bg-c-deep-sky after:absolute after:top-1/2 after:-right-20 after:-translate-y-1/2 after:rounded before:w-16 before:h-1 before:bg-c-deep-sky before:absolute before:top-1/2 before:-left-20 before:-translate-y-1/2 before:rounded-md">Site Terms and <br /> Conditions</h4>
                <p className="text-sm text-c-novel w-[40%] mx-auto mt-4">Let’s get your booking Started</p>
            </div>
            <div className="my-16 w-[60%] mx-auto">
                <div className="prose">
                    <div dangerouslySetInnerHTML={{ __html: dataObject?.Html as string }} />
                </div>
            </div>
        </Layout>
    );
};

export default SiteTerms;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //Initialize Function
    const queryClient = new QueryClient();

    //Fetching Data
    await queryClient.prefetchQuery({ queryKey: ["siteTerms"], queryFn: GET_WEB_SITE_TERMS });

    return {
        props: { dehydratedState: dehydrate(queryClient) }
    }
}