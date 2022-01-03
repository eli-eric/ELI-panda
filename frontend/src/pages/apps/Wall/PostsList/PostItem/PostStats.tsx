import React from "react";
import Box from "@mui/material/Box";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { useDispatch } from "react-redux";
import { onUpdatePostStatus } from "../../../../../redux/actions/WallApp";
import { Fonts } from "shared/constants/AppEnums";

import { PostObj } from "types/models/apps/Wall";

interface PostStatsProps {
  post: PostObj;
}

const PostStats: React.FC<PostStatsProps> = ({ post }) => {
  const dispatch = useDispatch();

  const toggleLikeStatus = () => {
    dispatch(onUpdatePostStatus(post.id, !post.liked));
  };

  return (
    <Box
      mb={{ xs: 4, xl: 6 }}
      fontWeight={Fonts.MEDIUM}
      color="text.secondary"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      <Box
        display="flex"
        alignItems="center"
        className="pointer"
        color={post.liked ? "primary.main" : "text.secondary"}
        onClick={toggleLikeStatus}
      >
        <ThumbUpAltOutlinedIcon
          sx={{
            fontSize: 18,
          }}
        />
        <Box fontSize={{ xs: 12, md: 14 }} component="span" ml={1.5}>
          {post.likes} likes
        </Box>
      </Box>
      {post.comments.length > 0 && (
        <Box display="flex" className="pointer" alignItems="center" ml={3}>
          <CommentOutlinedIcon
            sx={{
              fontSize: 18,
            }}
          />
          <Box fontSize={{ xs: 12, md: 14 }} component="span" ml={1.5}>
            {post.comments.length} Comments
          </Box>
        </Box>
      )}
      <Box display="flex" alignItems="center" className="pointer" ml={3}>
        <ShareOutlinedIcon
          sx={{
            fontSize: 18,
          }}
        />
        <Box fontSize={{ xs: 12, md: 14 }} component="span" ml={1.5}>
          {post.shares} Shares
        </Box>
      </Box>
    </Box>
  );
};

export default PostStats;
