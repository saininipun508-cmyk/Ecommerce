import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors as userClearErrors } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
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
  Textarea,
  Select,
  Image,
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
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { NEW_PRODUCT_RESET } from "../../constants/productconstant";
import { clearErrors, createProduct } from "../../actions/productAction";

const NewProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");

  const {
    error: userError,
    isAuthenticated,
    isLoading: userLoading,
    user,
  } = useSelector((state) => state.user);

  const { isLoading, error, success } = useSelector(
    (state) => state.newProduct
  );

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smart phone",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (userError) {
      alert.error(userError);
      dispatch(userClearErrors());
    }

    if (userLoading === false && isAuthenticated === false) {
      navigate("/login");
    }

    if (userLoading === false && isAuthenticated && user.role !== "admin") {
      alert.error("Only admin can access this route.");
      navigate("/");
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [
    alert,
    dispatch,
    error,
    isAuthenticated,
    navigate,
    success,
    user,
    userError,
    userLoading,
  ]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  if (userLoading || !user) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title="Create Product --Admin" />
      <div className="dashboard">
        {!isMaxWidth750 && <SideBar />}

        {isMaxWidth750 && (
          <Box mb={5} width={isMaxWidth750 ? "90%" : "60%"} mx={"auto"} my={2}>
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
              CREATE PRODUCT
            </Heading>
          </HStack>

          <Box w="100%" px={6} as="form" onSubmit={createProductSubmitHandler}>
            <FormControl my={10} isRequired>
              <FormLabel>Product Name</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SpellcheckIcon />}
                />
                <Input
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl my={10} isRequired>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AttachMoneyIcon />}
                />
                <Input
                  type="number"
                  placeholder="Enter price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl my={10} isRequired>
              <FormLabel>Product Description</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<DescriptionIcon />}
                />
                <Input
                  as={Textarea}
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl my={10} isRequired>
              <FormLabel>Category</FormLabel>
              <HStack>
                <AccountTreeIcon />
                <Select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </Select>
              </HStack>
            </FormControl>

            <FormControl my={10} isRequired>
              <FormLabel>Stock</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<StorageIcon />}
                />
                <Input
                  type="number"
                  placeholder="Enter Stock value"
                  onChange={(e) => setStock(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <HStack my={10}>
              <FormControl isRequired>
                <FormLabel
                  width="100%"
                  htmlFor="productImages"
                  textAlign="center"
                  cursor="pointer"
                  border="1px solid #E2E8F0"
                  borderRadius="5"
                  p={2}
                  _hover={{ bg: "green.300" }}
                >
                  Select Image
                  <Input
                    display="none"
                    id="productImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={createProductImagesChange}
                  />
                </FormLabel>
              </FormControl>
            </HStack>

            {imagesPreview.length > 0 && (
              <HStack my={10} p={4} overflowX="scroll" width="100%">
                {imagesPreview.map((image, idx) => (
                  <Image
                    width="30%"
                    key={idx}
                    src={image}
                    alt="Product Preview"
                  />
                ))}
              </HStack>
            )}

            <Button
              mb={10}
              bg="tomato"
              color="white"
              fontSize="2xl"
              _hover={{ backgroundColor: "#ff4321" }}
              width="100%"
              type="submit"
              value="Submit"
              disabled={isLoading}
            >
              {isLoading ? "Product is Creating..." : "Create"}
            </Button>
          </Box>
        </VStack>
      </div>
    </Fragment>
  );
};

export default NewProduct;
