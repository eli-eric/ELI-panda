import React from "react";
import { Box, Button } from "@mui/material";
import AppGridContainer from "../../../../@crema/core/AppGridContainer";
import Grid from "@mui/material/Grid";
import IntlMessages from "../../../../@crema/utility/IntlMessages";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Form } from "formik";
import AppTextField from "../../../../@crema/core/AppFormComponents/AppTextField";

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showRetypeNewPassword, setShowRetypeNewPassword] =
    React.useState(false);

  const onShowOldPassword = () => {
    setShowPassword(!showPassword);
  };

  const onDownOldPassword = (event: any) => {
    event.preventDefault();
  };

  const onShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const onDownNewPassword = (event: any) => {
    event.preventDefault();
  };

  const onShowRetypeNewPassword = () => {
    setShowRetypeNewPassword(!showRetypeNewPassword);
  };

  const onDownRetypeNewPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <Form autoComplete="off">
      <AppGridContainer spacing={4}>
        <Grid item xs={12} md={6}>
          <AppTextField
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onShowOldPassword}
                    onMouseDown={onDownOldPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={<IntlMessages id="common.oldPassword" />}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ p: "0 !important" }} />
        <Grid item xs={12} md={6}>
          <AppTextField
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onShowNewPassword}
                    onMouseDown={onDownNewPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={<IntlMessages id="common.newPassword" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            type={showRetypeNewPassword ? "text" : "password"}
            name="retypeNewPassword"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onShowRetypeNewPassword}
                    onMouseDown={onDownRetypeNewPassword}
                    edge="end"
                  >
                    {showRetypeNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label={<IntlMessages id="common.retypeNewPassword" />}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                position: "relative",
                minWidth: 100,
              }}
              color="primary"
              variant="contained"
              type="submit"
            >
              <IntlMessages id="common.saveChanges" />
            </Button>
            <Button
              sx={{
                position: "relative",
                minWidth: 100,
                ml: 2.5,
              }}
              color="primary"
              variant="outlined"
            >
              <IntlMessages id="common.cancel" />
            </Button>
          </Box>
        </Grid>
      </AppGridContainer>
    </Form>
  );
};

export default ChangePasswordForm;
