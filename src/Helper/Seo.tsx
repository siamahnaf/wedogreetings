import Head from 'next/head';

//Interface
interface Props {
    title?: string;
}

const Seo = ({ title }: Props) => {
    return (
        <Head>
            <meta property="og:url" content="https://www.wedogreetings.co.uk/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${title || "We do greetings"} | No One Does Greetings like WE DO GREETINGS`} />
            <meta property="og:description" content="" />
            <title>{`${title || "We do greetings"} | No One Does Greetings like WE DO GREETINGS`}</title>
            <meta name="description" content="" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="keywords" content="" />
            <meta name="author" content="Siam Ahnaf" />
            <meta name="author" content="Code station 21" />
        </Head>
    );
};

export default Seo;