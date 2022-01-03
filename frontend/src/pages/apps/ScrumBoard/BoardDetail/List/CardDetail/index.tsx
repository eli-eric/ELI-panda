import React from "react";
import Card from "@mui/material/Card";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import moment from "moment";
import { Box } from "@mui/material";
import Members from "./Members";
import Labels from "./Labels";
import { Fonts } from "../../../../../../shared/constants/AppEnums";
import { LabelObj, MemberObj } from "types/models/apps/ScrumbBoard";

interface CardDetailProps {
  title: string;
  attachments: string[];
  label: LabelObj[];
  members: MemberObj[];
  date: string;
  comments: string[];
  onClick: () => void;
}

const CardDetail: React.FC<CardDetailProps> = ({
  title,
  attachments = [],
  label = [],
  members,
  date,
  comments,
  onClick,
}) => {
  return (
    <Card
      sx={{
        py: 4,
        px: 6,
        mb: 2,
        cursor: "pointer",
        whiteSpace: "normal",
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mr: 2,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {title}
        </Box>
        {attachments && attachments.length > 0 ? (
          <Box
            sx={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.LIGHT,
              }}
            >
              {attachments.length}
            </Box>
            <AttachFileIcon
              sx={{
                ml: 2,
              }}
            />
          </Box>
        ) : null}
      </Box>
      {label.length > 0 ? <Labels labels={label} /> : null}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {members.length > 0 ? <Members members={members} /> : null}

        <Box
          sx={{
            ml: 1,
            mr: "auto",
            color: "text.secondary",
          }}
        >
          {date ? moment(date).format("ll").split(",")[0] : null}
        </Box>
        {comments && comments.length > 0 ? (
          <Box
            sx={{
              ml: 2,
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            <Box
              component="span"
              sx={{
                mr: 2,
                fontWeight: Fonts.LIGHT,
              }}
            >
              {comments.length}
            </Box>
            <ChatBubbleIcon />
          </Box>
        ) : null}
      </Box>
    </Card>
  );
};

export default CardDetail;
