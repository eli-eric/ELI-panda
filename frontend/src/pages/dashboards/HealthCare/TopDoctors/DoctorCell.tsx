import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { TopDoctorData } from "types/models/dashboards/HealthCare";

interface DoctorCellProps {
  doctor: TopDoctorData;
}

const DoctorCell: React.FC<DoctorCellProps> = ({ doctor }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px 20px",
      }}
      className="item-hover"
    >
      <Avatar
        sx={{
          mr: 4,
          width: 48,
          height: 48,
        }}
        src={doctor.profile_pic}
      />
      <Box
        sx={{
          fontSize: 14,
        }}
      >
        <Box
          component="h5"
          sx={{
            fontWeight: Fonts.MEDIUM,
            mb: 0.5,
          }}
        >
          {doctor.name}
        </Box>
        <Box
          sx={{
            color: "text.secondary",
          }}
          component="p"
        >
          {doctor.speciality}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ml: "auto",
        }}
      >
        {doctor.scheduled ? (
          <Button color="secondary" variant="outlined">
            Remove
          </Button>
        ) : (
          <Button color="primary" variant="outlined">
            Schedule
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default DoctorCell;
