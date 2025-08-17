import React, { Fragment, useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import { Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import HeadingComp from "../HeadingComp/HeadingComp";
import Loader from "../Loader/Loader";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useMediaQuery } from "@chakra-ui/react";
import Carousel from "../Carousel/Carousel";

const images = [
  {
    url: "https://res.cloudinary.com/dhtnodfhl/image/upload/v1658429323/avatars/Screenshot_2022-07-04_171901_edeuqh.png",
  },
  {
    url: "https://res.cloudinary.com/dhtnodfhl/image/upload/v1658429318/avatars/Screenshot_2022-07-01_001319_al0cik.png",
  },
  {
    url: "https://res.cloudinary.com/dhtnodfhl/image/upload/v1658429315/avatars/Screenshot_2022-07-04_171927_rajoos.png",
  },
  {
    url: "https://res.cloudinary.com/dhtnodfhl/image/upload/v1658429315/avatars/Screenshot_2022-07-01_001416_ghao1r.png",
  },
];

const Home = () => {
  const alert = useAlert();
  const [isMaxWidth1000] = useMediaQuery("(max-width: 1000px)");

  const dispatch = useDispatch();
  const { isLoading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {isLoading && <Loader />}

      {!isLoading && (
        <Fragment>
          <MetaData title="Home" />
          <Carousel isHome images={images} />
          <HeadingComp text="Featured Products" />
          <Flex
            flexWrap="wrap"
            margin="1vmax auto"
            width={isMaxWidth1000 ? "100vw" : "85vw"}
            justifyContent="space-evenly"
          >
            {products &&
              products.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
          </Flex>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
