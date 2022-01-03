import React from "react";
import { useAuthUser } from "@crema/utility/AuthHooks";
import { Formik } from "formik";
import * as yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Required"),
});
const PersonalInfo = () => {
  const { user } = useAuthUser();

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 550,
      }}
    >
      <Formik
        validateOnBlur={true}
        initialValues={{
          ...user,
          photoURL: user.photoURL
            ? user.photoURL
            : "/assets/images/placeholder.jpg",
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
          return (
            <PersonalInfoForm values={values} setFieldValue={setFieldValue} />
          );
        }}
      </Formik>
    </Box>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
