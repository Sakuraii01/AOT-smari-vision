import { Outlet } from "react-router-dom";
import { Navbar } from "../../component/navbar/navbar";
const CustomerAnalyze = () => {
  return (
    <div>
      <Navbar>
        <Outlet />
      </Navbar>
    </div>
  );
};
export default CustomerAnalyze;
