import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

export default function RevenueCollectorDetails(
  props: IRevenueCollectorDetails
) {
  const { revenueCollector } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  if (!revenueCollector) {
    return <></>;
  }

  return (
    <Container>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Name:
        </Typography>
        <Typography>
          {revenueCollector.firstName} {revenueCollector.lastName}
        </Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Phone Number:
        </Typography>
        <Typography>{revenueCollector.phoneNumber}</Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Email:
        </Typography>
        <Typography>{revenueCollector.email}</Typography>
      </Box>
      {revenueCollector.suspended && (
        <Box mb={1}>
          <Chip variant="filled" label="Suspended" />
        </Box>
      )}
    </Container>
  );
}

interface IRevenueCollectorDetails {
  revenueCollector?: IRevenueCollector;
}
