import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Check, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Toggle } from "./ui/toggle";

const Priceboard = () => {
  return (
    <>
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
    </div> */}
      {/* OUR BLOG */}
      <div className="bg-slate-50 py-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center py-8 gap-2 ">
        <h1 className="text-xl font-semibold text-gray-800">OUR BLOGS</h1>
        <h2 className="text-2xl font-semibold text-sky-700">Recent Articles and News</h2>
          <img src="/activity.png" alt="icon" className="  h-10 w-10" />
        </div>
        {/* CARDS */}
        <div className="grid md:grid-cols-3 justify-items-center ">
          {/* Card-1 */}
          <Card className="bg-white sm:min-h-96 sm:max-w-80 grid grid-flow-row justify-center...transition duration-500 transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none hover:border-b-8 hover:opacity-80 hover:border-b-sky-700  ... ">
            <img src="/news-1.png" alt="img" className="rounded-t-lg " />
            <Toggle className="bg-sky-600 max-w-32 text-white place-self-end -mt-10 rounded-b-none rounded-r-none ">
              Sept 19, 2020
            </Toggle>
            <div className="grid grid-flow-row p-6 gap-y-4 ">
              <h1 className="text-lg font-semibold">
                What is The Succes rate of a root canal?
              </h1>
              <p className="text-xs font-extralight pb-4 border-b-2">
                Nullam mauris vitae tortor sodales efficitur. Quisque orci ante.
                Proin amet turpis
              </p>
              <p className="grid grid-flow-col justify-around">
                <Link href="">
                  <Heart size={16} color="#1a1a1a" strokeWidth={1} />
                </Link>
                <Link href="">
                  <MessageCircle size={16} color="#141414" strokeWidth={1} />
                </Link>
              </p>
            </div>
          </Card>
          {/* Card-2 */}
          <Card className="bg-white sm:min-h-96 sm:max-w-80 grid grid-flow-row justify-center...transition duration-500 transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none hover:border-b-8 hover:opacity-80 hover:border-b-sky-700  ... ">
            <img src="/news-1.png" alt="img" className="rounded-t-lg " />
            <Toggle className="bg-sky-600 max-w-32 text-white place-self-end -mt-10 rounded-b-none rounded-r-none ">
              Sept 19, 2020
            </Toggle>
            <div className="grid grid-flow-row p-6 gap-y-4 ">
              <h1 className="text-lg font-semibold">
                What is The Succes rate of a root canal?
              </h1>
              <p className="text-xs font-extralight pb-4 border-b-2">
                Nullam mauris vitae tortor sodales efficitur. Quisque orci ante.
                Proin amet turpis
              </p>
              <p className="grid grid-flow-col justify-around">
                <Link href="">
                  <Heart size={16} color="#1a1a1a" strokeWidth={1} />
                </Link>
                <Link href="">
                  <MessageCircle size={16} color="#141414" strokeWidth={1} />
                </Link>
              </p>
            </div>
          </Card>
          {/* Card-3 */}
          <Card className="bg-white sm:min-h-96 sm:max-w-80 grid grid-flow-row justify-center...transition duration-500 transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none hover:border-b-8 hover:opacity-80 hover:border-b-sky-700  ... ">
            <img src="/news-1.png" alt="img" className="rounded-t-lg " />
            <Toggle className="bg-sky-600 max-w-32 text-white place-self-end -mt-10 rounded-b-none rounded-r-none ">
              Sept 19, 2020
            </Toggle>
            <div className="grid grid-flow-row p-6 gap-y-4 ">
              <h1 className="text-lg font-semibold">
                What is The Succes rate of a root canal?
              </h1>
              <p className="text-xs font-extralight pb-4 border-b-2">
                Nullam mauris vitae tortor sodales efficitur. Quisque orci ante.
                Proin amet turpis
              </p>
              <p className="grid grid-flow-col justify-around">
                <Link href="">
                  <Heart size={16} color="#1a1a1a" strokeWidth={1} />
                </Link>
                <Link href="">
                  <MessageCircle size={16} color="#141414" strokeWidth={1} />
                </Link>
              </p>
            </div>
          </Card>
        </div>
        
      </div>
    </>
  );
};

export default Priceboard;
