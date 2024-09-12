import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Heart, MessageCircle } from "lucide-react";
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

const BlogCards = () => {
  return (
    <section className="section">
      {/* OUR BLOG */}
      <div className=" max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center text-center  gap-2 ">
        <Title title={"LATEST BLOGS"}/>
          <img src="/activity.png" alt="icon" className="  h-10 w-10" />
        </div>
        <Carousel opts={{ align: "start" }} className="grid  w-full   h-[450px] ">
          <CarouselContent className="flex">
            {BlogData.map((blog) => (
              <CarouselItem key={blog.id} className="md:basis-1/3 lg:basis-1/3">
                <Card className=" sm:min-h-96 sm:max-w-xs grid grid-flow-row justify-center transition duration-500 transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:border-b-8 hover:opacity-80 hover:border-b-rose-200">
                  <img
                    src={blog.featureImage}
                    alt={blog.title}
                    className="rounded-t-lg"
                  />
                  <Toggle className="bg-sky-600 max-w-32 text-white place-self-end -mt-10 rounded-b-none rounded-r-none">
                    {blog.date}
                  </Toggle>
                  <div className="grid grid-flow-row p-6 gap-y-4">
                    <h1 className="text-lg font-semibold">{blog.title}</h1>
                    <p className="text-xs font-extralight pb-4 border-b-2">
                      {blog.minidescription}
                    </p>
                    <div className="grid grid-flow-col justify-between">
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
                      <Link href={`/blogDash/blog/${blog.id}`}>
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
      </div>
    </section>
  );
};

export default BlogCards;
