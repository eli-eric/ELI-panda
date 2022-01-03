import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import Box from "@mui/material/Box";
import AppTextField from "../../../@crema/core/AppFormComponents/AppTextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppInfoView from "../../../@crema/core/AppInfoView";
import { useAuthMethod } from "../../../@crema/utility/AuthHooks";
import { Fonts } from "../../../shared/constants/AppEnums";
import { AiOutlineGoogle, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

const validationSchema = yup.object({
  email: yup
    .string()
    .email(String(<IntlMessages id="validation.emailFormat" />))
    .required(String(<IntlMessages id="validation.emailRequired" />)),
  password: yup
    .string()
    .required(String(<IntlMessages id="validation.passwordRequired" />)),
});

const SigninFirebase = () => {
  const { signInWithEmailAndPassword, signInWithPopup } = useAuthMethod();
  const history = useHistory();

  const onGoToForgetPassword = () => {
    history.push("/forget-password", { tab: "firebase" });
  };

  const { messages } = useIntl();

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}>
        <Formik
          validateOnChange={true}
          initialValues={{
            email: "crema.demo@gmail.com",
            password: "Pass@1!@all",
          }}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            signInWithEmailAndPassword(data);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
              <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                <AppTextField
                  placeholder={messages["common.email"] as string}
                  name="email"
                  label={<IntlMessages id="common.email" />}
                  variant="outlined"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 3, xl: 4 } }}>
                <AppTextField
                  type="password"
                  placeholder={messages["common.password"] as string}
                  label={<IntlMessages id="common.password" />}
                  name="password"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-input": {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: { xs: 3, xl: 4 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox sx={{ ml: -3 }} />
                  <Box
                    component="span"
                    sx={{
                      color: "grey.500",
                    }}
                  >
                    <IntlMessages id="common.rememberMe" />
                  </Box>
                </Box>
                <Box
                  component="span"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: Fonts.MEDIUM,
                    cursor: "pointer",
                    display: "block",
                    textAlign: "right",
                  }}
                  onClick={onGoToForgetPassword}
                >
                  <IntlMessages id="common.forgetPassword" />
                </Box>
              </Box>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: "capitalize",
                    padding: "4px 16px 8px",
                  }}
                >
                  <IntlMessages id="common.login" />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: "grey.500",
          mb: { xs: 5, md: 7 },
        }}
      >
        <span style={{ marginRight: 4 }}>
          <IntlMessages id="common.dontHaveAccount" />
        </span>
        <Box
          component="span"
          sx={{
            fontWeight: Fonts.MEDIUM,
            "& a": {
              color: (theme) => theme.palette.primary.main,
              textDecoration: "none",
            },
          }}
        >
          <Link to="/signup">
            <IntlMessages id="common.signup" />
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: (theme) => theme.palette.background.default,
          mx: { xs: -5, lg: -10 },
          mb: { xs: -6, lg: -11 },
          mt: "auto",
          py: 2,
          px: { xs: 5, lg: 10 },
        }}
      >
        <Box
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <IntlMessages id="common.orLoginWith" />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{
              p: 2,
              "& svg": { fontSize: 18 },
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup("google")}
          >
            <AiOutlineGoogle />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              "& svg": { fontSize: 18 },
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup("facebook")}
          >
            <FaFacebookF />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              "& svg": { fontSize: 18 },
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup("github")}
          >
            <BsGithub />
          </IconButton>
          <IconButton
            sx={{
              p: 1.5,
              "& svg": { fontSize: 18 },
              color: (theme) => theme.palette.text.secondary,
            }}
            onClick={() => signInWithPopup("twitter")}
          >
            <AiOutlineTwitter />
          </IconButton>
        </Box>
      </Box>

      <AppInfoView />
    </Box>
  );
};

export default SigninFirebase;
