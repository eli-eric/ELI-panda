import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import jwtAxios, { setAuthToken } from "./index";
import { AuthUser } from "../../../../types/models/AuthUser";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
} from "../../../../redux/actions";

interface JWTAuthContextProps {
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

interface JWTAuthActionsProps {
  signUpUser: (data: SignUpProps) => void;
  signInUser: (data: SignInProps) => void;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signUpUser: () => {},
  signInUser: () => {},
  logout: () => {},
});

export const useJWTAuth = () => useContext(JWTAuthContext);

export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({
  children,
}) => {
  const [firebaseData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setJWTAuthData({
          user: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      jwtAxios
        .get("/authenticate")
        .then(({ data }) =>
          setJWTAuthData({
            user: data,
            isLoading: false,
            isAuthenticated: true,
          })
        )
        .catch(() =>
          setJWTAuthData({
            user: undefined,
            isLoading: false,
            isAuthenticated: false,
          })
        );
    };

    getAuthUser();
  }, []);

  const signInUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(fetchStart());
    try {
      let bodyForm = new FormData();
      bodyForm.append("username", email);
      bodyForm.append("password", password);
      bodyForm.append("grant_type", "");
      bodyForm.append("scope", "");
      bodyForm.append("client_id", "");
      bodyForm.append("client_secret", "");

      const { data } = await jwtAxios.post("authenticate", bodyForm, {
        headers: { ContentType: "application/x-www-form-urlencoded" },
      });
      localStorage.setItem("token", data.access_token);
      setAuthToken(data.access_token);
      const res = await jwtAxios.get("/authenticate");
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch(fetchSuccess());
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch(fetchError("Something went wrong"));
    }
  };

  const signUpUser = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    dispatch(fetchStart());
    try {
      let bodyReq = {
        username: email,
        password: password,
      };
      const { data } = await jwtAxios.post("users", bodyReq);
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);
      const res = await jwtAxios.get("/auth");
      setJWTAuthData({
        user: res.data,
        isAuthenticated: true,
        isLoading: false,
      });
      dispatch(fetchSuccess());
    } catch (error) {
      setJWTAuthData({
        ...firebaseData,
        isAuthenticated: false,
        isLoading: false,
      });
      dispatch(fetchError("Something went wrong"));
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setAuthToken();
    setJWTAuthData({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  return (
    <JWTAuthContext.Provider
      value={{
        ...firebaseData,
      }}
    >
      <JWTAuthActionsContext.Provider
        value={{
          signUpUser,
          signInUser,
          logout,
        }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};
export default JWTAuthAuthProvider;
