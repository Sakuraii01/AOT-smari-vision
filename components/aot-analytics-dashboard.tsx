"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import {
  TrendingUp,
  MapPin,
  Activity,
  Plane,
  ShoppingBag,
  BarChart3,
  PieChart,
  CalendarIcon,
  Download,
} from "lucide-react";

// Components
import OverviewDashboard from "./overview-dashboard";
import PathAnalysis from "./path-analysis";
import DistributionMap from "./distribution-map";
import VacancyOptimizer from "./vacancy-optimizer";
import SalesSurveillance from "./sales-surveillance";
import LongTermPlanning from "./long-term-planning";

const airports = [
  { code: "CNX", name: "เชียงใหม่", active: true },
  { code: "CEL", name: "เชียงราย", active: false },
  { code: "BKK", name: "สุวรรณภูมิ", active: false },
  { code: "DMK", name: "ดอนเมือง", active: false },
];

export default function AOTAnalyticsDashboard() {
  const [selectedAirport, setSelectedAirport] = useState("CNX");
  const [selectedDate, setSelectedDate] = useState("today");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-[#f8fcff]">
      {/* Header */}
      <img src="/image 1.png" className="absolute w-24 top-5 left-10" />
      <div className="bg-gradient-to-br from-[#53b7e8]/40 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#445fac]">
                ระบบวิเคราะห์ข้อมูล CCTV & POS สนามบิน AOT
              </h1>
              <p className="text-gray-600 mt-1">
                วิเคราะห์การเดินทางของผู้โดยสารและยอดขายร้านค้าแบบเรียลไทม์
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Airport Selector */}
              <Select
                value={selectedAirport}
                onValueChange={setSelectedAirport}
              >
                <SelectTrigger className="w-40">
                  <Plane className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {airports.map((airport) => (
                    <SelectItem
                      key={airport.code}
                      value={airport.code}
                      disabled={!airport.active}
                    >
                      <div className="flex items-center gap-2">
                        <span>{airport.code}</span>
                        <span className="text-gray-500">- {airport.name}</span>
                        {!airport.active && (
                          <Badge variant="secondary" className="text-xs">
                            เร็วๆ นี้
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Date Selector */}
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-32">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">วันนี้</SelectItem>
                  <SelectItem value="yesterday">เมื่อวาน</SelectItem>
                  <SelectItem value="week">สัปดาห์นี้</SelectItem>
                  <SelectItem value="month">เดือนนี้</SelectItem>
                  <SelectItem value="custom">กำหนดเอง</SelectItem>
                </SelectContent>
              </Select>

              {/* Custom Date Range Picker */}
              {selectedDate === "custom" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-60 bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "dd MMM", { locale: th })} -{" "}
                            {format(dateRange.to, "dd MMM yyyy", {
                              locale: th,
                            })}
                          </>
                        ) : (
                          format(dateRange.from, "dd MMM yyyy", { locale: th })
                        )
                      ) : (
                        <span>เลือกช่วงวันที่</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={(range) =>
                        setDateRange({
                          from: range?.from,
                          to: range?.to,
                        })
                      }
                      numberOfMonths={2}
                      locale={th}
                    />
                  </PopoverContent>
                </Popover>
              )}

              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                ส่งออกรายงาน
              </Button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">CCTV เชื่อมต่อ: 24/24 กล้อง</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">POS เชื่อมต่อ: 42/42 ร้าน</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-gray-600">
                อัพเดทล่าสุด: {new Date().toLocaleTimeString("th-TH")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="path" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Customer Journey</span>
            </TabsTrigger>
            <TabsTrigger
              value="distribution"
              className="flex items-center gap-2"
            >
              <PieChart className="w-4 h-4" />
              <span className="hidden sm:inline">Distribution Map</span>
            </TabsTrigger>
            <TabsTrigger value="vacancy" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Zoning Management</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Sales Monitoring</span>
            </TabsTrigger>
            <TabsTrigger value="planning" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Long-Term Planning</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewDashboard
              airport={selectedAirport}
              date={selectedDate}
              dateRange={dateRange}
            />
          </TabsContent>

          <TabsContent value="path" className="space-y-6">
            <PathAnalysis
              airport={selectedAirport}
              date={selectedDate}
              dateRange={dateRange}
            />
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <DistributionMap
              airport={selectedAirport}
              date={selectedDate}
              dateRange={dateRange}
            />
          </TabsContent>

          <TabsContent value="vacancy" className="space-y-6">
            <VacancyOptimizer airport={selectedAirport} />
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <SalesSurveillance
              airport={selectedAirport}
              date={selectedDate}
              dateRange={dateRange}
            />
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <LongTermPlanning airport={selectedAirport} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
