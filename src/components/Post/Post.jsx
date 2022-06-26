import { Box, Paper, IconButton, Avatar, Button } from "@mui/material";
import React from "react";
import { postBox, postAvatar, postButton } from "./Post.style";
import { useTheme } from "@mui/material/styles";
import { PostForm } from "../";
import { Profile } from "../";
export const Post = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box component={Paper} sx={{ m: 2, p: 3, display: "flex" }}>
        <IconButton sx={{ p: 0, mr: 1 }}>
         <Profile />
        </IconButton>
        <Button
          variant="text"
          fullWidth
          onClick={handleClickOpen}
          sx={{
            borderRadius: 20,
            border: "2px solid #ccc",
            color: theme.palette.mode === "dark" ? "white" : "gray",
            display: "flex",
            justifyContent: "flex-start",
            pl: 3,
            textTransform: "capitalize",
          }}
        >
          Start a post
        </Button>
      </Box>
      <PostForm
        title="Create a post"
        buttonText='Post'
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
