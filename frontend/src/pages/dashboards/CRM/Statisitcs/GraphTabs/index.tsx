import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StatGraphs from "./StatGraphs";
import IntlMessages from "../../../../../@crema/utility/IntlMessages";
import { useIntl } from "react-intl";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import AppSelect from "../../../../../@crema/core/AppSelect";
import { StatisticData } from "types/models/dashboards/CRM";

interface StatisticsProps {
  projectData: StatisticData[];
  clientsData: StatisticData[];
  incomeData: StatisticData[];
}

const GraphTabs: React.FC<StatisticsProps> = ({
  clientsData,
  incomeData,
  projectData,
}) => {
  const [value, setValue] = useState(0);

  const [projectGraphData, setProjectGraphData] = useState(projectData);
  const [clientsGraphData, setClientsGraphData] = useState(clientsData);
  const [incomeGraphData, setIncomeGraphData] = useState(incomeData);

  const onSetGraphValue = (data: StatisticData[]) => {
    switch (value) {
      case 0: {
        setProjectGraphData(data);
        break;
      }
      case 1: {
        setClientsGraphData(data);
        break;
      }
      case 2: {
        setIncomeGraphData(data);
        break;
      }
      default:
        return null;
    }
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleYearChange = (value: number) => {
    switch (value) {
      case 2017:
        onSetGraphValue(incomeData);
        break;
      case 2018:
        onSetGraphValue(clientsData);
        break;
      case 2019:
        onSetGraphValue(projectData);
        break;
      default:
        onSetGraphValue(projectData);
    }
  };

  const handleMonthChange = (value: string) => {
    switch (value) {
      case "June":
        onSetGraphValue(incomeData);
        break;
      case "July":
        onSetGraphValue(clientsData);
        break;
      case "August":
        onSetGraphValue(projectData);
        break;
      default:
        onSetGraphValue(projectData);
    }
  };

  const a11yProps = (index: any) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const { messages } = useIntl();

  return (
    <Box
      sx={{
        width: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "center" },
        }}
      >
        <Box
          component="h3"
          sx={{
            fontWeight: Fonts.BOLD,
            fontSize: 16,
          }}
        >
          <IntlMessages id="dashboard.statistics" />
        </Box>

        <Box
          sx={{
            mt: { md: -2 },
            flex: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "center" },
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="simple tabs example"
            sx={{
              flex: "1",
              position: "relative",
              "& .MuiTabs-flexContainer": {
                justifyContent: { md: "center" },
              },
              "& .crMuiTab": {
                minWidth: "10px",
                textTransform: "capitalize",
                padding: 0,
                mx: { xs: 2, xl: 3.5 },
                fontSize: 14,
              },
            }}
          >
            <Tab
              className="crMuiTab"
              label={<IntlMessages id="dashboard.project" />}
              {...a11yProps(0)}
            />
            <Tab
              className="crMuiTab"
              label={<IntlMessages id="dashboard.newClients" />}
              {...a11yProps(1)}
            />
            <Tab
              className="crMuiTab"
              label={<IntlMessages id="dashboard.income" />}
              {...a11yProps(2)}
            />
          </Tabs>
          <Box
            sx={{
              mt: 2,
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
        </Box>
      </Box>
      <Box
        sx={{
          mt: 4,
        }}
      >
        {value === 0 && <StatGraphs data={projectGraphData} />}
        {value === 1 && <StatGraphs data={clientsGraphData} />}
        {value === 2 && <StatGraphs data={incomeGraphData} />}
      </Box>
    </Box>
  );
};

export default GraphTabs;
