import dayjs from "dayjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const batteryRouter = createTRPCRouter({
  completeHistory: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.energyData.findMany({});
  }),
  todayHistory: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.energyData.findMany({
      where: {
        timestamp: {
          gte: dayjs().add(-24, "hour").toDate(),
          lte: dayjs().toDate(),
        },
      },
    });
  }),
});
