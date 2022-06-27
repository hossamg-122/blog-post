import * as React from "react";
import {List,ListItem,Divider,ListItemText,ListItemAvatar,Avatar} from "@mui/material";
import { Profile,MoreIcon } from "../";
import { EDIT_COMMENT } from "../../store/actions/types";
import { deleteComment } from "../../store/actions";
import "./comment.css";

export const CommentList = ({ comments = [] }) => {
  return (
    <List sx={{ width: "100%" }}>
      {comments.map((comment) => (
        <div key={comment.id}>
          <ListItem
            secondaryAction={
              // this a generic component for more icon in component card
              <MoreIcon
                title="Post Actions"
                action={EDIT_COMMENT}
                element={comment}
                deleteAction={deleteComment}
              />
            }
          >
            <ListItemAvatar sx={{ alignSelf: "flex-start", mt: 1 }}>
              {comment.email === "hossamg@atomica.ai" ? (
                <Profile />
              ) : (
                <Avatar alt="Remy Sharp">{comment?.email[0]}</Avatar>
              )}
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
