import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import store from "./store";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const theme = createTheme();

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <ChakraProvider>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </ChakraProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  </Provider>
);
