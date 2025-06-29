import { Outlet } from "react-router-dom";
import { Navbar } from "../../component/navbar/navbar";
const CustomerAnalyze = () => {
  return (
    <div>
      <Navbar>
        <p>Strategy Summary</p>
        <div>
          <p className="my-2">Strategic Insights</p>
          <ul>
            <li>
              Increase in international passengers during peak hours (9AM–12PM)
            </li>
            <li>
              Shops near Gate B2 show higher conversion rates than other zones
            </li>
            <li>
              Average dwell time in waiting zones is increasing – opportunity
              for services/ads
            </li>
            <li>Most congested paths: G12 → Immigration → B1 → Baggage</li>
          </ul>
        </div>
        <div>
          <p className="my-2">Suggested Actions</p>
          <ul>
            <li>
              1.Deploy mobile kiosks in waiting zones for promotions and digital
              check-in
            </li>
            <li>
              2.Improve signage to reduce congestion at immigration routes
            </li>
            <li>
              3.Enhance staff scheduling at baggage areas during high load
              windows
            </li>
          </ul>
        </div>
        <Outlet />
      </Navbar>
    </div>
  );
};
export default CustomerAnalyze;
