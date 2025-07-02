"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Bar, BarChart, Area, AreaChart } from "recharts"
import {
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Eye,
  BarChart3,
  Calendar,
} from "lucide-react"

interface SalesSurveillanceProps {
  airport: string
  date: string
  dateRange?: { from: Date | undefined; to: Date | undefined }
}

export default function SalesSurveillance({ airport, date, dateRange }: SalesSurveillanceProps) {
  const [selectedStore, setSelectedStore] = useState("All Stores")
  const [showRecommendations, setShowRecommendations] = useState(false)

  // CNX stores data
  const storeOptions = [
    "All Stores",
    "Mini Market Shop",
    "Starbucks Coffee",
    "Amazon Coffee",
    "Chiangmai Souvenir Shop",
    "Doi Chaang Coffee",
    "Black Canyon Coffee ชั้น1",
    "King Power Duty-Free",
    "Burger King",
    "Bread Hut",
    "McDonalds",
    "Subway",
    "Black Canyon Coffee ชั้น2",
    "Dairy Queen Ice Cream",
  ]

  const metricsData = {
    "All Stores": {
      metrics: [
        {
          name: "จำนวนลูกค้าผ่านแต่ละโซน",
          now: 52400,
          trend: "up",
          next: 55100,
          next3: 61500,
          change: 5.2,
          description: "จำนวนลูกค้าที่เดินผ่านในแต่ละโซนของสนามบิน",
        },
        {
          name: "ระยะเวลาเฉลี่ยลูกค้าแต่ละโซน (นาที)",
          now: 7.2,
          trend: "flat",
          next: 7.4,
          next3: 7.8,
          change: 0.1,
          description: "เวลาเฉลี่ยที่ลูกค้าใช้ในแต่ละโซน",
        },
        {
          name: "ระยะเวลาที่ผู้โดยสารอยู่ในสนามบิน (นาที)",
          now: 120,
          trend: "down",
          next: 118,
          next3: 115,
          change: -1.8,
          description: "เวลาเฉลี่ยที่ผู้โดยสารอยู่ในสนามบินทั้งหมด",
        },
        {
          name: "จำนวนร้านค้าแยกตามประเภท",
          now: 42,
          trend: "up",
          next: 45,
          next3: 46,
          change: 2.4,
          description: "จำนวนร้านค้าทั้งหมดแยกตามประเภทธุรกิจ",
        },
        {
          name: "จำนวนลูกค้าที่เดินผ่านแต่ละร้าน",
          now: 18900,
          trend: "up",
          next: 19600,
          next3: 21000,
          change: 3.7,
          description: "จำนวนลูกค้าที่เดินผ่านหน้าร้านค้าต่างๆ",
        },
        {
          name: "จำนวนลูกค้าหยุดหน้าร้านแต่ไม่เข้า",
          now: 4200,
          trend: "flat",
          next: 4300,
          next3: 4500,
          change: 0.5,
          description: "ลูกค้าที่หยุดดูหน้าร้านแต่ไม่เดินเข้าไป",
        },
        {
          name: "จำนวนลูกค้าที่เดินเข้าร้าน",
          now: 7800,
          trend: "up",
          next: 8250,
          next3: 8900,
          change: 4.1,
          description: "จำนวนลูกค้าที่เดินเข้าไปในร้านค้าจริง",
        },
        {
          name: "ระยะเวลาเฉลี่ยที่ลูกค้าเดินผ่านหน้าร้าน (วินาที)",
          now: 9.5,
          trend: "flat",
          next: 9.6,
          next3: 9.8,
          change: 0.2,
          description: "เวลาเฉลี่ยที่ลูกค้าใช้เดินผ่านหน้าร้าน",
        },
        {
          name: "ระยะเวลาเฉลี่ยที่ลูกค้าอยู่ในร้าน (นาที)",
          now: 6.8,
          trend: "up",
          next: 7.0,
          next3: 7.3,
          change: 2.9,
          description: "เวลาเฉลี่ยที่ลูกค้าใช้ในร้านค้า",
        },
        {
          name: "จำนวนลูกค้าเดินเข้าร้านและออกเลย",
          now: 1100,
          trend: "down",
          next: 1080,
          next3: 1050,
          change: -1.8,
          description: "ลูกค้าที่เข้าร้านแล้วออกทันทีโดยไม่ซื้อ",
        },
        {
          name: "ยอดขายรวม (บาท)",
          now: 2850000,
          trend: "up",
          next: 2980000,
          next3: 3250000,
          change: 6.2,
          description: "ยอดขายรวมของร้านค้าทั้งหมด",
        },
      ],
      salesHistory: [1710000, 1600000, 1780000, 1850000, 1900000, 1920000],
      salesForecast: [1980000, 2050000, 2120000],
      accuracy: 0.92,
    },
  }

  // Daily sales data
  const dailySalesData = [
    { date: "1 ก.ค.", sales: 2850000, customers: 8200, avgSpend: 347, conversion: 18.5 },
    { date: "2 ก.ค.", sales: 2920000, customers: 8450, avgSpend: 345, conversion: 19.2 },
    { date: "3 ก.ค.", sales: 2780000, customers: 7980, avgSpend: 348, conversion: 17.8 },
    { date: "4 ก.ค.", sales: 3100000, customers: 8900, avgSpend: 348, conversion: 20.1 },
    { date: "5 ก.ค.", sales: 3250000, customers: 9200, avgSpend: 353, conversion: 21.3 },
    { date: "6 ก.ค.", sales: 3180000, customers: 8950, avgSpend: 355, conversion: 20.8 },
    { date: "7 ก.ค.", sales: 2950000, customers: 8300, avgSpend: 355, conversion: 19.5 },
  ]

  // Hourly sales data
  const hourlySalesData = [
    { hour: "06:00", sales: 45000, customers: 120 },
    { hour: "07:00", sales: 78000, customers: 210 },
    { hour: "08:00", sales: 125000, customers: 340 },
    { hour: "09:00", sales: 180000, customers: 480 },
    { hour: "10:00", sales: 220000, customers: 580 },
    { hour: "11:00", sales: 265000, customers: 680 },
    { hour: "12:00", sales: 310000, customers: 780 },
    { hour: "13:00", sales: 285000, customers: 720 },
    { hour: "14:00", sales: 295000, customers: 750 },
    { hour: "15:00", sales: 320000, customers: 820 },
    { hour: "16:00", sales: 340000, customers: 880 },
    { hour: "17:00", sales: 365000, customers: 920 },
    { hour: "18:00", sales: 280000, customers: 720 },
    { hour: "19:00", sales: 245000, customers: 620 },
    { hour: "20:00", sales: 195000, customers: 480 },
    { hour: "21:00", sales: 145000, customers: 350 },
    { hour: "22:00", sales: 95000, customers: 230 },
    { hour: "23:00", sales: 52000, customers: 140 },
  ]

  const salesChartData = [
    { month: "ม.ค", actual: 1710000, forecast: null },
    { month: "ก.พ", actual: 1600000, forecast: null },
    { month: "มี.ค", actual: 1780000, forecast: null },
    { month: "เม.ย", actual: 1850000, forecast: null },
    { month: "พ.ค", actual: 1900000, forecast: null },
    { month: "มิ.ย", actual: 1920000, forecast: null },
    { month: "ก.ค*", actual: null, forecast: 1980000 },
    { month: "ส.ค*", actual: null, forecast: 2050000 },
    { month: "ก.ย*", actual: null, forecast: 2120000 },
  ]

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />
    return <BarChart3 className="w-4 h-4 text-blue-500" />
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-blue-600"
  }

  const currentData = metricsData[selectedStore as keyof typeof metricsData] || metricsData["All Stores"]

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">ระบบเฝ้าระวังยอดขาย - สนามบินเชียงใหม่</h2>
            <p className="text-gray-600 mt-1">ติดตามและวิเคราะห์ยอดขายร้านค้าแบบเรียลไทม์พร้อมคาดการณ์แนวโน้ม</p>
          </div>
          <Button
            onClick={() => setShowRecommendations(!showRecommendations)}
            variant={showRecommendations ? "default" : "outline"}
          >
            <Eye className="w-4 h-4 mr-2" />
            {showRecommendations ? "ซ่อนคำแนะนำ" : "แสดงคำแนะนำ"}
          </Button>
        </div>

        {/* Store Filter */}
        <Card>
          <CardHeader>
            <CardTitle>เลือกร้านค้า / โซน</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-full md:w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {storeOptions.map((store) => (
                  <SelectItem key={store} value={store}>
                    {store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
            <TabsTrigger value="individual">รายร้าน</TabsTrigger>
            <TabsTrigger value="daily">รายวัน</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  ตัวชี้วัดหลัก (Real-time + คาดการณ์)
                </CardTitle>
                <CardDescription>ข้อมูลปัจจุบันและการคาดการณ์ 3 เดือนข้างหน้า</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">ตัวชี้วัด</th>
                        <th className="text-right p-3">วันนี้</th>
                        <th className="text-center p-3">เทรนด์</th>
                        <th className="text-right p-3">เดือนหน้า</th>
                        <th className="text-right p-3">3 เดือน</th>
                        <th className="text-center p-3">ความแม่นยำ</th>
                        <th className="text-center p-3">การดำเนินการ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.metrics.map((metric, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <tr className="border-b hover:bg-gray-50 cursor-pointer">
                              <td className="p-3 font-medium">{metric.name}</td>
                              <td className="p-3 text-right">
                                {typeof metric.now === "number" && metric.now > 1000
                                  ? metric.now.toLocaleString()
                                  : metric.now}
                              </td>
                              <td className="p-3 text-center">
                                <div className="flex items-center justify-center gap-1">
                                  {getTrendIcon(metric.trend, metric.change)}
                                  <span className={`text-xs ${getTrendColor(metric.change)}`}>
                                    {metric.change > 0 ? "+" : ""}
                                    {metric.change}%
                                  </span>
                                </div>
                              </td>
                              <td className="p-3 text-right">
                                {typeof metric.next === "number" && metric.next > 1000
                                  ? metric.next.toLocaleString()
                                  : metric.next}
                              </td>
                              <td className="p-3 text-right">
                                {typeof metric.next3 === "number" && metric.next3 > 1000
                                  ? metric.next3.toLocaleString()
                                  : metric.next3}
                              </td>
                              <td className="p-3 text-center">
                                <Badge variant="secondary">{Math.floor(Math.random() * 10) + 85}%</Badge>
                              </td>
                              <td className="p-3 text-center">
                                <Button size="sm" variant="ghost">
                                  🔍 แก้ไข
                                </Button>
                              </td>
                            </tr>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs">
                              <p className="font-semibold">{metric.name}</p>
                              <p className="text-sm">{metric.description}</p>
                              <p className="text-sm mt-1">
                                ปัจจุบัน:{" "}
                                {typeof metric.now === "number" && metric.now > 1000
                                  ? metric.now.toLocaleString()
                                  : metric.now}
                              </p>
                              <p className="text-sm">
                                เปลี่ยนแปลง: {metric.change > 0 ? "+" : ""}
                                {metric.change}%
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

            {/* Sales Forecast Chart */}
            <Card>
              <CardHeader>
                <CardTitle>คาดการณ์ยอดขาย (3 เดือนข้างหน้า)</CardTitle>
                <CardDescription>
                  ความแม่นยำ: <Badge variant="outline">{(currentData.accuracy * 100).toFixed(0)}%</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    actual: {
                      label: "ยอดขายจริง",
                      color: "hsl(var(--chart-1))",
                    },
                    forecast: {
                      label: "คาดการณ์",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <LineChart data={salesChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: any) => [`฿${value?.toLocaleString()}`, ""]}
                    />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="var(--color-actual)"
                      strokeWidth={2}
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="var(--color-forecast)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      connectNulls={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="individual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>วิเคราะห์รายร้าน - {selectedStore}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="text-2xl font-bold text-blue-600">2,340</div>
                        <div className="text-sm text-gray-600">ลูกค้าวันนี้</div>
                        <div className="text-xs text-green-600">+5.2%</div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>จำนวนลูกค้าที่เข้าร้านในวันนี้</p>
                      <p>เพิ่มขึ้น 5.2% เมื่อเทียบกับเมื่อวาน</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="text-2xl font-bold text-green-600">฿285,000</div>
                        <div className="text-sm text-gray-600">ยอดขายวันนี้</div>
                        <div className="text-xs text-green-600">+8.1%</div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>ยอดขายรวมของร้านในวันนี้</p>
                      <p>เพิ่มขึ้น 8.1% เมื่อเทียบกับเมื่อวาน</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div className="text-2xl font-bold text-purple-600">18.5%</div>
                        <div className="text-sm text-gray-600">อัตราการซื้อ</div>
                        <div className="text-xs text-red-600">-1.2%</div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>อัตราส่วนลูกค้าที่เข้าร้านและซื้อสินค้า</p>
                      <p>ลดลง 1.2% เมื่อเทียบกับเมื่อวาน</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="daily" className="space-y-4">
            {/* Daily Sales Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">ยอดขายวันนี้</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">฿2.85M</div>
                  <p className="text-xs text-green-600">+6.2% จากเมื่อวาน</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">ลูกค้าวันนี้</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,200</div>
                  <p className="text-xs text-green-600">+3.8% จากเมื่อวาน</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">ยอดเฉลี่ยต่อคน</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">฿347</div>
                  <p className="text-xs text-green-600">+2.3% จากเมื่อวาน</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">อัตราการซื้อ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18.5%</div>
                  <p className="text-xs text-red-600">-1.2% จากเมื่อวาน</p>
                </CardContent>
              </Card>
            </div>

            {/* Daily Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  ยอดขายรายวัน (7 วันล่าสุด)
                </CardTitle>
                <CardDescription>แสดงยอดขายและจำนวนลูกค้ารายวัน</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: {
                      label: "ยอดขาย (บาท)",
                      color: "hsl(var(--chart-1))",
                    },
                    customers: {
                      label: "จำนวนลูกค้า",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <AreaChart data={dailySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: any, name: string) => [
                        name === "sales" ? `฿${value?.toLocaleString()}` : `${value?.toLocaleString()} คน`,
                        name === "sales" ? "ยอดขาย" : "ลูกค้า",
                      ]}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="sales"
                      stroke="var(--color-sales)"
                      fill="var(--color-sales)"
                      fillOpacity={0.3}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="customers"
                      stroke="var(--color-customers)"
                      fill="var(--color-customers)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Hourly Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle>ยอดขายรายชั่วโมง (วันนี้)</CardTitle>
                <CardDescription>แสดงการกระจายยอดขายตลอดทั้งวัน</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: {
                      label: "ยอดขาย (บาท)",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[250px]"
                >
                  <BarChart data={hourlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value: any) => [`฿${value?.toLocaleString()}`, "ยอดขาย"]}
                    />
                    <Bar dataKey="sales" fill="var(--color-sales)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Daily Details Table */}
            <Card>
              <CardHeader>
                <CardTitle>รายละเอียดรายวัน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">วันที่</th>
                        <th className="text-right p-3">ยอดขาย</th>
                        <th className="text-right p-3">ลูกค้า</th>
                        <th className="text-right p-3">ยอดเฉลี่ย/คน</th>
                        <th className="text-right p-3">อัตราการซื้อ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailySalesData.map((day, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <tr className="border-b hover:bg-gray-50 cursor-pointer">
                              <td className="p-3 font-medium">{day.date}</td>
                              <td className="p-3 text-right">฿{day.sales.toLocaleString()}</td>
                              <td className="p-3 text-right">{day.customers.toLocaleString()}</td>
                              <td className="p-3 text-right">฿{day.avgSpend}</td>
                              <td className="p-3 text-right">{day.conversion}%</td>
                            </tr>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="max-w-xs">
                              <p className="font-semibold">รายละเอียด {day.date}</p>
                              <p className="text-sm">ยอดขาย: ฿{day.sales.toLocaleString()}</p>
                              <p className="text-sm">ลูกค้า: {day.customers.toLocaleString()} คน</p>
                              <p className="text-sm">ยอดเฉลี่ย: ฿{day.avgSpend} ต่อคน</p>
                              <p className="text-sm">อัตราการซื้อ: {day.conversion}%</p>
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

        {/* Recommendations */}
        {showRecommendations && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                วิธีการแก้ไขปัญหาตามสาเหตุ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>1. ปัญหาเกิดจาก Traffic & Dwell:</strong>
                    <ul className="mt-2 ml-4 space-y-1 text-sm">
                      <li>• เพิ่มสื่อโฆษณา/ป้ายดิจิทัลกระตุ้นทางเดินเข้าโซน</li>
                      <li>• ปรับ layout ทางเดิน ลดจุดคอขวด เพิ่มที่นั่งพักใกล้ร้าน</li>
                      <li>• จัดกิจกรรม/Pop-up event เพื่อเพิ่มเวลา Dwell</li>
                      <li>• ตรวจสอบป้าย Way-finding ให้เห็นชัดเจน</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Alert>
                  <ShoppingBag className="h-4 w-4" />
                  <AlertDescription>
                    <strong>2. ปัญหาไม่ได้มาจากข้อ 1 - สิ่งที่ร้านค้าควรทำ:</strong>
                    <ul className="mt-2 ml-4 space-y-1 text-sm">
                      <li>• ทบทวนโปรโมชัน & ราคาให้สอดคล้องกับกลุ่มผู้โดยสารปัจจุบัน</li>
                      <li>• ยกระดับบริการ Front-of-House เพื่อเพิ่ม Conversion</li>
                      <li>• ปรับ Visual Merchandising ดึงดูดสายตาแม้ในช่วงเร่งรีบ</li>
                      <li>• วิเคราะห์ SKU ขายดี ปรับ Stock & Display ให้เหมาะเวลา Peak</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>3. สถานการณ์ซับซ้อน (ทั้งข้อ 1 & 2) - การทำงานร่วมกัน:</strong>
                    <ul className="mt-2 ml-4 space-y-1 text-sm">
                      <li>• ตั้งทีมร่วมระหว่าง AOT + ร้านค้า วิเคราะห์ข้อมูลเชิงลึกสัปดาห์ต่อสัปดาห์</li>
                      <li>• ทดสอบ A/B Layout + Promotion แล้ววัดผลผ่าน Dashboard นี้</li>
                      <li>• กำหนด KPI ร่วม เช่น Conversion Rate โซน & ยอดขายต่อหัว</li>
                      <li>• พิจารณาปรับเงื่อนไขค่าเช่าแบบ Dynamic ตาม Traffic จริง</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  )
}
