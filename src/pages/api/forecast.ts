import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

type ForecastEntry = {
  pv_estimate: number;
  pv_estimate10: number;
  pv_estimate90: number;
  period_end: string;
  period: string;
};

type ForecastResponse = {
  forecasts: ForecastEntry[];
};

const handleWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
  let responseSent = false;

  setTimeout(() => {
    if (responseSent) return;
    res.status(500).json({
      message: "Timeout reached!",
    });
  }, 5000);

  try {
    // eslint-disable-next-line
    const response = await fetch(
      `https://api.solcast.com.au/rooftop_sites/09d0-9ee0-85b6-5f9d/forecasts?format=json&api_key=${env.SOLCAST_API_KEY}`,
      { method: "GET", redirect: "follow" }
    );
    console.log(response.status, response.statusText, response.body);
    // eslint-disable-next-line
    const data: ForecastResponse = await response.json();

    if (!data) {
      res.status(505).json({
        error: {
          code: "error",
          message: "Error fetching data",
        },
      });
      responseSent = true;
    }

    const removeAnswer = await prisma.forecast.deleteMany({
      where: {
        timestamp: {
          gte: dayjs(data?.forecasts?.[0]?.period_end).toDate(),
          lte: dayjs().add(2, "day").endOf("day").toDate(),
        },
      },
    });

    const createAnswer = await prisma.forecast.createMany({
      data: data.forecasts.map((entry) => {
        entry.pv_estimate = entry.pv_estimate * 1000;
        return {
          timestamp: new Date(entry.period_end),
          watts: entry.pv_estimate,
        };
      }),
    });

    res.status(200).json({
      error: {
        code: "success",
        message: "Forecast updated",
        removeAnswer,
        createAnswer,
      },
    });
    responseSent = true;
  } catch (error) {
    res.status(505).json({
      error: {
        code: "error",
        message: "Error fetching data",
        errorMessage: error,
      },
    });
    responseSent = true;
  }
};

export default handleWebhook;
