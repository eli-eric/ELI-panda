import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import Activity from "./Activity";
import accountData from "../../../../@crema/services/db/extraPages/account";
import Application from "./Application";

const Notification = () => {
  return (
    <Box sx={{ position: "relative" }}>
      <Activity activity={accountData.notification.activity} />

      <Box
        sx={{
          mx: -5,
          px: 5,
          pt: 5,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Application application={accountData.notification.application} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            position: "relative",
            minWidth: 100,
          }}
          color="primary"
          variant="contained"
          type="submit"
        >
          <IntlMessages id="common.saveChanges" />
        </Button>
        <Button
          sx={{
            position: "relative",
            minWidth: 100,
            ml: 2.5,
          }}
          color="primary"
          variant="outlined"
        >
          <IntlMessages id="common.cancel" />
        </Button>
      </Box>
    </Box>
  );
};

export default Notification;
