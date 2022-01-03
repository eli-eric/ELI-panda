import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Auth from "@aws-amplify/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { awsConfig } from "./aws-exports";
import { SHOW_MESSAGE } from "../../../../shared/constants/ActionTypes";
import { AuthUser } from "../../../../types/models/AuthUser";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  showMessage,
} from "../../../../redux/actions";

interface AwsCognitoContextProps {
  user: AuthUser | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface AwsCognitoActionsProps {
  signUpCognitoUser: (data: SignUpProps) => void;
  signIn: (data: SignInProps) => void;
  confirmCognitoUserSignup: (username: string, code: string) => void;
  forgotPassword: (username: string, code: string) => void;
  logout: () => void;
}

const AwsCognitoContext = createContext<AwsCognitoContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const AwsCognitoActionsContext = createContext<AwsCognitoActionsProps>({
  signUpCognitoUser: () => {},
  signIn: () => {},
  confirmCognitoUserSignup: () => {},
  forgotPassword: () => {},
  logout: () => {},
});
export const useAwsCognito = () => useContext(AwsCognitoContext);

export const useAwsCognitoActions = () => useContext(AwsCognitoActionsContext);

interface AwsAuthProviderProps {
  children: ReactNode;
}

const AwsAuthProvider: React.FC<AwsAuthProviderProps> = ({ children }) => {
  const [awsCognitoData, setAwsCognitoData] = useState<AwsCognitoContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const auth = useMemo(() => {
    Auth.configure(awsConfig);
    return Auth;
  }, []);

  useEffect(() => {
    auth
      .currentAuthenticatedUser()
      .then((user) =>
        setAwsCognitoData({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      )
      .catch(() =>
        setAwsCognitoData({
          user: undefined,
          isAuthenticated: false,
          isLoading: false,
        })
      );
  }, [auth]);

  const signIn = async ({ email, password }: SignInProps) => {
    dispatch(fetchStart());
    try {
      const user = await Auth.signIn(email, password);
      console.log("user: ", user);
      dispatch(fetchSuccess());
      setAwsCognitoData({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch ({ message }) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      dispatch(fetchError(message as string));
    }
  };
  const signUpCognitoUser = async ({ email, password, name }: SignUpProps) => {
    dispatch(fetchStart());
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
        },
      });
      dispatch(fetchSuccess());
      history.push("/confirm-signup", { email });

      dispatch(
        showMessage(
          "A code has been sent to your registered email address, Enter the code to complete the signup process!"
        )
      );
    } catch ({ message }) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      dispatch(fetchError(message as string));
    }
  };
  const confirmCognitoUserSignup = async (username: string, code: string) => {
    dispatch(fetchStart());
    try {
      await Auth.confirmSignUp(username, code, {
        forceAliasCreation: false,
      });
      history.replace("/signin");
      dispatch({
        type: SHOW_MESSAGE,
        payload:
          "Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!",
      });
    } catch ({ message }) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      dispatch(fetchError(message as string));
    }
  };
  const forgotPassword = async (username: string, code: string) => {
    dispatch(fetchStart());
    try {
      await Auth.confirmSignUp(username, code, {
        forceAliasCreation: false,
      });
      history.replace("/signin");
      dispatch({
        type: SHOW_MESSAGE,
        payload:
          "Congratulations, Signup process is complete, You can now Sign in by entering correct credentials!",
      });
    } catch ({ message }) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      dispatch(fetchError(message as string));
    }
  };

  const logout = async () => {
    setAwsCognitoData({ ...awsCognitoData, isLoading: true });
    try {
      await auth.signOut();
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      setAwsCognitoData({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    }
  };

  return (
    <AwsCognitoContext.Provider
      value={{
        ...awsCognitoData,
      }}
    >
      <AwsCognitoActionsContext.Provider
        value={{
          logout,
          signIn,
          signUpCognitoUser,
          confirmCognitoUserSignup,
          forgotPassword,
        }}
      >
        {children}
      </AwsCognitoActionsContext.Provider>
    </AwsCognitoContext.Provider>
  );
};

export default AwsAuthProvider;
