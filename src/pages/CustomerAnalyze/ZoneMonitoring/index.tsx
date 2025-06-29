import useViewModel from "./viewModel";
import { BarChart } from "@mui/x-charts";
import { DownLoadButton } from "../../../component/download";
import { OverallFilter } from "../../../component/filter";
const ZoneMonitoring = () => {
  const { waitingZoneData, chartSetting } = useViewModel();
  return (
    <div>
      <section>
        <p className="title">ZoneMonitoring</p>
        <p className="font-semibold">
          This summary covers strategic observations from 1 – 12 Aug 2018 at CNX
          (Chiang Mai Airport).
        </p>
      </section>
      <div className="mt-10">
        <OverallFilter />
      </div>
      <div className="flex mt-20">
        <BarChart
          dataset={waitingZoneData || []} // Avoid passing `undefined`, just use empty array
          xAxis={[{ dataKey: "time" }]}
          series={[
            { dataKey: "avg_time", label: "Average Time" },
            { dataKey: "passengers", label: "Total passengers" },
          ]}
          {...chartSetting}
        />{" "}
        <div>
          <div className="card w-fit h-fit my-10">
            <p className="text-text-1 font-bold mb-3">Key Outputs:</p>
            <ul className="list-disc ml-6">
              <li>Hot & Cold Zones by Footfall and Dwell Time</li>
              <li>Rent Adjustment Matrix: High vs Low Traffic + Dwell</li>
              <li>Peak Hour Heatmap for Dynamic Pricing</li>
            </ul>
          </div>
          <div className="w-fit ml-auto text-right">
            <DownLoadButton />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ZoneMonitoring;
