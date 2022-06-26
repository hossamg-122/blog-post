import { Box, Paper, IconButton, Button } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { DialogForm } from "../";
import { Profile } from "../";
import { useDispatch } from "react-redux";
import { CREATE_POST } from "../../store/actions/types";
export const Post = () => {
  const theme = useTheme();
  const dispatcher = useDispatch();
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
      <DialogForm />
    </>
  );
};
