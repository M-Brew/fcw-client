import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MenuIcon from "@mui/icons-material/Menu";
import SideDrawer from "./SideDrawer";

import { signOut } from "@/app/api/auth";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleSignOut = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      const response = await signOut(refreshToken);
      if (response.status === 204) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.replace("/");
      }
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {matches && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: open ? "none" : "block" }}
              onClick={() => handleOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6">FCWM</Typography>
          </Box>
          <Box>
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={handleSignOut}
            >
              Logout
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <SideDrawer open={open} handleOpenDrawer={handleOpen} />
    </>
  );
}
