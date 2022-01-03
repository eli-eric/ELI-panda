import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Checkbox } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Fonts } from "../../../shared/constants/AppEnums";
import { grey } from "@mui/material/colors/index";
import AppAnimate from "../../../@crema/core/AppAnimate";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
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
              <IntlMessages id="common.signup" />
            </Box>
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
                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <AppTextField
                    label={<IntlMessages id="common.name" />}
                    name="name"
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
                  <AppTextField
                    label={<IntlMessages id="common.email" />}
                    name="email"
                    variant="outlined"
                    sx={{
                      width: "100%",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
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

                <Box
                  sx={{
                    mb: { xs: 3, xl: 4 },
                  }}
                >
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
                      mr: 2,
                      fontSize: 14,
                    }}
                  >
                    <IntlMessages id="common.iAgreeTo" />
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      color: "primary.main",
                      fontWeight: Fonts.BOLD,
                      fontSize: 14,
                      cursor: "pointer",
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
              mt: { xs: 3, xl: 4 },
              textAlign: "center",
              color: grey[700],
              fontSize: 14,
              fontWeight: Fonts.BOLD,
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
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default Signup;
