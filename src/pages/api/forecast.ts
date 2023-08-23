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
    const debug = false;

    if (!debug) {
      // eslint-disable-next-line
      const response = await fetch(
        `https://api.solcast.com.au/rooftop_sites/09d0-9ee0-85b6-5f9d/forecasts?format=json&api_key=${env.SOLCAST_API_KEY}&time_zone='utc'`,
        { method: "GET", redirect: "follow" }
      );
      console.log(response.status, response.statusText, response.body);
      // eslint-disable-next-line
      var data: ForecastResponse = await response.json();
    } else {
      var data = {
        forecasts: [
          {
            pv_estimate: 1.4365,
            pv_estimate10: 1.4365,
            pv_estimate90: 1.4365,
            period_end: "2023-08-22T16:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.9753,
            pv_estimate10: 0.8678,
            pv_estimate90: 0.9753,
            period_end: "2023-08-22T16:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.4959,
            pv_estimate10: 0.4806,
            pv_estimate90: 0.4959,
            period_end: "2023-08-22T17:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.1189,
            pv_estimate10: 0.1036,
            pv_estimate90: 0.1208,
            period_end: "2023-08-22T17:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.021,
            pv_estimate10: 0.014,
            pv_estimate90: 0.022050000000000004,
            period_end: "2023-08-22T18:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T18:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T19:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T19:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T20:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T20:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T21:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T21:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T22:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T22:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T23:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-22T23:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T00:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T00:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T01:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T01:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T02:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T02:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T03:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T03:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T04:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.0223,
            pv_estimate10: 0.0074,
            pv_estimate90: 0.0267,
            period_end: "2023-08-23T04:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.0941,
            pv_estimate10: 0.0347,
            pv_estimate90: 0.098805,
            period_end: "2023-08-23T05:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.2605,
            pv_estimate10: 0.0792,
            pv_estimate90: 0.273525,
            period_end: "2023-08-23T05:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.5026,
            pv_estimate10: 0.13,
            pv_estimate90: 0.5488,
            period_end: "2023-08-23T06:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.7689,
            pv_estimate10: 0.198,
            pv_estimate90: 0.9858,
            period_end: "2023-08-23T06:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.0529,
            pv_estimate10: 0.2768,
            pv_estimate90: 1.4671,
            period_end: "2023-08-23T07:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.3328,
            pv_estimate10: 0.3774,
            pv_estimate90: 1.9476,
            period_end: "2023-08-23T07:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.5967,
            pv_estimate10: 0.4813,
            pv_estimate90: 2.3535,
            period_end: "2023-08-23T08:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.8882,
            pv_estimate10: 0.6104,
            pv_estimate90: 2.7671,
            period_end: "2023-08-23T08:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.1555,
            pv_estimate10: 0.7349,
            pv_estimate90: 3.0907,
            period_end: "2023-08-23T09:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.4222,
            pv_estimate10: 0.8613,
            pv_estimate90: 3.3837,
            period_end: "2023-08-23T09:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.6694,
            pv_estimate10: 0.9819,
            pv_estimate90: 3.5889,
            period_end: "2023-08-23T10:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.9563,
            pv_estimate10: 1.1503,
            pv_estimate90: 3.7393,
            period_end: "2023-08-23T10:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.2805,
            pv_estimate10: 1.3611,
            pv_estimate90: 3.8355,
            period_end: "2023-08-23T11:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.4949,
            pv_estimate10: 1.5091,
            pv_estimate90: 3.8412,
            period_end: "2023-08-23T11:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.6423,
            pv_estimate10: 1.624,
            pv_estimate90: 3.8308,
            period_end: "2023-08-23T12:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.5583,
            pv_estimate10: 1.5968,
            pv_estimate90: 3.7258,
            period_end: "2023-08-23T12:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.2589,
            pv_estimate10: 1.4237,
            pv_estimate90: 3.5357,
            period_end: "2023-08-23T13:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3,
            pv_estimate10: 1.3045,
            pv_estimate90: 3.2865,
            period_end: "2023-08-23T13:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.7772,
            pv_estimate10: 1.1979,
            pv_estimate90: 2.9916,
            period_end: "2023-08-23T14:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.4992,
            pv_estimate10: 1.0678,
            pv_estimate90: 2.6705,
            period_end: "2023-08-23T14:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.1269,
            pv_estimate10: 0.9183,
            pv_estimate90: 2.2695,
            period_end: "2023-08-23T15:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.7138,
            pv_estimate10: 0.7383,
            pv_estimate90: 1.859,
            period_end: "2023-08-23T15:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.1688,
            pv_estimate10: 0.5328,
            pv_estimate90: 1.3858,
            period_end: "2023-08-23T16:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.6839,
            pv_estimate10: 0.3309,
            pv_estimate90: 0.9037,
            period_end: "2023-08-23T16:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.3212,
            pv_estimate10: 0.1285,
            pv_estimate90: 0.4467,
            period_end: "2023-08-23T17:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.0962,
            pv_estimate10: 0.0518,
            pv_estimate90: 0.1106,
            period_end: "2023-08-23T17:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.0142,
            pv_estimate10: 0.0095,
            pv_estimate90: 0.0165,
            period_end: "2023-08-23T18:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T18:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T19:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T19:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T20:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T20:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T21:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T21:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T22:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T22:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T23:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-23T23:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-24T00:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-24T00:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-24T01:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-24T01:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-24T02:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-24T02:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-24T03:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-24T03:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0,
            pv_estimate10: 0,
            pv_estimate90: 0,
            period_end: "2023-08-24T04:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.0245,
            pv_estimate10: 0.015,
            pv_estimate90: 0.0245,
            period_end: "2023-08-24T04:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.08,
            pv_estimate10: 0.076,
            pv_estimate90: 0.08,
            period_end: "2023-08-24T05:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.1444,
            pv_estimate10: 0.13718,
            pv_estimate90: 0.1444,
            period_end: "2023-08-24T05:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 0.55,
            pv_estimate10: 0.4811,
            pv_estimate90: 0.55,
            period_end: "2023-08-24T06:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.0168,
            pv_estimate10: 0.736,
            pv_estimate90: 1.0168,
            period_end: "2023-08-24T06:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.5135,
            pv_estimate10: 1.038,
            pv_estimate90: 1.5135,
            period_end: "2023-08-24T07:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.9832,
            pv_estimate10: 1.3424,
            pv_estimate90: 1.9832,
            period_end: "2023-08-24T07:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.4224,
            pv_estimate10: 1.6556,
            pv_estimate90: 2.4224,
            period_end: "2023-08-24T08:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.809,
            pv_estimate10: 1.9599,
            pv_estimate90: 2.809,
            period_end: "2023-08-24T08:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.1662,
            pv_estimate10: 2.253,
            pv_estimate90: 3.1662,
            period_end: "2023-08-24T09:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.4258,
            pv_estimate10: 2.475,
            pv_estimate90: 3.4258,
            period_end: "2023-08-24T09:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.6744,
            pv_estimate10: 2.6998,
            pv_estimate90: 3.6744,
            period_end: "2023-08-24T10:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.825,
            pv_estimate10: 2.8694,
            pv_estimate90: 3.825,
            period_end: "2023-08-24T10:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.9241,
            pv_estimate10: 3.0232,
            pv_estimate90: 3.9241,
            period_end: "2023-08-24T11:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.935,
            pv_estimate10: 3.1013,
            pv_estimate90: 3.935,
            period_end: "2023-08-24T11:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.9012,
            pv_estimate10: 3.1284,
            pv_estimate90: 3.9012,
            period_end: "2023-08-24T12:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.7864,
            pv_estimate10: 3.0279,
            pv_estimate90: 3.7864,
            period_end: "2023-08-24T12:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.6259,
            pv_estimate10: 2.8452,
            pv_estimate90: 3.6259,
            period_end: "2023-08-24T13:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.3744,
            pv_estimate10: 2.5902,
            pv_estimate90: 3.3744,
            period_end: "2023-08-24T13:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 3.1043,
            pv_estimate10: 2.3355,
            pv_estimate90: 3.1043,
            period_end: "2023-08-24T14:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.7532,
            pv_estimate10: 2.0229,
            pv_estimate90: 2.7532,
            period_end: "2023-08-24T14:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 2.3466,
            pv_estimate10: 1.6866,
            pv_estimate90: 2.3466,
            period_end: "2023-08-24T15:00:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.8943,
            pv_estimate10: 1.3261,
            pv_estimate90: 1.8943,
            period_end: "2023-08-24T15:30:00.0000000Z",
            period: "PT30M",
          },
          {
            pv_estimate: 1.3622,
            pv_estimate10: 0.9127,
            pv_estimate90: 1.4022,
            period_end: "2023-08-24T16:00:00.0000000Z",
            period: "PT30M",
          },
        ],
      };
    }

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
