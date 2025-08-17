import React from "react";
import {
  Text,
  Heading,
  VStack,
  Image,
  Link,
  HStack,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";

import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";

const Footer = () => {
  const [isMaxWidth651] = useMediaQuery("(max-width: 651px)");

  return (
    <Stack
      spacing={10}
      mt={20}
      p={5}
      direction={isMaxWidth651 ? "column" : "row"}
      alignItems={isMaxWidth651 ? "center" : ""}
      bg="#121212"
      color="white"
      width="100vw"
    >
      <VStack width={isMaxWidth651 ? "90%" : "33%"}>
        <Heading fontSize="lg">DOWNLOAD OUR APP</Heading>
        <Text fontSize="xs">Download App for Android and IOS mobile phone</Text>
        <Image
          rounded="sm"
          cursor="pointer"
          boxSize="50%"
          src="https://res.cloudinary.com/dhtnodfhl/image/upload/v1658429313/avatars/playstore_vmdjvq.png"
          alt="playstore"
        />
        <Image
          rounded="sm"
          cursor="pointer"
          boxSize="50%"
          src="https://res.cloudinary.com/dhtnodfhl/image/upload/v1658429313/avatars/Appstore_qst3mn.png"
          alt="Appstore"
        />
      </VStack>

      <VStack width={isMaxWidth651 ? "90%" : "33%"}>
        <Heading size="2xl">ESHOP</Heading>
        <Text fontSize="sm">High Quality is our first priority</Text>
        <Text fontSize="sm">Copyrights 2021 &copy; Ujjwal Saini</Text>
      </VStack>

      <VStack width={isMaxWidth651 ? "90%" : "33%"}>
        <Heading size="lg">Follow Us</Heading>
        <HStack
          _hover={{
            color: "teal",
          }}
        >
          <BsInstagram />
          <Link href="https://www.instagram.com/ujjwal_saini_45">
            Instagram
          </Link>
        </HStack>

        <HStack
          _hover={{
            color: "teal",
          }}
        >
          <BsTwitter />
          <Link href="https://twitter.com/sujjwal2011">Twitter</Link>
        </HStack>

        <HStack
          _hover={{
            color: "teal",
          }}
        >
          <BsFacebook />
          <Link href="https://www.facebook.com/ujjwasaini">Facebook</Link>
        </HStack>
      </VStack>
    </Stack>
  );
};

export default Footer;
