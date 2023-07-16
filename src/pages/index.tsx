import type { GetServerSideProps } from "next";

//Layout
import Layout from "@/Layout";

//Components
import Hero from "@/Components/Home/Hero";
import Card from "@/Components/Home/Card";
import Review from "@/Components/Home/Review";
import Gallery from "@/Components/Home/Gallery";

//Query
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GET_WEB_HERO, GET_WEB_PRODUCTS, GET_CUSTOMER_REVIEWS, GET_WEB_GALLERY } from "@/Query/Function/Home/hero.function";

const Home = () => {
  return (
    <Layout title="We do Greetings" active="home">
      <Hero />
      <Card />
      <Review />
      <Gallery />
    </Layout>
  );
};

export default Home;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  //Initialize Function
  const queryClient = new QueryClient();

  //Fetching Data
  await queryClient.prefetchQuery({ queryKey: ["webHero"], queryFn: GET_WEB_HERO });
  await queryClient.prefetchQuery({ queryKey: ["webProduct"], queryFn: GET_WEB_PRODUCTS });
  await queryClient.prefetchQuery({ queryKey: ["webReviews"], queryFn: GET_CUSTOMER_REVIEWS });
  await queryClient.prefetchQuery({ queryKey: ["webGallery"], queryFn: GET_WEB_GALLERY });

  return {
    props: { dehydratedState: dehydrate(queryClient) }
  }
}