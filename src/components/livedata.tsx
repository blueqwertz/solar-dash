import {
  Card,
  Grid,
  Title,
  Text,
  Flex,
  ProgressBar,
  DeltaBar,
  Col,
} from "@tremor/react";
import { DailyChart } from "./charts/daily-chart";
import { api } from "~/utils/api";

function LiveData() {
  const { data, isLoading } = api.live.liveData.useQuery();

  if (isLoading) return <>Loading...</>;
  if (!data) return <>Loading...</>;

  return (
    <>
      <Grid numItems={1} numItemsMd={2} numItemsLg={4} className="mt-6 gap-6">
        <Col numColSpan={1}>
          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <Title>Produktion</Title>
            <Flex>
              <Text>
                {Math.round(data?.Body?.Data?.Site?.P_PV ?? 0)} W &bull;{" "}
                {Math.round(
                  (Math.round(data?.Body?.Data?.Site?.P_PV ?? 0) / 5400) * 100
                )}
                %
              </Text>
              <Text>
                Heute:{" "}
                {Math.round((data?.Body?.Data?.Site?.E_Day ?? 0) / 100 ?? 0) /
                  10}{" "}
                KWh
              </Text>
            </Flex>
            <ProgressBar
              value={
                (Math.round(data?.Body?.Data?.Site?.P_PV ?? 0) / 5400) * 100
              }
              color="green"
              className="mt-3"
            />
          </Card>
        </Col>
        <Col numColSpan={1}>
          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <Title>Verbrauch</Title>
            <Flex>
              <Text>{-Math.round(data?.Body?.Data?.Site?.P_Load ?? 0)} W</Text>
            </Flex>
            <ProgressBar
              value={
                (-Math.round(data?.Body?.Data?.Site?.P_Load ?? 0) / 5400) * 100
              }
              color="red"
              className="mt-3"
            />
          </Card>
        </Col>
        <Col numColSpan={1}>
          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <Title>Netzbezug</Title>
            <Flex>
              <Text>{Math.round(data?.Body?.Data?.Site?.P_Grid ?? 0)} W</Text>
            </Flex>
            <DeltaBar
              value={-Math.round(data?.Body?.Data?.Site?.P_Grid ?? 0)}
              isIncreasePositive={true}
              className="mt-3"
            />
          </Card>
        </Col>
        <Col numColSpan={1}>
          <Card className="cursor-pointer transition-all hover:shadow-lg">
            <Title>Batterie</Title>
            <Flex>
              <Text>
                {Math.round(data?.Body?.Data?.Inverters?.["1"]?.SOC ?? 0)} %
              </Text>
            </Flex>
            <ProgressBar
              value={Math.round(data?.Body?.Data?.Inverters?.["1"]?.SOC ?? 0)}
              className="mt-3"
            />
          </Card>
        </Col>
      </Grid>
    </>
  );
}

export default LiveData;
