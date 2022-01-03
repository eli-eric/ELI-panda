import { Dispatch } from "redux";
import { AppActions } from "../../types";
import { fetchError, fetchStart, fetchSuccess } from "./Common";
import {
  CREATE_NEW_POST,
  GET_FEED_POSTS,
  GET_WALL_DATA,
  UPDATE_POST,
} from "../../types/actions/Wall.actions";
import { CommentObj, PostObj } from "../../types/models/apps/Wall";
import jwtAxios from "../../@crema/services/auth/jwt-auth";
import { appIntl } from "../../@crema/utility/helper/Utils";

export const onGetWallData = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/wall")
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_WALL_DATA, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onGetPostsList = () => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .get("/wall/posts")
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_FEED_POSTS, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onCreateNewPost = (post: PostObj) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post("/wall/posts", { post })
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: CREATE_NEW_POST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onUpdatePostStatus = (postId: number, status: boolean) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .put("/wall/posts", { postId, status })
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({
            type: UPDATE_POST,
            payload: data.data,
          });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
};

export const onAddNewComment = (postId: number, comment: CommentObj) => {
  const { messages } = appIntl();
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    jwtAxios
      .post("/wall/posts/comments", { postId, comment })
      .then((data) => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: UPDATE_POST, payload: data.data });
        } else {
          dispatch(fetchError(String(messages["message.somethingWentWrong"])));
        }
      })
      .catch((error) => {
        dispatch(fetchError(error.message));
      });
  };
};
