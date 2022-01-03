import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface AddressWrapperProps {
  children: ReactNode;
}

const AddressWrapper: React.FC<AddressWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        mb: 5,
        py: 3.75,
        px: 5,
        "& .avatar-icon": {
          width: { xs: 40, md: 48 },
          height: { xs: 40, md: 48 },
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.primary.main,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mr: { xs: 3.5, md: 4 },
          "& svg": {
            fontSize: 20,
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default AddressWrapper;
