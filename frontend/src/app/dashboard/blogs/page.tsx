'use client'

import React, { useState, useEffect, useCallback, useTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import {
  AlertCircle,
  Calendar,
  Edit3,
  Eye,
  FileText,
  Plus,
  Tag,
  Trash2,
  User,
  Upload,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import axiosInstance from "@/lib/axiosInstance"
import { Toaster } from "@/components/ui/toaster"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"

const categories = [
  "wellness",
  "nutrition",
  "fitness",
  "mental-health",
  "medical-research",
  "healthcare-technology",
]

interface Blog {
  _id: string
  title: string
  content: string
  author: string
  category: string
  tags: string[]
  status: "draft" | "published"
  image?: string
  readTime?: number
  publishDate: string
  createdAt?: string
  updatedAt?: string
  slug?: string
}

interface ApiResponse<T> {
  success: boolean
  data: T
}

export default function AdvancedBlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState({ key: "publishDate", direction: "desc" })
  const [currentView, setCurrentView] = useState("table")
  const [isPending, startTransition] = useTransition()
  const [currentTab, setCurrentTab] = useState("all")
  const { toast } = useToast()
  const [alert, setAlert] = useState<{ title: string; description: string } | null>(null)

  const showAlert = (title: string, description: string) => {
    setAlert({ title, description })
    setTimeout(() => setAlert(null), 5000) // Hide alert after 5 seconds
  }

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<ApiResponse<Blog[]>>('/blogs');

      if (response.data.blogs?.length) {
        setBlogs(response.data.blogs);
      } else {
        throw new Error("No blogs found");
      }
    } catch (error: any) {
      console.error("Error fetching blogs:", error.response?.data || error.message);
      setError("Failed to fetch blogs. Please try again.");
      showAlert("Error", "Failed to fetch blogs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependencies can be added if required

  useEffect(() => {
    fetchBlogs(); // Now fetchBlogs is stable and included in the effect
  }, [fetchBlogs]); // Include fetchBlogs in the dependency array

  

  const handleCreateBlog = async (newBlog: Omit<Blog, '_id' | 'createdAt' | 'updatedAt' | 'slug'>) => {
    try {
      const formData = new FormData()
      Object.entries(newBlog).forEach(([key, value]) => {
        if (key === 'tags') {
          formData.append(key, JSON.stringify(value))
        } else if (key === 'image' && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, String(value))
        }
      })

      const response = await axiosInstance.post<ApiResponse<Blog>>('/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (response.data.success) {
        setBlogs(prevBlogs => [...prevBlogs, response.data.data])
        setIsCreateDialogOpen(false)
        showAlert("Success", "Your new blog post has been created successfully.")
      } else {
        throw new Error("Failed to create blog")
      }
    } catch (error) {
      console.error("Error creating blog:", error)
      showAlert("Error", "Failed to create blog post. Please try again.",)
    }
  }

  const handleUpdateBlog = async (updatedBlog: Blog) => {
    try {
      const formData = new FormData()
      Object.entries(updatedBlog).forEach(([key, value]) => {
        if (key === 'tags') {
          formData.append(key, JSON.stringify(value))
        } else if (key === 'image' && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, String(value))
        }
      })

      const response = await axiosInstance.put<ApiResponse<Blog>>(`/blogs/${updatedBlog._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (response.data.success) {
        setBlogs(prevBlogs => prevBlogs.map(blog => blog._id === updatedBlog._id ? response.data.data : blog))
        setIsEditDialogOpen(false)
        showAlert("Success", "Your blog post has been updated successfully.")
      } else {
        throw new Error("Failed to update blog")
      }
    } catch (error) {
      console.error("Error updating blog:", error)
      showAlert("Error", "Failed to update blog post. Please try again.")
    }
  }

  const handleDeleteBlog = async (blogId: string) => {
    try {
      const response = await axiosInstance.delete<ApiResponse<null>>(`/blogs/${blogId}`)
      if (response.status === 200 && response.data.success) {
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== blogId))
        showAlert("Success", "Your blog post has been deleted successfully.")
      } else {
        throw new Error("Failed to delete blog")
      }
    } catch (error) {
      console.error("Error deleting blog:", error)
      showAlert("Error", "Failed to delete blog post. Please try again.")
    }
  }

  const handleSort = (key: keyof Blog) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  const sortedBlogs = React.useMemo(() => {
    const sortableBlogs = [...blogs]
    sortableBlogs.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })
    return sortableBlogs
  }, [blogs, sortConfig])

  const BlogDialog = ({ isOpen, onClose, blog, mode }: { isOpen: boolean; onClose: () => void; blog: Blog | null; mode: 'view' | 'edit' | 'create' }) => {
    const [formData, setFormData] = useState<Partial<Blog>>(
      blog || {
        title: "",
        content: "",
        author: "",
        category: "",
        tags: [],
        status: "draft",
        image: "",
        publishDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const tags = e.target.value.split(',').map(tag => tag.trim())
      setFormData(prev => ({ ...prev, tags }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFormData(prev => ({ ...prev, image: e.target.files![0] }))
      }
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (mode === "create") {
        handleCreateBlog(formData as Omit<Blog, '_id' | 'createdAt' | 'updatedAt' | 'slug'>)
      } else if (mode === "edit" && blog) {
        handleUpdateBlog({ ...blog, ...formData } as Blog)
      }
      onClose()
    }

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {mode === "view" ? "View Blog" : mode === "edit" ? "Edit Blog" : "Create New Blog"}
            </DialogTitle>
            <DialogDescription>
              {mode === "view"
                ? "View the details of this blog post."
                : mode === "edit"
                  ? "Make changes to your blog post here."
                  : "Fill in the details for your new blog post."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="col-span-3"
                  disabled={mode === "view"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">
                  Content
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="col-span-3"
                  disabled={mode === "view"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Author
                </Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="col-span-3"
                  disabled={mode === "view"}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  name="category"
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  disabled={mode === "view"}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">
                  Tags
                </Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags?.join(', ')}
                  onChange={handleTagsChange}
                  className="col-span-3"
                  disabled={mode === "view"}
                  placeholder="Comma-separated tags"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select
                  name="status"
                  value={formData.status}
                  onValueChange={(value: "draft" | "published" | "archived") =>
                    setFormData(prev => ({ ...prev, status: value }))
                  }
                  disabled={mode === "view"}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3">
                  {mode !== "view" ? (
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  ) : (
                    formData.image && (
                      <Image
                        src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)}
                        alt="Blog post image"
                        width={500}   // Adjust based on layout
                        height={300}  // Adjust based on layout
                        className="max-w-full h-auto"
                      />

                      
                    )
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publishDate" className="text-right">
                  Publish Date
                </Label>
                <Input
                  id="publishDate"
                  name="publishDate"
                  type="datetime-local"
                  value={formData.publishDate ? format(new Date(formData.publishDate), "yyyy-MM-dd'T'HH:mm") : ''}
                  onChange={handleChange}
                  className="col-span-3"
                  disabled={mode === "view"}
                />
              </div>
            </div>
            <DialogFooter>
              {mode !== "view" && (
                <Button type="submit">{mode === "edit" ? "Update Blog" : "Create Blog"}</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RefreshCw className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }



  return (
    <main className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        <div className="container mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-6">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      Total Blogs
                    </p>
                    <p className="text-3xl font-bold mt-2">{blogs.length}</p>
                    <Progress value={(blogs.length / 100) * 100} className="mt-2" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      Published Blogs
                    </p>
                    <p className="text-3xl font-bold mt-2">
                      {blogs.filter((blog) => blog.status === "published").length}
                    </p>
                    <Progress
                      value={(blogs.filter((blog) => blog.status === "published").length / blogs.length) * 100}
                      className="mt-2"
                    />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      Draft Blogs
                    </p>
                    <p className="text-3xl font-bold mt-2">
                      {blogs.filter((blog) => blog.status === "draft").length}
                    </p>
                    <Progress
                      value={(blogs.filter((blog) => blog.status === "draft").length / blogs.length) * 100}
                      className="mt-2"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Blog
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>Manage and edit your hospital blog posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <Button onClick={() => startTransition(() => fetchBlogs())} disabled={isPending}>
                      <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="view-toggle">Grid View</Label>
                    <Switch
                      id="view-toggle"
                      checked={currentView === "grid"}
                      onCheckedChange={(checked) => setCurrentView(checked ? "grid" : "table")}
                    />
                  </div>
                </div>
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <TabsList>
                    <TabsTrigger value="all">All Blogs</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    {currentView === "table" ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                              Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("author")}>
                              Author {sortConfig.key === "author" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                              Category {sortConfig.key === "category" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("publishDate")}>
                              Publish Date {sortConfig.key === "publishDate" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                              Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedBlogs.map((blog) => (
                            <TableRow key={blog._id}>
                              <TableCell>{blog.title}</TableCell>
                              <TableCell>{blog.author}</TableCell>
                              <TableCell>{blog.category}</TableCell>
                              <TableCell>{format(new Date(blog.publishDate), 'MMM dd, yyyy')}</TableCell>
                              <TableCell>
                                <Badge variant={blog.status === "published" ? "success" : "warning"}>
                                  {blog.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {blog.image ? (
                                 <Image
                                 src={blog.image}                     // Dynamic source from the blog object
                                 alt={blog.title}                     // Alt text for accessibility
                                 width={40}                           // Set width (10px * 4 for Tailwind size)
                                 height={40}                          // Set height (10px * 4 for Tailwind size)
                                 className="w-10 h-10 object-cover rounded" // Use Tailwind CSS classes for styling
                               />
                                ) : (
                                  <ImageIcon className="w-10 h-10 text-gray-400" />
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedBlog(blog)
                                      setIsViewDialogOpen(true)
                                    }}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedBlog(blog)
                                      setIsEditDialogOpen(true)
                                    }}
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteBlog(blog._id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {sortedBlogs.map((blog) => (
                          <Card key={blog._id}>
                            <CardHeader>
                              <CardTitle>{blog.title}</CardTitle>
                              <CardDescription>{blog.author}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              {blog.image && (
                                <Image
                                src={blog.image}                     // Dynamic source from the blog object
                                alt={blog.title}                     // Alt text for accessibility
                                width={500}                           // Set an appropriate width (adjust as needed)
                                height={160}                          // Set an appropriate height (40px * 4 for Tailwind size)
                                className="w-full h-40 object-cover rounded mb-4" // Use Tailwind CSS classes for styling
                              />
                              )}
                              <p className="text-sm text-gray-500 dark:text-gray-400">{blog.content.substring(0, 100)}...</p>
                              <div className="mt-4 flex justify-between items-center">
                                <Badge variant={blog.status === "published" ? "success" : "warning"}>
                                  {blog.status}
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(blog.publishDate), 'MMM dd, yyyy')}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedBlog(blog)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" /> View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedBlog(blog)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit3 className="w-4 h-4 mr-2" /> Edit
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="published">
                    {currentView === "table" ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                              Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("author")}>
                              Author {sortConfig.key === "author" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                              Category {sortConfig.key === "category" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("publishDate")}>
                              Publish Date {sortConfig.key === "publishDate" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                              Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedBlogs.filter(blog => blog.status === "published").map((blog) => (
                            <TableRow key={blog._id}>
                              <TableCell>{blog.title}</TableCell>
                              <TableCell>{blog.author}</TableCell>
                              <TableCell>{blog.category}</TableCell>
                              <TableCell>{format(new Date(blog.publishDate), 'MMM dd, yyyy')}</TableCell>
                              <TableCell>
                                <Badge variant={blog.status === "published" ? "success" : "warning"}>
                                  {blog.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {blog.image ? (
                                  <Image
                                  src={blog.image}                     // Dynamic source from the blog object
                                  alt={blog.title}                     // Alt text for accessibility
                                  width={40}                           // Set width (10px * 4 for Tailwind size)
                                  height={40}                          // Set height (10px * 4 for Tailwind size)
                                  className="w-10 h-10 object-cover rounded" // Use Tailwind CSS classes for styling
                                />
                                ) : (
                                  <ImageIcon className="w-10 h-10 text-gray-400" />
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedBlog(blog)
                                      setIsViewDialogOpen(true)
                                    }}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedBlog(blog)
                                      setIsEditDialogOpen(true)
                                    }}
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteBlog(blog._id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {sortedBlogs.filter(blog => blog.status === "published").map((blog) => (
                          <Card key={blog._id}>
                            <CardHeader>
                              <CardTitle>{blog.title}</CardTitle>
                              <CardDescription>{blog.author}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              {blog.image && (
                                <Image
                                src={blog.image}                     // Dynamic source from the blog object
                                alt={blog.title}                     // Alt text for accessibility
                                width={500}                           // Set an appropriate width (adjust as needed)
                                height={160}                          // Set an appropriate height (40px * 4 for Tailwind size)
                                className="w-full h-40 object-cover rounded mb-4" // Use Tailwind CSS classes for styling
                              />
                              )}
                              <p className="text-sm text-gray-500 dark:text-gray-400">{blog.content.substring(0, 100)}...</p>
                              <div className="mt-4 flex justify-between items-center">
                                <Badge variant={blog.status === "published" ? "success" : "warning"}>
                                  {blog.status}
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(blog.publishDate), 'MMM dd, yyyy')}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedBlog(blog)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" /> View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedBlog(blog)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit3 className="w-4 h-4 mr-2" /> Edit
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="draft">
                    {currentView === "table" ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                              Title {sortConfig.key === "title" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("author")}>
                              Author {sortConfig.key === "author" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                              Category {sortConfig.key === "category" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("publishDate")}>
                              Publish Date {sortConfig.key === "publishDate" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                              Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                            </TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedBlogs.filter(blog => blog.status === "draft").map((blog) => (
                            <TableRow key={blog._id}>
                              <TableCell>{blog.title}</TableCell>
                              <TableCell>{blog.author}</TableCell>
                              <TableCell>{blog.category}</TableCell>
                              <TableCell>{format(new Date(blog.publishDate), 'MMM dd, yyyy')}</TableCell>
                              <TableCell>
                                <Badge variant={blog.status === "published" ? "success" : "warning"}>
                                  {blog.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {blog.image ? (
                                  <Image
                                  src={blog.image}                     // Dynamic source from the blog object
                                  alt={blog.title}                     // Alt text for accessibility
                                  width={500}                           // Set an appropriate width (adjust as needed)
                                  height={160}                          // Set an appropriate height (40px * 4 for Tailwind size)
                                  className="w-full h-40 object-cover rounded mb-4" // Use Tailwind CSS classes for styling
                                />
                                ) : (
                                  <ImageIcon className="w-10 h-10 text-gray-400" />
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedBlog(blog)
                                      setIsViewDialogOpen(true)
                                    }}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedBlog(blog)
                                      setIsEditDialogOpen(true)
                                    }}
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteBlog(blog._id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {sortedBlogs.filter(blog => blog.status === "draft").map((blog) => (
                          <Card key={blog._id}>
                            <CardHeader>
                              <CardTitle>{blog.title}</CardTitle>
                              <CardDescription>{blog.author}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              {blog.image && (
                               <Image
                               src={blog.image}                     // Dynamic source from the blog object
                               alt={blog.title}                     // Alt text for accessibility
                               width={500}                           // Set an appropriate width (adjust as needed)
                               height={160}                          // Set an appropriate height (40px * 4 for Tailwind size)
                               className="w-full h-40 object-cover rounded mb-4" // Use Tailwind CSS classes for styling
                             />
                              )}
                              <p className="text-sm text-gray-500 dark:text-gray-400">{blog.content.substring(0, 100)}...</p>
                              <div className="mt-4 flex justify-between items-center">
                                <Badge variant={blog.status === "published" ? "success" : "warning"}>
                                  {blog.status}
                                </Badge>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{format(new Date(blog.publishDate), 'MMM dd, yyyy')}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedBlog(blog)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="w-4 h-4 mr-2" /> View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedBlog(blog)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit3 className="w-4 h-4 mr-2" /> Edit
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <BlogDialog
            isOpen={isViewDialogOpen}
            onClose={() => setIsViewDialogOpen(false)}
            blog={selectedBlog}
            mode="view"
          />

          <BlogDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            blog={selectedBlog}
            mode="edit"
          />

          <BlogDialog
            isOpen={isCreateDialogOpen}
            onClose={() => setIsCreateDialogOpen(false)}
            blog={null}
            mode="create"
          />
          {alert && (
            <Alert variant="destructive" className="fixed bottom-4 right-4 w-96">
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
      <Toaster />
    </main>
  )
}