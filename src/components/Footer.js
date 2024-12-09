import { Box, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Box>
      <footer style={{ postion: "absolute", bottom: "0", left: "0", width: '100%', zIndex: '1000' }}>
        <Text>Open Source</Text>
      </footer>
    </Box>
  );
}

export default Footer;
