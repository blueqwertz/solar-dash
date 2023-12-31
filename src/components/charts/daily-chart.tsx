import dayjs from "dayjs";
import {
  Line,
  ComposedChart,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { api } from "~/utils/api";
import { CustomTooltip } from "./tooltip";

export function DailyChart() {
  const { data: history } = api.history.todayHistory.useQuery();
  const { data: forecast } = api.forecast.todayForecast.useQuery();

  if (!history || !forecast) {
    return <>Loading...</>;
  }

  const entries = [];

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

    if (matchingHistoryEntry) {
      entries.push({
        ...matchingHistoryEntry,
        timestamp: currentTime.format("HH:mm"),
      });
    } else if (matchingForecastEntry) {
      entries.push({
        ...matchingForecastEntry,
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
    <div className="mt-6 h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={entries}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            verticalCoordinatesGenerator={(props) => []}
          />
          <YAxis yAxisId={"watt"} hide={true} />
          <YAxis yAxisId={"percent"} hide={true} />
          <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="powerPV"
            name="Produktion"
            color="#82ca9d"
            dot={false}
            strokeWidth={2}
            yAxisId={"watt"}
            stroke="#22c55e"
          />
          <Line
            type="monotone"
            dataKey="powerGrid"
            name="Netzbezug"
            stroke="#ef4444"
            dot={false}
            yAxisId={"watt"}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="powerAkku"
            stroke="#0ea5e9"
            dot={false}
            yAxisId={"watt"}
            strokeWidth={2}
            name="Batteriebezug"
          />
          <Line
            type="monotone"
            dataKey="powerLoad"
            stroke="#f97316"
            dot={false}
            yAxisId={"watt"}
            strokeWidth={2}
            name="Verbrauch"
          />
          <Line
            type="monotone"
            dataKey="watts"
            stroke="#a3a3a3"
            dot={false}
            yAxisId={"watt"}
            strokeWidth={2}
            strokeDasharray={"3 3"}
            connectNulls={true}
            name="Vorhersage"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
