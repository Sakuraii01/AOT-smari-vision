import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [openSubItem, setOpenSubItem] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navItem = [
    {
      name: "Overview",
      path: "/overview",
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
    <div className="flex">
      <div className="w-64 fixed h-full left-0 top-0 bg-white shadow px-5">
        <img
          src="/full-icon.png"
          className="pt-8 pb-4 border-b border-border-2"
        />
        <ul className="pt-8 flex flex-col gap-6">
          {navItem.map((item, index) => (
            <li
              className={`px-4 flex justify-between bg-gradient-to-br ${
                location.pathname === item.path
                  ? "from-secondary-11 to-primary-1 text-white"
                  : "bg-white text-text-1"
              } py-3 rounded hover:bg-secondary-3 transition-all duration-200 ease-in-out`}
              onClick={() => {
                if (item.name === "Customer Analyze")
                  setOpenSubItem(!openSubItem);
                else navigate(item.path);
              }}
              key={index}
            >
              <p>{item.name}</p>
              <div>
                {item.name === "Customer Analyze" &&
                  (openSubItem ? (
                    <KeyboardArrowUpRounded />
                  ) : (
                    <KeyboardArrowDownRounded />
                  ))}
              </div>
            </li>
          ))}

          <ul className="flex flex-col gap-4">
            {openSubItem &&
              customerAnalyzeSubItem.map((subItem, index) => (
                <li
                  className={`px-4 bg-gradient-to-br ${
                    location.pathname === subItem.path
                      ? "from-secondary-11 to-primary-1 text-white"
                      : "bg-white text-text-1"
                  } py-3 rounded hover:bg-secondary-3 transition-all duration-200 ease-in-out`}
                  onClick={() => navigate(subItem.path)}
                  key={index}
                >
                  {subItem.name}
                </li>
              ))}
          </ul>
        </ul>
      </div>
      <div className="w-3/4 ml-72 my-10">{children}</div>
    </div>
  );
};
