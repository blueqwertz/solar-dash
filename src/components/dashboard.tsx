import {
  Grid,
  Title,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Col,
  Card,
} from "@tremor/react";

import ForecastChart from "./charts/forecast-tomorrow";
import BatteryLastDay from "./charts/battery-last-day";
import LiveData from "./livedata";
import { DailyChart } from "./charts/daily-chart";

export default function Dashboard() {
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
            <LiveData />
            <div className="mt-6">
              <Card>
                <Title>Tagesverlauf</Title>
                <DailyChart />
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <Grid numItems={1} className="mt-6 gap-6">
              <Col>
                <ForecastChart />
              </Col>
              <Col>
                <BatteryLastDay />
              </Col>
            </Grid>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
}
