import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors as userClearErrors } from "../../actions/userAction";
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
import { UPDATE_PRODUCT_RESET } from "../../constants/productconstant";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";

const UpdateProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const {
    error: userError,
    isAuthenticated,
    isLoading: userLoading,
    user,
  } = useSelector((state) => state.user);

  const { error: ProductDetailError, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    isLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
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

  const productId = params.id;

  useEffect(() => {
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (userError) {
      alert.error(userError);
      dispatch(userClearErrors());
    }

    if (ProductDetailError) {
      alert.error(ProductDetailError);
      dispatch(userClearErrors());
    }

    if (userLoading === false && isAuthenticated === false) {
      navigate("/login");
    }

    if (userLoading === false && isAuthenticated && user.role !== "admin") {
      alert.error("Only admin can access this route.");
      navigate("/");
    }

    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(getProductDetails(productId));
    }
  }, [
    ProductDetailError,
    alert,
    dispatch,
    isAuthenticated,
    isUpdated,
    navigate,
    product,
    productId,
    updateError,
    user,
    userError,
    userLoading,
  ]);

  const updateProductSubmitHandler = (e) => {
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

    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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

  if (userLoading || !user || !product) {
    return <Loader />;
  }

  return (
    <Fragment>
      <MetaData title="Update Product --Admin" />
      <div className="dashboard">
        {!isMaxWidth750 && <SideBar />}

        {isMaxWidth750 && (
          <Box mb={5} my={3} width={isMaxWidth750 ? "90%" : "60%"} mx="auto">
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
              UPDATE PRODUCT
            </Heading>
          </HStack>

          <Box w="100%" px={6} as="form" onSubmit={updateProductSubmitHandler}>
            <FormControl my={10}>
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

            <FormControl my={10}>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AttachMoneyIcon />}
                />
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl my={10}>
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

            <FormControl my={10}>
              <FormLabel>Category</FormLabel>
              <HStack>
                <AccountTreeIcon />
                <Select
                  value={category.charAt(0).toUpperCase() + category.slice(1)}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </Select>
              </HStack>
            </FormControl>

            <FormControl my={10}>
              <FormLabel>Stock</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<StorageIcon />}
                />
                <Input
                  type="number"
                  placeholder="Enter Stock value"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <HStack my={10}>
              <FormControl>
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
                    onChange={updateProductImagesChange}
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

            {oldImages.length > 0 && (
              <HStack my={10} p={4} overflowX="scroll" width="100%">
                {oldImages.map((image, idx) => (
                  <Image
                    width="30%"
                    key={idx}
                    src={image.url}
                    alt="Old Product Preview"
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
              {isLoading ? "Product is Updating..." : "Create"}
            </Button>
          </Box>
        </VStack>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
