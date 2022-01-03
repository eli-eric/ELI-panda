import * as React from "react";
import {
  DataGrid,
  gridClasses,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ExportSelectorGridPrint() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 4,
    maxColumns: 6,
  });

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        {...data}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
