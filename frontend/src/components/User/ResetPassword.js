import { Button, VStack, Box, useMediaQuery } from "@chakra-ui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../components/Loader/Loader";
import HeadingComp from "../HeadingComp/HeadingComp";
import PasswordComp from "./PasswordComp";
import MetaData from "../layout/MetaData";

const ResetPassword = () => {
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const [isMaxWidth900] = useMediaQuery("(max-width: 900px)");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const token = useParams().token;

  const { error, success, isLoading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully.");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const userData = {
      password,
      confirmPassword,
    };

    dispatch(resetPassword(userData, token));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title="Reset Password" />
      <HeadingComp text="RESET PASSWORD" />
      <VStack
        boxShadow="lg"
        rounded="md"
        bg="#e2e2e24f"
        my={10}
        width={isMaxWidth750 ? "90vw" : isMaxWidth900 ? "70vw" : "40vw"}
        mx="auto"
        transition="all 0.3s"
      >
        <Box w="100%" px={6} as="form" onSubmit={resetPasswordSubmit}>
          <PasswordComp
            id="password"
            label="Password"
            placeholder="Enter password"
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setshowPassword={setShowPassword}
          />

          <PasswordComp
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Enter confirm password"
            password={confirmPassword}
            setPassword={setConfirmPassword}
            showPassword={showConfirmPassword}
            setshowPassword={setShowConfirmPassword}
          />

          <Button
            bg="tomato"
            color="white"
            fontSize="2xl"
            _hover={{ backgroundColor: "#ff4321" }}
            width="100%"
            type="submit"
            value="Submit"
          >
            Update
          </Button>
        </Box>
      </VStack>
    </Fragment>
  );
};

export default ResetPassword;
