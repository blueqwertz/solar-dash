import dayjs from "dayjs";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const historyRouter = createTRPCRouter({
  completeHistory: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.energyData.findMany({});
  }),
  todayHistory: publicProcedure.query(({ ctx }) => {
    const today = dayjs().startOf("day");
    return ctx.prisma.energyData.findMany({
      where: {
        timestamp: {
          gte: today.toDate(),
          lte: new Date(),
        },
      },
    });
  }),
});
