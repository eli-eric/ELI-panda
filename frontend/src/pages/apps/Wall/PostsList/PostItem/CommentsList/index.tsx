import React from "react";
import Box from "@mui/material/Box";
import AppList from "@crema/core/AppList";
import CommentItem from "./CommentItem";
import { Fonts } from "shared/constants/AppEnums";
import IntlMessages from "@crema/utility/IntlMessages";
import { styled } from "@mui/material/styles";
import { CommentObj } from "types/models/apps/Wall";

const CommentsListWrapper = styled("div")(({ theme }) => ({
  borderTop: `solid 1px ${theme.palette.divider}`,
  paddingTop: 20,
  marginLeft: -20,
  marginRight: -20,
  paddingLeft: 20,
  paddingRight: 20,
}));

interface CommentsListProps {
  comments: CommentObj[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <CommentsListWrapper>
      <Box component="p" mb={5} fontSize={16} fontWeight={Fonts.MEDIUM}>
        <IntlMessages id="wall.comments" />
      </Box>
      <AppList
        data={comments}
        renderRow={(item, index) => <CommentItem key={index} item={item} />}
      />
    </CommentsListWrapper>
  );
};

export default CommentsList;
