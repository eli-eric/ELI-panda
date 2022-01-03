import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IntlMessages from "@crema/utility/IntlMessages";
import { Fonts } from "shared/constants/AppEnums";

import { StaffObj } from "types/models/apps/Todo";

interface AssignedStaffProps {
  assignedStaff: StaffObj;
}

const AssignedStaff: React.FC<AssignedStaffProps> = ({ assignedStaff }) => {
  return (
    <>
      {assignedStaff ? (
        <Box mr={4} display="flex" alignItems="center">
          {assignedStaff.image ? (
            <Avatar
              sx={{
                height: 36,
                width: 36,
              }}
              src={assignedStaff.image}
            />
          ) : (
            <Avatar
              sx={{
                height: 36,
                width: 36,
              }}
            >
              {assignedStaff.name[0]}
            </Avatar>
          )}
          <Box ml={3.5} fontSize={14}>
            <Box
              component="p"
              sx={{
                mb: 0.5,
                fontWeight: Fonts.MEDIUM,
              }}
            >
              <IntlMessages id="todo.assignedTo" />
            </Box>
            <Box component="p" color="text.secondary">
              {assignedStaff.name}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box mr={4} display="flex" alignItems="center">
          <Avatar
            sx={{
              height: 36,
              width: 36,
            }}
            src={"/assets/images/placeholder.jpg"}
          />
          <Box ml={4}>
            <Box
              component="p"
              sx={{
                mb: 0,
                fontWeight: Fonts.MEDIUM,
                color: "primary.main",
              }}
            >
              <IntlMessages id="todo.currentlyUnassigned" />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AssignedStaff;
