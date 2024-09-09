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

const BlogCards = () => {
  return (
    <div className="section">
      {/* OUR PRICING */}
      {/* <div className="bg-pattern6 bg-cover" id="Priceboard">
        <div className="  flex flex-col items-center text-center py-8 gap-2 ">
          <h1>OUR PRICING</h1>
          <h2 className="text-2xl font-semibold">Pricing Plan</h2>
          <img src="/activity.png" alt="icon" className="  h-10 w-10" />
        </div>

        <div className="grid grid-cols-4 gap-4 justify-center mx-60 p-4 ">
          <Card className="max-w-48 min-h-80 grid  justify-center hover:shadow-2xl hover:shadow-sky-700">
            <div className="bg-slate-200  h-14 w-28 text-center place-self-center">
              <p className="text-2xl text-sky-700 font-mono">$200</p>
              <p className="text-xs">Per Month</p>
            </div>
            <div className="text-center py-6 grid grid-flow-row space-y-4 ">
              <h1 className="text-lg font-medium border-b-2">Cardiology</h1>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Functional Diagnotics
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Allergens Drugs
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Pollen Allergens
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Food Allergens
              </p>

              <Button className="bg-white text-sky-700 hover:bg-sky-700 hover:text-white shadow-md flex place-self-center rounded-md">
                Get Offer
              </Button>
            </div>
          </Card>

          <Card className="max-w-48 min-h-80 grid  justify-center hover:shadow-2xl hover:shadow-sky-700">
            <div className="bg-slate-200  h-14 w-28 text-center place-self-center">
              <p className="text-2xl text-sky-700 font-mono">$200</p>
              <p className="text-xs">Per Month</p>
            </div>
            <div className="text-center py-6 grid grid-flow-row space-y-4 ">
              <h1 className="text-lg font-medium border-b-2">Detal Care</h1>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Tooth implantation
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Lase Dentistry
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Tests and Treatment
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Medical Consultation
              </p>

              <Button className="bg-white text-sky-700 hover:bg-sky-700 hover:text-white shadow-md flex place-self-center rounded-md">
                Get Offer
              </Button>
            </div>
          </Card>

          <Card className="max-w-48 min-h-80 grid  justify-center hover:shadow-2xl hover:shadow-sky-700">
            <div className="bg-slate-200  h-14 w-28 text-center place-self-center">
              <p className="text-2xl text-sky-700 font-mono">$200</p>
              <p className="text-xs">Per Month</p>
            </div>
            <div className="text-center py-6 grid grid-flow-row space-y-4 ">
              <h1 className="text-lg font-medium border-b-2">Body Checkup</h1>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Tests and Treatment
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Tests and Treatment
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Laboratory Services
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Food Allergens
              </p>

              <Button className="bg-white text-sky-700 hover:bg-sky-700 hover:text-white shadow-md flex place-self-center rounded-md">
                Get Offer
              </Button>
            </div>
          </Card>

          <Card className="max-w-48 min-h-80 grid  justify-center hover:shadow-2xl hover:shadow-sky-700">
            <div className="bg-slate-200  h-14 w-28 text-center place-self-center">
              <p className="text-2xl text-sky-700 font-mono">$200</p>
              <p className="text-xs">Per Month</p>
            </div>
            <div className="text-center py-6 grid grid-flow-row space-y-4 ">
              <h1 className="text-lg font-medium border-b-2">Blood Test</h1>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Blood Test Service
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Safety Training Tips
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Tests and Treatment
              </p>
              <p className="text-xs font-extralight text-slate-500 border-b-2 border-dotted flex">
                <Check
                  size={16}
                  color="#0284c7"
                  strokeWidth={1.25}
                  className="mx-1"
                />
                Food Allergens
              </p>

              <Button className="bg-white text-sky-700 hover:bg-sky-700 hover:text-white shadow-md flex place-self-center rounded-md">
                Get Offer
              </Button>
            </div>
          </Card>
        </div>
        <p className="text-center my-10 text-xs font-extralight">
          Don’t hesitate, contact us for better help and services{" "}
          <Link href="" className="text-sky-600">
            Explore all Dr. Team
          </Link>
        </p>
      </div>  */}
      {/* OUR BLOG */}
      <div className="w-full max-w-6xl mx-auto   mt-4">
        <div className="flex flex-col items-center text-center py-8 gap-2 ">
          <h1 className="text-xl font-semibold text-gray-800">LATEST BLOGS</h1>
          <img src="/activity.png" alt="icon" className="  h-10 w-10" />
        </div>
        <Carousel opts={{ align: "start" }} className="flex w-full mt-4 h-full">
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
                        <Button>Read More</Button>
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
    </div>
  );
};

export default BlogCards;
