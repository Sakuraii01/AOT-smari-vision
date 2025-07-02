"use client";

import { useState } from "react";
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Building, TrendingUp, Download } from "lucide-react";

interface LongTermPlanningProps {
  airport: string;
}

export default function LongTermPlanning({ airport }: LongTermPlanningProps) {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  // Sample store data for CNX long-term planning
  const storeData = [
    {
      id: 1,
      name: "Premium Coffee Corner",
      type: "F&B",
      zone: "A",
      area: 85,
      rentRate: 1200,
      sales: 650000,
      sharePct: 8,
    },
    {
      id: 2,
      name: "Northern Craft Souvenir",
      type: "Retail",
      zone: "B",
      area: 120,
      rentRate: 900,
      sales: 480000,
      sharePct: 12,
    },
    {
      id: 3,
      name: "Express Massage Spa",
      type: "Service",
      zone: "C",
      area: 95,
      rentRate: 1100,
      sales: 380000,
      sharePct: 15,
    },
    {
      id: 4,
      name: "Local Food Court",
      type: "F&B",
      zone: "A",
      area: 150,
      rentRate: 1400,
      sales: 820000,
      sharePct: 10,
    },
    {
      id: 5,
      name: "Tech & Travel Accessories",
      type: "Retail",
      zone: "D",
      area: 75,
      rentRate: 1000,
      sales: 420000,
      sharePct: 9,
    },
    {
      id: 6,
      name: "Lanna Cultural Shop",
      type: "Retail",
      zone: "B",
      area: 110,
      rentRate: 950,
      sales: 520000,
      sharePct: 11,
    },
    {
      id: 7,
      name: "Healthy Juice Bar",
      type: "F&B",
      zone: "C",
      area: 60,
      rentRate: 1300,
      sales: 380000,
      sharePct: 8,
    },
    {
      id: 8,
      name: "Bookstore & Cafe",
      type: "F&B",
      zone: "A",
      area: 130,
      rentRate: 1150,
      sales: 590000,
      sharePct: 9,
    },
    {
      id: 9,
      name: "Pharmacy & Wellness",
      type: "Service",
      zone: "D",
      area: 80,
      rentRate: 1050,
      sales: 320000,
      sharePct: 12,
    },
    {
      id: 10,
      name: "Fashion Boutique",
      type: "Retail",
      zone: "B",
      area: 100,
      rentRate: 1250,
      sales: 680000,
      sharePct: 10,
    },
    {
      id: 11,
      name: "Artisan Bakery",
      type: "F&B",
      zone: "C",
      area: 70,
      rentRate: 1400,
      sales: 450000,
      sharePct: 8,
    },
    {
      id: 12,
      name: "Electronics Store",
      type: "Retail",
      zone: "D",
      area: 90,
      rentRate: 1100,
      sales: 520000,
      sharePct: 9,
    },
    {
      id: 13,
      name: "Thai Dessert Corner",
      type: "F&B",
      zone: "A",
      area: 55,
      rentRate: 1350,
      sales: 320000,
      sharePct: 10,
    },
    {
      id: 14,
      name: "Luggage & Bags",
      type: "Retail",
      zone: "C",
      area: 85,
      rentRate: 1000,
      sales: 380000,
      sharePct: 11,
    },
    {
      id: 15,
      name: "Currency Exchange Plus",
      type: "Service",
      zone: "D",
      area: 45,
      rentRate: 1500,
      sales: 280000,
      sharePct: 15,
    },
  ];

  const zones = ["A", "B", "C", "D"];
  const storeTypes = ["F&B", "Retail", "Service"];

  // Calculate totals
  const totalArea = storeData.reduce((sum, store) => sum + store.area, 0);
  const totalFixedRent = storeData.reduce(
    (sum, store) => sum + store.area * store.rentRate * 12,
    0
  );
  const totalRevShare = storeData.reduce(
    (sum, store) => sum + ((store.sales * store.sharePct) / 100) * 12,
    0
  );
  const totalRevenue = totalFixedRent + totalRevShare;

  // Generate 12-month forecast
  const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);
  const monthlyRevenue = months.map((_, index) => {
    const baseRevenue = totalRevenue / 12;
    const growth = Math.pow(1.02, index); // 2% monthly growth
    return Math.round(baseRevenue * growth);
  });

  const chartData = months.map((month, index) => ({
    month,
    revenue: monthlyRevenue[index],
  }));

  const downloadReport = () => {
    const csvContent = [
      [
        "Store Name",
        "Type",
        "Zone",
        "Area (sqm)",
        "Rent Rate",
        "Fixed Rent/mo",
        "Rev Share %",
        "Sales/mo",
        "Total Revenue/mo",
      ],
      ...storeData.map((store) => [
        store.name,
        store.type,
        store.zone,
        store.area,
        store.rentRate,
        store.area * store.rentRate,
        store.sharePct + "%",
        store.sales,
        store.area * store.rentRate + (store.sales * store.sharePct) / 100,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `cnx_longterm_planning_${
      new Date().toISOString().split("T")[0]
    }.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            การวางแผนระยะยาว - สนามบินเชียงใหม่
          </h2>
          <p className="text-gray-600 mt-1">
            วางแผนการพัฒนาโซนค้าปลีกใหม่และคาดการณ์รายได้ระยะยาว
          </p>
        </div>
        <Button onClick={downloadReport} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          ดาวน์โหลดรายงาน
        </Button>
      </div>

      {/* Summary Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            สรุปภาพรวมโซน (คำนวณอัตโนมัติ)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {totalArea.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">พื้นที่รวม (ตร.ม.)</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {zones.length}
              </div>
              <div className="text-sm text-gray-600">จำนวนโซน</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                ฿{(totalFixedRent / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">ค่าเช่าคงที่ 12 เดือน</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                ฿{(totalRevShare / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">แบ่งรายได้ 12 เดือน</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                ฿{(totalRevenue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">รายได้รวม 12 เดือน</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Projection Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            คาดการณ์รายได้รวม - 12 เดือนข้างหน้า
          </CardTitle>
          <CardDescription>
            สมมติฐาน: การเติบโต 2% ต่อเดือน, ค่าเช่าคงที่
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "รายได้รวม (บาท)",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: any) => [
                  `฿${value?.toLocaleString()}`,
                  "รายได้",
                ]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Zone Filter */}
      <Card>
        <CardHeader>
          <CardTitle>เลือกโซนเพื่อดูรายละเอียด</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedZone === null ? "default" : "outline"}
              onClick={() => setSelectedZone(null)}
            >
              ทุกโซน
            </Button>
            {zones.map((zone) => (
              <Button
                key={zone}
                variant={selectedZone === zone ? "default" : "outline"}
                onClick={() => setSelectedZone(zone)}
              >
                โซน {zone}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Store Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            รายละเอียดร้านค้า ({selectedZone ? `โซน ${selectedZone}` : "ทุกโซน"}
            )
          </CardTitle>
          <CardDescription>
            ข้อมูลร้านค้าตัวอย่าง{" "}
            {selectedZone
              ? storeData.filter((s) => s.zone === selectedZone).length
              : storeData.length}{" "}
            ร้าน
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">#</th>
                  <th className="text-left p-2">ชื่อร้าน</th>
                  <th className="text-left p-2">ประเภท</th>
                  <th className="text-center p-2">โซน</th>
                  <th className="text-right p-2">พื้นที่ ตร.ม.</th>
                  <th className="text-right p-2">ค่าเช่า บาท/ตร.ม.</th>
                  <th className="text-right p-2">ค่าเช่าคงที่ /เดือน</th>
                  <th className="text-right p-2">แบ่งรายได้ %</th>
                  <th className="text-right p-2">ยอดขาย /เดือน</th>
                  <th className="text-right p-2">รายได้รวม /เดือน</th>
                </tr>
              </thead>
              <tbody>
                {storeData
                  .filter(
                    (store) =>
                      selectedZone === null || store.zone === selectedZone
                  )
                  .map((store, index) => (
                    <tr key={store.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2 font-medium">{store.name}</td>
                      <td className="p-2">
                        <Badge variant="outline">{store.type}</Badge>
                      </td>
                      <td className="p-2 text-center">{store.zone}</td>
                      <td className="p-2 text-right">{store.area}</td>
                      <td className="p-2 text-right">
                        {store.rentRate.toLocaleString()}
                      </td>
                      <td className="p-2 text-right">
                        {(store.area * store.rentRate).toLocaleString()}
                      </td>
                      <td className="p-2 text-right">{store.sharePct}%</td>
                      <td className="p-2 text-right">
                        {store.sales.toLocaleString()}
                      </td>
                      <td className="p-2 text-right font-semibold">
                        {(
                          store.area * store.rentRate +
                          (store.sales * store.sharePct) / 100
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Insights */}
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลเชิงลึกเชิงกลยุทธ์</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">โอกาสการเติบโต</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>โซน A:</strong> มีศักยภาพสูงสำหรับร้าน F&B เพิ่มเติม
                </li>
                <li>
                  • <strong>โซน B:</strong> เหมาะสำหรับร้านค้าปลีกและของที่ระลึก
                </li>
                <li>
                  • <strong>โซน C:</strong> เหมาะสำหรับบริการและสุขภาพ
                </li>
                <li>
                  • <strong>โซน D:</strong> เหมาะสำหรับเทคโนโลยีและบริการทั่วไป
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">คำแนะนำการลงทุน</h4>
              <ul className="space-y-2 text-sm">
                <li>• ลงทุนในร้าน F&B ให้ผลตอบแทนสูงสุด</li>
                <li>• ร้านค้าปลีกมีความเสถียรและความเสี่ยงต่ำ</li>
                <li>• บริการมีอัตราแบ่งรายได้สูงแต่ยอดขายต่ำกว่า</li>
                <li>• ควรกระจายความเสี่ยงในทุกประเภทธุรกิจ</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
