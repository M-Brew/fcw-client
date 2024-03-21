import Card from "@mui/material/Card";

import InvoicesTable from "@/components/invoices/InvoicesTable";

export default function Invoices() {
  return (
    <Card variant="outlined" elevation={0}>
      <InvoicesTable />
    </Card>
  );
}