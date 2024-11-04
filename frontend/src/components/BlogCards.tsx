import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Toggle } from "./ui/toggle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Title from "./Title";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";

const BlogCards = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blogs"); // Adjust the endpoint as needed
        console.log("hjhsabh", response.data?.blogs);
        const formattedBlogs = response.data.blogs.map((blog) => ({
          ...blog,
          image: blog.image
            ? `http://localhost:5555/blogs/${blog.image
                .toString()
                .replace(/^uploads[\\/]/, "")
                .replace(/\\/g, "/")}`
            : undefined,
        }));
        console.log("uy", formattedBlogs);

        setBlogs(formattedBlogs.slice(0, 6)); // Limit to the first 6 blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="section">
      {/* OUR BLOG */}
      <div className="min-h-fit">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-2 mb-6">
            <Title title={"LATEST BLOGS"} />
          </div>

          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="flex">
              {blogs.map((blog) => (
                <CarouselItem
                  key={blog.id}
                  className="md:basis-1/3 lg:basis-1/3 p-4"
                >
                  <Card className="flex flex-col h-full justify-between transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg hover:border-b-8 hover:border-b-rose-200">
                    <Image
                      src={blog.image} // Dynamic source from the blog object
                      alt={blog.title} // Alt text for accessibility
                      width={500}
                      height={300}
                      className="rounded-t-lg object-cover w-full h-48 sm:h-56 md:h-64 lg:h-72"
                    />
                    <Toggle className="bg-sky-600 text-white place-self-end -mt-10 rounded-b-none rounded-r-none px-4 py-1">
                      {blog.category}
                    </Toggle>
                    <div className="flex-grow p-4 md:p-6">
                      <h1 className="text-lg font-semibold">{blog.title}</h1>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">
                        {blog.content.length > 200
                          ? `${blog.content.slice(0, 200)}...`
                          : blog.content}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-2">
                          <Link href="">
                            <Heart size={16} color="#1a1a1a" strokeWidth={1} />
                          </Link>
                          <Link href="">
                            <MessageCircle
                              size={16}
                              color="#141414"
                              strokeWidth={1}
                            />
                          </Link>
                        </div>
                        <Link href={`/blog/${blog.id}`}>
                          <Button
                            variant="gooeyLeft"
                            className="text-sm px-3 py-1"
                          >
                            Read More
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/blog">
              <Button
                size="lg"
                variant="link"
                className="text-gray-600 text-md hover:text-rose-900 px-8 py-6"
              >
                View All News & Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCards;
