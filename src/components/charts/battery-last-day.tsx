import { Card, LineChart, Title, ValueFormatter } from "@tremor/react";
import dayjs from "dayjs";
import { api } from "~/utils/api";

const dataFormatter: ValueFormatter = (number: number) => {
  return Math.round(number).toString() + " W";
};

export default function BatteryLastDay() {
  const { data, isLoading } = api.battery.todayHistory.useQuery();

  if (isLoading || !data) {
    return <>Loading...</>;
  }

  return (
    <Card>
      <Title>Batteriestand Letzte 24h</Title>
      <LineChart
        connectNulls={true}
        data={
          data.map((entry) => {
            return {
              timestamp: dayjs(entry.timestamp).format("HH:mm"),
              Batteriestand: entry.batteryCharge,
            };
          }) ?? [{ timestamp: dayjs().format("HH:mm") }]
        }
        className="mt-6"
        index={"timestamp"}
        colors={["blue"]}
        categories={["Batteriestand"]}
        curveType="natural"
        valueFormatter={dataFormatter}
        showLegend={false}
        showYAxis={false}
        showXAxis={true}
        // showGridLines={false}
        showAnimation={false}
      />
    </Card>
  );
}
