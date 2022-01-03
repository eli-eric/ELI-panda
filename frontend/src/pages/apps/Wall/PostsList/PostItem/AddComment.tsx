import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { onAddNewComment } from "../../../../../redux/actions/WallApp";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDropzone } from "react-dropzone";
import { MessageType } from "../../../../../@crema/services/db/apps/chat/connectionList";
import { generateUniqueID } from "web-vitals/dist/modules/lib/generateUniqueID";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { styled } from "@mui/material/styles";
import { darken } from "@mui/material";
import { CommentObj, WallData } from "../../../../../types/models/apps/Wall";

const AddCommentWrapper = styled("div")(({ theme }) => ({
  borderTop: `solid 1px ${theme.palette.divider}`,
  display: "flex",
  paddingTop: 16,
  "&:not(:last-of-type)": {
    marginBottom: 20,
  },
}));
const AddCommentContent = styled(Box)(({ theme }) => ({
  backgroundColor: darken(theme.palette.background.paper, 0.03),
  borderRadius: 30,
  padding: "7px 20px",
  display: "flex",
  alignItems: "center",
  flex: 1,
}));

const CommentTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused, &:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
  },
  "& .MuiInputBase-input": {
    padding: "6px 5px 7px",
  },
}));

interface AddCommentProps {
  postId: number;
  wallData: WallData | null;
}

const AddComment: React.FC<AddCommentProps> = ({ postId, wallData }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles);
      const newComment = {
        author: {
          name: wallData!.name,
          profilePic: wallData!.profilePic,
          id: wallData!.id,
        },
        comment: "",
        message_type: MessageType.MEDIA,
        media: {
          id: generateUniqueID(),
          url: URL.createObjectURL(acceptedFiles[0]),
          mime_type: acceptedFiles[0].type,
        },
      };
      dispatch(onAddNewComment(postId as number, newComment as CommentObj));
    },
  });

  const submitComment = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("");
    if (event.key === "Enter") {
      sendComment();
    }
  };

  const sendComment = () => {
    const newComment = {
      author: {
        name: wallData!.name,
        profilePic: wallData!.profilePic,
        id: wallData!.id,
      },
      message_type: MessageType.TEXT,
      comment,
    };
    dispatch(onAddNewComment(postId, newComment as CommentObj));
    setComment("");
  };

  return (
    <AddCommentWrapper>
      <Avatar
        sx={{
          width: 44,
          height: 44,
          marginRight: 4,
        }}
        src={wallData!.profilePic}
      />
      <AddCommentContent
        sx={{
          mb: { xs: 3, md: 0 },
        }}
      >
        <CommentTextField
          placeholder="Write a comment"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={submitComment}
        />

        <Box display="flex" alignItems="center">
          {comment === "" ? (
            <>
              <IconButton
                sx={{
                  padding: 2,
                  fontSize: 20,
                  "& .MuiSvgIcon-root": {
                    fontSize: 20,
                  },
                }}
              >
                <EmojiEmotionsOutlinedIcon />
              </IconButton>
              <IconButton
                sx={{
                  padding: 2,
                  fontSize: 20,
                  "& .MuiSvgIcon-root": {
                    fontSize: 20,
                  },
                }}
                {...getRootProps({
                  className: "dropzone",
                })}
              >
                <input {...getInputProps()} />
                <AttachFileIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              sx={{
                padding: 2,
                fontSize: 20,
                "& .MuiSvgIcon-root": {
                  fontSize: 20,
                },
              }}
              onClick={sendComment}
            >
              <SendOutlinedIcon />
            </IconButton>
          )}
        </Box>
      </AddCommentContent>
    </AddCommentWrapper>
  );
};

export default AddComment;
