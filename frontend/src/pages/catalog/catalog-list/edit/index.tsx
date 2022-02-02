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

      const editItem = await jwtAxios.get(`/catalog-items/${pageSize}`);

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
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                        <Grid item xs={4}>
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
                  <Card variant="outlined" sx={{ width: "100%", mb: 2 }}>
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
                  </Card>
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
