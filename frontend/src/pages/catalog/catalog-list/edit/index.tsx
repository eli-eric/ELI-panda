import { useState, useEffect } from "react";
import moment from "moment";
import { useLocation, useHistory, Link } from "react-router-dom";

import IntlMessages from "@crema/utility/IntlMessages";
import { useIntl } from "react-intl";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";
import { Fonts } from "../../../../shared/constants/AppEnums";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Box, Button, Card, Divider, CardHeader, CardContent } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import jwtAxios from "@crema/services/auth/jwt-auth";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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

export interface CatalogItemCategoryGroup {
  id: number;
  name: string;
  properties: CatalogItemProperty[];
}

export interface CatalogItemProperty {
  id_group_property: number;
  name: string;
  type: string;
  column: number;
  row: number;
  lov?: CatalogItemPropertyLov[];
  value?: any;
}

export interface CatalogItemPropertyLov {
  id: number;
  label: string;
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
  const [supportedTo, setSupportedTo] = useState<Date | null>(new Date());

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);

      //const editItem = await jwtAxios.get(`/catalog-items/${pageSize}`);

      if (!active) {
        return;
      }

      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, []);

  const saveCatalogItem = () => {
    navigation.push({
      pathname: "/catalog/catalog-list",
    });
  };

  const cancelEdit = () => {};

  const { messages } = useIntl();

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    category: yup.string().required("Category is required"),
  });

  const categories = [
    {
      id: 1,
      label: "Optics",
    },
    {
      id: 2,
      label: "Optics -> Mirror",
    },
    {
      id: 3,
      label: "Optics -> Lense",
    },
  ];

  const availabilities = [
    {
      id: 1,
      label: "Available",
    },
    {
      id: 2,
      label: "Not Available",
    },
  ];

  const facilities = [
    {
      id: 1,
      label: "ELI - ALPS",
    },
    {
      id: 2,
      label: "ELI - BEAMLINES",
    },
    {
      id: 3,
      label: "ELI - NP",
    },
  ];

  const manufacturers = [
    {
      id: 1,
      label: "OptoSigma",
    },
    {
      id: 2,
      label: "ThorLabs",
    },
    {
      id: 3,
      label: "National Instruments",
    },
  ];

  const itemGroups: CatalogItemCategoryGroup[] = [
    {
      id: 1,
      name: "Optics General",
      properties: [
        {
          id_group_property: 1,
          name: "Wavelength Region",
          type: "List",
          row: 1,
          column: 1,
          lov: [
            {
              id: 1,
              label: "XUV",
            },
            {
              id: 2,
              label: "UV",
            },
            {
              id: 3,
              label: "VIS-NIR",
            },
            {
              id: 4,
              label: "MIR",
            },
            {
              id: 5,
              label: "IR",
            },
          ],
        },
        {
          id_group_property: 2,
          name: "Optics Type",
          type: "List",
          row: 1,
          column: 2,
          lov: [
            {
              id: 1,
              label: "Mirror",
            },
            {
              id: 2,
              label: "Lens",
            },
            {
              id: 3,
              label: "Window",
            },
            {
              id: 4,
              label: "Substrate",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      name: "Substrate",
      properties: [
        {
          id_group_property: 1,
          name: "Substrate 1",
          type: "Text",
          row: 1,
          column: 1,
        },
        {
          id_group_property: 2,
          name: "Substrate 2",
          type: "Date",
          row: 2,
          column: 1,
          value: null,
        },
        {
          id_group_property: 3,
          name: "Substrate 3",
          type: "Number",
          row: 3,
          column: 1,
        },
        {
          id_group_property: 4,
          name: "Substrate 4",
          type: "Text",
          row: 4,
          column: 1,
        },
        {
          id_group_property: 5,
          name: "Substrate 5",
          type: "Text",
          row: 5,
          column: 1,
        },
        {
          id_group_property: 6,
          name: "Substrate 6",
          type: "Text",
          row: 1,
          column: 2,
        },
        {
          id_group_property: 7,
          name: "Substrate 7",
          type: "List",
          row: 2,
          column: 2,
          lov: [
            {
              id: 1,
              label: "Jedna",
            },
          ],
        },
        {
          id_group_property: 8,
          name: "Substrate 8",
          type: "Text",
          row: 3,
          column: 2,
        },
        {
          id_group_property: 9,
          name: "Substrate 9",
          type: "Text",
          row: 4,
          column: 2,
        },
        {
          id_group_property: 10,
          name: "Substrate 10",
          type: "Text",
          row: 5,
          column: 2,
        },
        {
          id_group_property: 11,
          name: "Substrate 11",
          type: "Text",
          row: 1,
          column: 3,
        },
        {
          id_group_property: 12,
          name: "Substrate 12",
          type: "Text",
          row: 2,
          column: 3,
        },
        {
          id_group_property: 13,
          name: "Substrate 14",
          type: "Text",
          row: 3,
          column: 3,
        },
        {
          id_group_property: 15,
          name: "Substrate 15",
          type: "Text",
          row: 4,
          column: 3,
        },
        {
          id_group_property: 16,
          name: "Substrate 16",
          type: "Text",
          row: 5,
          column: 3,
        },
        {
          id_group_property: 17,
          name: "Substrate 17",
          type: "Text",
          row: 1,
          column: 4,
        },
      ],
    },
  ];

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
      <div style={{ height: "100%", width: "100%", padding: "0" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "start" }}>
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5, justifyContent: "start", justifyItems: "start" }}>
            <Formik
              validateOnChange={true}
              initialValues={{
                name: "Broadband R=3800mm concave mirror - 1",
                category: "Optics -> Mirror",
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                // signInUser({
                //   email: data.email,
                //   password: data.password,
                // });
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form style={{ textAlign: "left", padding: 10 }} noValidate autoComplete="off">
                  <Card variant="outlined" sx={{ width: "100%", mb: 2 }}>
                    <CardHeader title="General properties" sx={{ paddingBottom: 0 }} />
                    <CardContent>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={3}>
                          <Box sx={{ mb: { xs: 4, xl: 4 } }}>
                            <AppTextField
                              placeholder="Name"
                              name="name"
                              label="Name"
                              variant="outlined"
                              sx={{
                                width: "100%",
                                "& .MuiInputBase-input": {
                                  fontSize: 14,
                                },
                              }}
                            />
                          </Box>

                          <Box sx={{ mb: { xs: 4, xl: 4 } }}>
                            <Autocomplete
                              disablePortal
                              id="cmb-category"
                              options={categories}
                              sx={{ width: "100%" }}
                              renderInput={(params) => <TextField {...params} label="Category" />}
                            />
                          </Box>
                          <Box sx={{ mb: { xs: 4, xl: 4 } }}>
                            <Autocomplete
                              disablePortal
                              id="cmb-facility"
                              options={facilities}
                              sx={{ width: "100%" }}
                              renderInput={(params) => <TextField {...params} label="Facility" />}
                            />
                          </Box>
                          <Box sx={{ mb: { xs: 0, xl: 0 } }}>
                            <Autocomplete
                              disablePortal
                              id="cmb-manufacturer"
                              options={manufacturers}
                              sx={{ width: "100%" }}
                              renderInput={(params) => <TextField {...params} label="Manufacturer" />}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={3}>
                          <Box sx={{ mb: { xs: 4, xl: 4 } }}>
                            <Autocomplete
                              disablePortal
                              id="cmb-availability"
                              options={availabilities}
                              sx={{ width: "100%" }}
                              renderInput={(params) => <TextField {...params} label="Availability" />}
                            />
                          </Box>

                          <Box sx={{ mb: { xs: 4, xl: 4 } }}>
                            <AppTextField
                              placeholder="Estimated price"
                              name="estimatedPrice"
                              type="number"
                              label="Estimated price"
                              variant="outlined"
                              sx={{
                                width: "100%",
                                "& .MuiInputBase-input": {
                                  fontSize: 14,
                                },
                              }}
                            />
                          </Box>

                          <Box sx={{ mb: { xs: 4, xl: 4 } }}>
                            <AppTextField
                              placeholder="Typical available in (days)"
                              type="number"
                              name="typicalAvailableInDays"
                              label="Typical available in days"
                              variant="outlined"
                              sx={{
                                width: "100%",
                                "& .MuiInputBase-input": {
                                  fontSize: 14,
                                },
                              }}
                            />
                          </Box>
                          <Box sx={{ mb: { xs: 0, xl: 0 } }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                label="Supported to"
                                value={supportedTo}
                                onChange={(newValue) => {
                                  setSupportedTo(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} sx={{ width: "100%" }} />}
                              />
                            </LocalizationProvider>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ mb: { xs: 0, xl: 0 } }}>
                            <AppTextField
                              placeholder="Note"
                              multiline
                              name="note"
                              rows={12}
                              maxRows={12}
                              label="Note"
                              variant="outlined"
                              sx={{
                                width: "100%",
                                "& textarea": {
                                  fontSize: 14,
                                  maxHeight: "227px",
                                },
                              }}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {itemGroups.map((groupItem) => {
                    return (
                      <>
                        <Card variant="outlined" sx={{ width: "100%", mb: 2 }}>
                          <CardHeader title={groupItem.name} sx={{ paddingBottom: 0 }} />
                          <CardContent>
                            <Box display="grid" gap={0}>
                              {groupItem.properties.map((propItem) => {
                                if (propItem.type === "Text") {
                                  return (
                                    <>
                                      <Box
                                        key={propItem.id_group_property}
                                        gridColumn={propItem.column}
                                        gridRow={propItem.row}
                                        sx={{ mb: { xs: 4, xl: 4 }, mr: 3 }}
                                      >
                                        <AppTextField
                                          placeholder={propItem.name}
                                          name={propItem.name}
                                          label={propItem.name}
                                          variant="outlined"
                                          sx={{
                                            width: "100%",
                                            "& .MuiInputBase-input": {
                                              fontSize: 14,
                                            },
                                          }}
                                        />
                                      </Box>
                                    </>
                                  );
                                } else if (propItem.type === "List") {
                                  return (
                                    <>
                                      <Box
                                        key={propItem.id_group_property}
                                        gridColumn={propItem.column}
                                        gridRow={propItem.row}
                                        sx={{ mb: { xs: 4, xl: 4 }, mr: 3 }}
                                      >
                                        <Autocomplete
                                          disablePortal
                                          id={"cmb-" + propItem.name + propItem.id_group_property.toString()}
                                          options={propItem.lov ? propItem.lov : []}
                                          sx={{ width: "100%" }}
                                          renderInput={(params) => <TextField {...params} label={propItem.name} />}
                                        />
                                      </Box>
                                    </>
                                  );
                                } else if (propItem.type === "Date") {
                                  return (
                                    <>
                                      <Box
                                        key={propItem.id_group_property}
                                        gridColumn={propItem.column}
                                        gridRow={propItem.row}
                                        sx={{ mb: { xs: 4, xl: 4 }, mr: 3 }}
                                      >
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                          <DatePicker
                                            label={propItem.name}
                                            value={propItem.value}
                                            onChange={(newValue) => {
                                              console.log(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} sx={{ width: "100%" }} />}
                                          />
                                        </LocalizationProvider>
                                      </Box>
                                    </>
                                  );
                                } else if (propItem.type === "Number") {
                                  return (
                                    <>
                                      <Box
                                        key={propItem.id_group_property}
                                        gridColumn={propItem.column}
                                        gridRow={propItem.row}
                                        sx={{ mb: { xs: 4, xl: 4 }, mr: 3 }}
                                      >
                                        <AppTextField
                                          placeholder={propItem.name}
                                          name={"num-" + propItem.name + propItem.id_group_property.toString()}
                                          type="number"
                                          label={propItem.name}
                                          variant="outlined"
                                          sx={{
                                            width: "100%",
                                            "& .MuiInputBase-input": {
                                              fontSize: 14,
                                            },
                                          }}
                                        />
                                      </Box>
                                    </>
                                  );
                                }
                              })}
                            </Box>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })}

                  {/* <Card variant="outlined" sx={{ width: "100%", mb: 2 }}>
                    <CardHeader title="Substarte" sx={{ paddingBottom: 0 }} />
                    <CardContent>auto generate props...</CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ width: "100%", mb: 2 }}>
                    <CardHeader title="S1 coating" sx={{ paddingBottom: 0 }} />
                    <CardContent>auto generate props...</CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ width: "100%" }}>
                    <CardHeader title="S2 coating" sx={{ paddingBottom: 0 }} />
                    <CardContent>auto generate props...</CardContent>
                  </Card> */}
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default CatalogListEditPage;
