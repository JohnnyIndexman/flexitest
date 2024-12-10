import { Box, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Box px={['10px', '30px', '30px']}>
      <footer
        style={{
          margin: "20px 30px",
          position: "fixed",
          bottom: "0",
          left: "0",
          width: "100%",
          zIndex: "1000",
        }}
      >
        <Text>&copy; 2024. Built with &#10084;</Text>
      </footer>
    </Box>
  );
}

export default Footer;
