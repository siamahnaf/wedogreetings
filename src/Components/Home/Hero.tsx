import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Link } from "react-scroll";

//Image Builder
import { imageUrl } from "@/Helper/image-builder";

//Container
import Container from "../Common/Container";

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
        <Container className="!px-0">
            <div className="embla overflow-hidden relative">
                <div className="embla__viewport" ref={emblaRef}>
                    <div className="embla__container flex">
                        {data?.map((item, i) => (
                            <div className="embla__slide flex-[0_0_100%] aspect-[9/5] relative" key={i}>
                                <Image src={imageUrl(item["@row.id"], item.Image, 43480146)} alt={item["Alt tag"] || item.Header} width={1400} height={800} className="w-full h-full" />
                                <div className="absolute z-20 bottom-[26%] 4xl:bottom-[24%] 3xl:bottom-[25%] lg-max:bottom-[26%] lg:bottom-[15%] md:bottom-[10%] xxs:bottom-[8%] left-0 w-full px-16 lg-max:px-16 lg:px-12 md:px-8 lsm:px-6 xxs:px-4">
                                    <div className="w-1/2 lg-max:w-1/2 lg:w-[60%] xxs:w-full text-white">
                                        <h4 className="text-6xl lg-max:text-6xl md:text-4xl sm:text-3xl xs:text-2xl xxs:text-xl  font-bold mb-5 sm:mb-5 xxs:mb-1.5">{item.Header}</h4>
                                        <p className="text-base 4xl:text-[17px] lg-max:text-base lg:text-[15px] lsm:text-sm xxs:text-sm font-medium opacity-80 mb-8 sm:mb-8 xxs:mb-5 xxs:max-lsm:line-clamp-2">{item.Copy}</p>
                                        <Link
                                            to="bookNow"
                                            className="bg-c-deep-sky py-2 3xl:py-2.5 px-10 3xl:px-14 sm:px-10 xxs:px-5 rounded-md font-semibold uppercase text-sm cursor-pointer sm:text-sm xxs:text-[13px]"
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
                <div className="absolute bottom-[26%] 4xl:bottom-[24%] 3xl:bottom-[25%] lg-max:bottom-[26%] lg:bottom-[15%] md:bottom-[10%] right-16 lg-max:right-16 lg:right-12 md:right-8 lsm:right-6 flex gap-5 xxs:max-lg:hidden">
                    <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
                    <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
                </div>
            </div>
        </Container>
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