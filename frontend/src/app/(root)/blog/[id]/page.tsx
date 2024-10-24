"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Heart, MessageCircle, Calendar, Clock, User } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string | null;
  readTime: number;
  publishDate: string;
  likes: number;
  comments: number;
  slug: string;
}

// Function to fetch a blog post using the id as a query parameter
const fetchBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    const response = await axiosInstance.get(`/blogs`, {
      params: { id }, // passing id as a query parameter
    });

    console.log("API Response:", response.data);

    // Ensure the correct response structure
    if (response.data.blogs && response.data.blogs.length > 0) {
      return response.data.blogs[0]; // Return the first blog post
    } else {
      console.error("No blog post found with the given id.");
      return null; // Return null if no blog post is found
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw new Error("Failed to fetch blog post");
  }
};

const fetchRelatedPosts = async (
  category: string,
  currentId: string
): Promise<BlogPost[]> => {
  const response = await axiosInstance.get("/blogs", {
    params: { category, limit: 5 },
  });
  return response.data.blogs.filter((blog: BlogPost) => blog._id !== currentId);
};

const queryClient = new QueryClient();

export default function BlogDetailPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogContent />
    </QueryClientProvider>
  );
}

function BlogContent() {
  const params = useParams(); // Extract id from the URL
  const id = params?.id as string;

  // Fetch the blog post based on the id
  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery<BlogPost | null>({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogPost(id),
    enabled: !!id, // Ensure the query is only enabled if the id exists
  });

  // Fetch related posts (optional, based on blog's category)
  const { data: relatedPosts } = useQuery<BlogPost[]>({
    queryKey: ["relatedPosts", blog?.category, id],
    queryFn: () => fetchRelatedPosts(blog?.category || "", id),
    enabled: !!blog,
  });

  // Handle loading, error, and blog post rendering states
  if (isLoading) return <BlogSkeleton />;
  if (isError) return <div>Error loading blog post</div>;
  if (!blog) return <div>Blog post not found</div>;

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <TracingBeam className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full antialiased relative"
        >
          <div className="mb-12 lg:grid lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-3">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-4xl font-bold font-serif mb-4 text-gray-800">
                  {blog.title}
                </h1>
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <User className="mr-2 h-4 w-4" />
                  <span className="mr-4">{blog.author}</span>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="mr-4">
                    {format(new Date(blog.publishDate), "MMM d, yyyy")}
                  </span>
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{blog.readTime} min read</span>
                </div>

                <Image
                  src={
                    blog.image
                      ? `/uploads/${blog.image}`
                      : "/bg-about.png"
                  }
                  alt={blog.title}
                  width={1000}
                  height={500}
                  className="rounded-lg mb-8 object-cover w-full"
                />

                <div
                  className="text-gray-700 leading-relaxed mb-8"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div className="flex items-center space-x-4 mb-8">
                  <Button variant="outline" className="flex items-center">
                    <Heart className="mr-2 h-4 w-4" /> {blog.likes} Likes
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" /> {blog.comments}{" "}
                    Comments
                  </Button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-4">Category</h2>
                <Badge className="mb-6">{blog.category}</Badge>

                <h2 className="text-xl font-semibold mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>
                <Textarea
                  placeholder="Type your comment here."
                  className="mb-4"
                />
                <Button className="w-full">Submit Comment</Button>
              </Card>
            </div>
          </div>
        </motion.div>
      </TracingBeam>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {relatedPosts.map((post) => (
                <CarouselItem
                  key={post._id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <RelatedBlogCard blog={post} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </section>
  );
}

function RelatedBlogCard({ blog }: { blog: BlogPost }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <Image
          src={
            blog.image
              ? `/uploads/${blog.image}`
              : "/images/default-blog-image.jpg"
          }
          alt={blog.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
          {blog.category}
        </Badge>
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {blog.content}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {format(new Date(blog.publishDate), "MMM d, yyyy")}
          </span>
          <Button variant="link" asChild>
            <a href={`/blog/${blog.slug}`}>Read More</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BlogSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-3">
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <Card className="p-6">
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-6 w-1/3 mb-6" />
            <Skeleton className="h-8 w-1/2 mb-4" />
            <div className="flex flex-wrap gap-2 mb-6">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </Card>
        </div>
      </div>
    </div>
  );
}
