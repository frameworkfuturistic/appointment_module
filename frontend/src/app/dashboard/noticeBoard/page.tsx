'use client'

import { useState, useEffect, useCallback } from "react"
import { useForm, Controller } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Loader2,
  ArrowUpDown,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import axiosInstance from "@/lib/axiosInstance"

interface Announcement {
  _id: string
  title: string
  description: string
  type: "Notice" | "News" | "Event"
  priority: "Low" | "Medium" | "High"
  startDate: string
  status: "Draft" | "Published" | "Archived" | "Upcoming" | "Ongoing" | "Past"
  author: string
  ImpLink?: string
  thumbnailImage?: string
  attachment?: string
}

export default function AnnouncementManagement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof Announcement; direction: "asc" | "desc" } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("list")

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Announcement>()

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/announcement")
      if (Array.isArray(response.data.announcements)) {
        setAnnouncements(response.data.announcements)
      } else {
        throw new Error("Invalid data format received from API")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching announcements")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAnnouncements()
  }, [fetchAnnouncements])

  const onSubmit = async (data: Announcement) => {
    try {
      setLoading(true)
      if (editingAnnouncement) {
        const response = await axiosInstance.put(`/announcement/${editingAnnouncement._id}`, data)
        if (response.status === 200) {
          setAnnouncements(announcements.map((ann) => (ann.id === editingAnnouncement._id ? { ...ann, ...data } : ann)))
          setSuccessMessage("Announcement updated successfully!")
        }
      } else {
        const response = await axiosInstance.post("/announcement", data)
        if (response.status === 201) {
          setAnnouncements([...announcements, response.data])
          setSuccessMessage("Announcement created successfully!")
        }
      }
      setIsDialogOpen(false)
      setEditingAnnouncement(null)
      reset()
      fetchAnnouncements()
    } catch (err) {
      setError(
        axios.isAxiosError(err) ? err.response?.data.message || "Error creating/updating announcement" : "An unexpected error occurred"
      )
    } finally {
      setLoading(false)
    }
  }

  const openDialog = (announcement?: Announcement) => {
    if (announcement) {
      setEditingAnnouncement(announcement)
      reset(announcement)
    } else {
      setEditingAnnouncement(null)
      reset()
    }
    setIsDialogOpen(true)
  }

  const deleteAnnouncement = async (id: string) => {
    try {
      setLoading(true)
      await axiosInstance.delete(`/announcement/${id}`)
      setAnnouncements(announcements.filter((ann) => ann._id !== id))
      setSuccessMessage("Announcement deleted successfully!")
      fetchAnnouncements()
    } catch (err) {
      setError(
        axios.isAxiosError(err) ? err.response?.data.message || "Error deleting announcement" : "An unexpected error occurred"
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSort = (key: keyof Announcement) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (!sortConfig) return 0
    const { key, direction } = sortConfig
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1
    return 0
  })

  const filteredAnnouncements = sortedAnnouncements.filter(
    (ann) =>
      ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const announcementCounts = announcements.reduce(
    (acc, ann) => {
      acc[ann.type]++
      return acc
    },
    { Notice: 0, News: 0, Event: 0 }
  )

  return (
    <main className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {Object.entries(announcementCounts).map(([type, count]) => (
              <Card key={type}>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-primary">{type}</h3>
                  <p className="text-3xl font-bold text-primary">{count}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-background rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search announcements"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" size="icon" onClick={() => setView("grid")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect width="7" height="7" x="3" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="14" rx="1" />
                      <rect width="7" height="7" x="3" y="14" rx="1" />
                    </svg>
                    <span className="sr-only">Grid view</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setView("list")}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <line x1="8" x2="21" y1="6" y2="6" />
                      <line x1="8" x2="21" y1="12" y2="12" />
                      <line x1="8" x2="21" y1="18" y2="18" />
                      <line x1="3" x2="3.01" y1="6" y2="6" />
                      <line x1="3" x2="3.01" y1="12" y2="12" />
                      <line x1="3" x2="3.01" y1="18" y2="18" />
                    </svg>
                    <span className="sr-only">List view</span>
                  </Button>
                  <Button onClick={() => openDialog()} size="sm">
                    <Plus className="mr-2 h-4 w-4" /> New Announcement
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert variant="default" className="mb-4 bg-green-50 text-green-800 border-green-300">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : view === "list" ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {["Title", "Type", "Priority", "Start Date", "Status", "Actions"].map((header) => (
                          <TableHead key={header} className="whitespace-nowrap">
                            <motion.div
                              className="flex items-center cursor-pointer"
                              onClick={() => handleSort(header.toLowerCase() as keyof Announcement)}
                              whileHover={{ backgroundColor: "#f0f9ff", transition: { duration: 0.2 } }}
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
                        {filteredAnnouncements.map((announcement) => (
                          <motion.tr
                            key={announcement.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <TableCell className="font-medium">{announcement.title}</TableCell>
                            <TableCell>{announcement.type}</TableCell>
                            <TableCell>{announcement.priority}</TableCell>
                            <TableCell>{new Date(announcement.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{announcement.status}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm" onClick={() => openDialog(announcement)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Edit announcement</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="destructive" size="sm" onClick={() => deleteAnnouncement(announcement._id || announcement.id)}>
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete announcement</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {filteredAnnouncements.map((announcement) => (
                      <motion.div
                        key={announcement.id}
                
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card>
                          <CardContent className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{announcement.description}</p>
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                              <span>{announcement.type}</span>
                              <span>{announcement.priority}</span>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                              <span className="text-sm">{new Date(announcement.startDate).toLocaleDateString()}</span>
                              <div className="flex space-x-2">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="outline" size="sm" onClick={() => openDialog(announcement)}>
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Edit announcement</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="destructive" size="sm" onClick={() => deleteAnnouncement(announcement._id || announcement.id)}>
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete announcement</TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
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
            <DialogContent className="sm:max-w-[70vw] h-[95vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingAnnouncement ? "Edit Announcement" : "Add New Announcement"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="title" className="text-right">
                      Title
                    </label>
                    <Input id="title" className="col-span-3" {...register("title", { required: "Title is required" })} />
                  </div>
                  {errors.title && <p className="text-red-500 text-sm ml-[8.5rem]">{errors.title.message}</p>}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="description" className="text-right">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      className="col-span-3"
                      {...register("description", { required: "Description is required" })}
                    />
                  </div>
                  {errors.description && <p className="text-red-500 text-sm ml-[8.5rem]">{errors.description.message}</p>}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="type" className="text-right">
                      Type
                    </label>
                    <Controller
                      name="type"
                      control={control}
                      rules={{ required: "Type is required" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full col-span-3">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Notice">Notice</SelectItem>
                            <SelectItem value="News">News</SelectItem>
                            <SelectItem value="Event">Event</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.type && <p className="text-red-500 text-sm ml-[8.5rem]">{errors.type.message}</p>}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="priority" className="text-right">
                      Priority
                    </label>
                    <Controller
                      name="priority"
                      control={control}
                      rules={{ required: "Priority is required" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full col-span-3">
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.priority && <p className="text-red-500 text-sm ml-[8.5rem]">{errors.priority.message}</p>}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="startDate" className="text-right">
                      Start Date
                    </label>
                    <Input
                      id="startDate"
                      type="date"
                      className="col-span-3"
                      {...register("startDate", { required: "Start Date is required" })}
                    />
                  </div>
                  {errors.startDate && <p className="text-red-500 text-sm ml-[8.5rem]">{errors.startDate.message}</p>}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="status" className="text-right">
                      Status
                    </label>
                    <Controller
                      name="status"
                      control={control}
                      rules={{ required: "Status is required" }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-full col-span-3">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Published">Published</SelectItem>
                            <SelectItem value="Archived">Archived</SelectItem>
                            <SelectItem value="Upcoming">Upcoming</SelectItem>
                            <SelectItem value="Ongoing">Ongoing</SelectItem>
                            <SelectItem value="Past">Past</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  {errors.status && <p className="text-red-500 text-sm ml-[8.5rem]">{errors.status.message}</p>}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="author" className="text-right">
                      Author
                    </label>
                    <Input id="author" className="col-span-3" {...register("author", { required: "Author is required" })} />
                  </div>
                  {errors.author && <p className="text-red-500 text-sm ml-[8.5rem]">{errors.author.message}</p>}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="ImpLink" className="text-right">
                      Important Link
                    </label>
                    <Input id="ImpLink" className="col-span-3" {...register("ImpLink")} />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="thumbnailImage" className="text-right">
                      Thumbnail Image
                    </label>
                    <Input id="thumbnailImage" className="col-span-3" {...register("thumbnailImage")} />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="attachment" className="text-right">
                      Attachment
                    </label>
                    <Input id="attachment" className="col-span-3" {...register("attachment")} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </main>
  )
}