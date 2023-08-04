import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Link } from "react-scroll";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";


//Query
import { useQuery } from "@tanstack/react-query";
import { GET_WEB_HERO } from "@/Query/Function/Home/hero.function";

const Hero = () => {
    //Embla Configurations
    const [emblaRef, emblaApi] = useEmblaCarousel();

    //States
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    //Query
    const { data } = useQuery({ queryKey: ["webHero"], queryFn: GET_WEB_HERO });

    //Handler Scroll Prev & Scroll Next
    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi]
    )
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi]
    )

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    return (
        <div>
            <div className="embla overflow-hidden relative">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container flex">
                        {data?.map((item, i) => (
                            <div className="embla__slide flex-[0_0_100%] aspect-[9/5] relative" key={i}>
                                <Image src={imageUrl(item["@row.id"], item.Image, 43480146)} alt={item.Header} width={1400} height={800} className="w-full h-full" />
                                <div className="absolute z-20 bottom-[26%] left-0 w-full px-16">
                                    <div className="w-1/2 text-white">
                                        <h4 className="text-6xl font-bold mb-5">{item.Header}</h4>
                                        <p className="text-base font-medium opacity-80 mb-8">{item.Copy}</p>
                                        <Link
                                            to="bookNow"
                                            className="bg-c-deep-sky py-2 px-10 rounded-md font-semibold uppercase text-sm cursor-pointer"
                                            smooth={true}
                                            offset={0}
                                            duration={300}
                                            spy={true}
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                                <div className="absolute w-full h-full bg-gradient-to-t from-[#000000d1] to-transparent z-10 top-0 left-0"></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-[26%] right-16 flex gap-5">
                    <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
                    <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
                </div>
            </div>
        </div>
    );
};

export default Hero;



//Interface
interface ButtonProps {
    onClick: () => void;
    disabled: boolean;
}

const PrevButton = ({ onClick, disabled }: ButtonProps) => {
    return (
        <button
            className="bg-white p-3.5 text-c-deep-sky rounded-md"
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            <Icon className="text-2xl" icon="fluent:chevron-left-16-filled" />
        </button>
    )
}

const NextButton = ({ onClick, disabled }: ButtonProps) => {
    return (
        <button
            className="bg-c-deep-sky text-white p-3.5 rounded-md"
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            <Icon className="text-2xl" icon="fluent:chevron-right-16-filled" />
        </button>
    )
}