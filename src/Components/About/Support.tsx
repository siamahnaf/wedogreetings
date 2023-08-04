//Components
import Container from "@/Components/Common/Container";

const data = [
    {
        name: "Professional Support",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application."
    },
    {
        name: "Awesome Designs",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application."
    },
    {
        name: "Planning & Execution",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application."
    }
]

const awards = [
    { number: "160", prefix: "+", title: "Make Special Day" },
    { number: "20", prefix: "+", title: "Franchises" },
    { number: "100", prefix: "+", title: "Happy Clients" },
    { number: "1", prefix: "+", title: "Years in Business" },
]

const Support = () => {
    return (
        <Container className="bg-[url('/images/about/bg.png')] bg-no-repeat bg-contain bg-left my-12">
            <div className="grid grid-cols-2 gap-10 py-8 items-center">
                <div>
                    {data.map((item, i) => (
                        <div className={`bg-white w-[75%] my-6 shadow-3xl p-8 rounded-lg ${i % 2 !== 0 && "ml-14"}`} key={i}>
                            <h4 className="text-lg font-semibold mb-2"><span className="text-c-deep-sky font-bold">{(i + 1 < 10 ? `0${i + 1}` : i + 1)}.</span> {item.name}</h4>
                            <p className="text-c-novel text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h4 className="text-xl font-bold mb-3">We make your special day Memorable.</h4>
                    <p className="text-c-novel text-sm">Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution for all your technical and managerial hurdles when developing a Mobile or Web Application.</p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 w-[60%] mt-10 ml-8">
                        {awards.map((item, i) => (
                            <div key={i}>
                                <h4 className="text-4xl text-c-deep-sky font-bold">{item.number}{item.prefix}</h4>
                                <p className="text-sm text-c-novel mt-1"> {item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </Container >
    );
};

export default Support;