import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../shared/constants/AppEnums";
import AppAnimate from "../../../@crema/core/AppAnimate";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
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
            maxWidth: 576,
            width: "100%",
            textAlign: "center",
            padding: { xs: 8, lg: 12, xl: "48px 64px" },
            overflow: "hidden",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box
            sx={{
              mb: { xs: 3, xl: 4 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                mr: 2,
                ".logo": {
                  height: 24,
                },
              }}
            >
              <img
                className="logo"
                src={"/assets/images/logo-icon-large.png"}
                alt="crema"
                title="crema"
              />
            </Box>
            <Box
              sx={{
                mb: 1.5,
                fontWeight: Fonts.BOLD,
                fontSize: 20,
              }}
            >
              <IntlMessages id="common.resetPassword" />
            </Box>
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
              <Form noValidate autoComplete="off">
                <Box
                  sx={{
                    mb: { xs: 6, xl: 8 },
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
                    mb: { xs: 6, xl: 8 },
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
                    mb: { xs: 6, xl: 8 },
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
                  <IntlMessages id="common.resetMyPassword" />
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default ResetPassword;
