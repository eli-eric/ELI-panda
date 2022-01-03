import React from "react";
import Card from "@mui/material/Card";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import Button from "@mui/material/Button";
import { Checkbox, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import { useIntl } from "react-intl";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import { Fonts } from "../../../shared/constants/AppEnums";
import AppAnimate from "../../../@crema/core/AppAnimate";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import { ReactComponent as Logo } from "../../../assets/user/login.svg";

const validationSchema = yup.object({
  email: yup
    .string()
    .email(String(<IntlMessages id="validation.emailFormat" />))
    .required(String(<IntlMessages id="validation.emailRequired" />)),
  password: yup
    .string()
    .required(String(<IntlMessages id="validation.passwordRequired" />)),
});

const Signin = () => {
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
          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                "& svg": {
                  width: "100%",
                  height: "100%",
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
              md={6}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  mb: { xs: 3, xl: 4 },
                  fontWeight: Fonts.BOLD,
                  fontSize: 20,
                }}
              >
                <IntlMessages id="common.login" />
              </Box>

              <Formik
                validateOnChange={true}
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { resetForm }) => {
                  resetForm();
                }}
              >
                {({ isSubmitting }) => (
                  <Form noValidate autoComplete="off">
                    <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                      <AppTextField
                        placeholder={messages["common.email"] as string}
                        label={messages["common.email"] as string}
                        name="email"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                      <AppTextField
                        type="password"
                        placeholder={messages["common.password"] as string}
                        label={messages["common.password"] as string}
                        name="password"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        mb: { xs: 3, xl: 4 },
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { sm: "center" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            ml: -3,
                          }}
                        >
                          <Checkbox />
                        </Box>
                        <Box
                          component="span"
                          sx={{
                            fontSize: 14,
                          }}
                        >
                          <IntlMessages id="common.rememberMe" />
                        </Box>
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          cursor: "pointer",
                          ml: { xs: 0, sm: "auto" },
                          mt: { xs: 2, sm: 0 },
                          color: "primary.main",
                          fontWeight: Fonts.BOLD,
                          fontSize: 14,
                        }}
                      >
                        <IntlMessages id="common.forgetPassword" />
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                      sx={{
                        width: "100%",
                        height: 44,
                      }}
                    >
                      <IntlMessages id="common.login" />
                    </Button>
                  </Form>
                )}
              </Formik>

              <Box
                sx={{
                  mt: { xs: 3, xl: 4 },
                  mb: 3,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: { sm: "center" },
                  alignItems: { sm: "center" },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    color: grey[600],
                    fontSize: 14,
                    mr: 4,
                  }}
                >
                  <IntlMessages id="common.orLoginWith" />
                </Box>
                <Box display="inline-block">
                  <IconButton>
                    <FacebookIcon sx={{ color: "text.primary" }} />
                  </IconButton>
                  <IconButton>
                    <GitHubIcon sx={{ color: "text.primary" }} />
                  </IconButton>
                  <IconButton>
                    <TwitterIcon sx={{ color: "text.primary" }} />
                  </IconButton>
                </Box>
              </Box>

              <Box
                sx={{
                  color: "grey.700",
                  fontSize: 14,
                  fontWeight: Fonts.BOLD,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    mr: 2,
                  }}
                >
                  <IntlMessages id="common.dontHaveAccount" />
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: "primary.main",
                    cursor: "pointer",
                  }}
                >
                  <IntlMessages id="common.signup" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default Signin;
