"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download } from "lucide-react";

interface PathAnalysisProps {
  airport: string;
  date: string;
  dateRange?: { from: Date | undefined; to: Date | undefined };
}

export default function PathAnalysis({
  airport,
  date,
  dateRange,
}: PathAnalysisProps) {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [sankeyChart, setSankeyChart] = useState<any>(null);

  // Sankey data for CNX
  const pathData = {
    nodes: [
      "Entrance",
      "Check-in",
      "Shop - Dom.",
      "Shop - Inter.",
      "Lounge",
      "Gate DOM",
      "Gate INT",
      "Exit (Visitors)",
      "Gate Out (Staff)",
    ],
    links: [
      {
        source: 0,
        target: 1,
        value: 13200,
        cluster: "All",
        label: "Entrance → Check-in",
      },
      {
        source: 1,
        target: 8,
        value: 600,
        cluster: "Staff",
        label: "Check-in → Staff Exit",
      },
      {
        source: 1,
        target: 5,
        value: 4000,
        cluster: "Dom Direct",
        label: "Check-in → Gate DOM",
      },
      {
        source: 1,
        target: 6,
        value: 2500,
        cluster: "Int Direct",
        label: "Check-in → Gate INT",
      },
      {
        source: 1,
        target: 2,
        value: 2200,
        cluster: "Dom Shop",
        label: "Check-in → Shop Dom",
      },
      {
        source: 1,
        target: 3,
        value: 900,
        cluster: "Int Shop",
        label: "Check-in → Shop Inter",
      },
      {
        source: 1,
        target: 4,
        value: 1000,
        cluster: "Dom Lounge",
        label: "Check-in → Lounge",
      },
      {
        source: 1,
        target: 7,
        value: 2000,
        cluster: "Visitor",
        label: "Check-in → Exit",
      },
      {
        source: 2,
        target: 5,
        value: 1500,
        cluster: "Dom Shop",
        label: "Shop Dom → Gate DOM",
      },
      {
        source: 2,
        target: 4,
        value: 700,
        cluster: "Dom Shop",
        label: "Shop Dom → Lounge",
      },
      {
        source: 3,
        target: 6,
        value: 900,
        cluster: "Int Shop",
        label: "Shop Inter → Gate INT",
      },
      {
        source: 4,
        target: 5,
        value: 1700,
        cluster: "Dom Lounge",
        label: "Lounge → Gate DOM",
      },
    ],
  };

  const clusterSummary = [
    {
      cluster: "Staff",
      people: 600,
      share: 4.5,
      color: "#f59e0b",
      description: "พนักงานและเจ้าหน้าที่สนามบิน",
    },
    {
      cluster: "Dom Direct",
      people: 4000,
      share: 30.3,
      color: "#10b981",
      description: "ผู้โดยสารภายในประเทศที่เดินตรงไป Gate",
    },
    {
      cluster: "Int Direct",
      people: 2500,
      share: 18.9,
      color: "#3b82f6",
      description: "ผู้โดยสารต่างประเทศที่เดินตรงไป Gate",
    },
    {
      cluster: "Dom Shop",
      people: 4400,
      share: 33.3,
      color: "#8b5cf6",
      description: "ผู้โดยสารภายในประเทศที่ใช้บริการร้านค้า",
    },
    {
      cluster: "Int Shop",
      people: 900,
      share: 6.8,
      color: "#ec4899",
      description: "ผู้โดยสารต่างประเทศที่ใช้บริการร้านค้า",
    },
    {
      cluster: "Dom Lounge",
      people: 2700,
      share: 20.5,
      color: "#14b8a6",
      description: "ผู้โดยสารภายในประเทศที่ใช้บริการ Lounge",
    },
    {
      cluster: "Visitor",
      people: 2000,
      share: 15.2,
      color: "#f87171",
      description: "ผู้มาส่งหรือรับผู้โดยสาร",
    },
  ];

  // Initialize Plotly Sankey Chart
  useEffect(() => {
    const loadPlotly = async () => {
      if (typeof window !== "undefined") {
        const Plotly = await import("plotly.js-dist-min");

        const clusterColorsMap: { [key: string]: string } = {
          All: "#9ca3af",
          Staff: "#f59e0b",
          "Dom Direct": "#10b981",
          "Int Direct": "#3b82f6",
          "Dom Shop": "#8b5cf6",
          "Int Shop": "#ec4899",
          "Dom Lounge": "#14b8a6",
          Visitor: "#f87171",
        };

        const linkColors = pathData.links.map(
          (link) => clusterColorsMap[link.cluster]
        );

        const data = [
          {
            type: "sankey" as const,
            orientation: "h" as const,
            node: {
              pad: 15,
              thickness: 18,
              line: { width: 0.5, color: "#888" },
              label: pathData.nodes,
              color: "#0ea5e9",
              hovertemplate: "%{label}<br>จุดในเส้นทาง<extra></extra>",
            },
            link: {
              source: pathData.links.map((link) => link.source),
              target: pathData.links.map((link) => link.target),
              value: pathData.links.map((link) => link.value),
              color: linkColors,
              customdata: pathData.links.map((link) => link.cluster),
              hovertemplate:
                "%{source.label} ➜ %{target.label}<br>" +
                "Cluster: %{customdata}<br>" +
                "จำนวนคน: %{value:,}<extra></extra>",
            },
          },
        ];

        Plotly.newPlot("sankeyChart", data, {
          margin: { t: 30, l: 0, r: 0, b: 10 },
          font: { size: 14 },
        });

        setSankeyChart(Plotly);
      }
    };

    loadPlotly();
  }, []);

  const downloadCSV = () => {
    const csvContent = [
      ["Cluster", "People", "Share (%)", "Description"],
      ...clusterSummary.map((item) => [
        item.cluster,
        item.people,
        item.share.toFixed(1),
        item.description,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `cnx_path_analysis_${date}.csv`;
    link.click();
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              การวิเคราะห์เส้นทางผู้โดยสาร - สนามบินเชียงใหม่
            </h2>
            <p className="text-gray-600 mt-1">
              แสดงการเคลื่อนไหวและพฤติกรรมของผู้โดยสารในพื้นที่ต่างๆ ของสนามบิน
            </p>
          </div>
          <Button onClick={downloadCSV} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            ดาวน์โหลด CSV
          </Button>
        </div>

        {/* Sankey Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>แผนภาพการไหลของผู้โดยสาร (Sankey Diagram)</CardTitle>
            <CardDescription>
              แสดงเส้นทางการเดินทางของผู้โดยสารจากจุดเข้าสู่จุดออก
              พร้อมจำนวนคนในแต่ละเส้นทาง
            </CardDescription>
          </CardHeader>
          <CardContent>
            <iframe
              src="/chiangmai_airport_sankey.html"
              width="100%"
              height="700px"
            />
            <div
              id="sankeyChart"
              style={{ width: "100%", height: "720px" }}
            ></div>
            <p className="text-sm text-gray-600 mt-4">
              ตัวเลขเป็นตัวอย่างเพื่อแสดงโครงสร้าง – ดึงข้อมูลจริงมาแทน value
              ของแต่ละลิงก์ได้ทันที
            </p>
          </CardContent>
        </Card>

        {/* Cluster Summary */}
        <Card>
          <CardHeader>
            <CardTitle>สรุปตาม Cluster</CardTitle>
            <CardDescription>
              การจัดกลุ่มผู้โดยสารตามพฤติกรรมการเดินทาง
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clusterSummary.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedCluster === item.cluster
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() =>
                        setSelectedCluster(
                          selectedCluster === item.cluster ? null : item.cluster
                        )
                      }
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <Badge variant="secondary">
                          {item.share.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="font-semibold text-lg">
                        {item.cluster}
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {item.people.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">คน</div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="max-w-xs">
                      <p className="font-semibold">{item.cluster}</p>
                      <p className="text-sm">{item.description}</p>
                      <p className="text-sm mt-1">
                        จำนวน: {item.people.toLocaleString()} คน (
                        {item.share.toFixed(1)}%)
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Table */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Summary by Cluster</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left">
                      Cluster
                    </th>
                    <th className="border border-gray-300 p-3 text-right">
                      People
                    </th>
                    <th className="border border-gray-300 p-3 text-right">
                      Share (%)
                    </th>
                    <th className="border border-gray-300 p-3 text-left">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clusterSummary.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="font-medium">{item.cluster}</span>
                        </div>
                      </td>
                      <td className="border border-gray-300 p-3 text-right font-semibold">
                        {item.people.toLocaleString()}
                      </td>
                      <td className="border border-gray-300 p-3 text-right">
                        {item.share.toFixed(1)}%
                      </td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-600">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Path Table */}
        <Card>
          <CardHeader>
            <CardTitle>รายละเอียดเส้นทาง</CardTitle>
            <CardDescription>
              ข้อมูลการเคลื่อนไหวแต่ละเส้นทางพร้อมจำนวนผู้โดยสาร
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">เส้นทาง</th>
                    <th className="text-right p-3">จำนวนคน</th>
                    <th className="text-center p-3">Cluster</th>
                    <th className="text-right p-3">% ของทั้งหมด</th>
                  </tr>
                </thead>
                <tbody>
                  {pathData.links.map((link, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <tr className="border-b hover:bg-gray-50 cursor-pointer">
                          <td className="p-3 font-medium">{link.label}</td>
                          <td className="p-3 text-right">
                            {link.value.toLocaleString()}
                          </td>
                          <td className="p-3 text-center">
                            <Badge
                              variant="outline"
                              style={{
                                borderColor: clusterSummary.find(
                                  (c) => c.cluster === link.cluster
                                )?.color,
                                color: clusterSummary.find(
                                  (c) => c.cluster === link.cluster
                                )?.color,
                              }}
                            >
                              {link.cluster}
                            </Badge>
                          </td>
                          <td className="p-3 text-right">
                            {((link.value / 13200) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-semibold">{link.label}</p>
                          <p className="text-sm">Cluster: {link.cluster}</p>
                          <p className="text-sm">
                            จำนวน: {link.value.toLocaleString()} คน
                          </p>
                          <p className="text-sm">
                            สัดส่วน: {((link.value / 13200) * 100).toFixed(1)}%
                            ของทั้งหมด
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลเชิงลึก</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">พฤติกรรมที่สำคัญ</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    • <strong>33.3%</strong>{" "}
                    ของผู้โดยสารใช้บริการร้านค้าในโซนภายใน
                  </li>
                  <li>
                    • <strong>30.3%</strong> เดินทางตรงไปยัง Gate ภายในประเทศ
                  </li>
                  <li>
                    • <strong>20.5%</strong> ใช้บริการ Lounge ก่อนขึ้นเครื่อง
                  </li>
                  <li>
                    • <strong>15.2%</strong> เป็นผู้มาส่งหรือรับผู้โดยสาร
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">คำแนะนำ</h4>
                <ul className="space-y-2 text-sm">
                  <li>• เพิ่มร้านค้าในโซนภายในเพื่อรองรับความต้องการ</li>
                  <li>• ปรับปรุงป้ายบอกทางไป Gate ภายในประเทศ</li>
                  <li>• พิจารณาขยาย Lounge เพื่อรองรับผู้ใช้บริการ</li>
                  <li>• จัดพื้นที่รอสำหรับผู้มาส่งให้เหมาะสม</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
