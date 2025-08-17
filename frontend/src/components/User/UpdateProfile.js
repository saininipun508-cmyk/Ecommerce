import { EmailIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  HStack,
  Box,
  Avatar,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdFace } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../components/Loader/Loader";
import HeadingComp from "../HeadingComp/HeadingComp";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const [isMaxWidth900] = useMediaQuery("(max-width: 900px)");

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userAvatarPreview, setUserAvatarPreview] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    isLoading: userLoading,
  } = useSelector((state) => state.user);
  const { error, isUpdated, isLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      setUserName(user.name);
      setEmail(user.email);
      setUserAvatarPreview(user.avatar.url);
    }

    if (userLoading === false && isAuthenticated === false) {
      navigate("/login");
      alert.error("Please login to access this resource.");
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully.");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [
    dispatch,
    error,
    alert,
    navigate,
    isAuthenticated,
    userLoading,
    isUpdated,
    user,
  ]);

  const setUserAvatarHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserAvatar(reader.result);
        setUserAvatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const update = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", userName);
    myForm.set("email", email);
    myForm.set("avatar", userAvatar);
    dispatch(updateProfile(myForm));
  };

  if (isLoading || userLoading === undefined || userLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title="Update Profile" />
      <HeadingComp text="UPDATE PROFILE" />
      <VStack
        boxShadow="lg"
        rounded="md"
        bg="#e2e2e24f"
        my={10}
        width={isMaxWidth750 ? "90vw" : isMaxWidth900 ? "70vw" : "40vw"}
        mx="auto"
        transition="all 0.3s"
      >
        <Box w="100%" px={6} as="form" onSubmit={update}>
          <FormControl my={10}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<MdFace />} />
              <Input
                type="text"
                id="name"
                placeholder="Enter name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl my={10}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<EmailIcon />} />
              <Input
                type="email"
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <HStack my={10}>
            <Avatar src={userAvatarPreview} mr={5} />
            <FormLabel
              width="100%"
              htmlFor="avatar"
              textAlign="center"
              cursor="pointer"
              border="1px solid #E2E8F0"
              borderRadius="5"
              p={2}
              _hover={{ bg: "gray.200" }}
            >
              Select Image
              <Input
                display="none"
                id="avatar"
                type="file"
                name="avatar"
                accept="image/*"
                onChange={setUserAvatarHandler}
              />
            </FormLabel>
          </HStack>

          <Button
            bg="tomato"
            color="white"
            fontSize="2xl"
            _hover={{ backgroundColor: "#ff4321" }}
            width="100%"
            type="submit"
            value="Submit"
            mb={10}
          >
            Update
          </Button>
        </Box>
      </VStack>
    </Fragment>
  );
};

export default UpdateProfile;
