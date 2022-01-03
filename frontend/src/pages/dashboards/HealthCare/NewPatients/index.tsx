import React from "react";
import AppCard from "@crema/core/AppCard";
import { useIntl } from "react-intl";
import PatientGraph from "./PatientGraph";
import { Box } from "@mui/material";
import AppMenu from "@crema/core/AppMenu";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { NewpatientsData } from "types/models/dashboards/HealthCare";

interface NewPatientsProps {
  data: NewpatientsData[];
}

const Newpatients: React.FC<NewPatientsProps> = ({ data }) => {
  const { messages } = useIntl();

  return (
    <AppCard title={messages["healthCare.newPatient"]} action={<AppMenu />}>
      <Box>
        <Box
          sx={{
            mb: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            component="span"
            sx={{
              mr: 2,
              fontSize: 20,
              fontWeight: Fonts.BOLD,
            }}
          >
            214
          </Box>
          <Box
            sx={{
              "& img": {
                height: 12,
              },
            }}
          >
            <img
              src={"/assets/images/dashboard/metrics_icon_active.png"}
              alt="down"
            />
          </Box>
        </Box>
        <Box
          sx={{
            mx: -6,
            mb: -6,
          }}
        >
          <PatientGraph data={data} />
        </Box>
      </Box>
    </AppCard>
  );
};

export default Newpatients;
