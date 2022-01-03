import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function GroupAvatars() {
  return (
    <AvatarGroup max={4}>
      <Avatar alt="Remy Sharp" src="/assets/images/avatar/A1.jpg" />
      <Avatar alt="Travis Howard" src="/assets/images/avatar/A2.jpg" />
      <Avatar alt="Cindy Baker" src="/assets/images/avatar/A3.jpg" />
      <Avatar alt="Agnes Walker" src="/assets/images/avatar/A4.jpg" />
      <Avatar alt="Trevor Henderson" src="/assets/images/avatar/A5.jpg" />
    </AvatarGroup>
  );
}
