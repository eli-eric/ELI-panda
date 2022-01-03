import React from "react";
import { Box, Typography } from "@mui/material";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import IntlMessages from "../../../../../@crema/utility/IntlMessages";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Activity } from "../../../../../@crema/services/db/extraPages/account";

interface ActivityProps {
  application: Activity[];
}

const Application: React.FC<ActivityProps> = ({ application }) => {
  return (
    <Box sx={{ mb: { xs: 5, lg: 6 } }}>
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 4 },
        }}
      >
        <IntlMessages id="eCommerce.application" />
      </Typography>

      {application.map((data, index) => (
        <Box key={index} sx={{ mb: 1.5 }}>
          <FormControlLabel control={<Switch />} label={data.title} />
        </Box>
      ))}
    </Box>
  );
};

export default Application;
