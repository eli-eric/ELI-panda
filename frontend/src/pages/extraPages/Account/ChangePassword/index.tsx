import React from "react";
import { Box, Typography } from "@mui/material";
import IntlMessages from "@crema/utility/IntlMessages";
import { Fonts } from "../../../../shared/constants/AppEnums";
import ChangePasswordForm from "./ChangePasswordForm";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  newPassword: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  retypeNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = () => {
  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 550,
      }}
    >
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 5 },
        }}
      >
        <IntlMessages id="common.changePassword" />
      </Typography>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        initialValues={{
          oldPassword: "",
          newPassword: null,
          retypeNewPassword: "us",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log("data: ", data);
          setSubmitting(false);
        }}
      >
        {() => <ChangePasswordForm />}
      </Formik>
    </Box>
  );
};

export default ChangePassword;
