import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { MemberObj } from "../../../../../../types/models/apps/ScrumbBoard";

interface MembersProps {
  members: MemberObj[];
}

const Members: React.FC<MembersProps> = ({ members }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {members.map((member) => {
        return (
          <Tooltip title={member.name} key={member.id}>
            {member.image ? (
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  mr: 2,
                }}
                src={member.image}
                alt="created"
              />
            ) : (
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  mr: 2,
                }}
              >
                {member.name[0].toUpperCase()}
              </Avatar>
            )}
          </Tooltip>
        );
      })}
    </Box>
  );
};

export default Members;
