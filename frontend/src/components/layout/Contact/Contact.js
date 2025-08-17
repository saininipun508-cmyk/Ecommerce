import React, { Fragment } from "react";

import { Button, Link, Box } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import MetaData from "../MetaData";

const Contact = () => {
  return (
    <Fragment>
      <MetaData title="Contact" />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="100vh"
        px={5}
      >
        <Link href="mailto:sujjwal2011@gmail.com" isExternal>
          <Button
            fontSize="xl"
            bg="teal"
            color="white"
            paddingY={10}
            paddingX={5}
            _hover={{ bg: "teal.700" }}
          >
            Contact: sujjwal2011@gmail.com <ExternalLinkIcon ml={2} />
          </Button>
        </Link>
      </Box>
    </Fragment>
  );
};

export default Contact;
