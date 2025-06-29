import { useState, useEffect } from "react";
type WaitingZoneData = {
  passengers: number;
  avg_time: number;
  time: string;
};
const useViewModel = () => {
  const [waitingZoneData, setWaitingZoneData] = useState<
    WaitingZoneData[] | null
  >(null);
  const fetchWaitingZoneData = async () => {
    const response = await fetch("/data/waitingZone.json");
    const data = await response.json();

    return data;
  };
  const chartSetting = {
    yAxis: [
      {
        label: "People",
        width: 60,
      },
      {
        label: "Time",
        width: 60,
      },
    ],
    height: 300,
  };
  useEffect(() => {
    fetchWaitingZoneData().then((data) => {
      setWaitingZoneData(data);
    });
  }, []);
  return { chartSetting, waitingZoneData };
};
export default useViewModel;
