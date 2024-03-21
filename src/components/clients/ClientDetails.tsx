import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import clientTypes from "../../data/client-type.json";

export default function ClientDetails(props: IClientDetails) {
  const { client } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  if (!client) {
    return <></>;
  }

  return (
    <Container>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Name:
        </Typography>
        <Typography>
          {client.firstName} {client.lastName}
        </Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Email:
        </Typography>
        <Typography>{client.email}</Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Phone Number:
        </Typography>
        <Typography>{client.phoneNumber}</Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Type:
        </Typography>
        <Typography>
          {clientTypes.find((type) => type.id === client.type)?.name}
        </Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Area:
        </Typography>
        <Typography>{client.area}</Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Street:
        </Typography>
        <Typography>{client.street}</Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          House Number:
        </Typography>
        <Typography>{client.houseNumber}</Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Code:
        </Typography>
        <Typography>{client.code}</Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Number of Bins:
        </Typography>
        <Typography>{client.numberOfBins}</Typography>
      </Box>
    </Container>
  );
}

interface IClientDetails {
  client?: IClient;
}
