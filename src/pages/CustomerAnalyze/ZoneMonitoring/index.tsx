import useViewModel from "./viewModel";
import { BarChart } from "@mui/x-charts";
const ZoneMonitoring = () => {
  const { waitingZoneData, chartSetting } = useViewModel();
  return (
    <div>
      <p>ZoneMonitoring</p>
      <BarChart
        dataset={waitingZoneData || []} // Avoid passing `undefined`, just use empty array
        xAxis={[{ dataKey: "time" }]}
        series={[
          { dataKey: "avg_time", label: "Average Time" },
          { dataKey: "passengers", label: "Total passengers" },
        ]}
        {...chartSetting}
      />
    </div>
  );
};
export default ZoneMonitoring;
