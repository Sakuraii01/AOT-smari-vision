import { useState, useEffect } from "react";
type OverviewData = {
  passengers: {
    title: string;
    value: string;
  }[];
  stores: {
    title: string;
    value: string;
  }[];
};
const useViewModel = () => {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const fetchOverviewData = async () => {
    const response = await fetch("/data/overall.json");
    const data = await response.json();

    return data;
  };
  useEffect(() => {
    fetchOverviewData().then((data) => {
      setOverviewData(data);
    });
  }, []);
  return { overviewData };
};
export default useViewModel;
