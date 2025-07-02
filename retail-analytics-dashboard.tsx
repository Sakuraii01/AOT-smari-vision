"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import {
  Users,
  TrendingUp,
  Clock,
  MapPin,
  Activity,
  Eye,
  Filter,
} from "lucide-react";

const hourlyData = [
  { time: "09:00", count: 12, avgDwell: 3.2 },
  { time: "10:00", count: 28, avgDwell: 4.1 },
  { time: "11:00", count: 45, avgDwell: 5.3 },
  { time: "12:00", count: 67, avgDwell: 6.8 },
  { time: "13:00", count: 89, avgDwell: 7.2 },
  { time: "14:00", count: 76, avgDwell: 6.5 },
  { time: "15:00", count: 92, avgDwell: 8.1 },
  { time: "16:00", count: 108, avgDwell: 9.3 },
  { time: "17:00", count: 134, avgDwell: 10.2 },
  { time: "18:00", count: 156, avgDwell: 11.5 },
  { time: "19:00", count: 142, avgDwell: 9.8 },
  { time: "20:00", count: 98, avgDwell: 7.4 },
  { time: "21:00", count: 54, avgDwell: 5.1 },
];

const weeklyData = [
  { day: "จันทร์", visitors: 1240, conversion: 12.3 },
  { day: "อังคาร", visitors: 1180, conversion: 11.8 },
  { day: "พุธ", visitors: 1350, conversion: 13.2 },
  { day: "พฤหัส", visitors: 1420, conversion: 14.1 },
  { day: "ศุกร์", visitors: 1680, conversion: 16.2 },
  { day: "เสาร์", visitors: 2340, conversion: 18.7 },
  { day: "อาทิตย์", visitors: 2180, conversion: 17.4 },
];

const zoneData = [
  { zone: "ทางเข้าหลัก", visitors: 2340, percentage: 28.5, color: "#8884d8" },
  { zone: "โซนเสื้อผ้า", visitors: 1890, percentage: 23.1, color: "#82ca9d" },
  { zone: "โซนรองเท้า", visitors: 1456, percentage: 17.8, color: "#ffc658" },
  {
    zone: "โซนเครื่องสำอาง",
    visitors: 1234,
    percentage: 15.1,
    color: "#ff7300",
  },
  { zone: "โซนอาหาร", visitors: 987, percentage: 12.0, color: "#00ff88" },
  { zone: "ทางออก", visitors: 287, percentage: 3.5, color: "#ff0088" },
];

const demographicData = [
  { group: "เด็ก (0-12)", count: 234, percentage: 8.9, color: "#8884d8" },
  { group: "วัยรุ่น (13-25)", count: 789, percentage: 30.1, color: "#82ca9d" },
  { group: "ผู้ใหญ่ (26-45)", count: 1023, percentage: 39.0, color: "#ffc658" },
  { group: "ผู้สูงอายุ (46+)", count: 578, percentage: 22.0, color: "#ff7300" },
];

export default function Component() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [selectedZone, setSelectedZone] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#445fac]">
              ระบบวิเคราะห์การเดินของลูกค้า
            </h1>
            <p className="text-gray-600 mt-1">
              วิเคราะห์พฤติกรรมและการเคลื่อนไหวของลูกค้าในพื้นที่ร้านค้า
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">วันนี้</SelectItem>
                <SelectItem value="week">สัปดาห์นี้</SelectItem>
                <SelectItem value="month">เดือนนี้</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              ตัวกรอง
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                ผู้เยี่ยมชมวันนี้
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> จากเมื่อวาน
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                เวลาเฉลี่ยในร้าน
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.4 นาที</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> จากเมื่อวาน
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                อัตราการซื้อ
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.7%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">-1.2%</span> จากเมื่อวาน
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">โซนยอดนิยม</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">โซนเสื้อผ้า</div>
              <p className="text-xs text-muted-foreground">
                23.1% ของผู้เยี่ยมชมทั้งหมด
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="traffic" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="traffic">การเดินทาง</TabsTrigger>
            <TabsTrigger value="zones">โซนพื้นที่</TabsTrigger>
            <TabsTrigger value="demographics">ประชากรศาสตร์</TabsTrigger>
            <TabsTrigger value="heatmap">แผนที่ความร้อน</TabsTrigger>
          </TabsList>

          <TabsContent value="traffic" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>การเดินทางรายชั่วโมง</CardTitle>
                  <CardDescription>จำนวนผู้เยี่ยมชมตลอดทั้งวัน</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      count: {
                        label: "จำนวนคน",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <AreaChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="var(--color-count)"
                        fill="var(--color-count)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>การเดินทางรายสัปดาห์</CardTitle>
                  <CardDescription>
                    เปรียบเทียบจำนวนผู้เยี่ยมชมแต่ละวัน
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      visitors: {
                        label: "ผู้เยี่ยมชม",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="visitors" fill="var(--color-visitors)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>เวลาเฉลี่ยในแต่ละช่วงเวลา</CardTitle>
                <CardDescription>
                  ระยะเวลาที่ลูกค้าใช้ในร้านแต่ละชั่วโมง
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    avgDwell: {
                      label: "เวลาเฉลี่ย (นาที)",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="avgDwell"
                      stroke="var(--color-avgDwell)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zones" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>การกระจายตัวตามโซน</CardTitle>
                  <CardDescription>
                    สัดส่วนผู้เยี่ยมชมในแต่ละพื้นที่
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      visitors: {
                        label: "ผู้เยี่ยมชม",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <PieChart>
                      <Pie
                        data={zoneData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="visitors"
                        label={({ zone, percentage }) =>
                          `${zone}: ${percentage}%`
                        }
                      >
                        {zoneData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>รายละเอียดโซน</CardTitle>
                  <CardDescription>
                    ข้อมูลการเยี่ยมชมแต่ละพื้นที่
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {zoneData.map((zone, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: zone.color }}
                          />
                          <div>
                            <p className="font-medium">{zone.zone}</p>
                            <p className="text-sm text-gray-600">
                              {zone.visitors.toLocaleString()} คน
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{zone.percentage}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>กลุ่มอายุผู้เยี่ยมชม</CardTitle>
                  <CardDescription>การแบ่งกลุ่มตามช่วงอายุ</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      count: {
                        label: "จำนวน",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <BarChart data={demographicData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="group" type="category" width={100} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count">
                        {demographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>สถิติประชากรศาสตร์</CardTitle>
                  <CardDescription>รายละเอียดกลุ่มผู้เยี่ยมชม</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {demographicData.map((demo, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: demo.color }}
                          />
                          <div>
                            <p className="font-medium">{demo.group}</p>
                            <p className="text-sm text-gray-600">
                              {demo.count.toLocaleString()} คน
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">{demo.percentage}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>แผนที่ความร้อนของร้าน</CardTitle>
                <CardDescription>
                  พื้นที่ที่มีการเดินมากที่สุด (สีแดง = มาก, สีเขียว = น้อย)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg p-8 h-96">
                  {/* Store Layout Simulation */}
                  <div className="absolute inset-4 border-2 border-gray-300 rounded">
                    {/* Entrance */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-red-500 opacity-80 rounded-t">
                      <span className="text-xs text-white font-bold absolute top-0 left-1/2 transform -translate-x-1/2">
                        ทางเข้า
                      </span>
                    </div>

                    {/* Clothing Zone */}
                    <div className="absolute top-4 left-4 w-24 h-20 bg-red-400 opacity-70 rounded">
                      <span className="text-xs text-white font-bold p-1">
                        เสื้อผ้า
                      </span>
                    </div>

                    {/* Shoes Zone */}
                    <div className="absolute top-4 right-4 w-24 h-20 bg-orange-400 opacity-70 rounded">
                      <span className="text-xs text-white font-bold p-1">
                        รองเท้า
                      </span>
                    </div>

                    {/* Cosmetics Zone */}
                    <div className="absolute bottom-16 left-4 w-24 h-16 bg-yellow-400 opacity-70 rounded">
                      <span className="text-xs text-white font-bold p-1">
                        เครื่องสำอาง
                      </span>
                    </div>

                    {/* Food Zone */}
                    <div className="absolute bottom-16 right-4 w-24 h-16 bg-green-400 opacity-70 rounded">
                      <span className="text-xs text-white font-bold p-1">
                        อาหาร
                      </span>
                    </div>

                    {/* Center Walkway */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-32 bg-red-300 opacity-60 rounded"></div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow">
                    <div className="text-xs font-bold mb-1">ความหนาแน่น</div>
                    <div className="flex items-center gap-1 text-xs">
                      <div className="w-3 h-3 bg-green-400 rounded"></div>
                      <span>น้อย</span>
                      <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                      <span>ปานกลาง</span>
                      <div className="w-3 h-3 bg-red-400 rounded"></div>
                      <span>มาก</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Real-time Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              สถานะปัจจุบัน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">ผู้คนในร้านตอนนี้</p>
                  <p className="text-2xl font-bold text-green-600">127 คน</p>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">ความหนาแน่น</p>
                  <p className="text-2xl font-bold text-blue-600">ปานกลาง</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">เวลาเฉลี่ยล่าสุด</p>
                  <p className="text-2xl font-bold text-purple-600">9.2 นาที</p>
                </div>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
