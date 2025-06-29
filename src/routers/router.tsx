import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "../pages/Overview";
import CustomerAnalyze from "../pages/CustomerAnalyze";
import DistributionMap from "../pages/CustomerAnalyze/DistributionMap";
import PathAnalyze from "../pages/CustomerAnalyze/PathAnalysis";
import ZoneMonitoring from "../pages/CustomerAnalyze/ZoneMonitoring";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/customer-analyze" element={<CustomerAnalyze />}>
          <Route
            path="/customer-analyze/zone-monitoring"
            element={<ZoneMonitoring />}
          />
          <Route
            path="/customer-analyze/path-analyze"
            element={<PathAnalyze />}
          />
          <Route
            path="/customer-analyze/distribution-map"
            element={<DistributionMap />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
