"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Users, Clock, Plane, ShoppingBag, TrendingUp, TrendingDown, Minus } from "lucide-react"

// CNX Airport Data Structure
const cnxAirportData = {
  "ชั้น 1": {
    "Entrances (Doors 1–12)": Array.from({ length: 12 }, (_, i) => ({
      name: `Door ${i + 1}`,
      code: `D${i + 1}`,
    })),
    "Pre-Food": [{ name: "Mini Market Shop", code: "S7,S8" }],
    "Pre-Beverage": [
      { name: "Starbucks Coffee", code: "F6" },
      { name: "Amazon Coffee", code: "F5" },
    ],
    "Pre-Souvenir": [{ name: "Chiangmai Souvenir Shop", code: "S6" }],
    "Post-Beverage": [
      { name: "Doi Chaang Coffee", code: "F10" },
      { name: "Black Canyon Coffee", code: "F2" },
    ],
    "Post-Souvenir": [{ name: "King Power Dutyfree", code: "S12" }],
    "Government / Facility": [
      { name: "Immigration Office", code: "G4" },
      { name: "Customs", code: "G2" },
      { name: "Post Office", code: "G5" },
      { name: "Domestic Check-In", code: "G22" },
      { name: "Visa on Arrival", code: "V1" },
    ],
  },
  "ชั้น 2": {
    "Domestic Gates 1–14": Array.from({ length: 14 }, (_, i) => ({
      name: `Gate DOM ${i + 1}`,
      code: `A${i + 1}`,
    })),
    "International Gates 1–8": Array.from({ length: 8 }, (_, i) => ({
      name: `Gate INT ${i + 1}`,
      code: `B${i + 1}`,
    })),
    Lounge: [
      { name: "Bangkok Airways Lounge", code: "L4" },
      { name: "Coral Executive Lounge", code: "L2,L5" },
      { name: "Thai Royal Orchid Lounge", code: "L1,L3" },
    ],
    "Pre-Food": [
      { name: "Burger King", code: "F14,F22" },
      { name: "Bread Hut", code: "F19" },
    ],
    "Post-Food": [
      { name: "McDonalds", code: "F21" },
      { name: "Subway", code: "F34" },
      { name: "Black Canyon Coffee & Restaurant", code: "F32,F15,F25,F30" },
    ],
    "Post-Beverage": [{ name: "Dairy Queen Ice Cream", code: "F31" }],
    "Government / Facility": [
      { name: "Chiangmai Labour Control", code: "G15" },
      { name: "Immigration (Re-Entry)", code: "G13,G14" },
      { name: "VAT Refund for Tourists Office", code: "G11" },
    ],
  },
}

interface OverviewDashboardProps {
  airport: string
  date: string
  dateRange?: { from: Date | undefined; to: Date | undefined }
}

export default function OverviewDashboard({ airport, date, dateRange }: OverviewDashboardProps) {
  const [selectedFloor, setSelectedFloor] = useState<string>("")
  const [selectedZone, setSelectedZone] = useState<string>("")
  const [selectedPlace, setSelectedPlace] = useState<string>("")

  // Sample data for CNX
  const kpiData = {
    passengers: {
      total: 54200,
      change: 5.2,
      trend: "up",
      description: "จำนวนผู้โดยสารทั้งหมดที่ผ่านเข้าออกสนามบินในวันนี้",
    },
    avgStay: {
      total: "2 ชม. 15 นาที",
      change: -1.8,
      trend: "down",
      description: "ระยะเวลาเฉลี่ยที่ผู้โดยสารใช้ในสนามบินตั้งแต่เข้ามาจนออกไป",
    },
    doors: {
      total: 32800,
      change: 4.1,
      trend: "up",
      description: "จำนวนผู้โดยสารที่ผ่านประตูเข้าออกหลัก (ประตู 1-12)",
    },
    intArrivals: {
      total: 4600,
      change: 6.0,
      trend: "up",
      description: "ผู้โดยสารเที่ยวบินต่างประเทศที่เดินทางมาถึง",
    },
    domArrivals: {
      total: 12400,
      change: -0.9,
      trend: "down",
      description: "ผู้โดยสารเที่ยวบินภายในประเทศที่เดินทางมาถึง",
    },
    intDepartures: {
      total: 4150,
      change: 2.7,
      trend: "up",
      description: "ผู้โดยสารเที่ยวบินต่างประเทศที่เดินทางออก",
    },
    domDepartures: {
      total: 11900,
      change: -1.3,
      trend: "down",
      description: "ผู้โดยสารเที่ยวบินภายในประเทศที่เดินทางออก",
    },
    totalShops: {
      total: 58,
      change: 1,
      trend: "up",
      description: "จำนวนร้านค้าทั้งหมดที่เปิดให้บริการในสนามบิน",
    },
  }

  const hourlyData = [
    { time: "06:00", passengers: 1200, shops: 850 },
    { time: "07:00", passengers: 2100, shops: 1200 },
    { time: "08:00", passengers: 3400, shops: 1800 },
    { time: "09:00", passengers: 4200, shops: 2400 },
    { time: "10:00", passengers: 4800, shops: 2800 },
    { time: "11:00", passengers: 5200, shops: 3200 },
    { time: "12:00", passengers: 5800, shops: 3600 },
    { time: "13:00", passengers: 6200, shops: 3800 },
    { time: "14:00", passengers: 5900, shops: 3500 },
    { time: "15:00", passengers: 6400, shops: 4200 },
    { time: "16:00", passengers: 6800, shops: 4600 },
    { time: "17:00", passengers: 7200, shops: 4800 },
    { time: "18:00", passengers: 6900, shops: 4400 },
    { time: "19:00", passengers: 6200, shops: 3900 },
    { time: "20:00", passengers: 5400, shops: 3200 },
    { time: "21:00", passengers: 4100, shops: 2400 },
    { time: "22:00", passengers: 2800, shops: 1600 },
    { time: "23:00", passengers: 1900, shops: 1100 },
  ]

  const zoneData = [
    {
      zone: "Gate DOM 1-4",
      customers: 8200,
      change: 3.4,
      dwellTime: "3′45″",
      passBy: 5400,
      stopFront: 1200,
      enter: 900,
      avgPass: "12 วินาที",
      avgStay: "4′10″",
      bounceOut: 180,
      description: "โซนประตูขาออกภายในประเทศ ประตู 1-4",
    },
    {
      zone: "Gate INT 1-2",
      customers: 3650,
      change: -2.1,
      dwellTime: "4′30″",
      passBy: 1980,
      stopFront: 450,
      enter: 330,
      avgPass: "14 วินาที",
      avgStay: "5′02″",
      bounceOut: 55,
      description: "โซนประตูขาออกต่างประเทศ ประตู 1-2",
    },
    {
      zone: "Pre-Food Zone",
      customers: 4200,
      change: 1.8,
      dwellTime: "6′15″",
      passBy: 2800,
      stopFront: 680,
      enter: 520,
      avgPass: "18 วินาที",
      avgStay: "8′30″",
      bounceOut: 95,
      description: "โซนร้านอาหารก่อนผ่านจุดตรวจ",
    },
    {
      zone: "Post-Souvenir",
      customers: 2900,
      change: 4.2,
      dwellTime: "12′20″",
      passBy: 1950,
      stopFront: 580,
      enter: 420,
      avgPass: "25 วินาที",
      avgStay: "15′45″",
      bounceOut: 65,
      description: "โซนร้านของที่ระลึกหลังผ่านจุดตรวจ",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Airport Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="w-5 h-5" />
              ตัวกรองพื้นที่ - สนามบินเชียงใหม่ (CNX)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">เลือกชั้น (Floor)</label>
                <Select value={selectedFloor} onValueChange={setSelectedFloor}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกชั้น..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(cnxAirportData).map((floor) => (
                      <SelectItem key={floor} value={floor}>
                        {floor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">เลือกโซน (Zone)</label>
                <Select value={selectedZone} onValueChange={setSelectedZone} disabled={!selectedFloor}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกโซน..." />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedFloor &&
                      Object.keys(cnxAirportData[selectedFloor as keyof typeof cnxAirportData]).map((zone) => (
                        <SelectItem key={zone} value={zone}>
                          {zone}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">เลือกสถานที่ / ร้านค้า</label>
                <Select value={selectedPlace} onValueChange={setSelectedPlace} disabled={!selectedZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสถานที่..." />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedFloor &&
                      selectedZone &&
                      cnxAirportData[selectedFloor as keyof typeof cnxAirportData][
                        selectedZone as keyof (typeof cnxAirportData)[keyof typeof cnxAirportData]
                      ]?.map((place: any) => (
                        <SelectItem key={place.code} value={place.code}>
                          {place.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedPlace && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <strong>รหัสตำแหน่ง:</strong> <span className="font-mono">{selectedPlace}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* KPI Tabs */}
        <Tabs defaultValue="passengers" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="passengers">ผู้โดยสาร</TabsTrigger>
            <TabsTrigger value="gates">ประตู / Gates</TabsTrigger>
            <TabsTrigger value="retail">ร้านค้า & โซน</TabsTrigger>
          </TabsList>

          <TabsContent value="passengers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">จำนวนผู้โดยสารทั้งหมด (วันนี้)</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpiData.passengers.total.toLocaleString()}</div>
                      <p className={`text-xs flex items-center gap-1 ${getTrendColor(kpiData.passengers.change)}`}>
                        {getTrendIcon(kpiData.passengers.trend)}
                        {kpiData.passengers.change > 0 ? "+" : ""}
                        {kpiData.passengers.change}% จากเมื่อวาน
                      </p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs">
                    <p className="font-semibold">จำนวนผู้โดยสารทั้งหมด</p>
                    <p className="text-sm">{kpiData.passengers.description}</p>
                    <p className="text-sm mt-1">ปัจจุบัน: {kpiData.passengers.total.toLocaleString()} คน</p>
                    <p className="text-sm">
                      เปลี่ยนแปลง: {kpiData.passengers.change > 0 ? "+" : ""}
                      {kpiData.passengers.change}%
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">ระยะเวลาเฉลี่ยที่ผู้โดยสารอยู่ในสนามบิน</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpiData.avgStay.total}</div>
                      <p className={`text-xs flex items-center gap-1 ${getTrendColor(kpiData.avgStay.change)}`}>
                        {getTrendIcon(kpiData.avgStay.trend)}
                        {kpiData.avgStay.change}%
                      </p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs">
                    <p className="font-semibold">ระยะเวลาเฉลี่ยในสนามบิน</p>
                    <p className="text-sm">{kpiData.avgStay.description}</p>
                    <p className="text-sm mt-1">ปัจจุบัน: {kpiData.avgStay.total}</p>
                    <p className="text-sm">เปลี่ยนแปลง: {kpiData.avgStay.change}%</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </TabsContent>

          <TabsContent value="gates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(kpiData)
                .filter(([key]) =>
                  ["doors", "intArrivals", "domArrivals", "intDepartures", "domDepartures"].includes(key),
                )
                .map(([key, data]) => (
                  <Tooltip key={key}>
                    <TooltipTrigger asChild>
                      <Card className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            {key === "doors" && "ผู้โดยสารผ่านประตู 1–12"}
                            {key === "intArrivals" && "ผู้โดยสารขาเข้า Gate Inter"}
                            {key === "domArrivals" && "ผู้โดยสารขาเข้า Gate Dom"}
                            {key === "intDepartures" && "ผู้โดยสารขาออก Gate Inter"}
                            {key === "domDepartures" && "ผู้โดยสารขาออก Gate Dom"}
                          </CardTitle>
                          <Plane className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{data.total.toLocaleString()}</div>
                          <p className={`text-xs flex items-center gap-1 ${getTrendColor(data.change)}`}>
                            {getTrendIcon(data.trend)}
                            {data.change > 0 ? "+" : ""}
                            {data.change}%
                          </p>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="max-w-xs">
                        <p className="font-semibold">
                          {key === "doors" && "ผู้โดยสารผ่านประตู 1–12"}
                          {key === "intArrivals" && "ผู้โดยสารขาเข้า Gate Inter"}
                          {key === "domArrivals" && "ผู้โดยสารขาเข้า Gate Dom"}
                          {key === "intDepartures" && "ผู้โดยสารขาออก Gate Inter"}
                          {key === "domDepartures" && "ผู้โดยสารขาออก Gate Dom"}
                        </p>
                        <p className="text-sm">{data.description}</p>
                        <p className="text-sm mt-1">ปัจจุบัน: {data.total.toLocaleString()} คน</p>
                        <p className="text-sm">
                          เปลี่ยนแปลง: {data.change > 0 ? "+" : ""}
                          {data.change}%
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="retail" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">จำนวนร้านค้าทั้งหมด</CardTitle>
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpiData.totalShops.total}</div>
                      <p className={`text-xs flex items-center gap-1 ${getTrendColor(kpiData.totalShops.change)}`}>
                        {getTrendIcon(kpiData.totalShops.trend)}+{kpiData.totalShops.change} ร้านใหม่
                      </p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs">
                    <p className="font-semibold">จำนวนร้านค้าทั้งหมด</p>
                    <p className="text-sm">{kpiData.totalShops.description}</p>
                    <p className="text-sm mt-1">ปัจจุบัน: {kpiData.totalShops.total} ร้าน</p>
                    <p className="text-sm">เพิ่มขึ้น: {kpiData.totalShops.change} ร้าน</p>
                  </div>
                </TooltipContent>
              </Tooltip>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ร้านค้าแยกตามประเภท</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-1">
                    <div>Food: 20 ร้าน</div>
                    <div>Beverage: 10 ร้าน</div>
                    <div>Souvenir: 15 ร้าน</div>
                    <div>Other: 13 ร้าน</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Zone Table */}
            <Card>
              <CardHeader>
                <CardTitle>รายละเอียดลูกค้าตามโซน (วันนี้)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">โซน</th>
                        <th className="text-right p-2">ลูกค้าผ่านโซน</th>
                        <th className="text-right p-2">⌀ Dwell Time</th>
                        <th className="text-right p-2">ผ่านหน้าร้าน</th>
                        <th className="text-right p-2">หยุดหน้าร้าน</th>
                        <th className="text-right p-2">เข้าร้าน</th>
                        <th className="text-right p-2">⌀ ผ่านหน้าร้าน</th>
                        <th className="text-right p-2">⌀ อยู่ในร้าน</th>
                        <th className="text-right p-2">เข้า-ออกทันที</th>
                      </tr>
                    </thead>
                    <tbody>
                      {zoneData.map((zone, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <tr className="border-b hover:bg-gray-50 cursor-pointer">
                              <td className="p-2 font-medium">{zone.zone}</td>
                              <td className="p-2 text-right">
                                {zone.customers.toLocaleString()}{" "}
                                <span className={zone.change > 0 ? "text-green-600" : "text-red-600"}>
                                  ({zone.change > 0 ? "↑" : "↓"}
                                  {Math.abs(zone.change)}%)
                                </span>
                              </td>
                              <td className="p-2 text-right">{zone.dwellTime}</td>
                              <td className="p-2 text-right">{zone.passBy.toLocaleString()}</td>
                              <td className="p-2 text-right">{zone.stopFront.toLocaleString()}</td>
                              <td className="p-2 text-right">{zone.enter.toLocaleString()}</td>
                              <td className="p-2 text-right">{zone.avgPass}</td>
                              <td className="p-2 text-right">{zone.avgStay}</td>
                              <td className="p-2 text-right">{zone.bounceOut}</td>
                            </tr>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs">
                              <p className="font-semibold">{zone.zone}</p>
                              <p className="text-sm">{zone.description}</p>
                              <p className="text-sm mt-1">ลูกค้าผ่านโซน: {zone.customers.toLocaleString()} คน</p>
                              <p className="text-sm">
                                เปลี่ยนแปลง: {zone.change > 0 ? "+" : ""}
                                {zone.change}%
                              </p>
                              <p className="text-sm">เวลาเฉลี่ย: {zone.dwellTime}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Hourly Traffic Chart */}
        <Card>
          <CardHeader>
            <CardTitle>การเดินทางรายชั่วโมง - สนามบินเชียงใหม่</CardTitle>
            <CardDescription>จำนวนผู้โดยสารและลูกค้าร้านค้าตลอดทั้งวัน</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                passengers: {
                  label: "ผู้โดยสาร",
                  color: "hsl(var(--chart-1))",
                },
                shops: {
                  label: "ลูกค้าร้านค้า",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[400px]"
            >
              <AreaChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value: any, name: string) => [
                    `${value?.toLocaleString()} คน`,
                    name === "passengers" ? "ผู้โดยสาร" : "ลูกค้าร้านค้า",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="passengers"
                  stackId="1"
                  stroke="var(--color-passengers)"
                  fill="var(--color-passengers)"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="shops"
                  stackId="1"
                  stroke="var(--color-shops)"
                  fill="var(--color-shops)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
