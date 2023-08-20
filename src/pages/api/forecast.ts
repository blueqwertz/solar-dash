import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ForecastResponse = {
  result: {
    watts: Record<string, number>;
    watt_hours_period: Record<string, number>;
    watt_hours: Record<string, number>;
    watt_hours_day: Record<string, number>;
  };
  message: {
    code: number;
    type: string;
    text: string;
    pid: string;
    info: {
      latitude: number;
      longitude: number;
      distance: number;
      place: string;
      timezone: string;
      time: string;
      time_utc: string;
    };
    ratelimit: {
      period: number;
      limit: number;
      remaining: number;
    };
  };
};

const handleWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
  let responseSet = false;

  setTimeout(() => {
    if (responseSet) return;
    res.status(500).json({
      message: "Timeout reached!",
    });
  }, 5000);

  try {
    // eslint-disable-next-line
    const response = await fetch(
      "https://api.forecast.solar/estimate/48.114109/16.265310/35/-10/5.4.json"
    );
    // eslint-disable-next-line
    const data: ForecastResponse = await response.json();

    console.log(data);

    const removeAnswer = await prisma.forecast.deleteMany({
      where: {
        timestamp: {
          gte: dayjs().startOf("day").toDate(),
          lte: dayjs().add(1, "day").endOf("day").toDate(),
        },
      },
    });

    const createAnswer = await prisma.forecast.createMany({
      data: Object.entries(data.result.watts).map(([timestamp, watts]) => {
        return { timestamp: new Date(timestamp), watts };
      }),
    });

    res.status(200).json({
      error: {
        code: "success",
        message: "Forecast updated",
        removeAnswer,
        createAnswer,
        limit: data.message.ratelimit.remaining,
      },
    });
    responseSet = true;
  } catch (error) {
    res.status(404).json({
      error: {
        code: "error",
        message: "Error fetching data",
        errorMessage: error,
      },
    });
    responseSet = true;
  }
};

export default handleWebhook;
