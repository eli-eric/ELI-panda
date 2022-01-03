import React, { useState } from "react";
import DealsTable from "./DealsTable";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import { useIntl } from "react-intl";
import Box from "@mui/material/Box";
import { Fonts } from "../../../../shared/constants/AppEnums";
import AppCard from "../../../../@crema/core/AppCard";
import AppSelect from "../../../../@crema/core/AppSelect";
import { DealsTableData } from "types/models/dashboards/CRM";

interface DealsProps {
  dealsTableData: DealsTableData[];
}

const Deals: React.FC<DealsProps> = ({ dealsTableData }) => {
  const [tableData, setTableData] = useState(dealsTableData);

  const handleChange = (value: string) => {
    if (value === messages["dashboard.allDeals"]) {
      setTableData(dealsTableData);
    } else if (value === messages["todo.completed"]) {
      setTableData(
        dealsTableData.filter((data) => data.progress === "Approved")
      );
    } else {
      setTableData(
        dealsTableData.filter((data) => data.progress === "Pending")
      );
    }
  };

  const { messages } = useIntl();

  return (
    <AppCard
      title={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mr: { xs: 3, lg: 8 },
              fontWeight: Fonts.BOLD,
              fontSize: 16,
            }}
            component="h3"
          >
            <IntlMessages id="dashboard.deals" />
          </Box>
          <AppSelect
            menus={[
              messages["dashboard.allDeals"],
              messages["todo.completed"],
              messages["common.pending"],
            ]}
            defaultValue={messages["dashboard.allDeals"]}
            onChange={handleChange}
          />
        </Box>
      }
      contentStyle={{ px: 0 }}
      action={messages["common.viewAll"]}
      sxStyle={{ height: 1 }}
    >
      <DealsTable dealsTableData={tableData} />
    </AppCard>
  );
};

export default Deals;
