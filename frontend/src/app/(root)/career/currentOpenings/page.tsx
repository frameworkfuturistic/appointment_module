"use client";

import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Loader2,
  Star,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import HeaderBanner from "@/components/HeaderBanner";

// Types
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
  applicantName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  linkedInProfile: string;
  portfolio: string;
}

// API functions
const fetchJobs = async (): Promise<Job[]> => {
  const response = await axiosInstance.get<Job[]>("/jobs");
  return response;
};

const postJobApplication = async (applicationData: FormData): Promise<any> => {
  const response = await axiosInstance.post("/applications", applicationData);
  console.log("postResume", response.data);

  return response.data;
};

// Create a client
const queryClient = new QueryClient();

function CareerPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [applicationForm, setApplicationForm] = useState<ApplicationForm>({
    applicantName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    linkedInProfile: "",
    portfolio: "",
  });

  const { toast } = useToast();

  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const applyMutation = useMutation({
    mutationFn: postJobApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      setIsDialogOpen(false);
      toast({
        title: "Application Submitted",
        description: "Your job application has been successfully submitted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredJobs =
    jobs?.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDepartment === "" || job.department === selectedDepartment) &&
        (selectedJobType === "" || job.jobType === selectedJobType) &&
        (selectedExperienceLevel === "" ||
          job.experienceLevel === selectedExperienceLevel)
    ) || [];

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsDialogOpen(true);
  };

  const toggleJobExpansion = (jobId: number) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      setApplicationForm((prev) => ({
        ...prev,
        [name]: fileInput.files ? fileInput.files[0] : null,
      }));
    } else {
      setApplicationForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitApplication = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(applicationForm).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });
    if (selectedJob) {
      formData.append("jobId", selectedJob._id);
      console.log("jobId", selectedJob);
    }
    applyMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HeaderBanner
        title="Career "
        subtitle="Providing Exceptional Healthcare with Compassion and Excellence"
        bgImage="/gallery/gallery14.png" // Replace with your actual image path
      />
      <header className="bg-white shadow-md p-6 md:m-10 md:rounded-full m-4 rounded-lg">

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Nursing">Nursing</SelectItem>
                <SelectItem value="Laboratory">Laboratory</SelectItem>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedJobType} onValueChange={setSelectedJobType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-Time">Full-Time</SelectItem>
                <SelectItem value="Part-Time">Part-Time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedExperienceLevel}
              onValueChange={setSelectedExperienceLevel}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Entry Level">Entry Level</SelectItem>
                <SelectItem value="Mid Level">Mid Level</SelectItem>
                <SelectItem value="Senior Level">Senior Level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </motion.div>
          ) : isError ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-red-600 mt-4"
            >
              Error: {(error as Error).message}
            </motion.div>
          ) : filteredJobs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-600 mt-8"
            >
              No jobs found matching your criteria. Please try adjusting your
              search or filters.
            </motion.div>
          ) : (
            <div className="mt-12 grid gap-8 md:grid-cols-2 ">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group h-full overflow-hidden rounded-xl border-2 border-transparent bg-white shadow-md transition-all duration-300  hover:shadow-xl">
                    <CardHeader className="relative bg-gradient-to-r from-primary/10 to-primary/5 p-4">
                      <div className="absolute right-4 top-4  p-2">
                        <Button
                          onClick={() => handleApply(job)}
                          className="w-full bg-primary text-white transition-all duration-300 hover:bg-primary-dark"
                        >
                          Apply Now
                        </Button>
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-800">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="mt-1 flex items-center text-xs text-gray-600">
                        <Users className="mr-1 h-4 w-4" />
                        {job.department}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-4 flex flex-col">
                      <div className="mb-2 flex flex-wrap gap-2">
                        <Badge
                          variant="outline"
                          className="flex items-center rounded-full px-2 py-1"
                        >
                          <MapPin className="mr-1 h-3 w-3" />
                          {job.location}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center rounded-full px-2 py-1"
                        >
                          <Briefcase className="mr-1 h-3 w-3" />
                          {job.jobType}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="flex items-center rounded-full px-2 py-1"
                        >
                          <DollarSign className="mr-1 h-3 w-3" />
                          {job.salaryRange}
                        </Badge>
                      </div>

                      <p className="mb-2 text-sm text-gray-600">
                        {expandedJobId === job.id
                          ? job.description
                          : `${job.description.slice(0, 100)}...`}
                      </p>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleJobExpansion(job.id)}
                        className="mb-4 text-primary hover:bg-primary/10 hover:text-primary-dark"
                      >
                        {expandedJobId === job.id ? (
                          <>
                            <ChevronUp className="mr-1 h-4 w-4" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="mr-1 h-4 w-4" />
                            Show More
                          </>
                        )}
                      </Button>

                      <AnimatePresence>
                        {expandedJobId === job.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h4 className="mb-1 font-semibold text-gray-700">
                              Requirements:
                            </h4>
                            <p className="mb-2 text-sm text-gray-600">
                              {job.requirements}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="mt-2 flex justify-between text-sm text-gray-500">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                Posted:{" "}
                                {new Date(job.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Job posting date</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" />
                                Closes:{" "}
                                {new Date(job.closingDate).toLocaleDateString()}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Application deadline</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}{" "}
            </div>
          )}
        </AnimatePresence>
      </main>

      
      <AnimatePresence>
        <Card className="py-16 md:py-32 bg-blue-900 text-white relative m-8 rounded-2xl">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Experience World-Class Healthcare
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Whether you're seeking routine care or specialized treatment, our
              doors are open. Let us be your partner in health and wellness.
            </p>
          </div>
        </Card>
      </AnimatePresence>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="md:max-w-[430px]">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              Please fill out the application form below. Fields marked with *
              are required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="applicantName">Full Name *</Label>
                  <Input
                    id="applicantName"
                    name="applicantName"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="resume">Resume *</Label>
                  <Input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="linkedInProfile">LinkedIn Profile</Label>
                  <Input
                    id="linkedInProfile"
                    name="linkedInProfile"
                    type="url"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio</Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    type="url"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button
                type="submit"
                disabled={applyMutation.isPending}
                className="w-full"
              >
                {applyMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Component() {
  return (
    <QueryClientProvider client={queryClient}>
      <CareerPageContent />
    </QueryClientProvider>
  );
}
