import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Components
import Container from "@/Components/Common/Container";

//Query
import { useQuery } from "@tanstack/react-query";
import { GET_WEB_GALLERY } from "@/Query/Function/Home/hero.function";

const Gallery = () => {
    //Embla Carousel
    const [emblaRef] = useEmblaCarousel({
        dragFree: true,
        containScroll: "trimSnaps"
    })

    //Query
    const { data } = useQuery({ queryKey: ["webGallery"], queryFn: GET_WEB_GALLERY });

    return (
        <Container className="py-16 bg-[url('/images/bgs/gallery-bg.png')] bg-no-repeat bg-cover bg-center bg-c-sorbus bg-opacity-10">
            <div className="text-center">
                <h4 className="text-4xl font-bold text-c-sorbus w-max mx-auto relative after:w-16 after:h-1 after:bg-c-deep-sky after:absolute after:top-1/2 after:-right-20 after:-translate-y-1/2 after:rounded before:w-16 before:h-1 before:bg-c-deep-sky before:absolute before:top-1/2 before:-left-20 before:-translate-y-1/2 before:rounded-md">Gallery </h4>
                <p className="text-sm text-c-novel w-[40%] mx-auto mt-4">Birthdays, Weddings, Congrats, Gender Reveals we have it all</p>
            </div>
            <div className="embla overflow-hidden mt-12">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container flex">
                        {data?.map((item, i) => (
                            <div className="embla__slide flex-[0_0_20%] mx-2" key={i}>
                                <Image src={imageUrl(item["@row.id"], item.image, 43481596)} alt={item["Alternative Text"]} width={385} height={280} className="aspect-[11/8] rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Gallery;