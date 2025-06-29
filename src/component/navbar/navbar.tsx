import { useNavigate, useLocation } from "react-router-dom";
export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItem = [
    {
      name: "Overview",
      path: "/",
    },
    {
      name: "Customer Analyze",
      path: "/customer-analyze",
    },
  ];
  const customerAnalyzeSubItem = [
    {
      name: "Zone Monitoring",
      path: "/customer-analyze/zone-monitoring",
    },
    {
      name: "Path Analyze",
      path: "/customer-analyze/path-analyze",
    },
    {
      name: "Distribution Map",
      path: "/customer-analyze/distribution-map",
    },
  ];
  return (
    <div>
      <div className="w-64 fixed h-full left-0 top-0 bg-white shadow px-5">
        <img
          src="/full-icon.png"
          className="pt-8 pb-4 border-b border-border-2"
        />
        <ul className="pt-8 flex flex-col gap-6">
          {navItem.map((item, index) => (
            <li
              className={`px-4 ${
                location.pathname === item.path
                  ? "bg-component-2"
                  : "bg-component-1"
              } py-3 rounded`}
              onClick={() => navigate(item.path)}
              key={index}
            >
              {item.name}
            </li>
          ))}

          <ul className="ml-3 flex flex-col gap-4">
            {customerAnalyzeSubItem.map((subItem, index) => (
              <li
                className={`px-4 ${
                  location.pathname === subItem.path
                    ? "bg-component-2"
                    : "bg-component-1"
                } py-3 rounded`}
                onClick={() => navigate(subItem.path)}
                key={index}
              >
                {subItem.name}
              </li>
            ))}
          </ul>
        </ul>
      </div>
      <div className="ml-72 my-10">{children}</div>
    </div>
  );
};
