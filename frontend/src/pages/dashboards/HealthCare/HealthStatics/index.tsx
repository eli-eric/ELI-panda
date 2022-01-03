import React, { useState } from "react";
import AppCard from "@crema/core/AppCard";
import AppSelect from "@crema/core/AppSelect";
import { useIntl } from "react-intl";
import StaticsGraph from "./StaticsGraph";
import { Box } from "@mui/material";
import { HeathStaticsData } from "types/models/dashboards/HealthCare";

interface HealthStaticsProps {
  data: HeathStaticsData;
}

const HealthStatics: React.FC<HealthStaticsProps> = ({ data }) => {
  const [graphData, setGraphData] = useState(data.dataOne);
  const handleYearChange = (value: unknown) => {
    switch (value) {
      case 2017:
        setGraphData(data.dataTwo);
        break;
      case 2018:
        setGraphData(data.dataThree);
        break;
      case 2019:
        setGraphData(data.dataOne);
        break;
      default:
        setGraphData(data.dataOne);
    }
  };

  const handleMonthChange = (value: string) => {
    switch (value) {
      case "June":
        setGraphData(data.dataTwo);
        break;
      case "July":
        setGraphData(data.dataThree);
        break;
      case "August":
        setGraphData(data.dataOne);
        break;
      default:
        setGraphData(data.dataThree);
    }
  };

  const { messages } = useIntl();
  return (
    <AppCard
      title={messages["healthCare.staticsHealthCare"]}
      action={
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AppSelect
            menus={[2019, 2018, 2017]}
            defaultValue={2019}
            onChange={handleYearChange}
          />
          <AppSelect
            menus={[
              messages["common.june"],
              messages["common.july"],
              messages["common.august"],
            ]}
            defaultValue={messages["common.june"]}
            onChange={handleMonthChange}
          />
        </Box>
      }
    >
      <StaticsGraph data={graphData} />
    </AppCard>
  );
};

export default HealthStatics;
