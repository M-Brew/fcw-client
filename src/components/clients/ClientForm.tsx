"use client";
import { useFormik } from "formik";
import * as yup from "yup";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

import clientTypes from "../../data/client-type.json";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  area: yup.string().required("Area is required"),
  street: yup.string().required("Street is required"),
  houseNumber: yup.string().required("HouseNumber is required"),
  code: yup.number().required("Code is required"),
  numberOfBins: yup.number().required("Number of bins is required"),
});

export default function ClientForm(props: IClientForm) {
  const { client, handleSubmit } = props;

  const formik = useFormik({
    initialValues: client ?? {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      area: "",
      street: "",
      houseNumber: "",
      type: "",
      code: "",
      numberOfBins: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit?.(values as IClient);
    },
  });

  return (
    <Box sx={{ my: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
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
            />
          </Grid>
          <Grid item xs={12}>
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
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
          </Grid>
          <Grid item xs={12}>
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
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="area"
              name="area"
              label="Area"
              type="text"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.area && Boolean(formik.errors.area)}
              helperText={formik.touched.area && formik.errors.area}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="street"
              name="street"
              label="Street"
              type="text"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.street && Boolean(formik.errors.street)}
              helperText={formik.touched.street && formik.errors.street}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="houseNumber"
              name="houseNumber"
              label="House Number"
              type="text"
              value={formik.values.houseNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.houseNumber && Boolean(formik.errors.houseNumber)
              }
              helperText={
                formik.touched.houseNumber && formik.errors.houseNumber
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="client-type-label">Type</InputLabel>
              <Select
                labelId="client-type-label"
                id="client-type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                input={<OutlinedInput label="Name" />}
              >
                {clientTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="code"
              name="code"
              label="Code"
              type="number"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="numberOfBins"
              name="numberOfBins"
              label="Number Of Bins"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              value={formik.values.numberOfBins}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.numberOfBins &&
                Boolean(formik.errors.numberOfBins)
              }
              helperText={
                formik.touched.numberOfBins && formik.errors.numberOfBins
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              <Typography>{client ? "Update" : "Add"}</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

interface IClientForm {
  client?: IClient;
  handleSubmit?: (client: IClient) => void;
}
