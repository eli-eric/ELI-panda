import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Form, Formik } from "formik";
import * as yup from "yup";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Fonts } from "../../../shared/constants/AppEnums";
import AppAnimate from "../../../@crema/core/AppAnimate";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";

const validationSchema = yup.object({
  email: yup
    .string()
    .email(String(<IntlMessages id="validation.emailFormat" />))
    .required(String(<IntlMessages id="validation.emailRequired" />)),
});

const ForgetPassword = () => {
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
              />
            </Box>
            <Box
              sx={{
                mb: 1,
                fontWeight: Fonts.BOLD,
                fontSize: 20,
              }}
            >
              <IntlMessages id="common.forgetPassword" />
            </Box>
          </Box>

          <Box
            sx={{
              mb: 5,
              fontSize: 14,
            }}
          >
            <Typography>
              <IntlMessages id="common.forgetPasswordTextOne" />
            </Typography>
            <Typography component="p">
              <IntlMessages id="common.forgetPasswordTextTwo" />
            </Typography>
          </Box>

          <Formik
            validateOnChange={true}
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { resetForm }) => {
              resetForm();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box
                  sx={{
                    mb: { xs: 4, xl: 5 },
                  }}
                >
                  <AppTextField
                    name="email"
                    label={<IntlMessages id="common.emailAddress" />}
                    sx={{
                      width: "100%",
                    }}
                    variant="outlined"
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  sx={{
                    width: "100%",
                    fontWeight: Fonts.BOLD,
                    textTransform: "capitalize",
                    height: 44,
                  }}
                  type="submit"
                >
                  <IntlMessages id="common.sendNewPassword" />
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default ForgetPassword;
