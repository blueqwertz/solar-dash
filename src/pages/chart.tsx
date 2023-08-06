import {
  Card,
  Title,
  LineChart,
  ValueFormatter,
  AreaChart,
} from "@tremor/react";
import { api } from "~/utils/api";

const dataFormatter = (number: number) => {
  return Math.round(number).toString() + " W";
};

export default function HistoryChart() {
  const { data } = api.history.completeHistory.useQuery();

  return (
    <Card>
      <LineChart
        data={
          data?.map((entry) => {
            return {
              Verbrauch: entry.powerLoad,
              Produktion: entry.powerPV,
              Netzbezug: entry.powerGrid,
            };
          }) ?? [{}]
        }
        index={"timestamp"}
        colors={["red", "green", "orange"]}
        categories={["Verbrauch", "Produktion", "Netzbezug"]}
        valueFormatter={dataFormatter}
        showXAxis={false}
      />
    </Card>
  );
}
