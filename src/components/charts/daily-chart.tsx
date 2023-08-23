import {
  AreaChart,
  Card,
  LineChart,
  Title,
  ValueFormatter,
} from "@tremor/react";
import dayjs, { Dayjs } from "dayjs";
import { api } from "~/utils/api";
import { Example } from "../test";

const dataFormatter: ValueFormatter = (number: number) => {
  return Math.round(number).toString() + " W";
};

export default function HistoryChart() {
  const { data: history } = api.history.todayHistory.useQuery();

  const { data: forecast } = api.forecast.todayForecast.useQuery();

  const entries = [];

  if (!history || !forecast) {
    return <>Loading...</>;
  }

  let currentTime = dayjs().startOf("day");

  while (currentTime.isBefore(dayjs().endOf("day"))) {
    const matchingHistoryEntry = history?.find(
      (entry) => currentTime.diff(dayjs(entry.timestamp), "minute") < 1
    );
    const matchingForecastEntry = forecast?.find(
      (entry) =>
        currentTime.diff(dayjs(entry.timestamp), "minute") >= 0 &&
        currentTime.diff(dayjs(entry.timestamp), "minute") < 1
    );

    // if (matchingHistoryEntry || matchingForecastEntry) {
    //   entries.push({
    //     Verbrauch: matchingHistoryEntry?.powerLoad,
    //     Produktion: matchingHistoryEntry?.powerPV,
    //     Netzbezug: matchingHistoryEntry?.powerGrid,
    //     Batteriebezug: matchingHistoryEntry?.powerAkku,
    //     Vorhersage: matchingForecastEntry?.watts,
    //     timestamp: currentTime.format("HH:mm"),
    //   });
    // }

    if (matchingHistoryEntry) {
      entries.push({
        Verbrauch: matchingHistoryEntry.powerLoad,
        Produktion: matchingHistoryEntry.powerPV,
        Netzbezug: matchingHistoryEntry.powerGrid,
        Batteriebezug: matchingHistoryEntry.powerAkku,

        timestamp: currentTime.format("HH:mm"),
      });
    } else if (matchingForecastEntry) {
      entries.push({
        Vorhersage: matchingForecastEntry.watts,
        timestamp: currentTime.format("HH:mm"),
      });
    } else {
      entries.push({
        timestamp: currentTime.format("HH:mm"),
      });
    }

    currentTime = currentTime.add(5, "minute");
  }

  return (
    <Card>
      <Title>Tagesverlauf</Title>
      <LineChart
        connectNulls={true}
        data={[...entries]}
        index={"timestamp"}
        colors={["orange", "green", "red", "sky", "neutral"]}
        categories={[
          "Verbrauch",
          "Produktion",
          "Netzbezug",
          "Batteriebezug",
          "Vorhersage",
        ]}
        curveType="natural"
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
