import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Fonts } from "../../../../shared/constants/AppEnums";
import { StudentRankingData } from "types/models/dashboards/Academy";

interface TableItemProps {
  data: StudentRankingData;
}

const TableItem: React.FC<TableItemProps> = ({ data }) => {
  return (
    <TableRow
      key={data.name}
      className="item-hover"
      sx={{
        "& .tableCell": {
          fontSize: 13,
          padding: "12px 8px",
          "&:first-of-type": {
            paddingLeft: 5,
          },
          "&:last-of-type": {
            paddingRight: 5,
          },
        },
      }}
    >
      <TableCell className="tableCell">
        <Box display="flex" alignItems="center">
          <Box sx={{ mr: 3.5 }}>
            <Avatar src={data.profile_pic} />
          </Box>
          <Box fontWeight={Fonts.MEDIUM}>{data.name}</Box>
        </Box>
      </TableCell>
      <TableCell className="tableCell">
        <Box>{data.courseId}</Box>
      </TableCell>
      <TableCell className="tableCell">
        <Box>{data.courseName}</Box>
      </TableCell>
      <TableCell className="tableCell">
        <Box>{data.totalGrade} point</Box>
      </TableCell>
      <TableCell className="tableCell">
        <Box> Ranking {data.ranking}</Box>
      </TableCell>
      <TableCell className="tableCell">
        <Box
          sx={{
            borderRadius: "30px",
            color: "#D69D5A",
            backgroundColor: "#FEF1E4",
            textAlign: "center",
            padding: "4px 12px",
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {data.category}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
