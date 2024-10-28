import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const PriceCards = () => {
  return (
    <div>
      <div className="bg-pattern6 bg-cover" id="Priceboard">
        <div className="  flex flex-col items-center text-center py-8 gap-2 ">
          <h1>OUR PRICING</h1>
          <h2 className="text-2xl font-semibold">Pricing Plan</h2>
          <Image
            src="/activity.png"    // Path to the image
            alt="icon"             // Alt text for accessibility
            width={40}             // Set width to match the size (h-10 corresponds to 40px)
            height={40}            // Set height to match the size (w-10 corresponds to 40px)
            className="h-10 w-10"  // Use Tailwind CSS classes for styling
          />
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
      </div>
    </div>
  );
};

export default PriceCards;
