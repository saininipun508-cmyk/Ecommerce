import React from "react";
import { Image, Box } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./carousel.css";

const classPrev = "slick-prev-Home";
const classNext = "slick-next-Home";

const Carousel = (props) => {
  const PrevBtn = ({ className, onClick }) => {
    return (
      <Box
        className={`${className} ${props.isHome ? classPrev : ""}`}
        onClick={onClick}
      >
        <ChevronLeftIcon w={10} h={10} />
      </Box>
    );
  };

  const NextBtn = ({ className, onClick }) => {
    return (
      <Box
        className={`${className} ${props.isHome ? classNext : ""}`}
        onClick={onClick}
      >
        <ChevronRightIcon w={10} h={10} />
      </Box>
    );
  };
  const settings = {
    dots: props.dots,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1,
    prevArrow: <PrevBtn />,
    nextArrow: <NextBtn />,
  };

  return (
    <Slider {...settings}>
      {props.images.map((image, idx) => {
        return (
          <Image height={props.isHome ? 250 : ""} key={idx} src={image.url} />
        );
      })}
    </Slider>
  );
};

export default Carousel;
