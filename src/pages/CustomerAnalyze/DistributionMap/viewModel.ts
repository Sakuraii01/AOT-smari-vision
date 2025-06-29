import { useState, useEffect } from "react";
type RetailData = {
  passengers: number;
  time: string;
};
const useViewModel = () => {
  const [RetailData, setRetailData] = useState<RetailData[] | null>(null);
  const fetchRetailData = async () => {
    const response = await fetch("/data/retail.json");
    const data = await response.json();

    return data;
  };
  const chartSetting = {
    yAxis: [
      {
        label: "People",
        width: 60,
      },
    ],
    height: 500,
  };
  useEffect(() => {
    fetchRetailData().then((data) => {
      setRetailData(data);
    });
  }, []);
  return { chartSetting, RetailData };
};
export default useViewModel;
