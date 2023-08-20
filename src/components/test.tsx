import { Card, Title } from "@tremor/react";
import dayjs from "dayjs";
import { Loader } from "lucide";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";
import { api } from "~/utils/api";

export function Example() {
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
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={entries}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <CartesianGrid
            strokeDasharray="3 3"
            verticalCoordinatesGenerator={(props) => []}
          />
          <YAxis yAxisId={"watt"} hide={true} />
          <YAxis yAxisId={"percent"} hide={true} />
          {/* <Tooltip isAnimationActive={false} /> */}
          <Area
            type="monotone"
            dataKey="powerPV"
            name="Produktion"
            color="#82ca9d"
            fill="url(#colorPv)"
            dot={false}
            strokeWidth={2}
            yAxisId={"watt"}
            stroke="#22c55e"
          />
          <Area
            type="monotone"
            dataKey="powerGrid"
            stroke="#ef4444"
            fill="url(#colorUsage)"
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
            stroke="#f59e0b"
            dot={false}
            yAxisId={"watt"}
            strokeWidth={2}
            name="Verbrauch"
          />
          <Line
            type="monotone"
            dataKey="watts"
            stroke="#22c55e"
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
