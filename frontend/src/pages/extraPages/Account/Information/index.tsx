import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import * as yup from "yup";
import { Fonts } from "shared/constants/AppEnums";
import IntlMessages from "@crema/utility/IntlMessages";
import InfoForm from "./InfoForm";
import { Formik } from "formik";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});
const Information = () => {
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
        <IntlMessages id="common.information" />
      </Typography>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        initialValues={{
          bio: "",
          dob: null,
          country: "us",
          website: "https://hipster.com",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log("data: ", data);
          //TODO Api Call here to save user info
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => {
          return <InfoForm values={values} setFieldValue={setFieldValue} />;
        }}
      </Formik>
    </Box>
  );
};

export default Information;
