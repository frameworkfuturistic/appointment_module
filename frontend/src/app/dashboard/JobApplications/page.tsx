'use client'

import React, { useState, useCallback } from "react"
import { useForm, Controller } from "react-hook-form"
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { format } from "date-fns"
import {
  MoreHorizontal,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Briefcase,
  FileText,
  Eye,
  Edit,
  Trash,
  Download,
  Search,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast, useToast } from "@/components/ui/use-toast"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import axiosInstance from "@/lib/axiosInstance"

interface Job {
  _id: string
  title: string
  department: string
  location: string
  jobType: string
  description: string
  requirements: string
  salaryRange: string
  experienceLevel: string
  postedBy: string
  closingDate: string
}

interface ApplicationForm {
  _id: string
  jobId: {
    _id: string
    title: string
  }
  applicantName: string
  email: string
  phone: string
  resume: string
  coverLetter: string
  linkedInProfile: string
  portfolio: string
  status: "Applied" | "In Review" | "Shortlisted" | "Rejected" | "Accepted" | "Reviewed" | "Interviewed" | "Hired"
  appliedAt: string
  createdAt: string
  updatedAt: string
}

const fetchJobs = async (): Promise<Job[]> => {
  const response = await axiosInstance.get("/jobs")
  return response.data
}

const createJob = async (job: Omit<Job, "_id">): Promise<Job> => {
  const response = await axiosInstance.post(`/jobs`, job)
  return response.data
}

const updateJob = async (job: Job): Promise<Job> => {
  const response = await axiosInstance.put(`/jobs/${job._id}`, job)
  return response.data
}

const deleteJob = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/jobs/${id}`)
}

const fetchApplications = async (): Promise<ApplicationForm[]> => {
  const response = await axiosInstance.get("/applications")
  return response.data
}

const updateApplication = async (application: ApplicationForm): Promise<ApplicationForm> => {
  const response = await axiosInstance.put(
    `/applications/${application._id}/status`,
    { status: application.status }
  )
  return response.data
}

const queryClient = new QueryClient()

export default function AdvancedCareerDashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <CareerDashboardContent />
    </QueryClientProvider>
  )
}

function CareerDashboardContent() {
  const [activeTab, setActiveTab] = useState("jobs")
  const [jobDialogOpen, setJobDialogOpen] = useState(false)
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [selectedApplication, setSelectedApplication] = useState<ApplicationForm | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const jobsQuery = useQuery<Job[], Error>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  })

  const applicationsQuery = useQuery<ApplicationForm[], Error>({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  })

  const createJobMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      toast({ title: "Job created successfully" })
      setJobDialogOpen(false)
    },
    onError: () => {
      toast({ title: "Failed to create job", variant: "destructive" })
    },
  })

  const updateJobMutation = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      toast({ title: "Job updated successfully" })
      setJobDialogOpen(false)
    },
    onError: () => {
      toast({ title: "Failed to update job", variant: "destructive" })
    },
  })

  const deleteJobMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] })
      toast({ title: "Job deleted successfully" })
    },
    onError: () => {
      toast({ title: "Failed to delete job", variant: "destructive" })
    },
  })

  const updateApplicationMutation = useMutation({
    mutationFn: updateApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] })
      toast({ title: "Application updated successfully" })
    },
    onError: () => {
      toast({ title: "Failed to update application", variant: "destructive" })
    },
  })

  const handleCreateJob = useCallback((data: Omit<Job, "_id">) => {
    createJobMutation.mutate(data)
  }, [createJobMutation])

  const handleUpdateJob = useCallback((data: Job) => {
    updateJobMutation.mutate(data)
  }, [updateJobMutation])

  const handleDeleteJob = useCallback((id: string) => {
    deleteJobMutation.mutate(id)
  }, [deleteJobMutation])

  const handleUpdateApplication = useCallback((data: ApplicationForm) => {
    updateApplicationMutation.mutate(data)
  }, [updateApplicationMutation])

  const filteredJobs = jobsQuery.data?.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const filteredApplications = applicationsQuery.data?.filter(app =>
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobId.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.status.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const renderDashboardCards = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Total Jobs"
        value={jobsQuery.data?.length || 0}
        icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
        description="+20% from last month"
      />
      <DashboardCard
        title="Active Applications"
        value={applicationsQuery.data?.filter((app) => app.status === "Applied").length || 0}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        description="+15% from last week"
      />
      <DashboardCard
        title="Hired Candidates"
        value={applicationsQuery.data?.filter((app) => app.status === "Hired").length || 0}
        icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
        description="+10% from last month"
      />
      <DashboardCard
        title="Closing Soon"
        value={
          jobsQuery.data?.filter((job) => {
            const closingDate = new Date(job.closingDate)
            const now = new Date()
            const diffTime = closingDate.getTime() - now.getTime()
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            return diffDays <= 7
          }).length || 0
        }
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        description="+5% from last week"
      />
    </div>
  )

  const renderJobsTab = () => (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full md:w-64"
            />
          </div>
          <Button onClick={() => setJobDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Job
          </Button>
        </div>
      </div>
      <div className="rounded-md border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Closing Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobsQuery.isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                </TableRow>
              ))
            ) : filteredJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.department}</TableCell>
                <TableCell className="hidden md:table-cell">{job.location}</TableCell>
                <TableCell className="hidden md:table-cell">{format(new Date(job.closingDate), "PP")}</TableCell>
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
                          setSelectedJob(job)
                          setJobDialogOpen(true)
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteJob(job._id)}>
                        <Trash className="mr-2 h-4 w-4" />
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
    </>
  )

  const renderApplicationsTab = () => (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full md:w-64"
          />
        </div>
      </div>
      <div className="rounded-md border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Applicant Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Applied At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicationsQuery.isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8 rounded-full" /></TableCell>
                </TableRow>
              ))
            ) : filteredApplications.map((application) => (
              <TableRow key={application._id}>
                <TableCell>{application.jobId?.title || "N/A"}</TableCell>
                <TableCell>{application.applicantName}</TableCell>
                <TableCell>
                  <Badge variant={application.status === "Hired" ? "default" : "secondary"}>
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{format(new Date(application.appliedAt), "PP")}</TableCell>
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
                          setSelectedApplication(application)
                          setApplicationDialogOpen(true)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                      {["In Review", "Shortlisted", "Rejected", "Accepted", "Reviewed", "Interviewed", "Hired"].map(
                        (status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => handleUpdateApplication({ ...application, status: status as ApplicationForm['status'] })}
                          >
                            Mark as {status}
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        {renderDashboardCards()}
        <Card className="mt-6">
          <CardContent className="p-6">
            <Tabs defaultValue="jobs" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              <TabsContent value="jobs">{renderJobsTab()}</TabsContent>
              <TabsContent value="applications">{renderApplicationsTab()}</TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <JobDialog
        isOpen={jobDialogOpen}
        onClose={() => {
          setJobDialogOpen(false)
          setSelectedJob(null)
        }}
        job={selectedJob}
        onSubmit={(data) => (selectedJob ? handleUpdateJob(data as Job) : handleCreateJob(data))}
      />

      <ApplicationDialog
        isOpen={applicationDialogOpen}
        onClose={() => {
          setApplicationDialogOpen(false)
          setSelectedApplication(null)
        }}
        application={selectedApplication}
        onUpdateStatus={handleUpdateApplication}
      />
    </div>
  )
}

function DashboardCard({ title, value, icon, description }: { title: string; value: number; icon: React.ReactNode; description: string }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function JobDialog({ isOpen, onClose, job, onSubmit }: { isOpen: boolean; onClose: () => void; job: Job | null; onSubmit: (data: Omit<Job, "_id"> | Job) => void }) {
  const { register, handleSubmit, control, reset } = useForm<Omit<Job, "_id">>({
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
  })

  React.useEffect(() => {
    if (isOpen) {
      reset(job || {})
    }
  }, [isOpen, job, reset])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{job ? "Edit Job" : "Create New Job"}</DialogTitle>
          <DialogDescription>{job ? "Edit the job details below." : "Fill in the job details below."}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" className="col-span-3" {...register("title", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input id="department" className="col-span-3" {...register("department", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input id="location" className="col-span-3" {...register("location", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="jobType" className="text-right">
                Job Type
              </Label>
              <Input id="jobType" className="col-span-3" {...register("jobType", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" className="col-span-3" {...register("description", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="requirements" className="text-right">
                Requirements
              </Label>
              <Textarea id="requirements" className="col-span-3" {...register("requirements", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salaryRange" className="text-right">
                Salary Range
              </Label>
              <Input id="salaryRange" className="col-span-3" {...register("salaryRange", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experienceLevel" className="text-right">
                Experience Level
              </Label>
              <Input id="experienceLevel" className="col-span-3" {...register("experienceLevel", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postedBy" className="text-right">
                Posted By
              </Label>
              <Input id="postedBy" className="col-span-3" {...register("postedBy", { required: true })} />
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
                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function ApplicationDialog({
  isOpen,
  onClose,
  application,
  onUpdateStatus,
}: {
  isOpen: boolean
  onClose: () => void
  application: ApplicationForm | null
  onUpdateStatus: (application: ApplicationForm) => void
}) {
  if (!application) return null

  const resumeUrl = `http://localhost:5555/blogs/${application.resume.replace(/^uploads[\\/]/, '').replace(/\\/g, '/')}`

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Name</Label>
            <span className="col-span-3">{application.applicantName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Email</Label>
            <span className="col-span-3">{application.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Phone</Label>
            <span className="col-span-3">{application.phone}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Job</Label>
            <span className="col-span-3">{application.jobId.title}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Status</Label>
            <Select
              value={application.status}
              onValueChange={(value) => onUpdateStatus({ ...application, status: value as ApplicationForm['status'] })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                {["Applied", "In Review", "Shortlisted", "Rejected", "Accepted", "Reviewed", "Interviewed", "Hired"].map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Resume</Label>
            <div className="col-span-3">
              <Button asChild>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Cover Letter</Label>
            <p className="col-span-3">{application.coverLetter}</p>
          </div>
          {application.linkedInProfile && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">LinkedIn</Label>
              <a href={application.linkedInProfile} target="_blank" rel="noopener noreferrer" className="col-span-3 text-blue-600 hover:underline">
                {application.linkedInProfile}
              </a>
            </div>
          )}
          {application.portfolio && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Portfolio</Label>
              <a href={application.portfolio} target="_blank" rel="noopener noreferrer" className="col-span-3 text-blue-600 hover:underline">
                {application.portfolio}
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}