"use client";
import { useFormik } from "formik";
import * as yup from "yup";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
});

export default function RevenueCollectorForm(props: IRevenueCollectorForm) {
  const { revenueCollector, handleSubmit } = props;

  const formik = useFormik({
    initialValues: revenueCollector ?? {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit?.(values);
    },
  });

  return (
    <Box sx={{ my: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="phoneNumber"
          name="phoneNumber"
          label="Phone Number"
          type="text"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          sx={{ mb: 2 }}
        />
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
          sx={{ mb: 2 }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          <Typography textTransform="capitalize">
            {revenueCollector ? "Update" : "Add"}
          </Typography>
        </Button>
      </form>
    </Box>
  );
}

interface IRevenueCollectorForm {
  revenueCollector?: IRevenueCollector;
  handleSubmit?: (revenueCollector: IRevenueCollector) => void;
}
