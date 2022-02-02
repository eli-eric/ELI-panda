import { useState, useEffect } from "react";
import moment from "moment";
import { useLocation, useHistory } from "react-router-dom";
import { DataGridPro, GridSortModel } from "@mui/x-data-grid-pro";
import { Box, Button, Divider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppSearchBar from "@crema/core/AppSearchBar";
import CustomLoadingOverlay from "@crema/core/GridLoadingOverlay";
import jwtAxios from "@crema/services/auth/jwt-auth";

export interface CatalogItem {
  id: number;
  Name: string;
  Category: string;
  Manufacturer: string;
  Availability: string;
  Facility: string;
  EstimatedPrice: string;
  Note: string;
  TypicalAvailableInDays: number;
  SupportedToDate: string;
}

const CatalogListEditPage = () => {
  const { search } = useLocation();
  const location = useLocation();
  const navigation = useHistory();
  const mom = moment();
  mom.locale(moment.locales()["cs-CZ"]);

  let defaultParams = new URLSearchParams(search);
  let defaultPageNumberP = defaultParams.get("pageNumber");
  let defaultPageSizeP = defaultParams.get("pageSize");
  let defaultFilterP = defaultParams.get("filter");
  let defaultPageNumber: number = defaultPageNumberP ? parseInt(defaultPageNumberP) : 0;
  let defaultPageSize: number = defaultPageSizeP ? parseInt(defaultPageSizeP) : 20;
  let defaultFilter: string = defaultFilterP ? defaultFilterP : "";

  const [totalCount, setTotalCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(defaultPageNumber);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchPattern, setSearchPattern] = useState<string>(defaultFilter);

  const [rowsData, setRowsData] = useState<CatalogItem[]>([]);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [oneTimeRemove, setOneTimeRemove] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      const newRows = await jwtAxios.get(`/catalog-items/${pageSize}`);

      if (!active) {
        return;
      }
      setRowsData(newRows.data.Data);
      setTotalCount(newRows.data.TotalCount);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [pageNumber, pageSize, sortModel, searchPattern]);

  const saveCatalogItem = () => {
    navigation.push({
      pathname: "/catalog/catalog-list/edit",
    });
  };

  const deleteCatalogItem = (id: any) => {};

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Button variant="contained" color="primary" onClick={saveCatalogItem} sx={{ mr: 2 }}>
              Save
            </Button>
            <Button variant="contained" color="inherit" onClick={saveCatalogItem}>
              Cancle
            </Button>

            <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 4, mr: 4 }} />

            <Box sx={{ flexGrow: 1 }} />
            <Typography
              color="GrayText"
              variant="h1"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, marginRight: "10px" }}
            >
              Edit Catalog Item
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ height: "100%", width: "100%", background: "white", padding: "0" }}></div>
    </>
  );
};

export default CatalogListEditPage;
