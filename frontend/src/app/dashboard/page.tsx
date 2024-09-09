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
       
   
    {/* Graph Section */}
    
    <div className="mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-lg font-semibold">Analytics Dashboard</h1>
      <Bar data={data} options={options} />
    </div>
  </>
  );
}
