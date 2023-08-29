import dayjs from "dayjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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

export const liveRouter = createTRPCRouter({
  liveData: publicProcedure.query(async ({ ctx }) => {
    try {
      // eslint-disable-next-line
      const response = await fetch(
        "https://pv.blueqwertz.at/solar_api/v1/GetPowerFlowRealtimeData.fcgi"
      );

      // eslint-disable-next-line
      const jsonData: FlowResponse | undefined = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
      return;
    }
  }),
});
