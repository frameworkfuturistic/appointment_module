"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  LayoutGrid,
  LayoutList,
  Loader2,
  ArrowUpDown,
  Clock,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";

interface ConsultantSchedule {
  id: string;
  consultantName: string;
  departmentName: string;
  designation: string;
  opdTiming: {
    from: string;
    to: string;
  };
  days: string[];
  createdAt: string;
  updatedAt: string;
}

interface Department {
  id: string;
  name: string;
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function AdvancedOPDScheduleManagement() {
  const [schedules, setSchedules] = useState<ConsultantSchedule[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] =
    useState<ConsultantSchedule | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ConsultantSchedule;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filterDepartment, setFilterDepartment] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultantSchedule>();

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/consultant");
      console.log("data", response.data.data);
      
      if (Array.isArray(response.data.data)) {
        setSchedules(response.data.data);
      } else {
        throw new Error("Invalid data format received from API");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching schedules");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    try {
      // Mocked data array for departments
      const mockDepartments = [
        { id: 1, name: "Cardiology" },
        { id: 2, name: "Neurology" },
        { id: 3, name: "Pediatrics" },
        { id: 4, name: "Orthopedics" },
      ];

      // Simulate API response format
      const response = {
        data: {
          data: mockDepartments,
        },
      };

      // Check if the response data is an array and set the departments
      if (Array.isArray(response.data.data)) {
        setDepartments(response.data.data);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error fetching departments"
      );
    }
  }, []);

  useEffect(() => {
    fetchSchedules(); // Assuming you have this function defined elsewhere
    fetchDepartments();
  }, [fetchSchedules, fetchDepartments]);

  const onSubmit = async (data: ConsultantSchedule) => {
    try {
      setLoading(true);

      if (editingSchedule) {
        const response = await axiosInstance.put(
          `/consultant/${editingSchedule.id}`,
          data
        );
        if (response.status === 200) {
          setSuccessMessage("Schedule updated successfully!");
        }
      } else {
        const response = await axiosInstance.post("/consultant", data);
        if (response.status === 201) {
          setSuccessMessage("Schedule created successfully!");
        }
      }

      setIsDialogOpen(false);
      setEditingSchedule(null);
      reset();
      fetchSchedules();
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data.message || "Error creating/updating schedule"
          : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (schedule?: ConsultantSchedule) => {
    if (schedule) {
      setEditingSchedule(schedule);
      reset(schedule);
    } else {
      setEditingSchedule(null);
      reset();
    }
    setIsDialogOpen(true);
  };

  const confirmDelete = (id: string) => {
    setScheduleToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const deleteSchedule = async () => {
    if (!scheduleToDelete) return;

    try {
      setLoading(true);
      await axiosInstance.delete(`/consultant/${scheduleToDelete}`);
      setSuccessMessage("Schedule deleted successfully!");
      fetchSchedules();
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data.message || "Error deleting schedule"
          : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setScheduleToDelete(null);
    }
  };

  const handleSort = (key: keyof ConsultantSchedule) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedSchedules = useMemo(() => {
    return [...schedules].sort((a, b) => {
      if (!sortConfig) return 0;
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [schedules, sortConfig]);

  const filteredSchedules = useMemo(() => {
    return sortedSchedules.filter(
      (schedule) =>
        !filterDepartment || schedule.departmentName === filterDepartment
    );
  }, [sortedSchedules, filterDepartment]);

  const tableHeaderVariants = {
    hover: { backgroundColor: "#f0f9ff", transition: { duration: 0.2 } },
  };

  const cloneSchedule = async (schedule: ConsultantSchedule) => {
    try {
      setLoading(true);
      const { id, createdAt, updatedAt, ...cloneData } = schedule;
      const response = await axiosInstance.post("/consultant", {
        ...cloneData,
        consultantName: `${cloneData.consultantName} (Copy)`,
      });
      if (response.status === 201) {
        setSuccessMessage("Schedule cloned successfully!");
        fetchSchedules();
      }
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data.message || "Error cloning schedule"
          : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const SkeletonRow = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-[250px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[150px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[100px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[200px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-[100px]" />
      </TableCell>
    </TableRow>
  );

  return (
    // <ErrorBoundary fallback={<ErrorFallback />}> </ErrorBoundary>
    <main className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        <div className="">
          <TooltipProvider>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className=""
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      Total Schedules
                    </h3>
                    <p className="text-3xl font-bold text-primary">
                      {filteredSchedules.length}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      Departments
                    </h3>
                    <p className="text-3xl font-bold text-primary">
                      {departments.length}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                      Consultants
                    </h3>
                    <p className="text-3xl font-bold text-primary">
                      {new Set(schedules.map((s) => s.consultantName)).size}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-background rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex gap-2 flex-wrap">
                      <Select
                        onValueChange={setFilterDepartment}
                        value={filterDepartment}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="#">All Departments</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.name}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            {viewMode === "table" ? (
                              <LayoutList className="mr-2 h-4 w-4" />
                            ) : (
                              <LayoutGrid className="mr-2 h-4 w-4" />
                            )}
                            View
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => setViewMode("table")}
                          >
                            Table
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setViewMode("grid")}>
                            Grid
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Button
                      onClick={() => openDialog()}
                      size="sm"
                      className="ml-auto"
                    >
                      <Plus className="mr-2 h-4 w-4" /> New Schedule
                    </Button>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {successMessage && (
                    <Alert
                      variant="default"
                      className="mb-4 bg-green-50 text-green-800 border-green-300"
                    >
                      <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                  )}

                  {loading ? (
                    viewMode === "table" ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {[
                              "Consultant Name",
                              "Department",
                              "Designation",
                              "OPD Timing",
                              "Days",
                              "Actions",
                            ].map((header) => (
                              <TableHead
                                key={header}
                                className="whitespace-nowrap"
                              >
                                {header}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[...Array(5)].map((_, index) => (
                            <SkeletonRow key={index} />
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <Skeleton className="h-8 w-3/4 mb-2" />
                              <Skeleton className="h-4 w-1/2 mb-2" />
                              <Skeleton className="h-4 w-2/3 mb-2" />
                              <Skeleton className="h-4 w-1/3 mb-2" />
                              <Skeleton className="h-4 w-full mb-4" />
                              <div className="flex justify-end space-x-2">
                                <Skeleton className="h-8 w-8" />
                                <Skeleton className="h-8 w-8" />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )
                  ) : viewMode === "table" ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {[
                              "Consultant Name",
                              "Department",
                              "Designation",
                              "OPD Timing",
                              "Days",
                              "Actions",
                            ].map((header) => (
                              <TableHead
                                key={header}
                                className="whitespace-nowrap"
                              >
                                <motion.div
                                  className="flex items-center cursor-pointer"
                                  onClick={() =>
                                    handleSort(
                                      header
                                        .toLowerCase()
                                        .replace(
                                          " ",
                                          ""
                                        ) as keyof ConsultantSchedule
                                    )
                                  }
                                  whileHover="hover"
                                  variants={tableHeaderVariants}
                                >
                                  {header}
                                  <ArrowUpDown className="ml-2 h-4 w-4" />
                                </motion.div>
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <AnimatePresence>
                            {filteredSchedules.map((schedule) => (
                              <motion.tr
                                key={schedule.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <TableCell className="font-medium">
                                  {schedule.consultantName}
                                </TableCell>
                                <TableCell>{schedule.departmentName}</TableCell>
                                <TableCell>{schedule.designation}</TableCell>
                                <TableCell>
                                  {schedule.opdTiming.from} -
                                  {schedule.opdTiming.to}
                                </TableCell>
                                <TableCell>
                                  {schedule.days.join(", ")}
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => openDialog(schedule)}
                                        >
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Edit schedule
                                      </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() =>
                                            cloneSchedule(schedule)
                                          }
                                        >
                                          <Copy className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Clone schedule
                                      </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="destructive"
                                          size="sm"
                                          onClick={() =>
                                            confirmDelete(schedule.id)
                                          }
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Delete schedule
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </TableCell>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <AnimatePresence>
                        {filteredSchedules.map((schedule) => (
                          <motion.div
                            key={schedule.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center mb-4">
                                  <Clock className="w-10 h-10 text-primary mr-3" />
                                  <div>
                                    <h3 className="text-lg font-semibold text-primary">
                                      {schedule.consultantName}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {schedule.designation}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm mb-2">
                                  <strong>Department:</strong>{" "}
                                  {schedule.departmentName}
                                </p>
                                <p className="text-sm mb-2">
                                  <strong>OPD Timing:</strong>{" "}
                                  {schedule.opdTiming.from} -{" "}
                                  {schedule.opdTiming.to}
                                </p>
                                <p className="text-sm mb-4">
                                  <strong>Days:</strong>{" "}
                                  {schedule.days.join(", ")}
                                </p>
                                <div className="flex justify-end items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openDialog(schedule)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => cloneSchedule(schedule)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => confirmDelete(schedule.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingSchedule ? "Edit Schedule" : "Add New Schedule"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="consultantName" className="text-right">
                          Consultant Name
                        </label>
                        <input
                          id="consultantName"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...register("consultantName", {
                            required: "Consultant Name is required",
                          })}
                        />
                      </div>
                      {errors.consultantName && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.consultantName.message}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="departmentName" className="text-right">
                          Department
                        </label>
                        <Controller
                          name="departmentName"
                          control={control}
                          rules={{ required: "Department is required" }}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || undefined}
                            >
                              <SelectTrigger className="w-full col-span-3">
                                <SelectValue placeholder="Select Department" />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem key={dept.id} value={dept.name}>
                                    {dept.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      {errors.departmentName && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.departmentName.message}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="designation" className="text-right">
                          Designation
                        </label>
                        <input
                          id="designation"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...register("designation", {
                            required: "Designation is required",
                          })}
                        />
                      </div>
                      {errors.designation && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.designation.message}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="opdTimingFrom" className="text-right">
                          OPD Timing From
                        </label>
                        <input
                          id="opdTimingFrom"
                          type="time"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...register("opdTiming.from", {
                            required: "OPD Timing From is required",
                          })}
                        />
                      </div>
                      {errors.opdTiming?.from && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.opdTiming.from.message}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="opdTimingTo" className="text-right">
                          OPD Timing To
                        </label>
                        <input
                          id="opdTimingTo"
                          type="time"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...register("opdTiming.to", {
                            required: "OPD Timing To is required",
                          })}
                        />
                      </div>
                      {errors.opdTiming?.to && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.opdTiming.to.message}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-start gap-4">
                        <label className="text-right pt-2">
                          Available Days
                        </label>
                        <div className="col-span-3 grid grid-cols-2 gap-2">
                          {DAYS_OF_WEEK.map((day) => (
                            <div
                              key={day}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={day}
                                {...register("days")}
                                value={day}
                              />
                              <label
                                htmlFor={day}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {day}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {loading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Save
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                  </DialogHeader>
                  <p>
                    Are you sure you want to delete this schedule? This action
                    cannot be undone.
                  </p>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={deleteSchedule}>
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <motion.div
                className="fixed bottom-0 left-0 right-0 h-1 bg-primary"
                style={{ scaleX }}
              />
            </motion.div>
          </TooltipProvider>
        </div>
      </div>
    </main>
  );
}

// function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">Oops! Something went wrong.</strong>
//         <span className="block sm:inline">
//   {error?.message || "An unknown error occurred"}
// </span>

//         <button
//           className="absolute top-0 bottom-0 right-0 px-4 py-3"
//           onClick={resetErrorBoundary}
//         >
//           Try again
//         </button>
//       </div>
//     </div>
//   );
// }
