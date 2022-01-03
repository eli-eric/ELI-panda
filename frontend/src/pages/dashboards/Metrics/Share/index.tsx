import React from "react";
import Box from "@mui/material/Box";
import AppCard from "@crema/core/AppCard";
import AppGrid from "@crema/core/AppGrid";
import { ShareData } from "types/models/dashboards/Metrics";

interface ShareProps {
  data: ShareData[];
}

const Share: React.FC<ShareProps> = ({ data }) => {
  return (
    <AppCard sxStyle={{ height: 1 }} title="Share">
      <AppGrid
        data={data}
        itemPadding={5}
        responsive={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
        }}
        renderRow={(data, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: data.color,
              width: { xs: 50, xl: 65 },
              color: (theme) => theme.palette.primary.contrastText,
              padding: "6px 5px",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i className={"zmdi zmdi-" + data.icon} />
            <Box
              component="span"
              sx={{
                ml: 1,
              }}
            >
              {data.value}
            </Box>
          </Box>
        )}
      />
    </AppCard>
  );
};

export default Share;
