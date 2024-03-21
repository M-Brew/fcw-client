"use client";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import DashboardContextProvider from "../contexts/dashboard-context";
import SideNavigation from "@/components/navigation/SideNavigation";
import NavBar from "@/components/navigation/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <DashboardContextProvider>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f6f999" }}>
        <NavBar />
        <Grid container spacing={3} p={3}>
          {matches && (
            <Grid item xs={3}>
              <SideNavigation />
            </Grid>
          )}
          <Grid item xs={matches ? 9 : 12}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </DashboardContextProvider>
  );
}
