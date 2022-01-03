import React from "react";
import InputLabel from "@mui/material/InputLabel";
import IntlMessages from "@crema/utility/IntlMessages";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";
import { AppState } from "../../../../../redux/store";
import { StaffObj } from "../../../../../types/models/apps/Todo";

interface ChangeStaffProps {
  selectedStaff: StaffObj;
  handleStaffChange: (event: SelectChangeEvent<number>) => void;
}

const ChangeStaff: React.FC<ChangeStaffProps> = ({
  selectedStaff,
  handleStaffChange,
}) => {
  const { staffList }: { staffList: StaffObj[] } = useSelector<
    AppState,
    AppState["todoApp"]
  >(({ todoApp }) => todoApp);

  return (
    <FormControl
      variant="outlined"
      sx={{
        minWidth: 100,
        width: "100%",
      }}
    >
      <InputLabel id="selected-staff-select-outlined-label">
        <IntlMessages id="common.staff" />
      </InputLabel>
      <Select
        labelId="selected-staff-select-outlined-label"
        sx={{
          cursor: "pointer",
          "& .MuiOutlinedInput-input": {
            paddingBottom: 2.5,
            paddingTop: 2.5,
          },
        }}
        value={selectedStaff.id}
        label={<IntlMessages id="common.staff" />}
        onChange={(e) => handleStaffChange(e)}
      >
        {staffList.map((staff) => {
          return (
            <MenuItem
              value={staff.id}
              key={staff.id}
              sx={{
                cursor: "pointer",
              }}
            >
              <Box display="flex" alignItems="center">
                {staff.image ? (
                  <Avatar
                    sx={{
                      marginRight: 3,
                      height: 36,
                      width: 36,
                    }}
                    src={staff.image}
                  />
                ) : (
                  <Avatar
                    sx={{
                      marginRight: 3,
                      height: 36,
                      width: 36,
                    }}
                  >
                    {staff.name.toUpperCase()}
                  </Avatar>
                )}
                <Box component="span">{staff.name}</Box>
              </Box>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ChangeStaff;
