//Layout
import Layout from "@/Layout";

//Components
import TopContent from "@/Components/About/TopContent";
import Support from "@/Components/About/Support";
import Process from "@/Components/About/Process";

const AboutUs = () => {
    return (
        <Layout title="FAQ" active="about">
            <div>
                <TopContent />
                <Support />
                <Process />
            </div>
        </Layout>
    );
};

export default AboutUs;