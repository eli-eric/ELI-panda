import React from "react";
import { Box, Typography } from "@mui/material";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import IntlMessages from "../../../../../@crema/utility/IntlMessages";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Activity } from "../../../../../@crema/services/db/extraPages/account";

interface ActivityProps {
  activity: Activity[];
}

const ActivityView: React.FC<ActivityProps> = ({ activity }) => {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 4 },
        }}
      >
        <IntlMessages id="extraPages.activity" />
      </Typography>

      {activity.map((data, index) => (
        <Box key={index} sx={{ mb: 1.5 }}>
          <FormControlLabel control={<Switch />} label={data.title} />
        </Box>
      ))}
    </Box>
  );
};

export default ActivityView;
