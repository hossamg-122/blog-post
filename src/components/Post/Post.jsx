import React from "react";
import { Box, Paper, IconButton, Button, useTheme } from "@mui/material";
import { DialogForm, Profile } from "../";
import { useDispatch } from "react-redux";
import { CREATE_POST } from "../../store/actions/types";
export const Post = () => {
  const theme = useTheme();
  const dispatcher = useDispatch();
  // this function fires action to open DialogForm component
  const handleClickOpen = () => {
    dispatcher({
      type: "dialogFormParams",
      payload: {
        open: true,
        action: CREATE_POST,
        title: "Create Post",
        buttonText: "Post",
        initialValues: { body: "" },
      },
    });
  };

  return (
    <>
      <Box
        component={Paper}
        sx={{ m: 2, p: 3, display: "flex" }}
        id="back-to-top-anchor"
        elevation={2}
      >
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
      {/* this a generic component for handling create and edit post or comment and fully controlled from redux */}
      <DialogForm />
    </>
  );
};
