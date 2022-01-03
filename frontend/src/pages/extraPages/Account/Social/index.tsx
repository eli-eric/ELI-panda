import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Fonts } from "../../../../shared/constants/AppEnums";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import { Formik } from "formik";
import SocialForm from "./SocialForm";
import * as yup from "yup";
import { MemberData } from "../../../../@crema/services/db/extraPages/account";

const validationSchema = yup.object({
  twitter: yup.string().label("Please Enter your Twitter url"),
  facebook: yup.string().label("Please Enter your Facebook url"),
  google: yup.string().label("Please Enter your Google url"),
  linkedIn: yup.string().label("Please Enter your LinkedIn url"),
  instagram: yup.string().label("Please Enter your Instagram url"),
  quora: yup.string().label("Please Enter your Quora url"),
});

interface SocialProps {
  social: MemberData[];
}

const Social: React.FC<SocialProps> = ({ social }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 5 },
        }}
      >
        <IntlMessages id="common.socialLinks" />
      </Typography>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        initialValues={{
          twitter: "https://twitter.com/?lang=en",
          facebook: "",
          linkedIn: "",
          google: "",
          instagram: "",
          quora: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log("data: ", data);
          //TODO Api Call here to save user info
          setSubmitting(false);
        }}
      >
        <SocialForm social={social} />
      </Formik>
    </Box>
  );
};

export default Social;
