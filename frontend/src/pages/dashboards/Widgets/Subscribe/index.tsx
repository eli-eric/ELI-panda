import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch } from "react-redux";
import { showMessage } from "../../../../redux/actions";
import IntlMessages from "@crema/utility/IntlMessages";
import { useIntl } from "react-intl";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import AppCard from "@crema/core/AppCard";
import AppTextField from "../../../../@crema/core/AppFormComponents/AppTextField";

const Subscribe: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const { messages } = useIntl();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(messages["validation.emailFormat"] as string)
      .required(messages["validation.emailRequired"] as string),
  });

  return (
    <AppCard
      sxStyle={{
        height: 1,
        backgroundColor: red[600],
        color: "white",
      }}
      titleStyle={{ color: "white" }}
      title={messages["dashboard.subscribe"]}
    >
      <Box
        component="p"
        sx={{
          mb: 6,
          pr: 4,
          fontSize: 14,
        }}
      >
        <IntlMessages id="dashboard.subscribeContent" />
      </Box>
      <Formik
        validateOnChange={true}
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          dispatch(
            showMessage(messages["message.thankYouSubscription"] as string)
          );
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Box
            sx={{
              textAlign: "left",
              mt: 8,
            }}
          >
            <Form>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    width: "75%",
                  }}
                >
                  <AppTextField
                    placeholder={messages["common.email"] as string}
                    name="email"
                    label={messages["common.emailAddress"] as string}
                    inputProps={{
                      "aria-label": "naked",
                    }}
                    sx={{
                      width: "100%",
                      height: "100%",
                      '& input[type="text"]': {
                        backgroundColor: "white",
                        color: "black",
                        fontSize: 14,
                        borderRadius: 2,
                      },
                      "& .MuiFormHelperText-root.Mui-error": {
                        color: "white",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    ml: 5,
                    width: 80,
                    color: "primary.contrastText",
                  }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    sx={{
                      width: "100%",
                      height: "51.1px",
                      padding: "5.3px 22px",
                    }}
                  >
                    <ChevronRightIcon
                      sx={{
                        fontSize: 30,
                      }}
                    />
                  </Button>
                </Box>
              </Box>
            </Form>
          </Box>
        )}
      </Formik>
    </AppCard>
  );
};

export default Subscribe;
