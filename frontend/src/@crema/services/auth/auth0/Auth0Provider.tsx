import React, { ReactNode } from "react";
import { Auth0Provider as Auth0 } from "@auth0/auth0-react";

interface Auth0ProviderProps {
  children: ReactNode;
}

const Auth0Provider: React.FC<Auth0ProviderProps> = ({ children }) => {
  return (
    <Auth0
      domain="yogi0823.us.auth0.com"
      clientId="tS3esCQdie5yKbr6FTl7416nLdCzlSgr"
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0>
  );
};

export default Auth0Provider;
