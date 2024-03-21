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

import RevenueCollectorForm from "./RevenueCollectorForm";
import RevenueCollectorDetails from "./RevenueCollectorDetails";

import {
  addRevenueCollector,
  deleteRevenueCollector,
  getRevenueCollectors,
  restoreRevenueCollector,
  suspendRevenueCollector,
  updateRevenueCollector,
} from "@/app/api/revenue-collectors";
import { Tooltip } from "@mui/material";

export default function RevenueCollectorTable() {
  const [revenueCollectors, setRevenueCollectors] = useState<
    IRevenueCollector[]
  >([]);
  const [openForm, setOpenForm] = useState(false);
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const [selectedCollector, setSelectedCollector] =
    useState<IRevenueCollector>();
  const [openDetails, setOpenDetails] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const getData = async () => {
    try {
      const response = await getRevenueCollectors();
      if (response?.status === 200) {
        setRevenueCollectors(response.data as IRevenueCollector[]);
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
    setSelectedCollector(undefined);
    setOpenForm(false);
  };

  const handleOpenDetails = (collector: IRevenueCollector) => {
    setSelectedCollector(collector);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedCollector(undefined);
    setOpenDetails(false);
  };

  const handleAdd = async (collector: IRevenueCollector) => {
    try {
      setError(undefined);

      const response = await addRevenueCollector(collector);

      if (response?.status === 201) {
        setRevenueCollectors((prev) => [
          ...prev,
          response.data as IRevenueCollector,
        ]);
        setSuccess(`New collector was added successfully.`);
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

  const handleUpdate = async (collector: IRevenueCollector) => {
    try {
      setError(undefined);

      const response = await updateRevenueCollector(collector);

      if (response?.status === 200) {
        const update = revenueCollectors.map((i) =>
          i._id === (response.data as IRevenueCollector)._id ? response.data : i
        );
        setRevenueCollectors(update);
        setSuccess(`Collector updated successfully.`);
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
    revenueCollector: IRevenueCollector;
    handleClose: () => void;
    handleDeleteError: (error?: string) => void;
  }) => {
    const { revenueCollector, handleClose, handleDeleteError } = props;

    try {
      handleDeleteError(undefined);

      const response = await deleteRevenueCollector(
        revenueCollector?._id ?? ""
      );

      if (response?.status === 204) {
        setSuccess(`Collector deleted successfully.`);
        setTimeout(() => {
          const update = revenueCollectors.filter(
            (i) => i._id !== revenueCollector._id
          );
          setRevenueCollectors(update);
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

  const handleSuspend = async (id: string, callback?: () => void) => {
    try {
      setError(undefined);

      const response = await suspendRevenueCollector(id);

      if (response?.status === 200) {
        const update = revenueCollectors.map((i) =>
          i._id === (response.data as IRevenueCollector)._id ? response.data : i
        );
        setRevenueCollectors(update);
        // setSuccess(`Collector updated successfully.`);
        // setSuccess(undefined);
        callback?.();
      } else {
        const error = response?.data;
        if (error) {
          // setError(error.error);
        } else {
          // setError("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.log(error);
      // setError("An error occurred. Please try again later.");
    }
  };

  const handleRestore = async (id: string, callback?: () => void) => {
    try {
      setError(undefined);

      const response = await restoreRevenueCollector(id);

      if (response?.status === 200) {
        const update = revenueCollectors.map((i) =>
          i._id === (response.data as IRevenueCollector)._id ? response.data : i
        );
        setRevenueCollectors(update);
        // setSuccess(`Collector updated successfully.`);
        // setSuccess(undefined);
        callback?.();
      } else {
        const error = response?.data;
        if (error) {
          // setError(error.error);
        } else {
          // setError("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      console.log(error);
      // setError("An error occurred. Please try again later.");
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
            Revenue Collectors
          </Typography>
          <Button variant="contained" size="small" onClick={handleOpenForm}>
            <Typography>Add</Typography>
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: "77vh" }}>
          {revenueCollectors.length > 0 ? (
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Phone Number
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {revenueCollectors.map((collector) => (
                  <Tooltip
                    key={collector._id}
                    title="Suspended"
                    placement="top"
                    disableHoverListener={!collector.suspended}
                  >
                    <TableRow
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
                          handleOpenDetails(collector);
                        }}
                      >
                        <Typography
                          sx={collector.suspended ? { opacity: 0.5 } : {}}
                        >{`${collector.firstName} ${collector.lastName}`}</Typography>
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          handleOpenDetails(collector);
                        }}
                      >
                        <Typography
                          sx={collector.suspended ? { opacity: 0.5 } : {}}
                        >
                          {collector.phoneNumber}
                        </Typography>
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          handleOpenDetails(collector);
                        }}
                      >
                        <Typography
                          sx={collector.suspended ? { opacity: 0.5 } : {}}
                        >
                          {collector.email}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <RowMenu
                          rowItem={collector}
                          success={success}
                          handleDelete={handleDelete}
                          handleOpenEdit={() => {
                            handleOpenForm();
                            setSelectedCollector(collector);
                          }}
                          handleSuspend={handleSuspend}
                          handleRestore={handleRestore}
                        />
                      </TableCell>
                    </TableRow>
                  </Tooltip>
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
              {selectedCollector ? "Update" : "Add New"} Revenue Collector
            </Typography>
            <CloseIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={handleCloseForm}
            />
          </Box>
          <RevenueCollectorForm
            revenueCollector={selectedCollector}
            handleSubmit={selectedCollector ? handleUpdate : handleAdd}
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
              Revenue Collector Details
            </Typography>
            <CloseIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={handleCloseDetails}
            />
          </Box>
          <RevenueCollectorDetails revenueCollector={selectedCollector} />
        </Box>
      </Modal>
    </>
  );
}

const RowMenu = (props: IRowMenu) => {
  const {
    rowItem,
    success,
    handleOpenEdit,
    handleDelete,
    handleSuspend,
    handleRestore,
  } = props;

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
            rowItem.suspended
              ? handleRestore?.(rowItem._id ?? "", handleClose)
              : handleSuspend?.(rowItem._id ?? "", handleClose);
            handleClose();
          }}
        >
          <Typography fontSize={14}>
            {rowItem.suspended ? "Restore" : "Suspend"}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (rowItem.payments.length === 0) {
              setOpenDelete(true);
              handleClose();
            }
          }}
        >
          <Typography
            fontSize={14}
            sx={rowItem.payments.length > 0 ? { opacity: 0.5 } : {}}
          >
            Delete
          </Typography>
        </MenuItem>
      </Menu>
      <DeleteCollectorDialog
        open={openDelete}
        revenueCollector={rowItem}
        success={success}
        handleClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const DeleteCollectorDialog = (props: IDeleteCollectorDialog) => {
  const { open, revenueCollector, success, handleClose, handleDelete } = props;

  const [deleteError, setDeleteError] = useState<string>();

  const handleDeleteError = (error?: string) => {
    setDeleteError(error);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">
        <Typography fontSize={18}>
          Are you sure you want to delete {revenueCollector?.firstName}{" "}
          {revenueCollector?.lastName}?
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
            handleDelete({ revenueCollector, handleClose, handleDeleteError })
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
  rowItem: IRevenueCollector;
  success?: string;
  handleOpenEdit: () => void;
  handleDelete: (props: {
    revenueCollector: IRevenueCollector;
    handleClose: () => void;
    handleDeleteError: (error?: string) => void;
  }) => void;
  handleSuspend?: (id: string, callback?: () => void) => void;
  handleRestore?: (id: string, callback?: () => void) => void;
}

interface IDeleteCollectorDialog {
  open: boolean;
  revenueCollector: IRevenueCollector;
  success?: string;
  handleClose: () => void;
  handleDelete: (props: {
    revenueCollector: IRevenueCollector;
    handleClose: () => void;
    handleDeleteError: (error?: string) => void;
  }) => void;
}
