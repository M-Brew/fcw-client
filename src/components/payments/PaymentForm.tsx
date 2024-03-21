"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dayjs, { Dayjs } from "dayjs";

const validationSchema = yup.object({
  amount: yup.string().required("Amount is required"),
  receiptNumber: yup.string().required("Receipt number is required"),
  paymentDate: yup.string().required("Payment date is required"),
  remarks: yup.string().required("Remarks is required"),
});

export default function PaymentForm(props: IPaymentForm) {
  const { payment, invoice, handleSubmit } = props;

  const [clients, setClients] = useState<IClient[]>([]);
  const [revenueCollectors, setRevenueCollectors] = useState<
    IRevenueCollector[]
  >([]);

  const getClients = async () => {
    try {
      const response = await fetch(`http://localhost:5050/api/clients`);
      if (response.status === 200) {
        const data = await response.json();
        setClients(data as IClient[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRevenueCollectors = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/api/revenue-collectors`
      );
      if (response.status === 200) {
        const data = await response.json();
        setRevenueCollectors(data as IRevenueCollector[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClients();
    getRevenueCollectors();
  }, []);

  const formik = useFormik({
    initialValues: invoice
      ? {
          amount: invoice.amount,
          receiptNumber: "",
          revenueCollector: "",
          client: invoice.client._id,
          paymentDate: dayjs(),
          remarks: "",
        }
      : payment
      ? {
          ...payment,
          receiptNumber: payment.receiptNumber,
          revenueCollector: payment.revenueCollector._id,
          client: payment.client._id,
          paymentDate: dayjs(payment.paymentDate),
        }
      : {
          amount: 0,
          receiptNumber: "",
          revenueCollector: "",
          client: "",
          paymentDate: dayjs(),
          remarks: "",
        },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit?.({
        ...values,
        invoice: invoice?._id!,
        paymentDate: (values.paymentDate as Dayjs).toISOString(),
      });
    },
  });

  return (
    <Box sx={{ my: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="client-label">Client</InputLabel>
              <Select
                labelId="client-label"
                id="client"
                name="client"
                value={formik.values.client}
                label="Client"
                onChange={formik.handleChange}
                disabled={!!invoice}
              >
                {clients.map((client) => (
                  <MenuItem
                    key={client._id}
                    value={client._id}
                  >{`${client.firstName} ${client.lastName}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="revenue-collector-label">
                Revenue Collector
              </InputLabel>
              <Select
                labelId="revenue-collector-label"
                id="revenueCollector"
                name="revenueCollector"
                value={formik.values.revenueCollector}
                label="Revenue Collector"
                onChange={formik.handleChange}
              >
                {revenueCollectors.map((revenueCollector) => (
                  <MenuItem
                    key={revenueCollector._id}
                    value={revenueCollector._id}
                  >{`${revenueCollector.firstName} ${revenueCollector.lastName}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="receiptNumber"
              name="receiptNumber"
              label="Receipt Number"
              placeholder="XXXX"
              type="text"
              value={formik.values.receiptNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.receiptNumber &&
                Boolean(formik.errors.receiptNumber)
              }
              helperText={
                formik.touched.receiptNumber && formik.errors.receiptNumber
              }
            />
          </Grid>
          <Grid item container spacing={2} display="flex" alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="amount"
                name="amount"
                label="Amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
                InputProps={{ inputProps: { min: 0 } }}
                disabled={!!invoice}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DesktopDatePicker"]}>
                  <DatePicker
                    label="Payment Date"
                    format="DD/MM/YYYY"
                    value={formik.values.paymentDate}
                    onChange={formik.handleChange}
                    sx={{ width: "100%" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="remarks"
              name="remarks"
              label="Remarks"
              type="text"
              multiline
              minRows={3}
              value={formik.values.remarks}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.remarks && Boolean(formik.errors.remarks)}
              helperText={formik.touched.remarks && formik.errors.remarks}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              <Typography textTransform="capitalize">
                {invoice ? "Pay" : payment ? "Update" : "Add"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

interface IPaymentForm {
  invoice?: IInvoiceData;
  payment?: IPaymentData;
  handleSubmit?: (payment: IPayment) => void;
}
