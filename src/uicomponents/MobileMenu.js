import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { MdLightbulbOutline, MdCloseFullscreen } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { IoArchiveOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function MobileMenu({ isOpen, onClose }) {
  const style = {
    position: "fixed",
    top: 0,
    background: "#c692fb",
    left: isOpen ? 0 : "-100%", 
    height: "100vh",
    width: "70%",
    paddingTop: "30px",
    paddingLeft: "0px",
    display: "flex",
    flexDirection: "column",
    zIndex: 1000,
    transition: "left 0.3s ease", 
  };

  return (
    <Box style={style}>
      <Box className="close">
        <MdCloseFullscreen size="25px" onClick={onClose} />
      </Box>
      <NavLink to="/" className="box-hover-active">
        <Box
          display="flex"
          alignItems="center"
          gap="20px"
          className="box-hover"
        >
          <MdLightbulbOutline size="25px" />
          <Text>Notes</Text>
        </Box>
      </NavLink>
      <NavLink to="categories" className="box-hover-active">
        <Box
          display="flex"
          alignItems="center"
          gap="20px"
          className="box-hover"
        >
          <TbCategory size="25px" />
          <Text>Categories</Text>
        </Box>
      </NavLink>
      <NavLink to="create" className="box-hover-active">
        <Box
          display="flex"
          alignItems="center"
          gap="20px"
          className="box-hover"
        >
          <IoArchiveOutline size="25px" />
          <Text>Create</Text>
        </Box>
      </NavLink>
    </Box>
  );
}

export default MobileMenu;
