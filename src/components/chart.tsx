import { AreaChart, Card, Title, ValueFormatter } from "@tremor/react";
import dayjs from "dayjs";
import { api } from "~/utils/api";

const dataFormatter: ValueFormatter = (number: number) => {
  return Math.round(number).toString() + " W";
};

export default function HistoryChart() {
  const { data } = api.history.todayHistory.useQuery();

  return (
    <Card>
      <Title>Tageshistorie</Title>
      <AreaChart
        className="mt-6"
        data={
          data?.map((entry) => {
            return {
              Verbrauch: entry.powerLoad,
              Produktion: entry.powerPV,
              Netzbezug: entry.powerGrid,
              Datum: dayjs(entry.timestamp).format("HH:mm"),
              Batterie: entry.batteryCharge,
              Batteriebezug: entry.powerAkku,
            };
          }) ?? [{}]
        }
        index={"Datum"}
        colors={["orange", "green", "red", "fuchsia"]}
        categories={["Verbrauch", "Produktion", "Netzbezug", "Batteriebezug"]}
        valueFormatter={dataFormatter}
        showLegend={false}
        showYAxis={false}
        showXAxis={false}
        // showGridLines={false}
        showAnimation={false}
      />
    </Card>
  );
}
