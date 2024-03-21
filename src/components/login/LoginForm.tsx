"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { signIn } from "@/app/api/auth";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm() {
  const router = useRouter();

  const [error, setError] = useState<string>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ email, password }) => {
      try {
        setError(undefined);
        const response = await signIn({ email, password });
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          router.replace("/dashboard");
        } else if (response.status === 401) {
          setError(response.data.error);
        } else {
          setError("An error occurred. Please try again later.");
        }
      } catch (error: any) {
        if (error) {
          console.log({ error });
          setError("An error occurred. Please try again later.");
        }
      }
    },
  });

  return (
    <Box sx={{ my: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          autoComplete="chrome-off"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          inputProps={{
            autoComplete: "new-password",
          }}
          sx={{ mb: 2 }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          <Typography textTransform="capitalize">Login</Typography>
        </Button>
      </form>
      {error && (
        <Box mt={3}>
          <Alert
            severity="error"
            icon={false}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {error}
          </Alert>
        </Box>
      )}
    </Box>
  );
}
