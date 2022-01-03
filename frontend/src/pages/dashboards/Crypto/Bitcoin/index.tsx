import React, { useCallback, useEffect, useState } from "react";
import BitcoinGraph from "./BitcoinGraph";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import { useIntl } from "react-intl";
import { Box } from "@mui/material";
import { green, indigo } from "@mui/material/colors";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "../../../../@crema/core/AppCard";
import AppSelect from "../../../../@crema/core/AppSelect";
import { CoinGraphData } from "types/models/dashboards/Crypto";

interface BitcoinProps {
  coinGraphData: CoinGraphData;
}

const Bitcoin: React.FC<BitcoinProps> = ({ coinGraphData }) => {
  const onGetCoinData = useCallback(
    (coin) => {
      switch (coin) {
        case "Bitcoin": {
          return coinGraphData.bitcoin;
        }
        case "Litecoin": {
          return coinGraphData.litecoin;
        }
        case "Ripple": {
          return coinGraphData.ripple;
        }
        default:
          return coinGraphData.bitcoin;
      }
    },
    [coinGraphData]
  );

  const [graphType, setGraphType] = useState(0);
  const [coinType, setCoinType] = useState("Bitcoin");
  const [coinData, setCoinData] = useState(onGetCoinData(coinType));

  useEffect(() => {
    setCoinData(onGetCoinData(coinType));
  }, [coinType, onGetCoinData]);

  const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setGraphType(newValue);
  };

  const { messages } = useIntl();
  const handleSelectionType = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCoinType(event.target.value as string);
  };

  return (
    <AppCard>
      <Box
        sx={{
          mt: -2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "center" },
        }}
      >
        <Box
          sx={{
            ml: -3,
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "inline-block",
            }}
          >
            <AppSelect
              menus={[
                messages["dashboard.bitcoin"],
                messages["dashboard.litecoin"],
                messages["dashboard.ripple"],
              ]}
              selectionKey=""
              defaultValue={messages["dashboard.bitcoin"]}
              onChange={handleSelectionType}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                mx: 2,
                fontWeight: Fonts.MEDIUM,
                color: indigo[700],
                fontSize: 18,
              }}
              component="h3"
            >
              $7280.45
            </Box>
            <Box
              sx={{
                mt: 1,
                fontWeight: Fonts.MEDIUM,
                color: green[600],
                fontSize: 14,
              }}
              component="span"
            >
              0.8%
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            ml: { md: "auto" },
          }}
        >
          <Tabs
            sx={{
              position: "relative",
              "& .muiTab": {
                fontSize: 14,
                textTransform: "capitalize",
                padding: 0,
                mx: { xs: 1, sm: 2, xl: 5 },
                minWidth: 10,
              },
            }}
            value={graphType}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab
              className="muiTab"
              label={<IntlMessages id="common.yearly" />}
            />
            <Tab
              className="muiTab"
              label={<IntlMessages id="common.monthly" />}
            />
            <Tab
              className="muiTab"
              label={<IntlMessages id="common.weekly" />}
            />
            <Tab
              className="muiTab"
              label={<IntlMessages id="common.today" />}
            />
          </Tabs>
        </Box>
      </Box>

      <Box
        sx={{
          ml: -3,
        }}
      >
        {graphType === 0 && (
          <BitcoinGraph data={coinData.yearlyData} value={graphType} />
        )}
        {graphType === 1 && (
          <BitcoinGraph data={coinData.monthlyData} value={graphType} />
        )}
        {graphType === 2 && (
          <BitcoinGraph data={coinData.weeklyData} value={graphType} />
        )}
        {graphType === 3 && (
          <BitcoinGraph data={coinData.dailyData} value={graphType} />
        )}
      </Box>
    </AppCard>
  );
};

export default Bitcoin;
