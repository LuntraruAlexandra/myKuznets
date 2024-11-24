// components/CascadingBackground.jsx
import React from "react";
import { useColorMode } from "@chakra-ui/react";
import "./CascadingBg.css"; // Importă fișierul CSS

const CascadingBackground = () => {
  const { colorMode } = useColorMode();

  return (
    <div className={`cascading-background ${colorMode}`}></div>
  );
};

export default CascadingBackground;
