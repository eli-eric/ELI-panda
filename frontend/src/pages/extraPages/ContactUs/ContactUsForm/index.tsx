import React from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import IntlMessages from "@crema/utility/IntlMessages";
import AppGridContainer from "@crema/core/AppGridContainer";
import { Form } from "formik";
import AppTextField from "@crema/core/AppFormComponents/AppTextField";

const ContactUsForm = () => {
  return (
    <Form autoComplete="off">
      <AppGridContainer spacing={4}>
        <Grid item xs={12} md={12}>
          <AppTextField
            name="fullName"
            fullWidth
            label={<IntlMessages id="common.fullName" />}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <AppTextField
            name="email"
            fullWidth
            label={<IntlMessages id="common.email" />}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <AppTextField
            fullWidth
            multiline
            name="message"
            rows="3"
            variant="outlined"
            label={<IntlMessages id="common.messageHere" />}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            sx={{
              position: "relative",
              minWidth: 100,
            }}
            color="primary"
            variant="contained"
            type="submit"
          >
            <IntlMessages id="common.submit" />
          </Button>
        </Grid>
      </AppGridContainer>
    </Form>
  );
};

export default ContactUsForm;
