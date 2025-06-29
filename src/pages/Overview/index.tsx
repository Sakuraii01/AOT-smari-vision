import { Navbar } from "../../component/navbar/navbar";
import useViewModel from "./viewModel";
import { OverallFilter } from "../../component/filter";
const Overview = () => {
  const { overviewData } = useViewModel();
  return (
    <div>
      <Navbar>
        <div className="mb-10">
          <h1 className="title">Welcome to AOT Smart Vision</h1>
          <p className="text-text-1 text-sm">
            Web Analyze passenger behavior, visualize airport trends, and
            explore strategic insights in real-time.
          </p>
        </div>
        <p className="font-semibold text-text-1 italic">
          This summary covers strategic observations from 1 – 12 Aug 2018 at CNX
          (Chiang Mai Airport).
        </p>
        <div className="mt-7">
          <OverallFilter />
        </div>
        <div>
          <div className="grid grid-cols-10 card my-10">
            <div className="col-span-2 border-r border-secondary-11 pr-10 mr-10 text-right">
              <p className="text-text-1 font-semibold text-xs">
                {overviewData?.passengers[0].title}
              </p>
              <p className="text-3xl font-bold text-green-600">
                {overviewData?.passengers[0].value}
              </p>
              <p className="text-xs">(+10.2%)</p>
            </div>
            <div className="col-span-8 flex flex-wrap gap-4">
              {overviewData &&
                overviewData.passengers.map(
                  (data, key) =>
                    key !== 0 && (
                      <div
                        key={key}
                        className="w-2/7 bg-white border border-border-1 px-6 py-5 rounded-lg"
                      >
                        <p className="font-semibold text-xs text-text-1 mb-1">
                          {data.title}
                        </p>
                        <p className="text-xl font-bold">{data.value}</p>
                      </div>
                    )
                )}
            </div>
          </div>
          <div className="grid grid-cols-10 card">
            <div className="col-span-2 border-r border-secondary-11 pr-10 mr-10 text-right">
              <p className="text-text-1 font-semibold text-xs">
                {overviewData?.stores[0].title}
              </p>
              <p className="text-3xl font-bold text-green-600">
                {overviewData?.stores[0].value}
              </p>
              <p className="text-xs">(+5.6%)</p>
            </div>
            <div className="col-span-8 flex flex-wrap gap-4 ">
              {overviewData &&
                overviewData.stores.map(
                  (data, key) =>
                    key !== 0 && (
                      <div
                        key={key}
                        className="w-2/7 bg-white border border-border-1 px-6 py-5 rounded-lg"
                      >
                        <p className="font-semibold text-xs text-text-1 mb-1">
                          {data.title}
                        </p>
                        <p className="text-xl font-bold">{data.value}</p>
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};
export default Overview;
