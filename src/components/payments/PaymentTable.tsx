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

import PaymentForm from "./PaymentForm";
import PaymentDetails from "./PaymentDetails";

import {
  addPayment,
  deletePayment,
  getPayments,
  updatePayment,
} from "@/app/api/payments";

export default function PaymentTable() {
  const [payments, setPayments] = useState<IPaymentData[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const [selectedPayment, setSelectedPayment] = useState<IPaymentData>();
  const [openDetails, setOpenDetails] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const getData = async () => {
    try {
      const response = await getPayments();
      if (response?.status === 200) {
        setPayments(response.data as IPaymentData[]);
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
    setSelectedPayment(undefined);
  };

  const handleOpenDetails = (payment: IPaymentData) => {
    setSelectedPayment(payment);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedPayment(undefined);
    setOpenDetails(false);
  };

  const handleOpenUpdate = (payment: IPaymentData) => {
    setSelectedPayment(payment);
    setOpenForm(true);
  };

  const handleAdd = async (payment: IPayment) => {
    try {
      setError(undefined);

      const response = await addPayment(payment);

      if (response?.status === 201) {
        setPayments((prev) => [...prev, response.data as IPaymentData]);
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

  const handleUpdate = async (payment: IPayment) => {
    try {
      setError(undefined);

      const response = await updatePayment(payment);

      if (response?.status === 200) {
        const update = payments.map((i) =>
          i._id === (response.data as IPayment)._id ? response.data : i
        );
        setPayments(update);
        setSuccess(`Payment updated successfully.`);
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

  const handleDelete = async (props: {
    payment: IPaymentData;
    handleClose: () => void;
    handleDeleteError: (error?: string) => void;
  }) => {
    const { payment, handleClose, handleDeleteError } = props;
    try {
      handleDeleteError(undefined);

      const response = await deletePayment(payment?._id ?? "");

      if (response?.status === 204) {
        setSuccess(`Payment deleted successfully.`);
        setTimeout(() => {
          const update = payments.filter((i) => i._id !== payment._id);
          setPayments(update);
          setSuccess(undefined);
          handleClose();
        }, 2000);
      } else {
        const error = response?.data;
        if (error) {
          handleDeleteError(error.error);
        } else {
          handleDeleteError("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.log(error);
      handleDeleteError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Box>
        <Box
          padding={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ borderBottom: "0.5px solid black" }}
        >
          <Typography fontSize={18} fontWeight={500}>
            Payments
          </Typography>
          <></>
          {/* <Button variant="contained" size="small" onClick={handleOpenForm}>
            <Typography>Add</Typography>
          </Button> */}
        </Box>
        <TableContainer sx={{ maxHeight: "77vh" }}>
          {payments.length > 0 ? (
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Receipt Number
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Client
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Revenue Collector
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Amount
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Payment Date
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="right"></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow
                    key={payment._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                    hover
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={() => {
                        handleOpenDetails(payment);
                      }}
                    >
                      <Typography>{payment.receiptNumber}</Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleOpenDetails(payment);
                      }}
                    >
                      <Typography>{`${payment.client.firstName} ${payment.client.lastName}`}</Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleOpenDetails(payment);
                      }}
                    >
                      <Typography>{`${payment.revenueCollector.firstName} ${payment.revenueCollector.lastName}`}</Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleOpenDetails(payment);
                      }}
                    >
                      <Typography>GHC {payment.amount.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleOpenDetails(payment);
                      }}
                    >
                      <Typography>
                        {new Date(payment.paymentDate).toLocaleDateString(
                          "en-uk",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                    </TableCell>
                    {/* <TableCell align="right">
                      <RowMenu
                        rowItem={payment}
                        success={success}
                        handleDelete={handleDelete}
                        handleOpenEdit={() => handleOpenUpdate(payment)}
                      />
                    </TableCell> */}
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
            <Typography fontSize={18}>
              {selectedPayment ? "Update" : "Add New"} Payment
            </Typography>
            <CloseIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={handleCloseForm}
            />
          </Box>
          <PaymentForm
            payment={selectedPayment}
            handleSubmit={selectedPayment ? handleUpdate : handleAdd}
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
      <Modal open={openDetails} onClose={handleCloseDetails}>
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
      </Modal>
    </>
  );
}

const RowMenu = (props: IRowMenu) => {
  const { rowItem, success, handleOpenEdit, handleDelete } = props;

  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const open = Boolean(anchorEl);

  const [openDelete, setOpenDelete] = useState(false);

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
            handleOpenEdit();
            handleClose();
          }}
        >
          <Typography fontSize={14}>Update</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDelete(true);
            handleClose();
          }}
        >
          <Typography fontSize={14}>Delete</Typography>
        </MenuItem>
      </Menu>
      <DeletePaymentDialog
        open={openDelete}
        payment={rowItem}
        success={success}
        handleClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const DeletePaymentDialog = (props: IDeletePaymentDialog) => {
  const { open, payment, success, handleClose, handleDelete } = props;

  const [deleteError, setDeleteError] = useState<string>();

  const handleDeleteError = (error?: string) => {
    setDeleteError(error);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">
        <Typography fontSize={18}>
          Are you sure you want to delete this payment: {payment.receiptNumber}?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mr: 2, mb: 2 }}>
        <Button onClick={handleClose} variant="outlined" size="small">
          Cancel
        </Button>
        <Button
          onClick={() =>
            handleDelete({ payment, handleClose, handleDeleteError })
          }
          variant="contained"
          size="small"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
      <Container>
        {success && (
          <Alert severity="success" icon={false} sx={{ my: 2 }}>
            {success}
          </Alert>
        )}
        {deleteError && (
          <Alert severity="error" icon={false} sx={{ my: 2 }}>
            {deleteError}
          </Alert>
        )}
      </Container>
    </Dialog>
  );
};

interface IRowMenu {
  rowItem: IPaymentData;
  success?: string;
  handleOpenEdit: () => void;
  handleDelete: (props: {
    payment: IPaymentData;
    handleClose: () => void;
    handleDeleteError: (error?: string) => void;
  }) => void;
}

interface IDeletePaymentDialog {
  open: boolean;
  payment: IPaymentData;
  success?: string;
  handleClose: () => void;
  handleDelete: (props: {
    payment: IPaymentData;
    handleClose: () => void;
    handleDeleteError: (error?: string) => void;
  }) => void;
}
