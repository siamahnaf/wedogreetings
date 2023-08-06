import { Timeline, TimelineItem, TimelineConnector, TimelineHeader, TimelineIcon, TimelineBody, Typography } from "@material-tailwind/react";
import { Icon } from "@iconify/react";

//Components
import Container from "../Common/Container";

//Data
const data = [
    {
        name: "Planning & Execution",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution.",
        icon: "ph:bell-fill"
    },
    {
        name: "Planning & Execution",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution.",
        icon: "pepicons-pop:dollar"
    },
    {
        name: "Planning & Execution",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution.",
        icon: "ph:bell-fill"
    },
    {
        name: "Planning & Execution",
        description: "Wish to get a website or mobile app Developed. Let us handle everything for you. Palmspire is the one stop solution.",
        icon: "pepicons-pop:dollar"
    }
]

const Process = () => {
    return (
        <Container className="py-12">
            <div className="text-center mb-16">
                <h4 className="text-4xl font-bold text-black w-max mx-auto relative after:w-16 after:h-1 after:bg-c-deep-sky after:absolute after:top-1/2 after:-right-20 after:-translate-y-1/2 after:rounded before:w-16 before:h-1 before:bg-c-deep-sky before:absolute before:top-1/2 before:-left-20 before:-translate-y-1/2 before:rounded-md xxs:max-sm:before:hidden xxs:max-sm:after:hidden">Our Process</h4>
                <p className="text-sm text-c-novel w-[40%] md:w-[40%] msm:w-[60%] xxs:w-[90%] mx-auto mt-4">We can pretty much tackle anything you can throw at us.</p>
            </div>
            <div className="w-[55%] lg:w-[55%] md:w-[80%] xxs:w-[100%] mx-auto">
                <Timeline>
                    {data.map((item, i) => (
                        <TimelineItem key={i}>
                            {data.length - 1 !== i &&
                                <TimelineConnector color="cyan" className="!w-[32px]" />
                            }
                            <TimelineHeader>
                                <TimelineIcon className="p-2" color="cyan">
                                    <Icon icon={item.icon} />
                                </TimelineIcon>
                                <Typography variant="h5" color="blue-gray">
                                    {item.name}
                                </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-8 ml-[16px]">
                                <Typography color="gary" className="font-normal text-gray-600">
                                    {item.description}
                                </Typography>
                            </TimelineBody>
                        </TimelineItem>
                    ))}
                </Timeline>
            </div>
        </Container>
    );
};

export default Process;