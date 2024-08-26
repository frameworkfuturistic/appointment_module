"use client";

import {

  Eye,
 
  NotepadText,
  User,
} from "lucide-react";
import { Bar} from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  BarChart, LabelList, XAxis, YAxis } from "recharts"


import { ChartContainer } from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const data = {
  labels: ["Posts", "Visits", "Users"],
  datasets: [
    {
      label: "Total",
      data: [79, 150, 5],
      backgroundColor: ["#0ea5e9", "#34d399", "#fbbf24"],
      borderColor: ["#0284c7", "#059669", "#d97706"],
      borderWidth: 1,
    },
  ],
};
 // Options for the bar chart
 const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Overview",
    },
  },
};

export default function Component() {
  return (
    
    <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
      <Card className="flex flex-col max-w-48 justify-center text-center">
        <CardHeader className="flex flex-col items-center space-y-0 pb-2">
          <NotepadText size={48} className="stroke-sky-700" />
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">79</CardContent>
      </Card>
      <Card className="flex flex-col max-w-48 justify-center text-center">
        <CardHeader className="flex flex-col items-center space-y-0 pb-2">
          <Eye size={48} className="stroke-sky-700" />
          <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">11</CardContent>
      </Card>
      <Card className="flex flex-col max-w-48 justify-center text-center">
        <CardHeader className="flex flex-col items-center space-y-0 pb-2">
          <User size={48} className="stroke-sky-700" />
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">5</CardContent>
      </Card>
    </div>
       
    {/* <Card className="max-w-xs">
      <CardContent className="flex gap-4 p-4 pb-2">
        <ChartContainer
          config={{
            move: {
              label: "Move",
              color: "hsl(var(--chart-1))",
            },
            stand: {
              label: "Stand",
              color: "hsl(var(--chart-2))",
            },
            exercise: {
              label: "Exercise",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[140px] w-full"
        >
          <BarChart
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 10,
            }}
            data={[
              {
                activity: "stand",
                value: (8 / 12) * 100,
                label: "8/12 hr",
                fill: "var(--color-stand)",
              },
              {
                activity: "exercise",
                value: (46 / 60) * 100,
                label: "46/60 min",
                fill: "var(--color-exercise)",
              },
              {
                activity: "move",
                value: (245 / 360) * 100,
                label: "245/360 kcal",
                fill: "var(--color-move)",
              },
            ]}
            layout="vertical"
            barSize={32}
            barGap={2}
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="activity"
              type="category"
              tickLine={false}
              tickMargin={4}
              axisLine={false}
              className="capitalize"
            />
            <Bar dataKey="value" radius={5}>
              <LabelList
                position="insideLeft"
                dataKey="label"
                fill="white"
                offset={8}
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Move</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              562
              <span className="text-sm font-normal text-muted-foreground">
                kcal
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Exercise</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              73
              <span className="text-sm font-normal text-muted-foreground">
                min
              </span>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-2 h-10 w-px" />
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-xs text-muted-foreground">Stand</div>
            <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
              14
              <span className="text-sm font-normal text-muted-foreground">
                hr
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card> */}
    {/* Graph Section */}
    
    <div className="mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-lg font-semibold">Analytics Dashboard</h1>
      <Bar data={data} options={options} />
    </div>
  </>
  );
}
