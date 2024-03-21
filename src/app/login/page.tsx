import React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import LoginForm from "@/components/login/LoginForm";

export default function Login() {
  return (
    <Container>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "50vw" }}>
          <Typography textAlign="center" variant="h5" gutterBottom>
            Fast Collection Waste
          </Typography>
          <LoginForm />
        </Box>
      </Box>
    </Container>
  );
}
