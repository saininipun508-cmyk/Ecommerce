import {
  Image,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";

const ConfirmItemCard = ({ item }) => {
  return (
    <Fragment>
      <GridItem
        display="flex"
        alignItems="center"
        justifyContent="center"
        colSpan={2}
      >
        <HStack align="flex-start">
          <Image src={item.image} alt="hi" boxSize="30%" />
          <VStack pl="5" align="flex-start">
            <Link to={`/products/${item.product}`}>
              <Heading as="h6" fontSize="2xl">
                {item.name}
              </Heading>
            </Link>
            <Text as="p" fontSize="sm">
              Price {item.price}
            </Text>
            <Text as="p" fontSize="sm">
              Qty {item.quantity}
            </Text>
          </VStack>
        </HStack>
      </GridItem>

      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Text>
          {item.quantity} X {item.price}
        </Text>
      </GridItem>

      <GridItem display="flex" alignItems="center" justifyContent="center">
        <Text as="b">₹{item.price * item.quantity}</Text>
      </GridItem>
    </Fragment>
  );
};

export default ConfirmItemCard;
