import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Award } from 'lucide-react'
import HeaderBanner from '@/components/HeaderBanner'

export default function ParamedicalCourseIntro() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBanner
        title="Paramedical Course"
        subtitle="Empowering the Next Generation of Healthcare Heroes."
        bgImage="/hospital/courses1.webp"
      />
      <main className="container mx-auto px-4 py-8">




        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Course Overview</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our Advanced Hospital Paramedical Course is designed to equip you with the skills and knowledge needed to excel in the fast-paced world of emergency medical services. This comprehensive program combines theoretical learning with hands-on practical experience, preparing you for a rewarding career in paramedicine.
          </p>
          <p className="text-lg text-gray-700">
            Whether you're just starting your journey in healthcare or looking to advance your existing medical career, this course provides the perfect foundation for success in the field of paramedical science.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-primary" />
                  Comprehensive Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Covers all aspects of paramedical science, from basic life support to advanced emergency care techniques.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Hands-on Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gain practical experience through simulations and clinical rotations in real healthcare settings.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-primary" />
                  Industry Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our course is accredited and recognized by leading healthcare institutions worldwide.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Ready to Start Your Paramedical Career?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Visit our main website to learn more about the course, admission requirements, and to start your application process.
          </p>
          <Button size="lg" asChild>
            <a href="https://www.sjpms.com" className="inline-flex items-center justify-center">
              Visit SJPMS Website
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Button>
        </section>
      </main>
    </div>
  )
}