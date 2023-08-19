import dayjs from "dayjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const forecastRouter = createTRPCRouter({
  todayForecast: publicProcedure.query(async ({ ctx }) => {
    const now = dayjs().startOf("day");
    const endOfDay = dayjs().endOf("day");
    const forecastData = await ctx.prisma.forecast.findMany({
      where: {
        timestamp: {
          gte: now.toDate(),
          lte: endOfDay.toDate(),
        },
      },
    });

    // Interpolate the forecast values
    const interpolatedForecastData: {
      id: string;
      watts: number;
      timestamp: Date;
    }[] = [];

    for (let i = 0; i < forecastData.length - 1; i++) {
      const currentEntry = forecastData[i];
      const nextEntry = forecastData[i + 1];

      if (currentEntry) {
        interpolatedForecastData.push(currentEntry);
      }

      if (currentEntry && nextEntry) {
        const interval =
          nextEntry.timestamp.getTime() - currentEntry.timestamp.getTime();
        const steps = interval / (5 * 60 * 1000); // Number of 5-minute intervals
        const wattsIncrement = (nextEntry.watts - currentEntry.watts) / steps;

        for (let j = 1; j < steps; j++) {
          const interpolatedTimestamp = new Date(
            currentEntry.timestamp.getTime() + j * (5 * 60 * 1000)
          );
          const interpolatedWatts = currentEntry.watts + j * wattsIncrement;

          interpolatedForecastData.push({
            id: currentEntry.id,
            timestamp: interpolatedTimestamp,
            watts: interpolatedWatts,
          });
        }
      }
    }

    return interpolatedForecastData;
  }),
});
