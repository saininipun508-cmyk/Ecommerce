import { EmailIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  HStack,
  Box,
  Avatar,
  Text,
  useMediaQuery,
  // FormErrorMessage,
} from "@chakra-ui/react";
import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdFace } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { login, clearErrors, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../components/Loader/Loader";
import PasswordComp from "./PasswordComp";
import MetaData from "../layout/MetaData";

const LoginSignUp = () => {
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const [isMaxWidth900] = useMediaQuery("(max-width: 900px)");

  const [isLogin, setIsLogin] = useState(
    window.location.pathname === "/login" ? true : false
  );
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");

  const location = useLocation();

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const redirect = location.search ? `/${location.search.split("=")[1]}` : "/";

  useEffect(() => {
    if (error === "Please login to access this resource.") {
      dispatch(clearErrors());
    } else if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [redirect, dispatch, error, alert, navigate, isAuthenticated]);

  const setUserAvatarHandler = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", userName);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    myForm.set("avatar", userAvatar);
    dispatch(register(myForm));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title="Login / Signup" />

      <VStack
        boxShadow="lg"
        rounded="md"
        bg="#e2e2e24f"
        my={10}
        width={isMaxWidth750 ? "90vw" : isMaxWidth900 ? "70vw" : "40vw"}
        mx="auto"
        transition="all 0.3s"
      >
        <HStack width="100%" justifyContent="space-between">
          <Heading
            textAlign="center"
            width="45%"
            borderBottom={`2px solid ${isLogin ? "tomato" : "#F6F6F6"} `}
            size="lg"
            as="h3"
            p={4}
            cursor="pointer"
            _hover={{ color: "white", bg: "tomato", opacity: "0.8" }}
            borderRightRadius="5"
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </Heading>
          <Heading
            textAlign="center"
            p={4}
            cursor="pointer"
            width="45%"
            _hover={{ color: "white", bg: "tomato", opacity: "0.8" }}
            borderLeftRadius="5"
            borderBottom={`2px solid ${!isLogin ? "tomato" : "#F6F6F6"} `}
            size="lg"
            as="h3"
            onClick={() => setIsLogin(false)}
          >
            SIGNUP
          </Heading>
        </HStack>

        <Box
          w="100%"
          px={6}
          as="form"
          onSubmit={isLogin ? loginSubmit : registerSubmit}
        >
          {!isLogin && (
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
          )}

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

          <PasswordComp
            id="password"
            label="Password"
            placeholder="Enter password"
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setshowPassword={setShowPassword}
          />

          {!isLogin && (
            <PasswordComp
              id="confirmPassword"
              label="Confirm Password"
              placeholder="Enter confirm password"
              password={confirmPassword}
              setPassword={setConfirmPassword}
              showPassword={showConfirmPassword}
              setshowPassword={setShowConfirmPassword}
            />
          )}

          {!isLogin && (
            <HStack my={10}>
              <Avatar src={userAvatar} mr={5} />
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
          )}

          {isLogin && (
            <VStack my="10" align="flex-end">
              <Link to="/password/forgot">
                <Text _hover={{ color: "tomato", opacity: "0.8" }}>
                  Forget Password
                </Text>
              </Link>
            </VStack>
          )}

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
            {isLogin ? "Login" : "Register"}
          </Button>
        </Box>
      </VStack>
    </Fragment>
  );
};

export default LoginSignUp;
