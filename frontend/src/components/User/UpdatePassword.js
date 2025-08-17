import { Button, VStack, Box, useMediaQuery } from "@chakra-ui/react";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../../components/Loader/Loader";
import HeadingComp from "../HeadingComp/HeadingComp";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import PasswordComp from "./PasswordComp";
import MetaData from "../layout/MetaData";

const UpdatePassword = () => {
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const [isMaxWidth900] = useMediaQuery("(max-width: 900px)");

  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading: userLoading } = useSelector(
    (state) => state.user
  );
  const { error, isUpdated, isLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (userLoading === false && !isAuthenticated) {
      navigate("/login");
      alert.error("Please login to access this resource.");
    }

    if (isUpdated) {
      alert.success("Password Updated Successfully.");
      dispatch(loadUser());

      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
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
  ]);

  const update = (e) => {
    e.preventDefault();

    const userData = {
      oldPassword,
      newPassword,
      confirmNewPassword,
    };

    dispatch(updatePassword(userData));
  };

  if (isLoading || userLoading === undefined || userLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title="Update Password" />
      <HeadingComp text="UPDATE PASSWORD" />
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
          <PasswordComp
            id="oldPassword"
            label="Old Password"
            placeholder="Enter old password"
            password={oldPassword}
            setPassword={setOldPassword}
            showPassword={showOldPassword}
            setshowPassword={setShowOldPassword}
          />

          <PasswordComp
            id="newPassword"
            label="New Password"
            placeholder="Enter new password"
            password={newPassword}
            setPassword={setNewPassword}
            showPassword={showNewPassword}
            setshowPassword={setShowNewPassword}
          />

          <PasswordComp
            id="confirmNewPassword"
            label="Confirm New Password"
            placeholder="Enter confirm new password"
            password={confirmNewPassword}
            setPassword={setConfirmNewPassword}
            showPassword={showConfirmNewPassword}
            setshowPassword={setShowConfirmNewPassword}
          />

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

export default UpdatePassword;
