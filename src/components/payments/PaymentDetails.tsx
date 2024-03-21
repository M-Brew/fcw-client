import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function PaymentDetails(props: IPaymentDetails) {
  const { payment } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  if (!payment) {
    return <></>;
  }

  return (
    <Container>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Receipt Number:
        </Typography>
        <Typography>{payment.receiptNumber}</Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Client:
        </Typography>
        <Typography>
          {payment.client.firstName} {payment.client.lastName}
        </Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Revenue Collector:
        </Typography>
        <Typography>
          {payment.revenueCollector.firstName}{" "}
          {payment.revenueCollector.lastName}
        </Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Amount:
        </Typography>
        <Typography>GHC {payment.amount.toFixed(2)}</Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Payment Date:
        </Typography>
        <Typography>
          {new Date(payment.paymentDate).toLocaleDateString("en-uk", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Typography>
      </Box>
      <Box display={matches ? "block" : "flex"} mb={1}>
        <Typography fontWeight={500} mr={1}>
          Remarks:
        </Typography>
        <Typography>{payment.remarks}</Typography>
      </Box>
    </Container>
  );
}

interface IPaymentDetails {
  payment?: IPaymentData;
}
