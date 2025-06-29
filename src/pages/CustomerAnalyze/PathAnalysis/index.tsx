import { DownLoadButton } from "../../../component/download";
import { OverallFilter } from "../../../component/filter";
const PathAnalyze = () => {
  return (
    <div>
      <section>
        <p className="title">PathAnalyze</p>
        <p className="font-semibold">
          This summary covers strategic observations from 1 – 12 Aug 2018 at CNX
          (Chiang Mai Airport).
        </p>
      </section>
      <div className="mt-10">
        <OverallFilter />
      </div>
      <div className="card h-fit my-10 flex-1">
        <p className="text-text-1 font-bold mb-3">Key KPIs:</p>

        <ul className="list-disc ml-6">
          <li>Footfall vs POS Revenue</li>
          <li>Customer Journey: Entry → Store → Exit</li>
          <li>Intl vs Domestic Spending Patterns</li>
        </ul>
      </div>
      <div className="ml-auto w-fit">
        <DownLoadButton />
      </div>

      <iframe
        src="/chiangmai_airport_sankey.html"
        width="100%"
        height="700px"
      />
    </div>
  );
};
export default PathAnalyze;
