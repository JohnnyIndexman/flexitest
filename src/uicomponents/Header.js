import { Box, Text, Input } from "@chakra-ui/react";
import React from "react";
import { InputGroup } from "../components/ui/input-group";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
// import { createListCollection } from "@chakra-ui/react"
import { useReports } from "../api/ReportsContext";

function Header() {
  const { setSearchTerm } = useReports();


  return (
    <Box
      boxSizing="border-box"
      width="100%"
      display="flex"
      gap="20"
      alignItems="center"
      padding="0 30px"
      borderBottom="1px solid #d4d4d8"
      position='sticky'
      zIndex='1'
    >
      <Link to='/'>
        <Text textStyle="2xl" color="#71717a">
          IndexNotes
        </Text>
      </Link>

      <Box width="60%">
        <Box padding="10px">
          <Box
            style={{
              boxSizing: "border-box",
              display: "flex",
              border: "1px solid #e4e4e7",
              alignItems: "center",
              padding: "5px 12px",
              borderRadius: "10px",
            }}
            _focusWithin={{
              boxShadow: "0 0px 5px 2px #d4d4d8",
              borderColor: "transparent",
            }}
          >
            <InputGroup
              flex="1"
              startElement={<IoMdSearch size="25px" color="#71717a" />}
              width="100%"
              _focusWithin={{
                borderColor: "transparent",
                outline: "none",
              }}
            >
              <Input
                placeholder="Search"
                fontSize="18px"
                _focus={{
                  outline: "none",
                }}
                padding="10px"
                variant="filled"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
