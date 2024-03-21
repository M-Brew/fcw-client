import Card from "@mui/material/Card";
import RevenueCollectorTable from "@/components/revenue-collectors/RevenueCollectorTable";

export default function RevenueCollectors() {
  return (
    <Card variant="outlined" elevation={0}>
      <RevenueCollectorTable />
    </Card>
  );
}
