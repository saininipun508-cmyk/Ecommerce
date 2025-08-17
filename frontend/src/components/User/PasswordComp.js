import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

const PasswordComp = ({
  id,
  password,
  setPassword,
  showPassword,
  setshowPassword,
  label,
  placeholder,
}) => {
  return (
    <FormControl my={10}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup size="md">
        {!showPassword && (
          <InputLeftElement pointerEvents="none" children={<LockIcon />} />
        )}
        {showPassword && (
          <InputLeftElement pointerEvents="none" children={<UnlockIcon />} />
        )}
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button size="sm" onClick={() => setshowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordComp;
