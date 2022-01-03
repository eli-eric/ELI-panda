import React from "react";
import AppCard from "@crema/core/AppCard";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Avatar from "@mui/material/Avatar";
import { timeFromNow } from "@crema/utility/helper/DateHelper";
import Attachments from "./Attachments";
import PostStats from "./PostStats";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";
import { PostObj, WallData } from "types/models/apps/Wall";

interface PostItemProps {
  post: PostObj;
  wallData: WallData | null;
}

const PostItem: React.FC<PostItemProps> = ({ post, wallData }) => {
  const { owner, message, date, attachments, comments } = post;

  const getTitle = () => (
    <Box display="flex" alignItems="center">
      <Avatar
        sx={{
          width: 44,
          height: 44,
        }}
        src={owner.profilePic}
      />
      <Box ml={3.5}>
        <Box component="h4" mb={0.5}>
          {owner.name}
        </Box>
        <Box component="p" color="text.secondary" fontSize={14}>
          {timeFromNow(date)}
        </Box>
      </Box>
    </Box>
  );

  return (
    <AppCard
      sxStyle={{
        "&:not(:last-of-type)": {
          marginBottom: 8,
        },
      }}
      title={getTitle()}
      action={
        <div>
          <IconButton
            sx={{
              padding: 1.5,
            }}
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            // onClick={null}
            size="large"
          >
            <MoreHorizIcon />
          </IconButton>
        </div>
      }
    >
      {message ? (
        <Box component="p" mb={2} fontSize={14}>
          {message}
        </Box>
      ) : null}
      <Attachments attachments={attachments} />
      <PostStats post={post} />
      <AddComment postId={post.id} wallData={wallData} />
      {comments.length > 0 && <CommentsList comments={comments} />}
    </AppCard>
  );
};

export default PostItem;
