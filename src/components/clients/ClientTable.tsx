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

import ClientForm from "./ClientForm";
import ClientDetails from "./ClientDetails";
import clientTypes from "../../data/client-type.json";
import {
  addClient,
  deleteClient,
  getClients,
  updateClient,
} from "@/app/api/clients";

export default function ClientTable() {
  const [clients, setClients] = useState<IClient[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const [selectedClient, setSelectedClient] = useState<IClient>();
  const [openDetails, setOpenDetails] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const getData = async () => {
    try {
      const response = await getClients();
      if (response?.status === 200) {
        setClients(response.data as IClient[]);
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
  };

  const handleOpenDetails = (client: IClient) => {
    setSelectedClient(client);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedClient(undefined);
    setOpenDetails(false);
  };

  const handleAdd = async (client: IClient) => {
    try {
      setError(undefined);

      const response = await addClient(client);

      if (response?.status === 201) {
        setClients((prev) => [...prev, response.data as IClient]);
        setSuccess(`New client was added successfully.`);
        setTimeout(() => {
          setSuccess(undefined);
          handleCloseForm();
        }, 2000);
      } else if (response?.status === 401) {
        setError("You are not permitted to perform this action.");
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

  const handleUpdate = async (client: IClient) => {
    try {
      setError(undefined);

      const response = await updateClient(client);

      if (response?.status === 200) {
        const update = clients.map((i) =>
          i._id === (response.data as IClient)._id ? response.data : i
        );
        setClients(update);
        setSuccess(`Client updated successfully.`);
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
    client: IClient;
    handleClose: () => void;
    handleDeleteError: (error?: string) => void;
  }) => {
    const { client, handleClose, handleDeleteError } = props;
    try {
      handleDeleteError(undefined);

      const response = await deleteClient(client._id ?? "");

      if (response?.status === 204) {
        setSuccess(`Client deleted successfully.`);
        setTimeout(() => {
          const update = clients.filter((i) => i._id !== client._id);
          setClients(update);
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
            Clients
          </Typography>
          <Button variant="contained" size="small" onClick={handleOpenForm}>
            <Typography>Add</Typography>
          </Button>
        </Box>
        <TableContainer sx={{ maxHeight: "77vh" }}>
          {clients.length > 0 ? (
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
                      Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={15} fontWeight={500}>
                      Area
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontSize={15} fontWeight={500}>
                      Bins
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontSize={15} fontWeight={500}>
                      Code
                    </Typography>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clients.map((client) => (
                  <TableRow
                    key={client._id}
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
                        handleOpenDetails(client);
                      }}
                    >
                      <Typography>{`${client.firstName} ${client.lastName}`}</Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleOpenDetails(client);
                      }}
                    >
                      <Typography>{client.phoneNumber}</Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleOpenDetails(client);
                      }}
                    >
                      <Typography>
                        {
                          clientTypes.find((type) => type.id === client.type)
                            ?.name
                        }
                      </Typography>
                    </TableCell>
                    <TableCell
                      onClick={() => {
                        handleOpenDetails(client);
                      }}
                    >
                      <Typography>{client.area}</Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={() => {
                        handleOpenDetails(client);
                      }}
                    >
                      <Typography>{client.numberOfBins}</Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={() => {
                        handleOpenDetails(client);
                      }}
                    >
                      <Typography>{client.code}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <RowMenu
                        rowItem={client}
                        success={success}
                        handleDelete={handleDelete}
                        handleOpenEdit={() => {
                          handleOpenForm();
                          setSelectedClient(client);
                        }}
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
            top: "50%",
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
              {selectedClient ? "Update" : "Add New"} Client
            </Typography>
            <CloseIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={handleCloseForm}
            />
          </Box>
          <ClientForm
            client={selectedClient}
            handleSubmit={selectedClient ? handleUpdate : handleAdd}
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
              Client Details
            </Typography>
            <CloseIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={handleCloseDetails}
            />
          </Box>
          <ClientDetails client={selectedClient} />
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
      <DeleteClientDialog
        open={openDelete}
        client={rowItem}
        success={success}
        handleClose={() => setOpenDelete(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const DeleteClientDialog = (props: IDeleteClientDialog) => {
  const { open, client, success, handleClose, handleDelete } = props;

  const [deleteError, setDeleteError] = useState<string>();

  const handleDeleteError = (error?: string) => {
    setDeleteError(error);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">
        <Typography fontSize={18}>
          Are you sure you want to delete {client?.firstName} {client?.lastName}
          ?
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
            handleDelete({ client, handleClose, handleDeleteError })
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
  rowItem: IClient;
  success?: string;
  handleOpenEdit: () => void;
  handleDelete: (props: {
    client: IClient;
    handleClose: () => void;
    handleDeleteError: (error?: string) => void;
  }) => void;
}

interface IDeleteClientDialog {
  open: boolean;
  client: IClient;
  success?: string;
  handleClose: () => void;
  handleDelete: (props: {
    client: IClient;
    handleClose: () => void;
    handleDeleteError: (error?: string) => void;
  }) => void;
}
