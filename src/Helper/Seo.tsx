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
            <meta name="description" content="Personalised letter signage for birthdays, retirements, anniversaries, and more. Vibrant, weather-resistant and ideal for British events. Secure your booking today!" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta name="keywords" content="Letter Signage Hire, Birthday Letter Signage UK, Personalised Letters for Events, Retirement Letter Displays, Anniversary Letters, Congratulations Letter Signage, Gender Reveal Letters, Bespoke Celebration Signage, British Event Lettering, Custom Letter Decorations, Garden Letter Displays, Outdoor Event Letters, Vibrant Lettering Rentals, Special Occasion Lettering, Celebratory Signage Solutions, Premium Letter Displays, UK Letter Rentals, Customised Event Letters" />
            <meta name="author" content="Siam Ahnaf" />
            <meta name="author" content="Code station 21" />
        </Head>
    );
};

export default Seo;