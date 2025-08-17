import React from "react";
import {
  Box,
  Text,
  List,
  ListItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  VStack,
  NumberInput,
  NumberInputField,
  useMediaQuery,
} from "@chakra-ui/react";

const categories = [
  "Laptop",
  "FootWear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Smart phone",
];

const ProductFilter = ({
  priceRange,
  setPriceRange,
  sliderValue,
  setSliderValue,
  setRatings,
  isHover,
  setIsHover,
  category,
  setCategory,
}) => {
  const [isMaxWidth991] = useMediaQuery("(max-width: 991px)");

  return (
    <VStack
      spacing={5}
      align="flex-start"
      py={isMaxWidth991 ? 0 : 10}
      px={isMaxWidth991 ? 0 : 5}
      width="100%"
      mx="auto"
      height="auto"
      my={10}
      rounded="lg"
      boxShadow={isMaxWidth991 ? "" : "dark-lg"}
    >
      <Box width="100%">
        <Text fontSize={"lg"} mb={2} fontWeight="bold">
          Select Price Range
        </Text>

        <Box>
          <Text opacity="0.7">Min Price</Text>
          <NumberInput
            onChange={(val) => setPriceRange([val, priceRange[1]])}
            size="lg"
            w="100%"
            defaultValue={priceRange[0]}
          >
            <NumberInputField />
          </NumberInput>
        </Box>

        <Box mt={4}>
          <Text opacity="0.7">Max Price</Text>
          <NumberInput
            onChange={(val) => setPriceRange([priceRange[0], val])}
            size="lg"
            w="100%"
            defaultValue={priceRange[1]}
          >
            <NumberInputField />
          </NumberInput>
        </Box>
      </Box>

      <Box width="100%">
        <Text fontSize={"lg"} fontWeight="bold">
          Categories
        </Text>
        <List>
          {categories.map((category, idx) => (
            <ListItem
              opacity="0.7"
              _hover={{
                cursor: "pointer",
                color: "tomato",
                fontWeight: "bold",
                opacity: "1",
              }}
              key={idx}
              onClick={() => setCategory(category.toLowerCase())}
            >
              {category}
            </ListItem>
          ))}
        </List>
      </Box>

      <Box width="100%">
        <Text fontSize={"lg"} mb={3} fontWeight="bold">
          Select Rating
        </Text>
        <Slider
          defaultValue={sliderValue}
          onChange={(val) => setSliderValue(val)}
          onChangeEnd={(val) => setRatings(val)}
          min={0}
          max={5}
          step={1}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <SliderTrack>
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="facebook.700" />
          </SliderTrack>
          <SliderThumb bg="facebook.900" boxSize={4} />
          {isHover && (
            <SliderMark
              value={sliderValue}
              textAlign="center"
              bg="facebook.900"
              color="white"
              mt="-10"
              ml="-2"
              w="5"
              borderRadius="100%"
            >
              {sliderValue}
            </SliderMark>
          )}
        </Slider>
      </Box>
    </VStack>
  );
};

export default ProductFilter;
