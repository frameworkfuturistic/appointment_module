"use client";

import React, { useState } from "react";
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
import {
  CircleUserRound,
  Heart,
  MessageCircle,
  Clock,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
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
}

interface BlogResponse {
  success: boolean;
  data: {
    blogs: BlogPost[];
    total: number;
    page: number;
    pages: number;
  };
}

const fetchBlogs = async (
  page: number,
  limit: number,
  category: string,
  searchTerm: string
) => {
  const response = await axiosInstance.get<BlogResponse>("/blogs", {
    params: { page, limit, category, search: searchTerm },
  });
  return response.data;
};

const queryClient = new QueryClient();

export default function BlogPage() {
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
  const limit = 9;

  const { data, status, error } = useQuery<BlogResponse>({
    queryKey: ["blogs", page, categoryFilter, searchTerm],
    queryFn: () => fetchBlogs(page, limit, categoryFilter, searchTerm),
    // keepPreviousData: true,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

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
              <SelectItem value="#">All Categories</SelectItem>
              <SelectItem value="nutrition">Nutrition</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="mental-health">Mental Health</SelectItem>
              <SelectItem value="preventive-care">Preventive Care</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {status === "loading"
              ? Array(limit)
                  .fill(0)
                  .map((_, index) => <BlogCardSkeleton key={index} />)
              : data?.blogs.map((blog: BlogPost) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
          </motion.div>
        </AnimatePresence>

        {data?.blogs.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No articles found. Try adjusting your search or filter.
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
              Page {page} of {data.data.pages}
            </span>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === data.data.pages}
              variant="outline"
              className="bg-white hover:bg-blue-50"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function BlogCard({ blog }: { blog: BlogPost }) {
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
            src={
              blog.image
                ? `/uploads/${blog.image}`
                : "/bg-about.png"
            }
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
          <h2 className="text-xl sm:text-2xl font-bold mb-2 line-clamp-2 text-gray-800">
            {blog.title}
          </h2>
          {/* <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p> */}
          <div className="flex items-center text-sm text-gray-500 mb-0">
            <CircleUserRound className="mr-2 h-4 w-4" />
            <span>{blog.author}</span>
            <Calendar className="ml-4 mr-2 h-4 w-4" />
            <span>{format(new Date(blog.publishDate), "MMM d, yyyy")}</span>
          </div>
         
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
            <Clock className="mr-2 h-4 w-4" />
            <span>{blog.readTime} min read</span>
          </div>
          <Link href={`/blog/${blog._id}`} passHref>
            <Button variant="default" className=" hover:bg-blue-700  text-white">
              View details
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
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex items-center mb-4">
          <Skeleton className="h-4 w-4 rounded-full mr-2" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full ml-4 mr-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center">
          <Skeleton className="h-4 w-4 rounded-full mr-2" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-16 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
        <Skeleton className="h-9 w-24 rounded" />
      </CardFooter>
    </Card>
  );
}
