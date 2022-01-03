import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { NotificationData } from "types/models/dashboards/HealthCare";

interface NotificationCellProps {
  notification: NotificationData;
}

const NotificationCell: React.FC<NotificationCellProps> = ({
  notification,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        padding: "12px 20px",
      }}
      className="item-hover"
    >
      <Box
        sx={{
          height: 10,
          minWidth: 10,
          borderRadius: "50%",
          backgroundColor: notification.color,
          mr: 4,
          mt: 1.5,
        }}
      />
      <Box
        sx={{
          fontSize: 14,
        }}
      >
        <Box
          component="h5"
          sx={{
            fontWeight: Fonts.MEDIUM,
            mb: 0.5,
          }}
        >
          {notification.title}
        </Box>
        <Box
          component="span"
          sx={{
            color: "text.secondary",
          }}
        >
          {notification.time}
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationCell;
