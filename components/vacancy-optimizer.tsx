"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { MapPin, Calculator, TrendingUp } from "lucide-react"

interface VacancyOptimizerProps {
  airport: string
}

export default function VacancyOptimizer({ airport }: VacancyOptimizerProps) {
  const [zoneId, setZoneId] = useState("")
  const [area, setArea] = useState("")
  const [showResults, setShowResults] = useState(false)

  const scenarioData = [
    {
      type: "Grab-&-Go Coffee Counter",
      rent: 2400,
      share: 13,
      tenor: 5,
      footYear: 680,
      passYear: 3200,
      dwell: 6,
      walk: 8,
      footForecast: [60, 59, 60, 61, 62, 60, 61, 62, 63, 61, 60, 61],
      passFactor: 4.7,
      convRate: 0.27,
      avgSpend: 150,
    },
    {
      type: "Local Souvenir & Convenience",
      rent: 1900,
      share: 16,
      tenor: 4,
      footYear: 540,
      passYear: 2450,
      dwell: 9,
      walk: 11,
      footForecast: [48, 47, 49, 50, 51, 49, 50, 51, 52, 50, 49, 50],
      passFactor: 4.5,
      convRate: 0.18,
      avgSpend: 350,
    },
    {
      type: "Quick-Service Thai Eatery",
      rent: 3100,
      share: 14,
      tenor: 6,
      footYear: 720,
      passYear: 2980,
      dwell: 14,
      walk: 12,
      footForecast: [65, 64, 66, 67, 68, 66, 67, 68, 69, 67, 66, 67],
      passFactor: 4.3,
      convRate: 0.32,
      avgSpend: 220,
    },
    {
      type: "Beauty Duty-Free Kiosk",
      rent: 5800,
      share: 18,
      tenor: 8,
      footYear: 800,
      passYear: 3400,
      dwell: 12,
      walk: 10,
      footForecast: [70, 69, 71, 72, 73, 71, 72, 73, 74, 72, 71, 72],
      passFactor: 4.2,
      convRate: 0.28,
      avgSpend: 900,
    },
    {
      type: "Express Massage / Wellness",
      rent: 1600,
      share: 12,
      tenor: 3,
      footYear: 310,
      passYear: 1050,
      dwell: 25,
      walk: 9,
      footForecast: [30, 29, 31, 32, 33, 31, 32, 33, 34, 32, 31, 32],
      passFactor: 3.4,
      convRate: 0.12,
      avgSpend: 550,
    },
  ]

  const [selectedScenario, setSelectedScenario] = useState<number | null>(null)

  const months = [
    "ส.ค 25",
    "ก.ย 25",
    "ต.ค 25",
    "พ.ย 25",
    "ธ.ค 25",
    "ม.ค 26",
    "ก.พ 26",
    "มี.ค 26",
    "เม.ย 26",
    "พ.ค 26",
    "มิ.ย 26",
    "ก.ค 26",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (zoneId && area) {
      setShowResults(true)
    }
  }

  const generateForecast = (scenario: any) => {
    const passForecast = scenario.footForecast.map((v: number) => Math.round(v * scenario.passFactor))
    const salesForecast = scenario.footForecast.map((v: number) =>
      Math.round(v * 1000 * scenario.convRate * scenario.avgSpend),
    )

    return {
      passForecast,
      salesForecast,
      dwellForecast: scenario.footForecast.map(() => scenario.dwell),
      walkForecast: scenario.footForecast.map(() => scenario.walk),
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">ระบบจัดการพื้นที่ว่าง - สนามบินเชียงใหม่</h2>
        <p className="text-gray-600 mt-1">วิเคราะห์และแนะนำการใช้พื้นที่ว่างให้เกิดประโยชน์สูงสุด</p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            ข้อมูลพื้นที่ว่าง
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="zoneId">รหัสโซน / ตำแหน่ง</Label>
              <Input
                id="zoneId"
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                placeholder="เช่น Z3-12"
                required
              />
            </div>
            <div>
              <Label htmlFor="area">พื้นที่ (ตร.ม.)</Label>
              <Input
                id="area"
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="เช่น 38"
                required
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full">
                <Calculator className="w-4 h-4 mr-2" />
                สร้างสถานการณ์
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>สถานการณ์ที่แนะนำ (5 อันดับแรก)</CardTitle>
              <CardDescription>
                สำหรับพื้นที่ {area} ตร.ม. ที่ตำแหน่ง {zoneId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">#</th>
                      <th className="text-left p-2">ประเภทธุรกิจ</th>
                      <th className="text-right p-2">
                        ค่าเช่าพื้นฐาน
                        <br />
                        (บาท/ตร.ม./เดือน)
                      </th>
                      <th className="text-right p-2">% แบ่งรายได้</th>
                      <th className="text-right p-2">
                        ระยะเวลา
                        <br />
                        (ปี)
                      </th>
                      <th className="text-right p-2">
                        ลูกค้าเข้า
                        <br />
                        (พัน/ปี)
                      </th>
                      <th className="text-right p-2">
                        คนผ่าน
                        <br />
                        (พัน/ปี)
                      </th>
                      <th className="text-right p-2">
                        เวลาอยู่
                        <br />
                        (นาที)
                      </th>
                      <th className="text-right p-2">
                        เวลาผ่าน
                        <br />
                        (วินาที)
                      </th>
                      <th className="text-center p-2">การคาดการณ์</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scenarioData.map((scenario, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2 font-medium">{scenario.type}</td>
                        <td className="p-2 text-right">{scenario.rent.toLocaleString()}</td>
                        <td className="p-2 text-right">{scenario.share}%</td>
                        <td className="p-2 text-right">{scenario.tenor}</td>
                        <td className="p-2 text-right">{scenario.footYear}</td>
                        <td className="p-2 text-right">{scenario.passYear}</td>
                        <td className="p-2 text-right">{scenario.dwell}</td>
                        <td className="p-2 text-right">{scenario.walk}</td>
                        <td className="p-2 text-center">
                          <Button size="sm" variant="outline" onClick={() => setSelectedScenario(index)}>
                            ดูคาดการณ์
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Forecast Chart */}
          {selectedScenario !== null && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  คาดการณ์ 12 เดือน - {scenarioData[selectedScenario].type}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    footIns: {
                      label: "ลูกค้าเข้า (พัน)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <LineChart
                    data={months.map((month, index) => ({
                      month,
                      footIns: scenarioData[selectedScenario].footForecast[index],
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="footIns" stroke="var(--color-footIns)" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          )}

          {/* Detailed Forecast Table */}
          {selectedScenario !== null && (
            <Card>
              <CardHeader>
                <CardTitle>รายละเอียดคาดการณ์รายเดือน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">เดือน</th>
                        <th className="text-right p-2">เข้าโซน</th>
                        <th className="text-right p-2">ผ่านโซน</th>
                        <th className="text-right p-2">เวลาอยู่ (นาที)</th>
                        <th className="text-right p-2">เวลาผ่าน (วินาที)</th>
                        <th className="text-right p-2">ยอดขาย (บาท)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {months.map((month, index) => {
                        const forecast = generateForecast(scenarioData[selectedScenario])
                        return (
                          <tr key={index} className="border-b">
                            <td className="p-2">{month}</td>
                            <td className="p-2 text-right">
                              {(scenarioData[selectedScenario].footForecast[index] * 1000).toLocaleString()}
                            </td>
                            <td className="p-2 text-right">{(forecast.passForecast[index] * 1000).toLocaleString()}</td>
                            <td className="p-2 text-right">{forecast.dwellForecast[index]}</td>
                            <td className="p-2 text-right">{forecast.walkForecast[index]}</td>
                            <td className="p-2 text-right">{forecast.salesForecast[index].toLocaleString()}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>คำแนะนำการใช้พื้นที่</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">พื้นที่ที่มีศักยภาพสูง</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>ใกล้ Gate ภายในประเทศ:</strong> เหมาะสำหรับร้านอาหารและเครื่องดื่ม
                </li>
                <li>
                  • <strong>หลัง Security Check:</strong> เหมาะสำหรับ Duty-Free และของที่ระลึก
                </li>
                <li>
                  • <strong>บริเวณ Lounge:</strong> เหมาะสำหรับบริการ Premium
                </li>
                <li>
                  • <strong>ทางเดินหลัก:</strong> เหมาะสำหรับร้านสะดวกซื้อ
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">ปัจจัยที่ควรพิจารณา</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Traffic Pattern:</strong> วิเคราะห์การเดินของผู้โดยสาร
                </li>
                <li>
                  • <strong>Dwell Time:</strong> ระยะเวลาที่ผู้โดยสารอยู่ในแต่ละโซน
                </li>
                <li>
                  • <strong>Demographics:</strong> กลุ่มเป้าหมายหลักของสนามบิน
                </li>
                <li>
                  • <strong>Seasonality:</strong> ความแตกต่างตามฤดูกาลและเทศกาล
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
