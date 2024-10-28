import React from "react";
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
import BlogData from "@/json/BlogData";
import Title from "./Title";
import Image from "next/image";

const BlogCards = () => {
  return (
    <section className="section">
      {/* OUR BLOG */}
      <div className="min-h-fit">
        <div className=" max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-2 mb-6">
            <Title title={"LATEST BLOGS"} />
          </div>

          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="flex">
              {BlogData.map((blog) => (
                <CarouselItem key={blog.id} className="md:basis-1/3 lg:basis-1/3 p-4">
                  <Card className="flex flex-col h-full justify-between transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-lg hover:border-b-8 hover:border-b-rose-200">
                    <Image
                      src={blog.featureImage}         // Dynamic source from the blog object
                      alt={blog.title}                // Alt text for accessibility
                      width={500}                     // Set an appropriate width (adjust as needed)
                      height={300}                    // Set an appropriate height (adjust as needed)
                      className="rounded-t-lg object-cover w-full h-full" // Use Tailwind CSS classes for styling
                    />
                    <Toggle className="bg-sky-600 max-w-32 text-white place-self-end -mt-10 rounded-b-none rounded-r-none">
                      {blog.date}
                    </Toggle>
                    <div className="flex-grow p-6">
                      <h1 className="text-lg font-semibold">{blog.title}</h1>
                      <p className="text-xs font-extralight pb-4 border-b-2">
                        {blog.minidescription}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex gap-2">
                          <Link href="">
                            <Heart size={16} color="#1a1a1a" strokeWidth={1} />
                          </Link>
                          <Link href="">
                            <MessageCircle size={16} color="#141414" strokeWidth={1} />
                          </Link>
                        </div>
                        <Link href={`/blog/${blog.id}`}>
                          <Button variant="hms">Read More</Button>
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
              <Button size="lg" variant="link" className="text-gray-600 text-md hover:text-rose-900 px-8 py-6">
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
