import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  styled,
} from "@mui/material";

import { red } from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
import CommentIcon from "@mui/icons-material/Comment";
import { CreateComment, CommentList, Profile, MoreIcon } from "../";
import { useDispatch } from "react-redux";
import { fetchComments, deletePost } from "../../store/actions";
import { EDIT_POST } from "../../store/actions/types";

export const PostCard = ({ post }) => {
  const dispatcher = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [loadComments, setLoadComments] = React.useState(false);
  const handleExpandClick = () => {
    // if the comments already exists there is no need to fetch it again
    if (post?.comments?.length > 0) {
      setExpanded(!expanded);
      return;
    }
    // this action works only when user clicks on comments button to fetch comments for the post when only the user want to avoid fetching unnecessary data and consume requests
    dispatcher(fetchComments(post.id, setLoadComments, setExpanded));
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardHeader
        // here I'm checking if the post is created by me I put my profile other with I put the first letter of the author name
        avatar={
          post.user.name === "Hossam Gamal" ? (
            <Profile />
          ) : (
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {post?.user?.name[0]}
            </Avatar>
          )
        }
        action={
          // this a generic component for more icon in post card
          <MoreIcon
            title="Post Actions"
            action={EDIT_POST}
            element={post}
            deleteAction={deletePost}
          />
        }
        title={post?.user?.name}
        subheader={post?.user?.email}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <LoadingButton
          size="small"
          onClick={handleExpandClick}
          endIcon={<CommentIcon />}
          loading={loadComments}
          loadingPosition="end"
          variant="outlined"
        >
          Comments
        </LoadingButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <CreateComment post={post} />
          <CommentList comments={post.comments} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
