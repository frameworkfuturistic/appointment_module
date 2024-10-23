"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  FileText,
  Loader2,
  MoreHorizontal,
  Package2,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import axiosInstance from "@/lib/axiosInstance";

// API base URL

// Interfaces
interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  jobType: string;
  description: string;
  requirements: string;
  salaryRange: string;
  experienceLevel: string;
  postedBy: string;
  closingDate: string;
}

interface ApplicationForm {
  id?: number;
  jobId: number;
  applicantName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  linkedInProfile: string;
  portfolio: string;
  status: "pending" | "reviewed" | "interviewed" | "rejected" | "hired";
}

// API functions
const fetchJobs = async (): Promise<Job[]> => {
  const response = await axiosInstance.get("/jobs");
  return response;
};

const createJob = async (job: Omit<Job, "id">): Promise<Job> => {
  const response = await axiosInstance.post(`/jobs`, job);
  return response.data;
};

const updateJob = async (job: Job): Promise<Job> => {
  const response = await axiosInstance.put(`/jobs/${job.id}`, job);
  return response.data;
};

const deleteJob = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/jobs/${id}`);
};

const fetchApplications = async (): Promise<ApplicationForm[]> => {
  const response = await axiosInstance.get("/applications");
  console.log("applications", response.data);
   
  return response;
};

const createApplication = async (
  application: Omit<ApplicationForm, "id">
): Promise<ApplicationForm> => {
  const response = await axiosInstance.post(
    `/applications`,
    application
  );
  return response.data;
};

const updateApplication = async (
  application: ApplicationForm
): Promise<ApplicationForm> => {
  const response = await axios.put(
    `/applications/${application.id}`,
    application
  );
  return response.data;
};

// Create a client
const queryClient = new QueryClient();

// Main component
export default function AdvancedJobDashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <JobDashboardContent />
    </QueryClientProvider>
  );
}

function JobDashboardContent() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobDialogOpen, setJobDialogOpen] = useState(false);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationForm | null>(null);
  const { toast } = useToast();

  const queryClient = useQueryClient();

  // Queries
  const jobsQuery = useQuery<Job[], Error>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const applicationsQuery = useQuery<ApplicationForm[], Error>({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  // Mutations
  const createJobMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({ title: "Job created successfully" });
      setJobDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Failed to create job", variant: "destructive" });
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({ title: "Job updated successfully" });
      setJobDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Failed to update job", variant: "destructive" });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({ title: "Job deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete job", variant: "destructive" });
    },
  });

  const createApplicationMutation = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast({ title: "Application submitted successfully" });
      setApplicationDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Failed to submit application", variant: "destructive" });
    },
  });

  const updateApplicationMutation = useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast({ title: "Application updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update application", variant: "destructive" });
    },
  });

  const handleCreateJob = (data: Omit<Job, "id">) => {
    createJobMutation.mutate(data);
  };

  const handleUpdateJob = (data: Job) => {
    updateJobMutation.mutate(data);
  };

  const handleDeleteJob = (id: number) => {
    deleteJobMutation.mutate(id);
  };

  const handleCreateApplication = (data: Omit<ApplicationForm, "id">) => {
    createApplicationMutation.mutate(data);
  };

  const handleUpdateApplication = (data: ApplicationForm) => {
    updateApplicationMutation.mutate(data);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
  
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {jobsQuery.data?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Active Applications
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applicationsQuery.data?.filter(
                  (app) => app.status === "pending"
                ).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Hired Candidates
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applicationsQuery.data?.filter((app) => app.status === "hired")
                  .length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Closing Soon
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {jobsQuery.data?.filter((job) => {
                  const closingDate = new Date(job.closingDate);
                  const now = new Date();
                  const diffTime = closingDate.getTime() - now.getTime();
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  return diffDays <= 7;
                }).length || 0}
              </div>
              <p className="text-xs  text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Job Listings</CardTitle>
            </CardHeader>
            <CardContent>
              {jobsQuery.isLoading ? (
                <div className="flex items-center justify-center h-[200px]">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Job ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Closing Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobsQuery.data?.slice(0, 5).map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.id}</TableCell>
                        <TableCell>{job.title}</TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell>
                          {format(new Date(job.closingDate), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedJob(job);
                                  setJobDialogOpen(true);
                                }}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteJob(job.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>
                You have {applicationsQuery.data?.length || 0} total
                applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {applicationsQuery.isLoading ? (
                <div className="flex items-center justify-center h-[200px]">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : (
                <ScrollArea className="h-[300px]">
                  {applicationsQuery.data?.slice(0, 5).map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center mb-4 last:mb-0"
                    >
                      {/* <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                        <AvatarFallback>
                          {application.applicantName.charAt(0)}
                        </AvatarFallback>
                      </Avatar> */}
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {application.applicantName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {application.email}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Badge
                          variant={
                            application.status === "hired"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {application.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <JobDialog
        open={jobDialogOpen}
        onOpenChange={setJobDialogOpen}
        job={selectedJob}
        onSubmit={(data) => {
          if (selectedJob) {
            handleUpdateJob({ ...selectedJob, ...data });
          } else {
            handleCreateJob(data);
          }
        }}
      />
      <ApplicationDialog
        open={applicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
        jobId={selectedJob?.id}
        onSubmit={handleCreateApplication}
      />
    </div>
  );
}

function JobDialog({
  open,
  onOpenChange,
  job,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job | null;
  onSubmit: (data: Omit<Job, "id">) => void;
}) {
  const { register, handleSubmit, reset } = useForm<Omit<Job, "id">>({
    defaultValues: job || {
      title: "",
      department: "",
      location: "",
      jobType: "",
      description: "",
      requirements: "",
      salaryRange: "",
      experienceLevel: "",
      postedBy: "",
      closingDate: "",
    },
  });

  const onSubmitForm = (data: Omit<Job, "id">) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{job ? "Edit Job" : "Create New Job"}</DialogTitle>
          <DialogDescription>
            {job
              ? "Edit the job details below."
              : "Fill in the job details below."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                {...register("title", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                className="col-span-3"
                {...register("department", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                className="col-span-3"
                {...register("location", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jobType" className="text-right">
                Job Type
              </Label>
              <Input
                id="jobType"
                className="col-span-3"
                {...register("jobType", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                {...register("description", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="requirements" className="text-right">
                Requirements
              </Label>
              <Textarea
                id="requirements"
                className="col-span-3"
                {...register("requirements", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salaryRange" className="text-right">
                Salary Range
              </Label>
              <Input
                id="salaryRange"
                className="col-span-3"
                {...register("salaryRange", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experienceLevel" className="text-right">
                Experience
              </Label>
              <Input
                id="experienceLevel"
                className="col-span-3"
                {...register("experienceLevel", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postedBy" className="text-right">
                Posted By
              </Label>
              <Input
                id="postedBy"
                className="col-span-3"
                {...register("postedBy", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="closingDate" className="text-right">
                Closing Date
              </Label>
              <Input
                id="closingDate"
                type="date"
                className="col-span-3"
                {...register("closingDate", { required: true })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{job ? "Update Job" : "Create Job"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ApplicationDialog({
  open,
  onOpenChange,
  jobId,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: number | undefined;
  onSubmit: (data: Omit<ApplicationForm, "id">) => void;
}) {
  const { register, handleSubmit, reset } = useForm<
    Omit<ApplicationForm, "id">
  >({
    defaultValues: {
      jobId: jobId || 0,
      applicantName: "",
      email: "",
      phone: "",
      resume: null,
      coverLetter: "",
      linkedInProfile: "",
      portfolio: "",
      status: "pending",
    },
  });

  const onSubmitForm = (data: Omit<ApplicationForm, "id">) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Job Application</DialogTitle>
          <DialogDescription>
            Fill in your details to apply for this job.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="applicantName" className="text-right">
                Name
              </Label>
              <Input
                id="applicantName"
                className="col-span-3"
                {...register("applicantName", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="col-span-3"
                {...register("email", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                className="col-span-3"
                {...register("phone", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input
                id="resume"
                type="file"
                className="col-span-3"
                {...register("resume")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="coverLetter" className="text-right">
                Cover Letter
              </Label>
              <Textarea
                id="coverLetter"
                className="col-span-3"
                {...register("coverLetter", { required: true })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="linkedInProfile" className="text-right">
                LinkedIn
              </Label>
              <Input
                id="linkedInProfile"
                className="col-span-3"
                {...register("linkedInProfile")}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="portfolio" className="text-right">
                Portfolio
              </Label>
              <Input
                id="portfolio"
                className="col-span-3"
                {...register("portfolio")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit Application</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
