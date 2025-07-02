"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, Filter, Download } from "lucide-react"

interface DistributionMapProps {
  airport: string
  date: string
  dateRange?: { from: Date | undefined; to: Date | undefined }
}

export default function DistributionMap({ airport, date, dateRange }: DistributionMapProps) {
  const [selectedDate, setSelectedDate] = useState("today")
  const [selectedStore, setSelectedStore] = useState("all")

  // Treemap data for CNX stores
  const treemapData = [
    {
      name: "King Power Dutyfree",
      zone: "Post-Souvenir",
      customers: 2340,
      dwellTime: 12.5,
      avgStay: 15.2,
      type: "Souvenir",
      passBy: 3200,
      stopFront: 890,
      enter: 650,
      avgPass: 18,
      avgInStore: 920,
      bounceOut: 85,
      size: 2340,
      description: "ร้านปลอดภาษีหลักของสนามบิน จำหน่ายสินค้าแบรนด์เนมและของที่ระลึก",
    },
    {
      name: "Starbucks Coffee",
      zone: "Pre-Beverage",
      customers: 1890,
      dwellTime: 8.3,
      avgStay: 6.8,
      type: "Beverage",
      passBy: 2800,
      stopFront: 720,
      enter: 580,
      avgPass: 12,
      avgInStore: 410,
      bounceOut: 45,
      size: 1890,
      description: "ร้านกาแฟสตาร์บัคส์ ตั้งอยู่ก่อนจุดตรวจความปลอดภัย",
    },
    {
      name: "McDonalds",
      zone: "Post-Food",
      customers: 1650,
      dwellTime: 10.2,
      avgStay: 8.5,
      type: "Food",
      passBy: 2400,
      stopFront: 680,
      enter: 520,
      avgPass: 15,
      avgInStore: 510,
      bounceOut: 38,
      size: 1650,
      description: "ร้านอาหารฟาสต์ฟู้ดแมคโดนัลด์ หลังจุดตรวจความปลอดภัย",
    },
    {
      name: "Black Canyon Coffee",
      zone: "Pre-Beverage",
      customers: 1420,
      dwellTime: 9.1,
      avgStay: 7.2,
      type: "Beverage",
      passBy: 2100,
      stopFront: 580,
      enter: 450,
      avgPass: 14,
      avgInStore: 324,
      bounceOut: 32,
      size: 1420,
      description: "ร้านกาแฟบล็อกแคนนี่ ตั้งอยู่ก่อนจุดตรวจความปลอดภัย",
    },
    {
      name: "Burger King",
      zone: "Pre-Food",
      customers: 1280,
      dwellTime: 11.5,
      avgStay: 9.8,
      type: "Food",
      passBy: 1950,
      stopFront: 520,
      enter: 410,
      avgPass: 16,
      avgInStore: 402,
      bounceOut: 28,
      size: 1280,
      description: "ร้านอาหารเบอร์เกอร์กิง ตั้งอยู่ก่อนจุดตรวจความปลอดภัย",
    },
    {
      name: "Chiangmai Souvenir",
      zone: "Pre-Souvenir",
      customers: 1150,
      dwellTime: 14.2,
      avgStay: 11.5,
      type: "Souvenir",
      passBy: 1680,
      stopFront: 480,
      enter: 380,
      avgPass: 22,
      avgInStore: 437,
      bounceOut: 25,
      size: 1150,
      description: "ร้านของที่ระลึกชีангใหม่ ตั้งอยู่ก่อนจุดตรวจความปลอดภัย",
    },
    {
      name: "Amazon Coffee",
      zone: "Pre-Beverage",
      customers: 980,
      dwellTime: 7.8,
      avgStay: 6.2,
      type: "Beverage",
      passBy: 1450,
      stopFront: 380,
      enter: 290,
      avgPass: 11,
      avgInStore: 180,
      bounceOut: 22,
      size: 980,
      description: "ร้านกาแฟอะมัซอน ตั้งอยู่ก่อนจุดตรวจความปลอดภัย",
    },
    {
      name: "Subway",
      zone: "Post-Food",
      customers: 890,
      dwellTime: 8.9,
      avgStay: 7.5,
      type: "Food",
      passBy: 1320,
      stopFront: 340,
      enter: 280,
      avgPass: 13,
      avgInStore: 210,
      bounceOut: 18,
      size: 890,
      description: "ร้านอาหารซับวาย ตั้งอยู่หลังจุดตรวจความปลอดภัย",
    },
    {
      name: "Doi Chaang Coffee",
      zone: "Post-Beverage",
      customers: 780,
      dwellTime: 9.5,
      avgStay: 8.1,
      type: "Beverage",
      passBy: 1150,
      stopFront: 290,
      enter: 230,
      avgPass: 14,
      avgInStore: 186,
      bounceOut: 15,
      size: 780,
      description: "ร้านกาแฟดอยชาง ตั้งอยู่หลังจุดตรวจความปลอดภัย",
    },
    {
      name: "Mini Market Shop",
      zone: "Pre-Food",
      customers: 720,
      dwellTime: 6.2,
      avgStay: 4.8,
      type: "Retail",
      passBy: 1080,
      stopFront: 280,
      enter: 220,
      avgPass: 9,
      avgInStore: 106,
      bounceOut: 28,
      size: 720,
      description: "ร้านค้าปลีกเล็กน้อย ตั้งอยู่ก่อนจุดตรวจความปลอดภัย",
    },
    {
      name: "Dairy Queen",
      zone: "Post-Beverage",
      customers: 650,
      dwellTime: 8.7,
      avgStay: 7.3,
      type: "Beverage",
      passBy: 950,
      stopFront: 240,
      enter: 190,
      avgPass: 12,
      avgInStore: 139,
      bounceOut: 12,
      size: 650,
      description: "ร้านไอศกรีมดารีคิว ตั้งอยู่หลังจุดตรวจความปลอดภัย",
    },
    {
      name: "Bread Hut",
      zone: "Pre-Food",
      customers: 580,
      dwellTime: 5.5,
      avgStay: 4.2,
      type: "Food",
      passBy: 850,
      stopFront: 210,
      enter: 170,
      avgPass: 8,
      avgInStore: 71,
      bounceOut: 18,
      size: 580,
      description: "ร้านขนมปัง ตั้งอยู่ก่อนจุดตรวจความปลอดภัย",
    },
  ]

  const zoneData = [
    { zone: "Pre-Food", customers: 2580, avgDwell: 7.7, stores: 3, description: "โซนร้านอาหารก่อนจุดตรวจ" },
    { zone: "Pre-Beverage", customers: 3290, avgDwell: 8.4, stores: 3, description: "โซนเครื่องดื่มก่อนจุดตรวจ" },
    { zone: "Pre-Souvenir", customers: 1150, avgDwell: 14.2, stores: 1, description: "โซนของที่ระลึกก่อนจุดตรวจ" },
    { zone: "Post-Food", customers: 2540, avgDwell: 9.2, stores: 2, description: "โซนร้านอาหารหลังจุดตรวจ" },
    { zone: "Post-Beverage", customers: 1430, avgDwell: 9.1, stores: 2, description: "โซนเครื่องดื่มหลังจุดตรวจ" },
    { zone: "Post-Souvenir", customers: 2340, avgDwell: 12.5, stores: 1, description: "โซนของที่ระลึกหลังจุดตรวจ" },
  ]

  const storeTypes = [
    { type: "Food", count: 5, customers: 5120, avgRevenue: 850000, description: "ร้านอาหารและอาหารว่าง" },
    { type: "Beverage", count: 5, customers: 4700, avgRevenue: 620000, description: "ร้านเครื่องดื่มและกาแฟ" },
    { type: "Souvenir", count: 2, customers: 3490, avgRevenue: 1200000, description: "ร้านของที่ระลึกและของฝาก" },
    { type: "Retail", count: 1, customers: 720, avgRevenue: 380000, description: "ร้านค้าปลีกทั่วไป" },
  ]

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">แผนที่การกระจายตัว - สนามบินเชียงใหม่</h2>
            <p className="text-gray-600 mt-1">วิเคราะห์การกระจายตัวของลูกค้าในแต่ละโซนและร้านค้า</p>
          </div>

          <div className="flex gap-3">
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">วันนี้</SelectItem>
                <SelectItem value="yesterday">เมื่อวาน</SelectItem>
                <SelectItem value="week">สัปดาห์นี้</SelectItem>
                <SelectItem value="month">เดือนนี้</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="ทุกร้าน" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ทุกร้าน</SelectItem>
                <SelectItem value="food">ร้านอาหาร</SelectItem>
                <SelectItem value="beverage">เครื่องดื่ม</SelectItem>
                <SelectItem value="souvenir">ของที่ระลึก</SelectItem>
                <SelectItem value="retail">ร้านค้าทั่วไป</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              ส่งออก
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">จำนวนลูกค้าทั้งหมด</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">14,330</div>
                  <p className="text-xs text-green-600">+5.2% จากเมื่อวาน</p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>จำนวนลูกค้าทั้งหมดที่เข้าใช้บริการร้านค้าในสนามบิน</p>
              <p>เพิ่มขึ้น 5.2% เมื่อเทียบกับเมื่อวาน</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">เวลาเฉลี่ยในสนามบิน</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">125 นาที</div>
                  <p className="text-xs text-red-600">-2.1% จากเมื่อวาน</p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>เวลาเฉลี่ยที่ผู้โดยสารใช้ในสนามบินทั้งหมด</p>
              <p>ลดลง 2.1% เมื่อเทียบกับเมื่อวาน</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">ร้านค้าทั้งหมด</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42 ร้าน</div>
                  <p className="text-xs text-gray-600">13 ประเภท</p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>จำนวนร้านค้าทั้งหมดในสนามบิน</p>
              <p>แบ่งออกเป็น 13 ประเภทธุรกิจ</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">อัตราการเข้าร้าน</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18.5%</div>
                  <p className="text-xs text-green-600">+1.3% จากเมื่อวาน</p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>อัตราส่วนของผู้ที่เดินผ่านหน้าร้านและเข้าไปในร้าน</p>
              <p>เพิ่มขึ้น 1.3% เมื่อเทียบกับเมื่อวาน</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Treemap Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>Treemap - การกระจายลูกค้าตามร้านค้า</CardTitle>
            <CardDescription>ขนาดของแต่ละช่องแสดงจำนวนลูกค้า สีแสดงประเภทร้าน</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4 h-96">
              <div className="grid grid-cols-4 gap-2 h-full">
                {treemapData.slice(0, 12).map((store, index) => {
                  const getColor = (type: string) => {
                    switch (type) {
                      case "Food":
                        return "bg-blue-200 border-blue-400"
                      case "Beverage":
                        return "bg-green-200 border-green-400"
                      case "Souvenir":
                        return "bg-purple-200 border-purple-400"
                      case "Retail":
                        return "bg-orange-200 border-orange-400"
                      default:
                        return "bg-gray-200 border-gray-400"
                    }
                  }

                  const size = Math.max(60, Math.min(200, (store.customers / 2340) * 200))

                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div
                          className={`${getColor(store.type)} border-2 rounded p-2 flex flex-col justify-center items-center text-center cursor-pointer hover:opacity-80 transition-opacity`}
                          style={{
                            height: `${size}px`,
                            gridColumn: index < 4 ? "span 1" : index < 8 ? "span 1" : "span 1",
                          }}
                        >
                          <div className="text-xs font-semibold truncate w-full">{store.name}</div>
                          <div className="text-sm font-bold">{store.customers.toLocaleString()}</div>
                          <div className="text-xs text-gray-600">{store.type}</div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-semibold">{store.name}</p>
                          <p className="text-sm">{store.description}</p>
                          <p className="text-sm mt-1">ลูกค้า: {store.customers.toLocaleString()} คน</p>
                          <p className="text-sm">โซน: {store.zone}</p>
                          <p className="text-sm">เวลาเฉลี่ย: {store.dwellTime} นาที</p>
                          <p className="text-sm">อัตราเข้าร้าน: {((store.enter / store.passBy) * 100).toFixed(1)}%</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
                  <span>อาหาร</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
                  <span>เครื่องดื่ม</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-200 border border-purple-400 rounded"></div>
                  <span>ของที่ระลึก</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-200 border border-orange-400 rounded"></div>
                  <span>ร้านค้าทั่วไป</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zone Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>การกระจายตามโซน</CardTitle>
              <CardDescription>จำนวนลูกค้าและเวลาเฉลี่ยในแต่ละโซน</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {zoneData.map((zone, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div>
                          <div className="font-medium">{zone.zone}</div>
                          <div className="text-sm text-gray-600">{zone.stores} ร้าน</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{zone.customers.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{zone.avgDwell} นาที</div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="max-w-xs">
                        <p className="font-semibold">{zone.zone}</p>
                        <p className="text-sm">{zone.description}</p>
                        <p className="text-sm mt-1">ลูกค้า: {zone.customers.toLocaleString()} คน</p>
                        <p className="text-sm">เวลาเฉลี่ย: {zone.avgDwell} นาที</p>
                        <p className="text-sm">จำนวนร้าน: {zone.stores} ร้าน</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ประเภทร้านค้า</CardTitle>
              <CardDescription>สรุปตามประเภทธุรกิจ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storeTypes.map((type, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <div>
                          <div className="font-medium">{type.type}</div>
                          <div className="text-sm text-gray-600">{type.count} ร้าน</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{type.customers.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">฿{type.avgRevenue.toLocaleString()}</div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="max-w-xs">
                        <p className="font-semibold">{type.type}</p>
                        <p className="text-sm">{type.description}</p>
                        <p className="text-sm mt-1">จำนวนร้าน: {type.count} ร้าน</p>
                        <p className="text-sm">ลูกค้า: {type.customers.toLocaleString()} คน</p>
                        <p className="text-sm">รายได้เฉลี่ย: ฿{type.avgRevenue.toLocaleString()}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Store Table */}
        <Card>
          <CardHeader>
            <CardTitle>รายละเอียดร้านค้า</CardTitle>
            <CardDescription>ข้อมูลครบถ้วนของแต่ละร้านค้าในสนามบิน</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ร้านค้า</th>
                    <th className="text-left p-2">โซน</th>
                    <th className="text-right p-2">ลูกค้าผ่าน</th>
                    <th className="text-right p-2">เวลาเฉลี่ย</th>
                    <th className="text-right p-2">ผ่านหน้าร้าน</th>
                    <th className="text-right p-2">หยุดหน้าร้าน</th>
                    <th className="text-right p-2">เข้าร้าน</th>
                    <th className="text-right p-2">เวลาผ่านหน้า</th>
                    <th className="text-right p-2">เวลาในร้าน</th>
                    <th className="text-right p-2">เข้า-ออกทันที</th>
                  </tr>
                </thead>
                <tbody>
                  {treemapData.map((store, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <tr className="border-b hover:bg-gray-50 cursor-pointer">
                          <td className="p-2 font-medium">{store.name}</td>
                          <td className="p-2">{store.zone}</td>
                          <td className="p-2 text-right">{store.customers.toLocaleString()}</td>
                          <td className="p-2 text-right">{store.dwellTime} นาที</td>
                          <td className="p-2 text-right">{store.passBy.toLocaleString()}</td>
                          <td className="p-2 text-right">{store.stopFront.toLocaleString()}</td>
                          <td className="p-2 text-right">{store.enter.toLocaleString()}</td>
                          <td className="p-2 text-right">{store.avgPass} วินาที</td>
                          <td className="p-2 text-right">{store.avgInStore} วินาที</td>
                          <td className="p-2 text-right">{store.bounceOut}</td>
                        </tr>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-semibold">{store.name}</p>
                          <p className="text-sm">{store.description}</p>
                          <p className="text-sm mt-1">อัตราเข้าร้าน: {((store.enter / store.passBy) * 100).toFixed(1)}%</p>
                          <p className="text-sm">
                            อัตราหยุดหน้าร้าน: {((store.stopFront / store.passBy) * 100).toFixed(1)}%
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
      </div>
    </TooltipProvider>
  )
}
