import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { IconButton, Typography, Tooltip } from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LoadingButton from "@mui/lab/LoadingButton";
import CommentIcon from "@mui/icons-material/Comment";
import { CreateComment, CommentList, Profile, MoreIcon } from "../";
import { useDispatch } from "react-redux";
import { fetchComments,deletePost } from "../../store/actions";
import { EDIT_POST } from "../../store/actions/types";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const PostCard = ({ post }) => {
  const dispatcher = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const [loadComments, setLoadComments] = React.useState(false);
  const handleExpandClick = () => {
    if (post?.comments?.length > 0) {
      setExpanded(!expanded);
      return;
    }
    dispatcher(fetchComments(post.id, setLoadComments, setExpanded));
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardHeader
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
          <MoreIcon title="Post Actions" action={EDIT_POST} element={post} deleteAction={deletePost}/>
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
          <CreateComment post={post}/>
          <CommentList comments={post.comments} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
