import * as React from "react";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import { Edit, Delete } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { EDIT_COMMENT, EDIT_POST } from "../../store/actions/types";

// this a generic component for more icon in both post and component card
export const MoreIcon = ({ title, action, element, deleteAction }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatcher = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // this function handling displaying DialogForm component when user clicks edit button regarding the action in the props
  const handleEditClick = () => {
    switch (action) {
      case EDIT_POST:
        dispatcher({
          type: "dialogFormParams",
          payload: {
            open: true,
            action: EDIT_POST,
            title: "Edit Post",
            buttonText: "Edit",
            initialValues: { ...element },
          },
        });
        break;
      case EDIT_COMMENT:
        dispatcher({
          type: "dialogFormParams",
          payload: {
            open: true,
            action: EDIT_COMMENT,
            title: "Edit Comment",
            buttonText: "Edit",
            initialValues: { ...element },
          },
        });
        break;
      default:
        break;
    }
  };
  // this function handling deleting element in the props
  const handleDeleteClick = () => {
    dispatcher(deleteAction(element));
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title={title}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
