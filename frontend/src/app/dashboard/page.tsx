"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Plus,
  Search,
  Loader2,
  RefreshCcw,
  Heart,
  Thermometer,
  Droplet,
  Edit3,
  Trash2,
  X,
  Check,
} from "lucide-react"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, isPast, isFuture, parseISO, differenceInYears } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"



export default function AdvancedDoctorDashboard() {
  

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
     

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-400 to-indigo-600 text-white transform hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Total 
            </CardTitle>
            <CalendarIcon className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">33</div>
            <p className="text-sm text-purple-200">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-400 to-rose-600 text-white transform hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              New 
            </CardTitle>
            <Users className="h-5 w-5 text-pink-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-sm text-pink-200">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-400 to-amber-600 text-white transform hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Total Visit
            </CardTitle>
            <Clock className="h-5 w-5 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
             3
            </div>
            <p className="text-sm text-orange-200">-2m from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-400 to-emerald-600 text-white transform hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Total Blogs
            </CardTitle>
            <Activity className="h-5 w-5 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">98%</div>
            <p className="text-sm text-green-200">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      
    </div>
  )
}