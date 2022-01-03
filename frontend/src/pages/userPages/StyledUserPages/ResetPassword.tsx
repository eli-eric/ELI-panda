import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../shared/constants/AppEnums";
import AppAnimate from "../../../@crema/core/AppAnimate";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import { ReactComponent as Logo } from "../../../assets/user/reset-password.svg";
import { useTheme } from "@mui/material";
import { useIntl } from "react-intl";

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required(String(<IntlMessages id="validation.enterOldPassword" />)),
  newPassword: yup
    .string()
    .required(String(<IntlMessages id="validation.enterNewPassword" />)),
  confirmPassword: yup
    .string()
    .required(String(<IntlMessages id="validation.reTypePassword" />)),
});

const ResetPassword = () => {
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
            textAlign: "center",
            overflow: "hidden",
            padding: { xs: 8, md: 12 },
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            paddingLeft: {
              lg: 8,
              xl: 20,
            },
            paddingRight: {
              lg: 12,
              xl: 20,
            },
          }}
        >
          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                textAlign: "center",
                alignSelf: { lg: "center" },
              }}
            >
              <Box
                display="inline-block"
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
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  mb: { xs: 6, xl: 8 },
                  fontWeight: Fonts.BOLD,
                  fontSize: 20,
                }}
              >
                <IntlMessages id="common.resetPassword" />
              </Box>
              <Formik
                validateOnChange={true}
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setErrors, resetForm }) => {
                  if (data.newPassword !== data.confirmPassword) {
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
                  <Box
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    <Form noValidate autoComplete="off">
                      <Box
                        sx={{
                          mb: { xs: 3, xl: 4 },
                        }}
                      >
                        <AppTextField
                          name="oldPassword"
                          label={<IntlMessages id="common.oldPassword" />}
                          sx={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="password"
                        />
                      </Box>
                      <Box
                        sx={{
                          mb: { xs: 3, xl: 4 },
                        }}
                      >
                        <AppTextField
                          name="newPassword"
                          label={<IntlMessages id="common.newPassword" />}
                          sx={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="password"
                        />
                      </Box>
                      <Box
                        sx={{
                          mb: { xs: 3, xl: 4 },
                        }}
                      >
                        <AppTextField
                          name="confirmPassword"
                          label={<IntlMessages id="common.retypePassword" />}
                          sx={{
                            width: "100%",
                          }}
                          variant="outlined"
                          type="password"
                        />
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
                        {<IntlMessages id="common.resetMyPassword" />}
                      </Button>
                    </Form>
                  </Box>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default ResetPassword;
