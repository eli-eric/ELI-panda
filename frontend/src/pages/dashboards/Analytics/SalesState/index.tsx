import React from "react";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppGridContainer from "@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import AppCard from "@crema/core/AppCard";

import AppSelect from "@crema/core/AppSelect";
import { useIntl } from "react-intl";
import AppList from "@crema/core/AppList";
import Avatar from "@mui/material/Avatar";
import MixBarChart from "./MixBarChart";
import { ChartData, SalesStateData } from "types/models/dashboards/Analytics";

interface SalesStateProps {
  salesState: SalesStateData[];
  chartData: ChartData[];
}

const SalesState: React.FC<SalesStateProps> = ({ salesState, chartData }) => {
  const handleSelectionType = (data: any) => {
    console.log("data: ", data);
  };
  const getData = (data: SalesStateData[]) => {
    return data;
  };
  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["dashboard.analytics.salesState"]}
      sxStyle={{ height: 1 }}
      action={
        <AppSelect
          menus={[
            messages["dashboard.thisWeek"],
            messages["dashboard.lastWeeks"],
            messages["dashboard.lastMonth"],
          ]}
          defaultValue={messages["dashboard.thisWeek"]}
          onChange={handleSelectionType}
        />
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          component="p"
          sx={{
            textAlign: { xs: "center", sm: "left" },
            color: "text.secondary",
            mt: -3,
            mb: 2,
          }}
        >
          1343 {messages["dashboard.analytics.salesThisWeek"]}
        </Box>

        <Box
          sx={{
            mt: "auto",
          }}
        >
          <AppGridContainer>
            <Grid item xs={12} sm={7}>
              <Box
                sx={{
                  width: 1,
                  height: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: { xs: "center", sm: "flex-start" },
                }}
              >
                <MixBarChart data={chartData} />
              </Box>
            </Grid>

            <Grid item xs={12} sm={5}>
              <Box
                sx={{
                  width: 1,
                  ml: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <AppList
                  animation="transition.slideRightBigIn"
                  delay={200}
                  duration={400}
                  containerStyle={{ width: "100%", overflow: "hidden" }}
                  data={getData(salesState)}
                  renderRow={(item) => (
                    <Box
                      key={"salesState-" + item.id}
                      sx={{
                        pl: { xl: 6 },
                        py: { xs: 2, md: 4 },
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        overflow: "hidden",
                      }}
                    >
                      <Avatar
                        src={item.icon}
                        alt="icon"
                        sx={{ height: 50, width: 50 }}
                      />

                      <Box
                        position="relative"
                        sx={{
                          ml: 4,
                          overflow: "hidden",
                          width: "calc(100% - 66px)",
                        }}
                      >
                        <Box
                          component="h3"
                          sx={{
                            display: "inline-block",
                            fontWeight: Fonts.MEDIUM,
                            mb: 0.5,
                            fontSize: 16,
                          }}
                        >
                          ${item.amount}
                        </Box>
                        <Box
                          component="p"
                          sx={{
                            color: "text.secondary",
                            fontSize: 14,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                        >
                          {item.type}
                        </Box>
                      </Box>
                    </Box>
                  )}
                />
              </Box>
            </Grid>
          </AppGridContainer>
        </Box>
      </Box>
    </AppCard>
  );
};
export default SalesState;
