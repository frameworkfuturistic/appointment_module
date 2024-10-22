"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  LayoutGrid,
  LayoutList,
  Loader2,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import axios from "axios";

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  profileImg: string;
  specialization: string;
  departmentId: Number;
}

interface Department {
  id: string;
  name: string;
}

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Doctor;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [filterSpecialization, setFilterSpecialization] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

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
  } = useForm<Doctor>();

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8585/api/V1/doctors");
      if (Array.isArray(response.data.data)) {
        setDoctors(response.data.data);
      } else {
        throw new Error("Invalid data format received from API");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching doctors");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8585/api/V1/departments"
      );
      if (Array.isArray(response.data.data)) {
        setDepartments(response.data.data);
      } else {
        throw new Error("Invalid data format received from API");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error fetching departments"
      );
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, [fetchDoctors, fetchDepartments]);

  const onSubmit = async (data: Doctor) => {
    try {
      setLoading(true);
  
      // Exclude 'createdAt' and 'updatedAt' from the update payload
      const { id, createdAt, updatedAt, ...doctorData } = data;
  
      // Convert departmentId to a number if it exists
      if (doctorData.departmentId) {
        doctorData.departmentId = Number(doctorData.departmentId);
      }
  
      if (editingDoctor) {
        const response = await axios.put(
          `http://localhost:8585/api/V1/doctors/${editingDoctor.id}`,
          doctorData
        );
        if (response.status === 200) {
          setDoctors(
            doctors.map((doc) =>
              doc.id === editingDoctor.id ? { ...doc, ...doctorData } : doc
            )
          );
          setSuccessMessage("Doctor updated successfully!");
        }
      } else {
        const response = await axios.post(
          "http://localhost:8585/api/V1/doctors",
          doctorData
        );
        if (response.status === 201) {
          setDoctors([...doctors, response.data]);
          setSuccessMessage("Doctor created successfully!");
        }
      }
  
      setIsDialogOpen(false);
      setEditingDoctor(null);
      reset();
      fetchDoctors();
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data.message || "Error creating/updating doctor"
          : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };
  

  const openDialog = (doctor?: Doctor) => {
    if (doctor) {
      setEditingDoctor(doctor);
      reset(doctor);
    } else {
      setEditingDoctor(null);
      reset();
    }
    setIsDialogOpen(true);
  };

  const deleteDoctor = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8585/api/V1/doctors/${id}`);
      setDoctors(doctors.filter((doc) => doc.id !== id));
      setSuccessMessage("Doctor deleted successfully!");
      fetchDoctors();
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data.message || "Error deleting doctor"
          : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: keyof Doctor) => {
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

  const sortedDoctors = [...doctors].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredDoctors = sortedDoctors
    .filter(
      (doc) =>
        (doc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (doc.email?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false) ||
        (doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ??
          false)
    )
    .filter(
      (doc) =>
        (!filterSpecialization ||
          doc.specialization === filterSpecialization) &&
        (!filterDepartment || doc.departmentId === filterDepartment)
    );

  const tableHeaderVariants = {
    hover: { backgroundColor: "#f0f9ff", transition: { duration: 0.2 } },
  };

  return (
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
                    Notice
                    </h3>
                    <p className="text-3xl font-bold text-primary">
                      {doctors.length}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                    News
                    </h3>
                    <p className="text-3xl font-bold text-primary">
                      {departments.length}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-primary">
                    Event
                    </h3>
                    <p className="text-3xl font-bold text-primary">
                      {new Set(doctors.map((d) => d.specialization)).size}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-background rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full sm:w-64">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search doctors"
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Select
                        onValueChange={setFilterSpecialization}
                        value={filterSpecialization}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by Specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            All Specializations
                          </SelectItem>
                          {Array.from(
                            new Set(doctors.map((d) => d.specialization))
                          ).map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        onValueChange={setFilterDepartment}
                        value={filterDepartment}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Filter by Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id}>
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
                      <Plus className="mr-2 h-4 w-4" /> New Doctor
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
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : viewMode === "table" ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            {[
                              "Name",
                              "Email",
                              "Phone",
                              "Specialization",
                              "Department",
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
                                      header.toLowerCase() as keyof Doctor
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
                            {filteredDoctors.map((doctor) => (
                              <motion.tr
                                key={doctor.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <TableCell className="font-medium">
                                  {doctor.name}
                                </TableCell>
                                <TableCell>{doctor.email}</TableCell>
                                <TableCell>{doctor.phone}</TableCell>
                                <TableCell>{doctor.specialization}</TableCell>
                                <TableCell>
                                  {
                                    departments.find(
                                      (d) => d.id === doctor.departmentId
                                    )?.name
                                  }
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => openDialog(doctor)}
                                        >
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Edit doctor
                                      </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="destructive"
                                          size="sm"
                                          onClick={() =>
                                            deleteDoctor(doctor.id)
                                          }
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Delete doctor
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
                        {filteredDoctors.map((doctor) => (
                          <motion.div
                            key={doctor.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex items-center mb-4">
                                  <img
                                    src={
                                      doctor.profileImg ||
                                      "/placeholder.svg?height=40&width=40"
                                    }
                                    alt={doctor.name}
                                    className="w-10 h-10 rounded-full mr-3"
                                  />
                                  <div>
                                    <h3 className="text-lg font-semibold text-primary">
                                      {doctor.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                      {doctor.specialization}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm mb-2">
                                  <strong>Email:</strong> {doctor.email}
                                </p>
                                <p className="text-sm mb-2">
                                  <strong>Phone:</strong> {doctor.phone}
                                </p>
                                <p className="text-sm mb-4">
                                  <strong>Department:</strong>{" "}
                                  {
                                    departments.find(
                                      (d) => d.id === doctor.departmentId
                                    )?.name
                                  }
                                </p>
                                <p className="text-sm mb-4 text-muted-foreground line-clamp-3">
                                  {doctor.bio}
                                </p>
                                <div className="flex justify-end items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openDialog(doctor)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteDoctor(doctor.id)}
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
                      {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                          Name
                        </label>
                        <Input
                          id="name"
                          className="col-span-3"
                          {...register("name", {
                            required: "Name is required",
                          })}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.name.message}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          className="col-span-3"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.email.message}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="phone" className="text-right">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          className="col-span-3"
                          {...register("phone", {
                            required: "Phone is required",
                          })}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.phone.message}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="specialization" className="text-right">
                          Specialization
                        </label>
                        <Input
                          id="specialization"
                          className="col-span-3"
                          {...register("specialization", {
                            required: "Specialization is required",
                          })}
                        />
                      </div>
                      {errors.specialization && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.specialization.message}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="departmentId" className="text-right">
                          Department
                        </label>
                        <Controller
                          name="departmentId"
                          control={control}
                          rules={{ required: "Department is required" }}
                          render={({ field }) => (
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              } // Ensure value is a number
                              value={field.value || undefined}
                            >
                              <SelectTrigger className="w-full col-span-3">
                                <SelectValue>
                                  {field.value
                                    ? departments.find(
                                        (dept) => dept.id === field.value
                                      )?.name // Display department name
                                    : "Select Department"}{" "}
                                  {/* Placeholder */}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((dept) => (
                                  <SelectItem
                                    key={dept.id}
                                    value={String(dept.id)}
                                  >
                                    {" "}
                                    {/* Convert value to string for SelectItem */}
                                    {dept.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      {errors.departmentId && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.departmentId.message}
                        </p>
                      )}

                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="bio" className="text-right">
                          Bio
                        </label>
                        <Textarea
                          id="bio"
                          className="col-span-3"
                          {...register("bio", { required: "Bio is required" })}
                        />
                      </div>
                      {errors.bio && (
                        <p className="text-red-500 text-sm ml-[8.5rem]">
                          {errors.bio.message}
                        </p>
                      )}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="profileImg" className="text-right">
                          Profile Image URL
                        </label>
                        <Input
                          id="profileImg"
                          className="col-span-3"
                          {...register("profileImg")}
                        />
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
