import { Card, Title, LineChart, ValueFormatter } from "@tremor/react";
import { api } from "~/utils/api";

const dataFormatter: ValueFormatter = () => {
  return "";
};

export default function HistoryChart() {
  const { data } = api.history.completeHistory.useQuery();

  return (
    <Card>
      <LineChart
        data={data!}
        index={"timestamp"}
        colors={["emerald", "gray"]}
        categories={["powerLoad", "powerPV"]}
        valueFormatter={dataFormatter}
      />
    </Card>
  );
}
