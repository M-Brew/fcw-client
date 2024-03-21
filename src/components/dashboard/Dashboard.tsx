import React, { useContext } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          variant="outlined"
          elevation={0}
          sx={{
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Clients</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          variant="outlined"
          elevation={0}
          sx={{
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Revenue Collectors</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          variant="outlined"
          elevation={0}
          sx={{
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Payments</Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          variant="outlined"
          elevation={0}
          sx={{
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>Something Else</Typography>
        </Card>
      </Grid>
    </Grid>
  );
}
