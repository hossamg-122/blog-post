import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  CssBaseline,
  Tooltip,
  MenuItem,
  useTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { Profile } from "../";
import { logOut } from "../../store/actions";

export const Navbar = () => {
  const theme = useTheme();
  const dispatcher = useDispatch();
  const { isLogin } = useSelector((state) => state.blog);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleThemeChange = () => {
    theme.palette.mode === "dark"
      ? dispatcher({ type: "mode", payload: "light" })
      : dispatcher({ type: "mode", payload: "dark" });
  };
  const handleLogout = () => {
    handleCloseUserMenu();
    dispatcher(logOut());
  };

  return (
    <>
      <CssBaseline />

      <AppBar enableColorOnDark color="default">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <img
                src={
                  theme.palette.mode === "dark"
                    ? require("../../assets/logo-dark.png")
                    : require("../../assets/logo-light.png")
                }
                alt="Atomica"
                loading="lazy"
                height={30}
              />
            </Box>

            <IconButton
              sx={{ mr: 2 }}
              onClick={handleThemeChange}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            {isLogin ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Profile />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: "45px",
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
