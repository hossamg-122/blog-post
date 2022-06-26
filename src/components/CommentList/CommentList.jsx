import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import "./comment.css"
export const CommentList = ({ comments = [] }) => {
  return (
    <List sx={{ width: "100%" }}>
      {comments.map((comment) => (
        <div key={comment.id}>
          <ListItem
         
           secondaryAction={
<IconButton sx={{alignSelf:'flex-start'}} edge="end" aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
           }
           
          >
            
            <ListItemAvatar sx={{alignSelf:'flex-start',mt:1 }}>
              <Avatar alt="Remy Sharp">{comment?.email[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.email}
              secondary={<React.Fragment>{comment.body}</React.Fragment>}
            />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
        </div>
      ))}
    </List>
  );
};
