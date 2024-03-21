import Card from "@mui/material/Card";

import ClientTable from "@/components/clients/ClientTable";

export default function Clients() {
  return (
    <Card variant="outlined" elevation={0}>
      <ClientTable />
    </Card>
  );
}
