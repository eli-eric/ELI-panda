import React from "react";
import { Box } from "@mui/material";
import AppSelect from "@crema/core/AppSelect";
import AppCard from "@crema/core/AppCard";
import GradeGraph from "./GradeGraph";
import { useIntl } from "react-intl";
import { Grades } from "types/models/dashboards/Academy";

interface AverageGradesProps {
  grades: Grades[];
}

const AverageGrades: React.FC<AverageGradesProps> = ({ grades }) => {
  const { messages } = useIntl();
  return (
    <AppCard
      sxStyle={{
        height: 1,
        display: "flex",
        flexDirection: "column",
      }}
      title={messages["academy.averageGrade"]}
      action={
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AppSelect
            menus={[2020, 2019, 2018]}
            defaultValue={2020}
            onChange={() => {}}
          />
          <AppSelect
            menus={["All Months", "Jan", "Feb"]}
            defaultValue={"All Months"}
            onChange={() => {}}
          />
        </Box>
      }
    >
      <Box
        sx={{
          mt: "auto",
          ml: -8,
        }}
      >
        <GradeGraph grades={grades} />
      </Box>
    </AppCard>
  );
};

export default AverageGrades;
