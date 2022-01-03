import React from "react";
import Grid from "@mui/material/Grid";
import CoinStats from "./CoinStats";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { CoinsDataProps } from "types/models/dashboards/Crypto";

interface Props {
  coinsData: CoinsDataProps;
}

const Coins: React.FC<Props> = ({ coinsData }) => {
  return (
    <Box>
      <Box
        component="h2"
        sx={{
          color: "text.primary",
          textTransform: "uppercase",
          fontSize: 16,
          mb: { xs: 4, sm: 4, xl: 6 },
          fontWeight: Fonts.BOLD,
        }}
      >
        <IntlMessages id="dashboard.coins" />
      </Box>
      <Grid container spacing={{ xs: 4, md: 8 }}>
        <Grid item xs={12} sm={6}>
          <CoinStats
            icon={"/assets/images/bitcoin.svg"}
            bgColor="#9E49E6"
            data={coinsData.bitcoin}
            heading={<IntlMessages id="dashboard.bitcoinPrice" />}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CoinStats
            icon={"/assets/images/etherium.svg"}
            bgColor="#0A8FDC"
            data={coinsData.etherium}
            heading={<IntlMessages id="dashboard.etheriumPrice" />}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CoinStats
            icon={"/assets/images/litcoin.svg"}
            bgColor="#FFA940"
            data={coinsData.liteCoin}
            heading={<IntlMessages id="dashboard.litecoinPrice" />}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CoinStats
            icon={"/assets/images/ripple.svg"}
            bgColor="#F44D50"
            data={coinsData.ripple}
            heading={<IntlMessages id="dashboard.ripplePrice" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Coins;
