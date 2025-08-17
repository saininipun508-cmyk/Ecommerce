import {
  Button,
  VStack,
  Box,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../components/Loader/Loader";
import HeadingComp from "../HeadingComp/HeadingComp";
import MetaData from "../layout/MetaData";
import { EmailIcon } from "@chakra-ui/icons";
import { FORGOT_PASSWORD_RESET } from "../../constants/userConstant";

const ForgotPassword = () => {
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const [isMaxWidth900] = useMediaQuery("(max-width: 900px)");

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isLoading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
      dispatch({ type: FORGOT_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, message]);

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    if (email.length === 0) {
      return alert.error("Please enter your email.");
    }

    dispatch(forgotPassword(email));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title="Forgot Password" />
      <HeadingComp text="FORGOT PASSWORD" />
      <VStack
        boxShadow="lg"
        rounded="md"
        bg="#e2e2e24f"
        my={20}
        width={isMaxWidth750 ? "90vw" : isMaxWidth900 ? "70vw" : "40vw"}
        mx="auto"
        transition="all 0.3s"
      >
        <Box w="100%" px={6} as="form" onSubmit={forgotPasswordSubmit}>
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
            Send
          </Button>
        </Box>
      </VStack>
    </Fragment>
  );
};

export default ForgotPassword;
