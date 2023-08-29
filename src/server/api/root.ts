import { createTRPCRouter } from "~/server/api/trpc";
import { historyRouter } from "./routers/history";
import { forecastRouter } from "./routers/forecast";
import { batteryRouter } from "./routers/battery";
import { liveRouter } from "./routers/live";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  history: historyRouter,
  forecast: forecastRouter,
  battery: batteryRouter,
  live: liveRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
