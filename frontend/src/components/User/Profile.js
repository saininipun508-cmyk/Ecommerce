import React, { Fragment, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Heading,
  Spacer,
  Stack,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import HeadingComp from "../HeadingComp/HeadingComp";

const Profile = () => {
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === false && isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || !user || !user.avatar) {
    return <Loader />;
  }

  const ButtonComp = ({ link, text }) => {
    return (
      <Link style={{ width: "80%", margin: "0px auto" }} to={link}>
        <Button
          width="100%"
          _hover={{
            boxShadow:
              "0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)",
          }}
          p={6}
          bg="#008CBA"
          type="button"
        >
          <Text fontSize="100%">{text}</Text>
        </Button>
      </Link>
    );
  };

  return (
    <Fragment>
      <MetaData title={`${user.name}'s Profile`} />

      <HeadingComp text="MY PROFILE" />

      <Stack
        bg="#EDF2F7"
        p={4}
        my={10}
        mx="auto"
        width={isMaxWidth750 ? "95vw" : "80vw"}
        justifyContent="space-between"
        display={"flex"}
        direction={isMaxWidth750 ? "column" : "row"}
      >
        <VStack width={isMaxWidth750 ? "100%" : "50%"} p={6}>
          <Box
            mb={10}
            display="flex"
            _hover={{ transform: "scale(1.58)" }}
            overflow="hidden"
            cursor="pointer"
            objectFit="contain"
            transform="scale(1.5)"
          >
            <Avatar size="2xl" src={user.avatar.url} alt={user.name} />
          </Box>

          <Spacer />
          <Spacer />
          <Spacer />

          <ButtonComp link="/me/update" text="Edit Profile" />
        </VStack>

        <VStack
          pl={10}
          alignItems={isMaxWidth750 ? "" : "flex-start"}
          width={isMaxWidth750 ? "100%" : "50%"}
        >
          <Box textAlign={isMaxWidth750 ? "center" : ""}>
            <Heading as="h4">Full Name</Heading>
            <Text as="p">{user.name}</Text>
          </Box>

          <Spacer />
          <Spacer />
          <Spacer />

          <Box textAlign={isMaxWidth750 ? "center" : ""}>
            <Heading as="h4">Email</Heading>
            <Text as="p">{user.email}</Text>
          </Box>

          <Spacer />
          <Spacer />
          <Spacer />

          <Box textAlign={isMaxWidth750 ? "center" : ""}>
            <Heading as="h4">Joined On</Heading>
            <Text as="p">{String(user.createdAt).substr(0, 10)}</Text>
          </Box>

          <Spacer />
          <Spacer />
          <Spacer />

          <Spacer />

          <ButtonComp link="/orders" text="My Orders" />
          <Spacer />
          <Spacer />
          <ButtonComp link="/me/updatePassword" text="Change Password" />
        </VStack>
      </Stack>
    </Fragment>
  );
};

export default Profile;
