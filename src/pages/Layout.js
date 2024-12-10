import { Box } from "@chakra-ui/react";
import React from "react";
import Header from "../uicomponents/Header";
import SideNav from "../uicomponents/SideNav";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Layout() {
    
  return (
    <Box flex='1' position='relative'>
      <Header />
      <Box
        style={{
          display: "flex",
          alignItems: "start",
        gap: '20px'
        }}
      >
        <SideNav />
        <Outlet width='70%'/>
      </Box>
      <Footer/>
    </Box>
  );
}

export default Layout;
