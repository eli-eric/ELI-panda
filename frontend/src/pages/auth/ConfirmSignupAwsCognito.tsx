import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchError } from "../../redux/actions";
import { useIntl } from "react-intl";
import { Fonts } from "../../shared/constants/AppEnums";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IntlMessages from "../../@crema/utility/IntlMessages";
import Button from "@mui/material/Button";
import AppInfoView from "../../@crema/core/AppInfoView";
import ReactCodeInput from "react-code-input";
import AuthWrapper from "./AuthWrapper";
import { useAwsCognitoActions } from "@crema/services/auth/aws-cognito/AWSAuthProvider";
import AppLogo from "../../@crema/core/AppLayout/components/AppLogo";

const ConfirmSignupAwsCognito = (props: any) => {
  const { confirmCognitoUserSignup } = useAwsCognitoActions();

  const history = useHistory();

  const [pin, setPin] = useState("");

  const { messages } = useIntl();

  const handleSubmit = () => {
    const { email } = props.location.state || {};
    if (email && pin.length === 6) {
      confirmCognitoUserSignup(email, pin);
    } else if (!email) {
      history.push("/signup");
      fetchError(messages["validation.tryAgain"] as string);
    } else {
      fetchError(messages["validation.pinLength"] as string);
    }
  };

  return (
    <AuthWrapper>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            mb: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <AppLogo />
        </Box>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 1.5,
            color: (theme) => theme.palette.text.primary,
            fontWeight: Fonts.SEMI_BOLD,
            fontSize: { xs: 14, xl: 16 },
          }}
        >
          <IntlMessages id="common.emailVerification" />
        </Typography>
        <Box
          sx={{
            mb: { xs: 5, xl: 10 },
            fontSize: 18,
          }}
        >
          <Typography>
            <IntlMessages id="common.verificationMessage" />
          </Typography>
        </Box>

        <Box
          sx={{
            mb: { xs: 6, xl: 10 },
          }}
        >
          <ReactCodeInput
            name="password"
            type="password"
            inputMode="numeric"
            value={pin}
            fields={6}
            onChange={(value) => setPin(value)}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            fontWeight: Fonts.REGULAR,
            textTransform: "capitalize",
            fontSize: 16,
            minWidth: 160,
          }}
          onClick={handleSubmit}
        >
          <IntlMessages id="common.submit" />
        </Button>
        <AppInfoView />
      </Box>
    </AuthWrapper>
  );
};

export default ConfirmSignupAwsCognito;
