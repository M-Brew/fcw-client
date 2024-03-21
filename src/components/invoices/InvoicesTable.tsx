"use client";
import { MouseEvent, useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";

// import PaymentForm from "./PaymentForm";
// import PaymentDetails from "./PaymentDetails";

import { getInvoices } from "@/app/api/invoices";
import PaymentForm from "../payments/PaymentForm";
import { addPayment } from "@/app/api/payments";

export default function InvoicesTable() {
  const [invoices, setInvoices] = useState<IInvoiceData[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const [selectedInvoice, setSelectedInvoice] = useState<IInvoiceData>();
  // const [openDetails, setOpenDetails] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const getData = async () => {
    try {
      const response = await getInvoices();
      if (response?.status === 200) {
        setInvoices(response.data as IInvoiceData[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setError(undefined);
    setOpenForm(false);
    setSelectedInvoice(undefined);
  };

  // const handleOpenDetails = (payment: IInvoiceData) => {
  //   setSelectedPayment(payment);
  //   setOpenDetails(true);
  // };

  // const handleCloseDetails = () => {
  //   setSelectedPayment(undefined);
  //   setOpenDetails(false);
  // };

  const handleOpenPaymentForm = (invoice: IInvoiceData) => {
    setSelectedInvoice(invoice);
    setOpenForm(true);
  };

  const handlePay = async (payment: IPayment) => {
    try {
      setError(undefined);

      const response = await addPayment(payment);
      if (response?.status === 201) {
        setInvoices((prev) =>
          prev.map((invoice) =>
            invoice._id === payment.invoice
              ? { ...invoice, status: "paid", paymentDate: payment.paymentDate }
              : invoice
          )
        );
        setSuccess(`Payment added successfully.`);
        setTimeout(() => {
          setSuccess(undefined);
          handleCloseForm();
        }, 2000);
      } else {
        const error = response?.data;
        if (error) {
          setError(error.error);
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    }
  };

  // const handleAdd = async (payment: IPayment) => {
  //   try {
  //     setError(undefined);

  //     const response = await addPayment(payment);

  //     if (response?.status === 201) {
  //       setInvoices((prev) => [...prev, response.data as IInvoiceData]);
  //       setSuccess(`Payment added successfully.`);
  //       setTimeout(() => {
  //         setSuccess(undefined);
  //         handleCloseForm();
  //       }, 2000);
  //     } else {
  //       const error = response?.data;
  //       if (error) {
  //         setError(error.error);
  //       } else {
  //         setError("An error occurred. Please try again later.");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setError("An error occurred. Please try again later.");
  //   }
  // };

  // const handleUpdate = async (payment: IPayment) => {
  //   try {
  //     setError(undefined);

  //     const response = await updatePayment(payment);

  //     if (response?.status === 200) {
  //       const update = invoices.map((i) =>
  //         i._id === (response.data as IPayment)._id ? response.data : i
  //       );
  //       setInvoices(update);
  //       setSuccess(`Payment updated successfully.`);
  //       setTimeout(() => {
  //         setSuccess(undefined);
  //         handleCloseForm();
  //       }, 2000);
  //     } else {
  //       const error = response?.data;
  //       if (error) {
  //         setError(error.error);
  //       } else {
  //         setError("An error occurred. Please try again later.");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setError("An error occurred. Please try again later.");
  //   }
  // };

  // const handleDelete = async (props: {
  //   payment: IInvoiceData;
  //   handleClose: () => void;
  //   handleDeleteError: (error?: string) => void;
  // }) => {
  //   const { payment, handleClose, handleDeleteError } = props;
  //   try {
  //     handleDeleteError(undefined);

  //     const response = await deletePayment(payment?._id ?? "");

  //     if (response?.status === 204) {
  //       setSuccess(`Payment deleted successfully.`);
  //       setTimeout(() => {
  //         const update = invoices.filter((i) => i._id !== payment._id);
  //         setInvoices(update);
  //         setSuccess(undefined);
  //         handleClose();
  //       }, 2000);
  //     } else {
  //       const error = response?.data;
  //       if (error) {
  //         handleDeleteError(error.error);
  //       } else {
  //         handleDeleteError("An error occurred. Please try again later.");
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     handleDeleteError("An error occurred. Please try again later.");
  //   }
  // };

  return (
    <>
      <Box>
        <Box
          padding={2}
          display="flex"
          // justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: "0.5px solid black" }}
        >
          <Typography fontSize={18} fontWeight={500}>
            Invoices
          </Typography>
          {/* <Button variant="contained" size="small" onClick={handleOpenForm}>
            <Typography>Add</Typography>
          </Button> */}
        </Box>
        <TableContainer sx={{ maxHeight: "77vh" }}>
          {invoices.length > 0 ? (
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Client
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Amount
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Due Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Payment Date
                    </Typography>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    hover
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      // onClick={() => {
                      //   handleOpenDetails(invoice);
                      // }}
                    >
                      <Typography>{`${invoice.client.firstName} ${invoice.client.lastName}`}</Typography>
                    </TableCell>
                    <TableCell
                    // onClick={() => {
                    //   handleOpenDetails(invoice);
                    // }}
                    >
                      <Typography>GHC {invoice.amount.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell
                    // onClick={() => {
                    //   handleOpenDetails(invoice);
                    // }}
                    >
                      <Typography>
                        {new Date(invoice.dueDate).toLocaleDateString("en-uk", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell
                    // onClick={() => {
                    //   handleOpenDetails(invoice);
                    // }}
                    >
                      <Typography>
                        <Chip
                          label={
                            <Typography fontSize={14}>
                              {invoice.status === "paid" ? "Paid" : "Unpaid"}
                            </Typography>
                          }
                          color={
                            invoice.status === "paid" ? "success" : "error"
                          }
                          size="small"
                        />
                      </Typography>
                    </TableCell>
                    <TableCell
                    // onClick={() => {
                    //   handleOpenDetails(invoice);
                    // }}
                    >
                      <Typography>
                        {invoice.paymentDate
                          ? new Date(invoice.paymentDate).toLocaleDateString(
                              "en-uk",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : ""}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <RowMenu
                        rowItem={invoice}
                        handleOpenPaymentForm={() =>
                          handleOpenPaymentForm(invoice)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box
              sx={{
                height: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography sx={{ opacity: 0.5 }}>No data available</Typography>
              </Box>
            </Box>
          )}
        </TableContainer>
      </Box>
      <Modal open={openForm} onClose={handleCloseForm}>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: matches ? 700 : "80%",
            bgcolor: "background.paper",
            borderRadius: "5px",
            p: matches ? 4 : 2,
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography fontSize={18}>Make Payment</Typography>
            <CloseIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={handleCloseForm}
            />
          </Box>
          <PaymentForm
            invoice={selectedInvoice}
            // payment={selectedPayment}
            handleSubmit={handlePay}
          />
          {success && (
            <Alert severity="success" icon={false}>
              {success}
            </Alert>
          )}
          {error && (
            <Alert severity="error" icon={false}>
              {error}
            </Alert>
          )}
        </Box>
      </Modal>
      {/* <Modal open={openDetails} onClose={handleCloseDetails}>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: matches ? 600 : "80%",
            bgcolor: "background.paper",
            borderRadius: "5px",
            py: 2,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mx={2}
            mb={2}
          >
            <Typography fontSize={18} fontWeight={500}>
              Payment Details
            </Typography>
            <CloseIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={handleCloseDetails}
            />
          </Box>
          <PaymentDetails payment={selectedPayment} />
        </Box>
      </Modal> */}
    </>
  );
}

const RowMenu = (props: IRowMenu) => {
  const { rowItem, handleOpenPaymentForm } = props;

  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const open = Boolean(anchorEl);

  // const [openDelete, setOpenDelete] = useState(false);

  const handleClick = (event: MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MoreVertIcon
        sx={{ cursor: "pointer" }}
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          handleClick(e);
        }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleOpenPaymentForm();
            handleClose();
          }}
        >
          <Typography fontSize={14}>Pay</Typography>
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            setOpenDelete(true);
            handleClose();
          }}
        >
          <Typography fontSize={14}>Delete</Typography>
        </MenuItem> */}
      </Menu>
      {/* <DeletePaymentDialog
        open={openDelete}
        payment={rowItem}
        success={success}
        handleClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      /> */}
    </div>
  );
};

// const DeletePaymentDialog = (props: IDeletePaymentDialog) => {
//   const { open, payment, success, handleClose, handleDelete } = props;

//   const [deleteError, setDeleteError] = useState<string>();

//   const handleDeleteError = (error?: string) => {
//     setDeleteError(error);
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} fullWidth>
//       <DialogTitle id="alert-dialog-title">
//         <Typography fontSize={18}>
//           Are you sure you want to delete this payment: {payment.receiptNumber}?
//         </Typography>
//       </DialogTitle>
//       <DialogContent>
//         <DialogContentText id="alert-dialog-description">
//           This action is irreversible.
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions sx={{ mr: 2, mb: 2 }}>
//         <Button onClick={handleClose} variant="outlined" size="small">
//           Cancel
//         </Button>
//         <Button
//           onClick={() =>
//             handleDelete({ payment, handleClose, handleDeleteError })
//           }
//           variant="contained"
//           size="small"
//           autoFocus
//         >
//           Delete
//         </Button>
//       </DialogActions>
//       <Container>
//         {success && (
//           <Alert severity="success" icon={false} sx={{ my: 2 }}>
//             {success}
//           </Alert>
//         )}
//         {deleteError && (
//           <Alert severity="error" icon={false} sx={{ my: 2 }}>
//             {deleteError}
//           </Alert>
//         )}
//       </Container>
//     </Dialog>
//   );
// };

interface IRowMenu {
  rowItem: IInvoiceData;
  success?: string;
  handleOpenPaymentForm: () => void;
  // handleDelete: (props: {
  //   payment: IInvoiceData;
  //   handleClose: () => void;
  //   handleDeleteError: (error?: string) => void;
  // }) => void;
}

// interface IDeletePaymentDialog {
//   open: boolean;
//   payment: IInvoiceData;
//   success?: string;
//   handleClose: () => void;
//   handleDelete: (props: {
//     payment: IInvoiceData;
//     handleClose: () => void;
//     handleDeleteError: (error?: string) => void;
//   }) => void;
// }
