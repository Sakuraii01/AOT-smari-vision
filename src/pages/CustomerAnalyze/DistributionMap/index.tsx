import { DownLoadButton } from "../../../component/download";
import { OverallFilter, RetailFilter } from "../../../component/filter";
import { BarChart } from "@mui/x-charts";
import useViewModel from "./viewModel";
const DistributionMap = () => {
  const { chartSetting, RetailData } = useViewModel();
  return (
    <div>
      <section>
        <p className="title">DistributionMap</p>
        <p className="font-semibold">
          This summary covers strategic observations from 1 – 12 Aug 2018 at CNX
          (Chiang Mai Airport).
        </p>
      </section>
      <div className="mt-10">
        <OverallFilter />
      </div>
      <div className="card h-fit my-10">
        <p className="text-text-1 font-bold mb-3">Includes:</p>

        <ul className="list-disc ml-6">
          <li>Storefront Traffic, Dwell Time, Entry Rate</li>
          <li>Hourly & Daily Trends, Source Zone</li>
          <li>Benchmarks & Strategy Recommendations</li>
        </ul>
      </div>
      <div className="ml-auto w-fit">
        <DownLoadButton />
      </div>
      <iframe
        src="/Full_Treemap_Airport 2.html"
        width="100%"
        height="600px"
      ></iframe>{" "}
      <div className="mt-3">
        <RetailFilter />
      </div>
      <BarChart
        dataset={RetailData || []} // Avoid passing `undefined`, just use empty array
        xAxis={[{ dataKey: "time" }]}
        series={[{ dataKey: "passengers", label: "Total passengers" }]}
        {...chartSetting}
      />
    </div>
  );
};
export default DistributionMap;
