import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import CssBaseline from "@mui/material/CssBaseline";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";
import { Profile } from "../";
import { logOut } from "../../store/actions";
const settings = ["Logout"];

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
  function ElevationScroll({children}) {
    
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
     
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  return (
    <>
      <CssBaseline />
      <ElevationScroll>
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

              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>
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
                    sx={{ mt: "45px" }}
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
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleLogout}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : null}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </>
  );
};
