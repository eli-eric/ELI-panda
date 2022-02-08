import { useState, useEffect, Fragment } from "react";
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
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

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

const CatalogListPage = () => {
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
      let orderByName = resolveOrderBy("Name", sortModel);
      const newRows = await jwtAxios.get(
        `/catalog-items/?pageSize=${pageSize}&pageNumber=${pageNumber}&orderByName=${orderByName}&searchPattern=${searchPattern}`
      );

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

  const resolveOrderBy = (fieldName: string, sortModel: GridSortModel): string => {
    let result = "0"; //default no sorting

    if (sortModel && sortModel.length > 0) {
      sortModel.forEach((f) => {
        if (f.field === fieldName) result = f.sort === "asc" ? "1" : f.sort === "desc" ? "2" : "0";
      });
    }

    return result;
  };

  const setUrlParams = (name: string, value: string | null) => {
    setTimeout(() => {
      let params = new URLSearchParams(search);
      if (value != null && value != "") params.set(name, value);
      else params.delete(name);
      navigation.push({ pathname: location.pathname, search: params.toString() });
    }, 1);
  };

  const handleSearchChange = (e) => {
    setSearchPattern(e.target.value);
    setUrlParams("filter", e.target.value);
  };

  const addNewCatalogItem = () => {
    navigation.push({
      pathname: "/catalog/catalog-list/edit",
    });
  };

  const editCatalogItem = (id: any) => {
    navigation.push({
      pathname: "/catalog/catalog-list/edit/" + id.toString(),
    });
  };

  const deleteCatalogItem = (id: any) => {};

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Button variant="contained" color="primary" onClick={addNewCatalogItem}>
              New catalog item
            </Button>

            <Divider orientation="vertical" variant="middle" flexItem sx={{ ml: 4, mr: 4 }} />

            <AppSearchBar iconPosition="right" placeholder="Search in catalog items" value={searchPattern} onChange={handleSearchChange} />

            <Box sx={{ flexGrow: 1 }} />
            <Typography
              color="GrayText"
              variant="h1"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, marginRight: "10px" }}
            >
              Catalog items
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ height: "100%", width: "100%", background: "white", padding: "0" }}>
        <DataGridPro
          columns={[
            {
              field: "Image",
              filterable: false,
              headerName: "",
              width: 50,
              disableColumnMenu: true,
              renderCell: ({ id, value }) => {
                if (value)
                  return (
                    <>
                      <Tooltip
                        placement="right"
                        title={
                          <Fragment>
                            <img width={150} height={150} src={value} alt="catalog item" />
                          </Fragment>
                        }
                      >
                        <img width={25} height={25} src={value} alt="catalog item" />
                      </Tooltip>
                    </>
                  );
                else return <></>;
              },
            },
            { field: "Name", filterable: false, headerName: "Name", width: 300, disableColumnMenu: true },
            { field: "Category", filterable: false, sortable: false, headerName: "Category", disableColumnMenu: true },
            { field: "Availability", filterable: false, sortable: false, headerName: "Availability", disableColumnMenu: true },
            {
              field: "EstimatedPrice",
              filterable: false,
              type: "number",
              sortable: false,
              headerName: "Estimated Price",
              disableColumnMenu: true,
            },
            { field: "Manufacturer", filterable: false, sortable: false, headerName: "Manufacturer", disableColumnMenu: true },
            {
              field: "SupportedToDate",
              filterable: false,
              type: "string",
              sortable: false,
              headerName: "Supported To",
              valueGetter: ({ field, row }) => row[field] && moment(row[field]).format("DD.MM.YYYY"),
              width: 140,
              align: "right",
              disableColumnMenu: true,
            },
            { field: "Facility", filterable: false, sortable: false, headerName: "Facility", disableColumnMenu: true, width: 135 },
            {
              field: "TypicalAvailableInDays",
              filterable: false,
              sortable: false,
              type: "number",
              headerName: "Typical Available In (Days)",
              disableColumnMenu: true,
            },
            { field: "Note", filterable: false, sortable: false, headerName: "Note", disableColumnMenu: true },
            {
              field: "actions",
              type: "actions",
              headerName: "Actions",
              width: 150,
              renderCell: ({ id }) => (
                <>
                  <Button onClick={() => editCatalogItem(id)}>Edit</Button>
                  <Button onClick={() => deleteCatalogItem(id)} color="warning">
                    Delete
                  </Button>
                </>
              ),
            },
            //{ field: "id", filterable: false, sortable: false, headerName: "ID", width: 65, disableColumnMenu: true },
          ]}
          rows={rowsData}
          pagination
          density="compact"
          pageSize={pageSize}
          page={pageNumber}
          rowsPerPageOptions={[20, 50, 100]}
          rowCount={totalCount}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage, details) => {
            setPageNumber(newPage);
            setUrlParams("pageNumber", newPage.toString());
          }}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPageNumber(0);
            setUrlParams("pageSize", newPageSize.toString());
          }}
          sortModel={sortModel}
          onSortModelChange={(model) => {
            setSortModel(model);
            //setUrlParams(model);
          }}
          loading={loading}
          components={{
            LoadingOverlay: CustomLoadingOverlay,
          }}
        />
      </div>
    </>
  );
};

export default CatalogListPage;
