import React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { red } from "@mui/material/colors";

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
      <h2>Catalogue items</h2>
      <Box sx={{ my: 2 }}>
        <div style={{ height: 400, width: "100%", background: "white" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            editMode="row"
          />
        </div>
      </Box>
    </>
  );
};

export default Page1;
