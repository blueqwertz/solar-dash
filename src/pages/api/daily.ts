import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface Inverter {
  Battery_Mode: string;
  DT: number;
  E_Day: number;
  E_Total: number;
  E_Year: number;
  P: number;
  SOC: number;
}

interface Site {
  BatteryStandby: boolean;
  E_Day: number;
  E_Total: number;
  E_Year: number;
  Meter_Location: string;
  Mode: string;
  P_Akku: number;
  P_Grid: number;
  P_Load: number;
  P_PV: number;
  rel_Autonomy: number;
  rel_SelfConsumption: number;
}

interface Data {
  // eslint-disable-next-line
  Inverters: { [key: string]: Inverter };
  Site: Site;
  Version: string;
}

interface Status {
  Code: number;
  Reason: string;
  UserMessage: string;
}

interface Head {
  RequestArguments: object;
  Status: Status;
  Timestamp: string;
}

interface FlowResponse {
  Body: {
    Data: Data;
  };
  Head: Head;
}

const handleWebhook = async (req: NextApiRequest, res: NextApiResponse) => {
  setTimeout(
    () =>
      res.status(500).json({
        message: "Timeout reached!",
      }),
    5000
  );

  try {
    // eslint-disable-next-line
    const response = await fetch(
      "https://pv.blueqwertz.at/solar_api/v1/GetPowerFlowRealtimeData.fcgi"
    );
    // eslint-disable-next-line
    const data: FlowResponse = await response.json();

    const prismaRequest = await prisma.dailyEnergyData.create({
      data: {
        eDay: data?.Body.Data.Site.E_Day ?? 0,
        eTotal: data?.Body.Data.Site.E_Total ?? 0,
        eYear: data?.Body.Data.Site.E_Year ?? 0,
        timestamp: new Date(data?.Head.Timestamp ?? new Date().toDateString()),
      },
    });

    res.status(200).json({
      error: {
        code: "success",
        message: "History created",
        requestAnswer: prismaRequest,
      },
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
