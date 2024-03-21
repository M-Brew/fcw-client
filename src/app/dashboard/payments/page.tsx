import Card from "@mui/material/Card";

import PaymentTable from "@/components/payments/PaymentTable";

export default function Payments() {
  return (
    <Card variant="outlined" elevation={0}>
      <PaymentTable />
    </Card>
  );
}
