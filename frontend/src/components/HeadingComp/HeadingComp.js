import React from "react";
import { Box, Heading, useMediaQuery } from "@chakra-ui/react";

const HeadingComp = ({ text }) => {
  const [isMaxWidth650] = useMediaQuery("(max-width: 700px)");
  return (
    <Box mt={10} mb={10} p="1" mx="auto" width={isMaxWidth650 ? "90%" : "50%"}>
      <Heading
        as="h1"
        textAlign="center"
        borderBottom="2px solid black"
        fontSize="4xl"
        pb={2}
      >
        {text}
      </Heading>
    </Box>
  );
};

export default HeadingComp;
