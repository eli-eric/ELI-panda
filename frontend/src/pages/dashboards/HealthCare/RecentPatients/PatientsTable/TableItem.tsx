import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import AppMenu from "@crema/core/AppMenu";
import Avatar from "@mui/material/Avatar";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import { RecentPatientData } from "types/models/dashboards/HealthCare";

interface TableItemProps {
  data: RecentPatientData;
}

const TableItem: React.FC<TableItemProps> = ({ data }) => {
  return (
    <TableRow
      key={data.name}
      sx={{
        "& .tableCell": {
          fontSize: 13,
          padding: 2,
          whiteSpace: "nowrap",
          "&:first-of-type": {
            pl: 5,
          },
          "&:last-of-type": {
            pr: 5,
          },
        },
      }}
      className="item-hover"
    >
      <TableCell component="th" scope="row" className="tableCell">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              mr: 3.5,
            }}
            src={data.profile_pic}
          />
          <Box
            sx={{
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {data.name}
          </Box>
        </Box>
      </TableCell>
      <TableCell align="left" className="tableCell">
        {data.gender}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {data.weight}
      </TableCell>
      <TableCell align="left" className="tableCell">
        {data.assignedDr}
      </TableCell>
      <TableCell align="left">{data.date}</TableCell>
      <TableCell align="left">
        <Box
          sx={{
            color: data.color,
            backgroundColor: data.color + "44",
            padding: "3px 10px",
            borderRadius: 1,
            display: "inline-block",
            fontSize: 13,
          }}
        >
          {data.status}
        </Box>
      </TableCell>
      <TableCell align="right">
        <AppMenu />
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
