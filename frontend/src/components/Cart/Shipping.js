import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Country, State } from "country-state-city";
import {
  FormControl,
  Box,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import HeadingComp from "../HeadingComp/HeadingComp";
import MetaData from "../layout/MetaData";
import { PhoneIcon } from "@chakra-ui/icons";
import { AiFillHome } from "react-icons/ai";
import { FaCity } from "react-icons/fa";
import { MdPinDrop } from "react-icons/md";
import CheckOutSteps from "./CheckOutSteps";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartAction";
import Loader from "../Loader/Loader";
import { clearErrors } from "../../actions/userAction";

const Shipping = () => {
  const [isMaxWidth750] = useMediaQuery("(max-width: 750px)");
  const [isMaxWidth900] = useMediaQuery("(max-width: 900px)");
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const { isLoading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error]);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      return alert.error("Phone number should be 10 digits long.");
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated === false) {
    return navigate("/login");
  }

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckOutSteps activeStep={0} />

      <HeadingComp text="Shipping Details" />

      <Box
        boxShadow="lg"
        rounded="md"
        bg="gray.100"
        my={10}
        mx="auto"
        transition="all 0.3s"
        width={isMaxWidth750 ? "90vw" : isMaxWidth900 ? "70vw" : "40vw"}
        p={6}
        as="form"
        onSubmit={shippingSubmit}
      >
        <FormControl my={10} isRequired>
          <FormLabel htmlFor="address">Address</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<AiFillHome />} />
            <Input
              type="text"
              id="address"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl my={10} isRequired>
          <FormLabel htmlFor="city">City</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<FaCity />} />
            <Input
              type="text"
              id="city"
              placeholder="Enter Your City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl my={10} isRequired>
          <FormLabel htmlFor="pinCode">Pin Code</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<MdPinDrop />} />
            <Input
              type="number"
              id="pinCode"
              placeholder="Enter Your Pin Code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl my={10} isRequired>
          <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<PhoneIcon />} />
            <Input
              type="number"
              id="phoneNumber"
              placeholder="Enter Your Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl my={10} isRequired>
          <FormLabel htmlFor="country"> Country</FormLabel>

          <Select
            id="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setState("");
            }}
          >
            <option value="">Country</option>
            {Country &&
              Country.getAllCountries().map((item, idx) => (
                <option key={idx} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </Select>
        </FormControl>

        {country && (
          <FormControl my={10} isRequired>
            <FormLabel htmlFor="state">State</FormLabel>
            <Select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">State</option>
              {State &&
                State.getStatesOfCountry(country).map((item, idx) => (
                  <option key={idx} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </Select>
          </FormControl>
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
          Submit
        </Button>
      </Box>
    </Fragment>
  );
};

export default Shipping;
