import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Checkbox, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../shared/constants/AppEnums";
import AppAnimate from "../../../@crema/core/AppAnimate";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import { ReactComponent as Logo } from "../../../assets/user/signup.svg";
import { useIntl } from "react-intl";

const validationSchema = yup.object({
  name: yup
    .string()
    .required(String(<IntlMessages id="validation.nameRequired" />)),
  email: yup
    .string()
    .email(String(<IntlMessages id="validation.emailFormat" />))
    .required(String(<IntlMessages id="validation.emailRequired" />)),
  password: yup
    .string()
    .required(String(<IntlMessages id="validation.passwordRequired" />)),
  confirmPassword: yup
    .string()
    .required(String(<IntlMessages id="validation.reTypePassword" />)),
});

const Signup = () => {
  const theme = useTheme();
  const { messages } = useIntl();
  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box
        sx={{
          pb: 6,
          py: { xl: 8 },
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 1024,
            width: "100%",
            padding: 8,
            paddingLeft: { xs: 8, md: 2 },
            overflow: "hidden",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Grid
            container
            spacing={5}
            sx={{
              alignItems: { lg: "center" },
            }}
          >
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                textAlign: "center",
                "& svg": {
                  display: "inline-block",
                  paddingRight: { xs: 0, lg: 10 },
                },
              }}
            >
              <Logo fill={theme.palette.primary.main} />
            </Grid>

            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  mb: { xs: 6, xl: 8 },
                  fontWeight: Fonts.BOLD,
                  fontSize: 20,
                }}
              >
                <IntlMessages id="common.signup" />
              </Box>

              <Formik
                validateOnChange={true}
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setErrors, resetForm }) => {
                  if (data.password !== data.confirmPassword) {
                    setErrors({
                      confirmPassword: messages[
                        "validation.passwordMisMatch"
                      ] as string,
                    });
                  } else {
                    resetForm();
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form noValidate autoComplete="off">
                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        label={<IntlMessages id="common.name" />}
                        name="name"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        label={<IntlMessages id="common.email" />}
                        name="email"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        label={<IntlMessages id="common.password" />}
                        name="password"
                        type="password"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                      <AppTextField
                        label={<IntlMessages id="common.retypePassword" />}
                        name="confirmPassword"
                        type="password"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        mb: { xs: 5, xl: 6 },
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ ml: -3 }}>
                        <Checkbox />
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          mr: 2,
                          fontSize: 14,
                        }}
                      >
                        <IntlMessages id="common.iAgreeTo" />
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          cursor: "pointer",
                          color: "primary.main",
                          fontWeight: Fonts.BOLD,
                          fontSize: 14,
                        }}
                      >
                        <IntlMessages id="common.termConditions" />
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      sx={{
                        width: "100%",
                        height: 44,
                      }}
                      type="submit"
                    >
                      <IntlMessages id="common.signup" />
                    </Button>
                  </Form>
                )}
              </Formik>

              <Box
                sx={{
                  textAlign: "center",
                  color: "grey.700",
                  fontSize: 14,
                  fontWeight: Fonts.BOLD,
                  mt: { xs: 3, xl: 4 },
                }}
              >
                <Box component="span" sx={{ mr: 1 }}>
                  <IntlMessages id="common.alreadyHaveAccount" />
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: "primary.main",
                    fontWeight: Fonts.MEDIUM,
                    cursor: "pointer",
                  }}
                >
                  <IntlMessages id="common.signInHere" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default Signup;
