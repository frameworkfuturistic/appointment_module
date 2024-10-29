// @ts-nocheck

"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Briefcase,
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
  DialogTrigger,
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

import { Badge } from "@/components/ui/badge";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/lib/axiosInstance";

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
  id: string;
  jobId: string;
  applicantName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  linkedInProfile: string;
  portfolio: string;
  status: "Applied" | "In Review" | "Shortlisted" | "Rejected" | "Accepted" | "Reviewed" | "Interviewed" | "Hired";
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

// API functions
const fetchJobs = async (): Promise<Job[]> => {
  const response = await axiosInstance.get("/jobs");
  console.log("Job", response);
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

// Fetch applications function
const fetchApplications = async () => {
  const response = await axiosInstance.get("/applications");
  return response; // Make sure to return the correct data
};

// Update application function
const updateApplication = async (application) => {
  if (!application._id) {
    throw new Error("Application ID is missing");
  }
  const response = await axiosInstance.put(
    `/applications/${application._id}/status`,
    { status: application.status }
  );
  return response;
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

  const handleUpdateApplication = (data) => {
    updateApplicationMutation.mutate(data);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {jobsQuery.data?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Applications
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applicationsQuery.data?.filter(
                  (app) => app.status === "Applied"
                ).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                +15% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Hired Candidates
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applicationsQuery.data?.filter((app) => app.status === "Hired")
                  .length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Closing Soon
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
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
              <p className="text-xs text-muted-foreground">
                +5% from last week
              </p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="jobs" className="mt-6">
          <TabsList>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
              <Button onClick={() => setJobDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add New Job
              </Button>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* <TableHead className="w-[100px]">ID</TableHead> */}
                    <TableHead>Title</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Closing Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobsQuery.data?.map((job) => (
                    <TableRow key={job._id}>
                      {/* <TableCell className="font-medium">{job._id}</TableCell> */}
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.department}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>
                        {format(new Date(job.closingDate), "PP")}
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
            </div>
          </TabsContent>
          <TabsContent value="applications">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Applications
              </h2>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Job ID</TableHead>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicationsQuery.data?.map((application) => (
                    <TableRow key={application._id}>
                      <TableCell>{application.jobId?._id || "N/A"}</TableCell>
                      {/* Job ID */}
                      <TableCell>{application.applicantName}</TableCell>
                      <TableCell>
                        <TableCell>
                          {application.jobId?.title || "N/A"}
                        </TableCell>{" "}
                        {/* Job Title */}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            application.status === "Hired"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(application.appliedAt), "PP")}
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
                                setSelectedApplication(application);
                                setApplicationDialogOpen(true);
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateApplication({
                                  ...application,
                                  status: "In Review",
                                })
                              }
                            >
                              Mark as In Review
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateApplication({
                                  ...application,
                                  status: "Shortlisted",
                                })
                              }
                            >
                              Mark as Shortlisted
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateApplication({
                                  ...application,
                                  status: "Rejected",
                                })
                              }
                            >
                              Reject Application
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateApplication({
                                  ...application,
                                  status: "Accepted",
                                })
                              }
                            >
                            Interviewed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateApplication({
                                  ...application,
                                  status: "Reviewed",
                                })
                              }
                            >
                              Mark as Reviewed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateApplication({
                                  ...application,
                                  status: "Interviewed",
                                })
                              }
                            >
                               Mark as Interviewed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleUpdateApplication({
                                  ...application,
                                  status: "Hired",
                                })
                              }
                            >
                               Mark as Hired
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedJob ? "Edit Job" : "Create New Job"}
            </DialogTitle>
            <DialogDescription>
              {selectedJob
                ? "Edit the job details below."
                : "Fill in the job details below."}
            </DialogDescription>
          </DialogHeader>
          <JobForm
            job={selectedJob}
            onSubmit={(data) => {
              if (selectedJob) {
                handleUpdateJob({ ...data, id: selectedJob.id });
              } else {
                handleCreateJob(data);
              }
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={applicationDialogOpen}
        onOpenChange={setApplicationDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={selectedApplication.applicantName}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={selectedApplication.email}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function JobForm({
  job,
  onSubmit,
}: {
  job?: Job;
  onSubmit: (data: Omit<Job, "id">) => void;
}) {
  const { register, handleSubmit, control } = useForm<Omit<Job, "id">>({
    defaultValues: job || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            Experience Level
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
          <Controller
            name="closingDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="closingDate"
                type="date"
                className="col-span-3"
                {...field}
                value={
                  field.value
                    ? new Date(field.value).toISOString().split("T")[0]
                    : ""
                }
              />
            )}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
}
