import React from "react";
import { Box, Typography } from "@mui/material";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiMail, FiPhone } from "react-icons/fi";
import AddressWrapper from "./AddressWrapper";

const Address = () => {
  return (
    <Box sx={{ position: "relative", ml: { lg: 5 } }}>
      <AddressWrapper>
        <Box className="avatar-icon">
          <HiOutlineLocationMarker />
        </Box>
        <Typography>
          795 Folsom Ave, Suite 600 <br /> San Francisco, CA 94107
        </Typography>
      </AddressWrapper>
      <AddressWrapper>
        <Box className="avatar-icon">
          <FiPhone />
        </Box>
        <Typography>(120) 456-789-123</Typography>
      </AddressWrapper>
      <AddressWrapper>
        <Box className="avatar-icon">
          <FiMail />
        </Box>
        <Typography>support@yourmail.com</Typography>
      </AddressWrapper>
    </Box>
  );
};

export default Address;
