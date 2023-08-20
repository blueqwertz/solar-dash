import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handleWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const dailyUsage =
      await prisma.$queryRaw`SELECT SUM(powerPV)/12 FROM EnergyData WHERE timestamp >= "2023-08-20T00:00:00.000Z" AND timestamp <= "2023-08-20T23:59:59.000Z"`;
    res.status(200).json({
      dailyUsage,
    });
  } catch (error) {
    res.status(404).json({
      error: {
        code: "error",
        message: "Error fetching data",
      },
    });
  }
};

export default handleWebhook;
