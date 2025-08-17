import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Center,
  useColorModeValue,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { Rating } from "@mui/material";

const generateRandom = () => Math.floor(Math.random() * (1200 - 500)) + 500;

const ProductCard = (props) => {
  const options = {
    value: props.product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Center
      py={12}
      _hover={{
        transform: "scale(1.02)",
      }}
      mx={4}
    >
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${props.product.images[0].url})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Link to={`/products/${props.product._id}`}>
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={props.product.images[0].url}
              alt={props.product.name}
            />
          </Link>
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            Brand
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {props.product.name}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              {`₹${props.product.price}`}
            </Text>
            <Text textDecoration={"line-through"} color={"gray.600"}>
              {`₹${props.product.price + generateRandom()}`}
            </Text>
          </Stack>
          <Stack direction={"row"} align={"center"}>
            <Rating {...options} />
            <Text fontSize="xs" as="span" color={"gray.600"}>
              ({props.product.numOfReviews}
              {props.product.numOfReviews <= 1 ? " review" : " reviews"})
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default ProductCard;
