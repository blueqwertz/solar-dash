import {
  AreaChart,
  Card,
  LineChart,
  Title,
  ValueFormatter,
} from "@tremor/react";
import dayjs, { Dayjs } from "dayjs";
import { api } from "~/utils/api";
import { DailyChart } from "./daily-chart";

const dataFormatter: ValueFormatter = (number: number) => {
  return Math.round(number).toString() + " W";
};

export default function ForecastChart() {
  const { data, isLoading } = api.forecast.nextForecast.useQuery();

  if (isLoading || !data) {
    return <>Loading...</>;
  }

  return (
    <Card>
      <Title>Vorhersage Morgen</Title>
      <LineChart
        connectNulls={true}
        data={
          data.map((entry) => {
            return {
              timestamp: dayjs(entry.timestamp).format("HH:mm"),
              Vorhersage: entry.watts,
            };
          }) ?? [{ timestamp: dayjs().format("HH:mm") }]
        }
        className="mt-6"
        index={"timestamp"}
        colors={["neutral"]}
        categories={["Vorhersage"]}
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
