import React from "react";
import { Box, Button, Divider, Link } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { red } from "@mui/material/colors";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppSearchBar from "@crema/core/AppSearchBar";
import CustomLoadingOverlay from "@crema/core/GridLoadingOverlay";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Category",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Param 1",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Tags",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: "Mirrors 1", firstName: "Mirror 1 - 1", age: 35 },
  { id: 2, lastName: "Mirrors 2", firstName: "Mirror 2 - 1", age: 42 },
  { id: 3, lastName: "Pumps 1", firstName: "Pump 1 - 1", age: 45 },
  { id: 4, lastName: "Pumps 2", firstName: "Pump 2 - 1", age: 16 },
];

const Page1 = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Button variant="contained" color="primary">
              New catalog category
            </Button>

            <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 4, mr: 4 }} />

            <AppSearchBar iconPosition="right" placeholder="Search in catalog categories" />

            <Box sx={{ flexGrow: 1 }} />
            <Typography color="GrayText" variant="h1" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              Catalog categories
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Page1;
