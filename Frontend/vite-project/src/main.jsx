import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import { ChakraProvider } from "@chakra-ui/react";
// import theme from "./theme";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ChakraProvider theme={theme}> */}
      <App />
    {/* </ChakraProvider> */}
  </React.StrictMode>
);
 