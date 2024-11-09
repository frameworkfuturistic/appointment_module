"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { format } from "date-fns";
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
  Search,
  MoreVertical,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/toaster";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";

const categories = [
  "wellness",
  "nutrition",
  "fitness",
  "mental-health",
  "medical-research",
  "healthcare-technology",
];

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  image?: string | File;
  readTime?: number;
  publishDate: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
}

interface ApiResponse<T> {
  blogs: T;
  success: boolean;
  data: T;
  message?: string;
}

const CustomBadge: React.FC<{ status: "draft" | "published" }> = ({
  status,
}) => {
  const variant = status === "published" ? "default" : "secondary";
  return <Badge variant={variant}>{status}</Badge>;
};

export default function AdvancedBlogManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState({
    key: "publishDate",
    direction: "desc",
  });
  const [isPending, startTransition] = useTransition();
  const [currentTab, setCurrentTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<ApiResponse<Blog[]>>("/blogs");

      if (response.data?.blogs.length) {
        const formattedBlogs = response.data.blogs.map((blog) => ({
          ...blog,
          image: blog.image
            ? `https://test.sjhrc.in/hospital-api/blogs/${blog.image
                .toString()
                .replace(/^uploads[\\/]/, "")
                .replace(/\\/g, "/")}`
            : undefined,
        }));
        console.log("sjkdbh", formattedBlogs);

        setBlogs(formattedBlogs);
      } else {
        throw new Error("No blogs found");
      }
    } catch (error: any) {
      console.error(
        "Error fetching blogs:",
        error.response?.data || error.message
      );
      setError("Failed to fetch blogs. Please try again.");
      toast({
        title: "Error",
        description: "Failed to fetch blogs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleCreateBlog = async (
    newBlog: Omit<Blog, "_id" | "createdAt" | "updatedAt" | "slug">
  ) => {
    try {
      const formData = new FormData();
      Object.entries(newBlog).forEach(([key, value]) => {
        if (key === "tags") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "image" && value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await axiosInstance.post<ApiResponse<Blog>>(
        "/blogs",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data && response.data.success && response.data.data) {
        const newBlogWithFormattedImage = {
          ...response.data.data,
          image: response.data.data.image
            ? `${
                axiosInstance.defaults.baseURL
              }/blogs/${response.data.data.image
                .toString()
                .replace(/^uploads[\\/]/, "")
                .replace(/\\/g, "/")}`
            : undefined,
        };
        setBlogs((prevBlogs) => [...prevBlogs, newBlogWithFormattedImage]);
        setIsCreateDialogOpen(false);
        toast({
          title: "Success",
          description: "Your new blog post has been created successfully.",
        });
      } else {
        throw new Error(response.data?.message || "Failed to create blog");
      }
    } catch (error: any) {
      console.error("Error creating blog:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateBlog = async (updatedBlog: Blog) => {
    try {
      const formData = new FormData();
      Object.entries(updatedBlog).forEach(([key, value]) => {
        if (key === "tags") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "image") {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === "string" && value.startsWith("http")) {
            // If it's a URL, don't append it to formData
          } else {
            formData.append(key, String(value));
          }
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await axiosInstance.put<ApiResponse<Blog>>(
        `/blogs/${updatedBlog._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data && response.data.success && response.data.data) {
        const updatedBlogWithFormattedImage = {
          ...response.data.data,
          image: response.data.data.image
            ? `${
                axiosInstance.defaults.baseURL
              }/blogs/${response.data.data.image
                .toString()
                .replace(/^uploads[\\/]/, "")
                .replace(/\\/g, "/")}`
            : undefined,
        };
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === updatedBlog._id ? updatedBlogWithFormattedImage : blog
          )
        );
        setIsEditDialogOpen(false);
        toast({
          title: "Success",
          description: "Your blog post has been updated successfully.",
        });
      } else {
        throw new Error(response.data?.message || "Failed to update blog");
      }
    } catch (error: any) {
      console.error("Error updating blog:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to update blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    try {
      const response = await axiosInstance.delete<ApiResponse<null>>(
        `/blogs/${blogId}`
      );
      if (response.status === 200 && response.data.success) {
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== blogId)
        );
        toast({
          title: "Success",
          description: "Your blog post has been deleted successfully.",
        });
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSort = (key: keyof Blog) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const filteredAndSortedBlogs = React.useMemo(() => {
    return blogs
      .filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortConfig.key as keyof Blog] < b[sortConfig.key as keyof Blog])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key as keyof Blog] > b[sortConfig.key as keyof Blog])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
  }, [blogs, searchTerm, sortConfig]);

  const BlogDialog = ({
    isOpen,
    onClose,
    blog,
    mode,
  }: {
    isOpen: boolean;
    onClose: () => void;
    blog: Blog | null;
    mode: "view" | "edit" | "create";
  }) => {
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
    );
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const tags = e.target.value.split(",").map((tag) => tag.trim());
      setFormData((prev) => ({ ...prev, tags }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        if (mode === "create") {
          await handleCreateBlog(
            formData as Omit<Blog, "_id" | "createdAt" | "updatedAt" | "slug">
          );
        } else if (mode === "edit" && blog) {
          await handleUpdateBlog({ ...blog, ...formData } as Blog);
        }
        onClose();
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value}))}
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
                  onValueChange={(value: "draft" | "published") =>
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
                        src={formData.image as string}
                        alt="Blog post image"
                        width={500}
                        height={300}
                        className="max-w-full h-auto rounded-lg"
                      />
                    )
                  )}
                  {mode === "edit" && typeof formData.image === 'string' && (
                    <div className="mt-2">
                      <Image
                        src={formData.image}
                        alt="Current blog image"
                        width={200}
                        height={120}
                        className="rounded-md"
                      />
                    </div>
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
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      {mode === "edit" ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>{mode === "edit" ? "Update Blog" : "Create Blog"}</>
                  )}
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <RefreshCw className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-hidden flex flex-col bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-6 shadow-lg">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                    <p className="text-lg font-medium text-blue-600 dark:text-blue-300">
                      Total Blogs
                    </p>
                    <p className="text-3xl font-bold mt-2 text-blue-700 dark:text-blue-200">
                      {blogs.length}
                    </p>
                    <Progress
                      value={(blogs.length / 100) * 100}
                      className="mt-2"
                    />
                  </div>
                  <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                    <p className="text-lg font-medium text-green-600 dark:text-green-300">
                      Published Blogs
                    </p>
                    <p className="text-3xl font-bold mt-2 text-green-700 dark:text-green-200">
                      {
                        blogs.filter((blog) => blog.status === "published")
                          .length
                      }
                    </p>
                    <Progress
                      value={
                        (blogs.filter((blog) => blog.status === "published")
                          .length /
                          blogs.length) *
                        100
                      }
                      className="mt-2"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                    <p className="text-lg font-medium text-yellow-600 dark:text-yellow-300">
                      Draft Blogs
                    </p>
                    <p className="text-3xl font-bold mt-2 text-yellow-700 dark:text-yellow-200">
                      {blogs.filter((blog) => blog.status === "draft").length}
                    </p>
                    <Progress
                      value={
                        (blogs.filter((blog) => blog.status === "draft")
                          .length /
                          blogs.length) *
                        100
                      }
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white dark:bg-gray-800 shadow-lg p-6">
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => startTransition(() => fetchBlogs())}
                      disabled={isPending}
                    >
                      <RefreshCw
                        className={`mr-2 h-4 w-4 ${
                          isPending ? "animate-spin" : ""
                        }`}
                      />
                      Refresh
                    </Button>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 max-w-sm"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Blog
                  </Button>
                </div>
                <Tabs
                  value={currentTab}
                  onValueChange={setCurrentTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="all">All Blogs</TabsTrigger>
                    <TabsTrigger value="published">Published</TabsTrigger>
                    <TabsTrigger value="draft">Drafts</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    {renderBlogList(filteredAndSortedBlogs)}
                  </TabsContent>
                  <TabsContent value="published">
                    {renderBlogList(
                      filteredAndSortedBlogs.filter(
                        (blog) => blog.status === "published"
                      )
                    )}
                  </TabsContent>
                  <TabsContent value="draft">
                    {renderBlogList(
                      filteredAndSortedBlogs.filter(
                        (blog) => blog.status === "draft"
                      )
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
        </div>
      </div>
      <Toaster />
    </main>
  );

  function renderBlogList(blogs: Blog[]) {
    return (
      <Reorder.Group axis="y" values={blogs} onReorder={setBlogs}>
        <AnimatePresence>
          {blogs.map((blog) => (
            <Reorder.Item key={blog._id} value={blog}>
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 transition-all hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                  {/* Blog Information */}
                  <div className="flex items-start space-x-4 w-full sm:w-auto">
                    {blog.image ? (
                      <Image
                        src={blog.image as string}
                        alt={blog.title}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {blog.author}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {blog.content.length > 50
                          ? `${blog.content.slice(0, 50)}...`
                          : blog.content}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <CustomBadge status={blog.status} />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(blog.publishDate), "MMM dd, yyyy")}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedBlog(blog);
                          setIsViewDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedBlog(blog);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteBlog(blog._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    );
  }
}
