import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Fonts } from "../../../../../shared/constants/AppEnums";

interface PackageWrapperProps {
  children: ReactNode;

  [x: string]: any;
}

const PackageWrapper: React.FC<PackageWrapperProps> = ({
  children,
  ...rest
}) => {
  return (
    <Box
      sx={{
        pt: 2.5,
        position: "relative",
        "& .tag": {
          position: "absolute",
          left: 30,
          top: 0,
          zIndex: 1,
          padding: "2px 5px",
          minWidth: 70,
          fontSize: 12,
          fontWeight: Fonts.BOLD,
          textTransform: "uppercase",
          color: (theme) => theme.palette.common.white,
          textAlign: "center",
          borderRadius: 4,
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default PackageWrapper;

PackageWrapper.propTypes = {
  children: PropTypes.node,
};
