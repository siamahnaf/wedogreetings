import type { GetServerSideProps } from "next"

//Layout
import Layout from "@/Layout";

//Components
import Container from "@/Components/Common/Container";
import Card from "@/Components/Home/Card";


//Query
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GET_EVENTS_LIST } from "@/Query/Function/events.function";

const Home = () => {
  return (
    <Layout title="We do Greetings" active="home">
      <Container>
        <Card />
      </Container>
    </Layout>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //Initialize Function
  const queryClient = new QueryClient();

  //Fetching Data
  await queryClient.prefetchQuery({ queryKey: ["events"], queryFn: GET_EVENTS_LIST });

  return {
    props: { dehydratedState: dehydrate(queryClient) }
  }
}