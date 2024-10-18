import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutUsPage() {


  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative h-[50vh] md:h-[60vh]">
        <Image
          src="/contact-img/cover.png"
          alt="Jagannath Hospital"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
              Providing Exceptional Healthcare with Compassion and Excellence
            </p>
          </div>
        </div>
      </section>

      <main className="flex-grow">
        <section className="py-12 md:py-16 bg-pattern4-bg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-rose-700 mb-6 text-center lg:text-left">
              About Jagannath Hospital & Research Centre
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-lg">
                  Shree Jagannath Hospital & Research Centre is a state-of-the-art 100-bed multispecialty hospital
                  offering advanced healthcare services. We specialize in orthopedic surgery, traumatology,
                  ophthalmology, and advanced clinical research.
                </p>
                <p className="text-lg">
                  Our team of 34 physicians covers all medical specialties, providing comprehensive inpatient and
                  outpatient services. We offer 12-hour OPD facilities and round-the-clock emergency services.
                </p>
                <Button className="mt-4">Learn More About Our Services</Button>
              </div>
              <div className="relative h-64 md:h-full">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Hospital Building"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

      

        <section className="py-12 bg-rose-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our Commitment</h2>
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="text-rose-600 mr-2">•</span>
                  <p><strong>SJHRC</strong> is managed by eminent medical specialists Dr. Sudhir Kumar and Dr. Vandana Prasad, who mentor our healthcare team to provide personalized care.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 mr-2">•</span>
                  <p><strong>SJHRC</strong> respects patient rights and ensures transparent communication with patients and their attendants.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 mr-2">•</span>
                  <p><strong>SJHRC</strong> staff is trained in ethical healthcare practices to provide the best professional care.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 mr-2">•</span>
                  <p><strong>SJHRC</strong> extends its services with a Professional Approach And Personal Care to all patients.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}