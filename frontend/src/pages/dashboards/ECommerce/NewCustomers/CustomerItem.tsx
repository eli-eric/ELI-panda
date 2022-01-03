import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { NewCustomersData } from "types/models/dashboards/Ecommerce";

interface CustomerItemProps {
  listStyle: string;
  item: NewCustomersData;
}

const CustomerItem: React.FC<CustomerItemProps> = ({ item }) => {
  const getStatusColor = () => {
    if (item.orders === 0) {
      return "#F84E4E";
    } else if (item.orders > 0) {
      return "#43C888";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        padding: "8px 20px",
        "&:not(:last-of-type)": {
          borderBottom: "1px solid #ECEDF1",
        },
      }}
      className="item-hover"
    >
      <Avatar
        sx={{
          mr: 4,
          width: 48,
          height: 48,
        }}
        src={item.image}
      />
      <Box
        sx={{
          fontSize: 14,
        }}
      >
        <Box
          sx={{
            mb: 0.5,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {item.name}
        </Box>
        <Box
          sx={{
            fontSize: 14,
            color: "text.secondary",
          }}
        >
          {item.message}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ml: "auto",
        }}
      >
        <Box
          sx={{
            color: getStatusColor(),
            backgroundColor: getStatusColor() + "44",
            padding: "3px 10px",
            borderRadius: "15px",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          {item.orders} orders
        </Box>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          // onClick={null}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomerItem;
