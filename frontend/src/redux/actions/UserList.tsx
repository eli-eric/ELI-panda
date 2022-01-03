import { Dispatch } from "redux";
import { AppActions } from "../../types";
import { fetchError, fetchStart, fetchSuccess } from "./Common";
import { GET_USER_LIST } from "../../types/actions/UserList.actions";
import jwtAxios from "../../@crema/services/auth/jwt-auth";
import { appIntl } from "../../@crema/utility/helper/Utils";

export const onGetUserList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/api/user/list")
      .then((data) => {
        console.log("data:", data);
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USER_LIST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
};
