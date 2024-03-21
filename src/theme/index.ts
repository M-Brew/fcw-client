"use client";

import { Montserrat } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { brown } from "@mui/material/colors";

const montserrat = Montserrat({
  weight: ["200", "500", "400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: brown[500],
    },
  },
});

export default theme;
