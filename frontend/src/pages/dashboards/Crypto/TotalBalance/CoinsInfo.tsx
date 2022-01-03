import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { BalanceCoins } from "types/models/dashboards/Crypto";

interface CoinsInfoProps {
  coins: BalanceCoins[];
}

const CoinsInfo: React.FC<CoinsInfoProps> = ({ coins }) => {
  return (
    <Box
      sx={{
        mx: -2,
        mb: { xl: 1 },
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {coins.map((coin) => {
        return (
          <Box
            sx={{
              mt: { xl: 3 },
              px: 2,
            }}
            key={coin.id}
          >
            <Box
              component="h3"
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 20,
                color: "primary.main",
              }}
            >
              {coin.value}
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: 14,
                color: "text.secondary",
              }}
            >
              {coin.name}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default CoinsInfo;
