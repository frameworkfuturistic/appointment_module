"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Toast, ToastProvider } from "@/components/ui/toast";
import {
  CircleUserRound,
  Calendar,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ThumbsUp,
  Share2,
} from "lucide-react";
import HeaderBanner from "@/components/HeaderBanner";
import axiosInstance from "@/lib/axiosInstance";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  status: string;
  image: string | null;
  readTime: number;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  likes: number;
  views: number;
}

interface BlogResponse {
  success: boolean;
  blogs: BlogPost[];
  total: number;
  page: number;
  pages: number;
}

const fetchBlogs = async (
  page: number,
  limit: number,
  category: string,
  searchTerm: string,
  sortBy: string
): Promise<BlogResponse> => {
  const response = await axiosInstance.get<BlogResponse>("/blogs", {
    params: { page, limit, category, search: searchTerm, sortBy },
  });

  const formattedBlogs = response.data.blogs.map((blog) => ({
    ...blog,
    image: blog.image
      ? `https://test.sjhrc.in/hospital-api/blogs/${blog.image
          .toString()
          .replace(/^uploads[\\/]/, "")
          .replace(/\\/g, "/")}`
      : undefined,
  }));

  return {
    ...response.data,
    blogs: formattedBlogs,
  };
};

const queryClient = new QueryClient();

export default function AdvancedResponsiveBlogPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogPageContent />
    </QueryClientProvider>
  );
}

function BlogPageContent() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("publishDate");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [randomPost, setRandomPost] = useState<BlogPost | null>(null);
  const limit = 9;

  const { data, status, error, isFetching } = useQuery<BlogResponse>({
    queryKey: [
      "blogs",
      page,
      categoryFilter,
      searchTerm,
      sortBy,
      showFeaturedOnly,
    ],
    queryFn: () => fetchBlogs(page, limit, categoryFilter, searchTerm, sortBy),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLike = (blogId: string) => {
    // Simulating a like action
    const updatedBlogs = data?.blogs.map((blog) =>
      blog._id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
    );
    if (updatedBlogs) {
      queryClient.setQueryData<BlogResponse>(
        ["blogs", page, categoryFilter, searchTerm, sortBy, showFeaturedOnly],
        (old) => ({
          ...old!,
          blogs: updatedBlogs,
        })
      );
    }
    setToastMessage("Blog post liked!");
  };

  const handleShare = (blogId: string) => {
    navigator.clipboard.writeText(`#`);
    setToastMessage("Link copied to clipboard!");
  };

  const handleRandomPost = () => {
    if (data?.blogs) {
      const randomIndex = Math.floor(Math.random() * data.blogs.length);
      setRandomPost(data.blogs[randomIndex]);
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  if (status === "error") return <div>Error: {(error as Error).message}</div>;

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HeaderBanner
        title="Health & Wellness Blog"
        subtitle="Expert Insights for Your Well-being"
        bgImage="/images/hospital-banner.jpg"
      />

      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-1/3">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="pl-10 bg-white shadow-sm"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500"
              size={20}
            />
          </div>
          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full md:w-[180px] bg-white shadow-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="nutrition">Nutrition</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="mental-health">Mental Health</SelectItem>
              <SelectItem value="preventive-care">Preventive Care</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full md:w-[180px] bg-white shadow-sm">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publishDate">Publish Date</SelectItem>
              <SelectItem value="readTime">Read Time</SelectItem>
              <SelectItem value="likes">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Switch
              checked={showFeaturedOnly}
              onCheckedChange={(checked) => {
                setShowFeaturedOnly(checked);
                setPage(1);
              }}
            />
            <label className="text-sm font-medium text-gray-700">
              Show Featured Only
            </label>
          </div>
          <Button onClick={handleRandomPost} className="md:hidden">
            Random Post
          </Button>
        </div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isFetching
              ? Array(limit)
                  .fill(0)
                  .map((_, index) => <BlogCardSkeleton key={index} />)
              : data?.blogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    onLike={() => handleLike(blog._id)}
                    onShare={() => handleShare(blog._id)}
                  />
                ))}
          </motion.div>
        </AnimatePresence>

        {data?.blogs.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No articles found. Try adjusting your search or filters.
          </div>
        )}

        {data && data.pages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-4">
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              variant="outline"
              className="bg-white hover:bg-blue-50"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {page} of {data.pages}
            </span>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === data.pages}
              variant="outline"
              className="bg-white hover:bg-blue-50"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {toastMessage && (
        <ToastProvider>
          {" "}
          <Toast
            variant="default"
            title={toastMessage}
            className="fixed bottom-4 right-4 z-50"
          />
        </ToastProvider>
      )}

      <AnimatePresence>
        {randomPost && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 md:hidden"
          >
            <h3 className="text-lg font-semibold mb-2">{randomPost.title}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {randomPost.content.substring(0, 100)}...
            </p>
            <Link href={`/blog/${randomPost._id}`}>
              <Button variant="outline" size="sm">
                Read More
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2"
              onClick={() => setRandomPost(null)}
            >
              Close
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function BlogCard({
  blog,
  onLike,
  onShare,
}: {
  blog: BlogPost;
  onLike: () => void;
  onShare: () => void;
}) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
        <CardHeader className="p-0 relative">
          <Image
            src={blog.image || "/bg-about.png"}
            alt={blog.title}
            width={400}
            height={200}
            className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
            {blog.category}
          </Badge>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <Link href={`/blog/${blog._id}`}>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 line-clamp-2 text-gray-800 hover:text-blue-600 transition-colors">
              {blog.title}
            </h2>
          </Link>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <CircleUserRound className="mr-2 h-4 w-4" />
            <span>{blog.author}</span>
            <Calendar className="ml-4 mr-2 h-4 w-4" />
            <span>{format(new Date(blog.publishDate), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Clock className="mr-2 h-4 w-4" />
            <span>{blog.readTime} min read</span>
            <BookOpen className="ml-4 mr-2 h-4 w-4" />
            <span>{blog.views} views</span>
          </div>
          <p className="text-gray-600 line-clamp-3">{blog.content}</p>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center">
          <div className="flex space-x-2">
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={isLiked ? "bg-blue-100" : ""}
              >
                <ThumbsUp
                  className={`mr-2 h-4 w-4 ${isLiked ? "text-blue-500" : ""}`}
                />
                {blog.likes}
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" onClick={onShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </motion.div>
          </div>
          <Link href={`/blog/${blog._id}`}>
            <Button
              variant="link"
              className="text-blue-500 hover:text-blue-700"
            >
              Read More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function BlogCardSkeleton() {
  return (
    <Card className="h-full flex flex-col bg-white">
      <CardHeader className="p-0">
        <Skeleton className="w-full h-48 sm:h-56" />
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <Skeleton className="h-8 w-3/4 mb-2" />
        <div className="flex items-center mb-2">
          <Skeleton className="h-4 w-4 rounded-full mr-2" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full ml-4 mr-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center mb-4">
          <Skeleton className="h-4 w-4 rounded-full mr-2" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4 rounded-full ml-4 mr-2" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
        <Skeleton className="h-8 w-24 rounded" />
      </CardFooter>
    </Card>
  );
}
