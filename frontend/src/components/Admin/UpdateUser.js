import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearErrors as userClearErrors,
  getUserDetails,
  updateUser,
} from "../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import MetaData from "../layout/MetaData";
import SideBar from "./SideBar";
import {
  Button,
  HStack,
  VStack,
  Box,
  FormControl,
  FormLabel,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  useDisclosure,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import { MdFace } from "react-icons/md";
import { EmailIcon } from "@chakra-ui/icons";

const UpdateUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");

  const {
    error: userError,
    isAuthenticated,
    isLoading: userLoading,
    user,
  } = useSelector((state) => state.user);

  const {
    error: updateError,
    isLoading: updateLoading,
    isUpdated,
  } = useSelector((state) => state.profile);

  const {
    error: userDetailError,
    isLoading: userDetailLoading,
    user: userDeatil,
  } = useSelector((state) => state.userDetails);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(0);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (userError) {
      alert.error(userError);
      dispatch(userClearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(userClearErrors());
    }

    if (userDetailError) {
      alert.error(userDetailError);
      dispatch(userClearErrors());
    }

    if (userLoading === false && isAuthenticated === false) {
      navigate("/login");
    }

    if (userLoading === false && isAuthenticated && user.role !== "admin") {
      alert.error("Only admin can access this route.");
      navigate("/");
    }

    if (userDeatil && userDeatil._id !== params.id) {
      dispatch(getUserDetails(params.id));
    } else {
      setName(userDeatil.name);
      setEmail(userDeatil.email);
      setRole(userDeatil.role);
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [
    alert,
    dispatch,
    isAuthenticated,
    isUpdated,
    navigate,
    params.id,
    updateError,
    user,
    userDeatil,
    userDetailError,
    userError,
    userLoading,
  ]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(params.id, { name, email, role }));
    dispatch(getUserDetails(params.id));
  };

  if (userLoading || !user || userDetailLoading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title="Update User --Admin" />
      <div className="dashboard">
        {!isMaxWidth750 && <SideBar />}

        {isMaxWidth750 && (
          <Box mb={5} width={isMaxWidth750 ? "90%" : "60%"} mx={"auto"} my={3}>
            <Button
              p={5}
              w="100%"
              ref={btnRef}
              colorScheme="teal"
              onClick={onOpen}
            >
              Dashboard Options
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Dashboard Options</DrawerHeader>

                <DrawerBody>
                  <SideBar />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        )}

        <VStack
          boxShadow="lg"
          rounded="md"
          bg="#e2e2e24f"
          my={10}
          width={isMaxWidth750 ? "90%" : "60%"}
          mx="auto"
          transition="all 0.3s"
        >
          <HStack width="100%" justifyContent="space-between">
            <Heading
              textAlign="center"
              p={4}
              width="100%"
              bg="teal"
              opacity="0.8"
              size="lg"
              as="h3"
              color="white"
            >
              UPDATE USER
            </Heading>
          </HStack>

          <Box w="100%" px={6} as="form" onSubmit={updateUserSubmitHandler}>
            <FormControl my={10}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<MdFace />} />
                <Input
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl my={10}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon />}
                />
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl my={10} isRequired>
              <FormLabel>Category</FormLabel>
              <HStack>
                <AccountTreeIcon />
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Category</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Select>
              </HStack>
            </FormControl>

            <Button
              mb={10}
              bg="tomato"
              color="white"
              fontSize="2xl"
              _hover={{ backgroundColor: "#ff4321" }}
              width="100%"
              type="submit"
              value="Submit"
              disabled={updateLoading || role === ""}
            >
              {updateLoading ? "User is Updating..." : "Update"}
            </Button>
          </Box>
        </VStack>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
