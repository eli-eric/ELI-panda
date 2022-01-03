import React from "react";
import TableCell from "@mui/material/TableCell";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PageviewIcon from "@mui/icons-material/Pageview";
import TableRow from "@mui/material/TableRow";
import { green, red } from "@mui/material/colors";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import { PopularCoinsData } from "types/models/dashboards/Crypto";

interface TableItemProps {
  row: PopularCoinsData;
}

const TableItem: React.FC<TableItemProps> = ({ row }) => {
  return (
    <TableRow
      sx={{
        borderBottom: "0 none",
        "& .tableCell": {
          borderBottom: "0 none",
          fontSize: 13,
          padding: 2,
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
      <TableCell scope="row" className="tableCell">
        {row.id}.
      </TableCell>
      <TableCell align="left" className="tableCell">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mr: 3.5,
            }}
          >
            {row.image ? (
              <Avatar
                src={row.image}
                sx={{
                  width: { xs: 40, xl: 50 },
                  height: { xs: 40, xl: 50 },
                  padding: 3,
                  backgroundColor: row.color as string,
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: { xs: 40, xl: 50 },
                  height: { xs: 40, xl: 50 },
                  padding: 3,
                  backgroundColor: red[500],
                }}
              >
                <PageviewIcon />
              </Avatar>
            )}
          </Box>
          <Box
            component="span"
            sx={{
              mr: 1,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {row.name}
          </Box>
          <Box
            sx={{
              color: "text.secondary",
              ml: 1,
            }}
          >
            ({row.shortName})
          </Box>
        </Box>
      </TableCell>
      <TableCell align="left" className="tableCell">
        ${row.marketCap}
      </TableCell>
      <TableCell align="left" className="tableCell">
        ${row.volume}
      </TableCell>
      <TableCell
        align="right"
        sx={{
          color: green[600],
        }}
        className="tableCell"
      >
        {row.h} %
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
