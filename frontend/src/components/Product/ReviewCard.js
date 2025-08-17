import React from "react";
import { VStack, Avatar, Text, Center } from "@chakra-ui/react";
import { Rating } from "@mui/material";

const ReviewCard = ({ review }) => {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <VStack
      margin="5 !important"
      flex="none"
      p={5}
      boxShadow="dark-lg"
      rounded="3xl"
      bg="gray.100"
      width="40%"
      _hover={{
        transform: "scale(1.05)",
        cursor: "pointer",
      }}
    >
      <Avatar size="lg" name={review.user.name} src={review.user.avatar.url} />
      <Text fontWeight="bold" fontSize="lg">
        {review.user.name}
      </Text>
      <Rating {...options} />
      <Center
        className="scrollBar"
        overflow="auto"
        w="100%"
        height="20vh !important"
      >
        <Text textAlign="justify" as="p">
          {review?.review}
        </Text>
      </Center>
    </VStack>
  );
};

export default ReviewCard;
