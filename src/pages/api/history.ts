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
  const id = setTimeout(
    () =>
      res.status(500).json({
        message: "Timeout reached!",
      }),
    5000
  );

  try {
    const response = await fetch(
      "https://pv.blueqwertz.at/solar_api/v1/GetPowerFlowRealtimeData.fcgi"
    );
    var data: FlowResponse | undefined = await response.json();
  } catch (error) {
    res.status(404).json({
      error: {
        code: "error",
        message: "Error fetching data",
      },
    });
  }

  const prismaRequest = await prisma.energyData.create({
    data: {
      batteryMode: data?.Body.Data.Inverters["1"]?.Battery_Mode ?? "",
      dt: data?.Body.Data.Inverters["1"]?.DT ?? 0,
      eDay: data?.Body.Data.Site.E_Day ?? 0,
      eTotal: data?.Body.Data.Site.E_Total ?? 0,
      eYear: data?.Body.Data.Site.E_Year ?? 0,
      batteryCharge: data?.Body.Data.Inverters["1"]?.SOC ?? 0,
      batteryStandby: data?.Body.Data.Site.BatteryStandby ?? false,
      meterLocation: data?.Body.Data.Site.Meter_Location ?? "",
      mode: data?.Body.Data.Site.Mode ?? "",
      powerAkku: data?.Body.Data.Site.P_Akku ?? 0,
      powerGrid: data?.Body.Data.Site.P_Grid ?? 0,
      powerLoad: data?.Body.Data.Site.P_Load ?? 0,
      powerPV: data?.Body.Data.Site.P_PV ?? 0,
      relativeAutonomy: data?.Body.Data.Site.rel_Autonomy ?? 0,
      relativeSelfConsumption: data?.Body.Data.Site.rel_SelfConsumption ?? 0,
      version: data?.Body.Data.Version ?? "",
      date: new Date(
        data?.Head.Timestamp.slice(0, 10) ??
          new Date().toDateString().slice(0, 10)
      ),
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

  res.status(404).json({
    error: {
      code: "not_found",
      message: "The requested endpoint was not found",
    },
  });
};

export default handleWebhook;
