import React from "react";
import Box from "@mui/material/Box";
import { EarningInMonthData } from "types/models/dashboards/Metrics";

interface CategoriesProps {
  data: EarningInMonthData[];
}

const Categories: React.FC<CategoriesProps> = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        pl: { xl: 5 },
      }}
    >
      {data.map((item) => {
        return (
          <Box
            sx={{
              px: 3,
              position: "relative",
              display: "flex",
              flex: 1,
              alignItems: "center",
            }}
            key={item.id}
          >
            <Box
              component="span"
              sx={{
                height: { xs: 12, xl: 16 },
                width: { xs: 12, xl: 16 },
                p: 1,
                display: "block",
                borderRadius: "50%",
                backgroundColor: item.colorName as string,
              }}
            />
            <Box
              component="p"
              sx={{
                textTransform: "uppercase",
                color: "text.secondary",
                ml: 3,
                fontSize: 14,
              }}
            >
              {item.name}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Categories;
