import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import AppCard from "@crema/core/AppCard";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import AppList from "@crema/core/AppList";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { onCreateNewPost } from "../../../../redux/actions";
import { useIntl } from "react-intl";
import IconButton from "@mui/material/IconButton";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { darken } from "@mui/material";
import { AppState } from "../../../../redux/store";
import { AttachmentObj, PostObj } from "types/models/apps/Wall";

const CreateView = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: darken(theme.palette.background.paper, 0.03),
  borderRadius: 30,
  padding: "7px 20px",
  "@media screen and (min-width: 600px) and (max-width: 800px)": {
    alignItems: "flex-start",
    flexDirection: "column",
    borderRadius: 8,
  },
  "@media (max-width: 485px)": {
    alignItems: "flex-start",
    flexDirection: "column",
    borderRadius: 8,
  },
}));
const CreateTextInput = styled(TextField)(() => ({
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

const StyledIconButton = styled(IconButton)(() => ({
  padding: 6,
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
}));

const StyledImage = styled("img")(() => ({
  width: 60,
  height: 60,
  objectFit: "cover",
  borderRadius: 4,
  display: "block",
}));

const CreatePost = () => {
  const dispatch = useDispatch();
  const { wallData } = useSelector<AppState, AppState["wallApp"]>(
    ({ wallApp }) => wallApp
  )!;
  const [message, setMessage] = useState<string>("");
  const [attachments, setAttachments] = useState<AttachmentObj[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*, .pdf",
    multiple: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file: any) => {
        return {
          id: Math.floor(Math.random() * 10000),
          path: file.path,
          metaData: { type: file.type, size: file.size },
          preview: URL.createObjectURL(file),
        };
      });
      onAddAttachments(files);
    },
  });

  const onAddAttachments = (files: AttachmentObj[]) => {
    setAttachments([...attachments, ...files]);
  };

  const handlePostSubmit = () => {
    const post = {
      message,
      attachments,
      owner: {
        name: wallData!.name,
        profilePic: wallData!.profilePic,
        id: wallData!.id,
      },
    };
    dispatch(onCreateNewPost(post as PostObj));
    setAttachments([]);
    setMessage("");
  };

  const { messages } = useIntl();

  return (
    <AppCard
      sxStyle={{ mb: 8 }}
      headerStyle={{ paddingTop: 5 }}
      title={messages["wall.createPost"]}
    >
      <Box display="flex" mb={1}>
        <Avatar
          sx={{
            marginRight: 3.5,
            width: 44,
            height: 44,
          }}
          src={wallData!.profilePic}
          alt={wallData!.name}
        />
        <CreateView>
          <CreateTextInput
            placeholder="What's in your mind?"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Box display="flex" flexWrap="wrap">
            <Box display="flex" alignItems="center">
              <StyledIconButton {...getRootProps()} size="large">
                <input {...getInputProps()} />
                <PhotoOutlinedIcon />
              </StyledIconButton>
              <StyledIconButton size="large">
                <VideocamOutlinedIcon />
              </StyledIconButton>
              <StyledIconButton size="large">
                <EmojiEmotionsOutlinedIcon />
              </StyledIconButton>
              <StyledIconButton size="large">
                <PersonOutlinedIcon />
              </StyledIconButton>
              <StyledIconButton
                disabled={!message.trim() && attachments.length === 0}
                onClick={handlePostSubmit}
                size="large"
              >
                <SendOutlinedIcon />
              </StyledIconButton>
            </Box>
          </Box>
        </CreateView>
      </Box>
      <AppList
        data={attachments}
        containerStyle={{ display: "flex", flexWrap: "wrap" }}
        renderRow={(item, index) => (
          <Box p={1} key={index}>
            <StyledImage src={item.preview} alt="upload" />
          </Box>
        )}
      />
    </AppCard>
  );
};

export default CreatePost;
