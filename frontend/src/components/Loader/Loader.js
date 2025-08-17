import { Center, CircularProgress } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Center height="100vh" width="100%">
      <CircularProgress
        size="8rem"
        thickness="4px"
        isIndeterminate
        color="facebook.300"
      />
    </Center>
  );
};

export default Loader;
