import { Box, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";
import { MdLightbulbOutline } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { IoArchiveOutline } from "react-icons/io5";

function SideNav() {
  return (
    <Box
      width="30%"
      marginTop="20px"
      style={{ display: "flex", flexDirection: "column" }}
    >
      
        <NavLink to="/" className="box-hover-active" >
        <Box display="flex" alignItems="center" gap="20px" className="box-hover" activeClassName="active">
        <MdLightbulbOutline size="25px" />
          <Text>Notes</Text>
          </Box>
        </NavLink>
      
        <NavLink
          to="categories"
          className="box-hover-active"
          activeClassName="active"
        >
          <Box display="flex" alignItems="center" gap="20px" className="box-hover">
          <TbCategory size="25px" />
          <Text>Categories</Text>
          </Box>
        </NavLink>
      
        <NavLink
          to="create"
          className="box-hover-active"
          activeClassName="active"
        >
          <Box display="flex" alignItems="center" gap="20px" className="box-hover">
          <IoArchiveOutline size="25px" />
          <Text>Create</Text>
          </Box>
        </NavLink>
     
    </Box>
  );
}

export default SideNav;
