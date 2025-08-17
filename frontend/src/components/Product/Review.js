import React, { Fragment } from "react";
import { Heading, HStack } from "@chakra-ui/react";
import HeadingComp from "../HeadingComp/HeadingComp";
import ReviewCard from "./ReviewCard";

const Review = ({ reviews }) => {
  console.log(reviews);
  return (
    <Fragment>
      <HeadingComp text="Reviews" />

      <HStack
        className="scrollBar"
        flex="none"
        overflow="auto"
        align="center"
        my={10}
        p={3}
        w="85%"
        mx="auto"
        bg="gray.100"
      >
        {reviews && reviews[0] ? (
          reviews.map((review, item) => (
            <ReviewCard key={item} review={review} />
          ))
        ) : (
          <Heading
            boxShadow="dark-lg"
            my={4}
            mx="auto"
            w="50%"
            py={10}
            px={5}
            borderRadius="xl"
            textAlign="center"
            as="h4"
            fontSize="2xl"
            opacity="0.9"
          >
            No Review Found
          </Heading>
        )}
      </HStack>
    </Fragment>
  );
};

export default Review;
