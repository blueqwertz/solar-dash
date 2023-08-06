"use client";

import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Flex,
  ProgressBar,
  DeltaBar,
  Col,
} from "@tremor/react";

import { useEffect, useState } from "react";
import HistoryChart from "./chart";

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

export default function Dashboard() {
  const [data, setData] = useState<FlowResponse | undefined>(undefined);

  useEffect(() => {
    void fetchData();
    setInterval(() => {
      void fetchData();
    }, 5000);
  }, []);

  const fetchData = async () => {
    try {
      // eslint-disable-next-line
      const response = await fetch(
        "https://pv.blueqwertz.at/solar_api/v1/GetPowerFlowRealtimeData.fcgi"
      );

      // eslint-disable-next-line
      const jsonData: FlowResponse | undefined = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Title>PV Kunigundberg</Title>

      <TabGroup>
        <TabList>
          <Tab>Übersicht</Tab>
          <Tab>Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid
              numItems={1}
              numItemsMd={2}
              numItemsLg={4}
              className="mt-6 gap-6"
            >
              <Col numColSpan={1}>
                <Card>
                  <Title>Produktion</Title>
                  <Flex>
                    <Text>
                      {Math.round(data?.Body?.Data?.Site?.P_PV ?? 0)} W &bull;{" "}
                      {Math.round(
                        (Math.round(data?.Body?.Data?.Site?.P_PV ?? 0) / 5400) *
                          100
                      )}
                      %
                    </Text>
                    <Text>
                      Heute:{" "}
                      {Math.round(
                        (data?.Body?.Data?.Site?.E_Day ?? 0) / 100 ?? 0
                      ) / 10}{" "}
                      KWh
                    </Text>
                  </Flex>
                  <ProgressBar
                    value={
                      (Math.round(data?.Body?.Data?.Site?.P_PV ?? 0) / 5400) *
                      100
                    }
                    color="green"
                    className="mt-3"
                  />
                </Card>
              </Col>
              <Col numColSpan={1}>
                <Card>
                  <Title>Verbrauch</Title>
                  <Flex>
                    <Text>
                      {-Math.round(data?.Body?.Data?.Site?.P_Load ?? 0)} W
                    </Text>
                  </Flex>
                  <ProgressBar
                    value={
                      (-Math.round(data?.Body?.Data?.Site?.P_Load ?? 0) /
                        5400) *
                      100
                    }
                    color="red"
                    className="mt-3"
                  />
                </Card>
              </Col>
              <Col numColSpan={1}>
                <Card>
                  <Title>Netz</Title>
                  <Flex>
                    <Text>
                      {-Math.round(data?.Body?.Data?.Site?.P_Grid ?? 0)} W
                    </Text>
                  </Flex>
                  <DeltaBar
                    value={Math.round(data?.Body?.Data?.Site?.P_Grid ?? 0) * 2}
                    isIncreasePositive={true}
                    className="mt-3"
                  />
                </Card>
              </Col>
              <Col numColSpan={1}>
                <Card>
                  <Title>Batterie</Title>
                  <Flex>
                    <Text>
                      {Math.round(data?.Body?.Data?.Inverters?.["1"]?.SOC ?? 0)}{" "}
                      %
                    </Text>
                  </Flex>
                  <ProgressBar
                    value={Math.round(
                      data?.Body?.Data?.Inverters?.["1"]?.SOC ?? 0
                    )}
                    className="mt-3"
                  />
                </Card>
              </Col>
            </Grid>
            <div className="mt-6">
              <HistoryChart />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6"></div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}
