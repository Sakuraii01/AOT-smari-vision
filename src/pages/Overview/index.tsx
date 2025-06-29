import { Navbar } from "../../component/navbar/navbar";
import useViewModel from "./viewModel";
const Overview = () => {
  const { overviewData } = useViewModel();
  return (
    <div>
      <Navbar>
        <div className="mb-10">
          <h1 className="font-semibold text-3xl">
            Welcome to AOT Smart Vision
          </h1>
          <p>
            Web Analyze passenger behavior, visualize airport trends, and
            explore strategic insights in real-time.
          </p>
        </div>
        <p className="font-semibold">
          This summary covers strategic observations from 1 – 12 Aug 2018 at CNX
          (Chiang Mai Airport).
        </p>
        <div>
          <div className="flex bg-bg-2 px-10 py-5 my-10">
            <div className="border-r border-border-1 pr-10 mr-10">
              <p>{overviewData?.passengers[0].title}</p>
              <p>{overviewData?.passengers[0].value}</p>
            </div>
            <div className="flex gap-4 flex-1">
              {overviewData &&
                overviewData.passengers.map(
                  (data, key) =>
                    key !== 0 && (
                      <div
                        key={key}
                        className="w-full bg-primary-1 px-6 py-5 rounded-lg"
                      >
                        <p className="font-semibold text-xs text-text-1 mb-1">
                          {data.title}
                        </p>
                        <p className="text-xl">{data.value}</p>
                      </div>
                    )
                )}
            </div>
          </div>
          {/* <hr className="my-10 border-border-1" /> */}
          <div className="flex bg-bg-2 px-10 py-5 my-10">
            <div className="border-r border-border-1 pr-20 mr-10">
              <p>{overviewData?.stores[0].title}</p>
              <p>{overviewData?.stores[0].value}</p>
            </div>
            <div className="flex gap-4 flex-1">
              {overviewData &&
                overviewData.stores.map(
                  (data, key) =>
                    key !== 0 && (
                      <div
                        key={key}
                        className="w-full bg-primary-1 px-6 py-5 rounded-lg"
                      >
                        <p className="font-semibold text-xs text-text-1 mb-1">
                          {data.title}
                        </p>
                        <p className="text-xl">{data.value}</p>
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
