'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { ChevronDown, Star, Clock, Users, GraduationCap, Award, ArrowRight, Search, Calendar, FileText, BookOpen, Sparkles, Filter, ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { format } from 'date-fns'
import axiosInstance from '@/lib/axiosInstance'
import Link from 'next/link'

type Doctor = {
  id: string
  name: string
  specialty: string
  image: string
  experience: string
  rating: number
  bio: string
  achievements: string[]
  availability: string[]
}

type Course = {
  id: string
  name: string
  description: string
  image: string
  duration: string
  enrolledStudents: number
  rating: number
  modules: string[]
  features: string[]
  price: number
  startDate: string
  schedule: { day: string; time: string }[]
}

type BlogPost = {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  image: string
  category: string
}

type FAQ = {
  question: string
  answer: string
}

const doctors: Doctor[] = [
  {
    id: "dr-Sudhir-Kumar",
    name: "Prof.(Dr.) Sudhir Kumar",
    specialty: "Senior Consultant (Orthopaedics)",
    image: "/departmentHeads/sudhir.png",
    experience: "25+ years",
    rating: 4.9,
    bio: "Dr. Sharma is a world-renowned orthopedic surgeon specializing in advanced joint replacement and arthroscopic surgeries. With over two decades of experience, he has pioneered several minimally invasive techniques that have revolutionized the field.",
    achievements: [
      "Professor in Orthopedics Rims",
          "Ranchi Specialist & Incharge in Orthopedics HEC Hospital",
          "Ranchi Reader in Orthopedics Mahatma Gandhi Institute of Medical Science",
          "Wardha Lecturer (Jr.) Hand Reconstructive Surgery CMC Vellore, Tamil Nadu"
        ],
    availability: ["Mon", "Wed", "Fri"]
  },
  {
    id: "dr-Ajay-Kumar-Verma",
    name: "Prof. (Dr.) Ajay Kumar Verma",
    specialty: "Senior Consultant (Orthopaedics)",
    image: "/departmentHeads/Drverma.jpg",
    experience: "20+ years",
    rating: 4.8,
    bio: "Dr. Verma is a leading pediatric orthopedic surgeon known for her groundbreaking work in treating complex congenital deformities. Her innovative approaches have improved the lives of thousands of children worldwide.",
    achievements: [
    " Medical Officer(Orthopaedics) in Bihar/Jharkhand",
          "Registrar(RIMS)",
          "Assistant Professor in Orthopaedics (RIMS)",
          "Professor Orthopaedics (RIMS)"
        ],
    availability: ["Tue", "Thu", "Sat"]
  },
  {
    id: "dr-Nilay-Kumar",
    name: "Dr. Nilay Kumar",
    specialty: "Specialist & Consultant (Orthopedics)",
    image: "/departmentHeads/Dr Nilay.jpg",
    experience: "22+ years",
    rating: 4.9,
    bio: "Dr. Nilay is a globally recognized Orthopedics specializing in complex spinal deformities and minimally invasive spine surgeries. He is a pioneer in robotic spine surgery and has trained surgeons worldwide in advanced techniques.",
    achievements: [
      "M.B.B.S.(M.U.H.S. Nashik), M.S.()"
    ],
    availability: ["Mon", "Tue", "Thu"]
  }
]

const courses: Course[] = [
  {
    id: "advanced-joint-replacement",
    name: "Advanced Joint Replacement Mastery Program",
    description: "An exclusive, intensive program designed to elevate your joint replacement skills to world-class levels. Master cutting-edge techniques, including AI-assisted and robotic surgeries.",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop",
    duration: "12 months",
    enrolledStudents: 25,
    rating: 4.9,
    price: 25000,
    startDate: "2024-09-01",
    schedule: [
      { day: "Monday", time: "09:00 AM - 01:00 PM" },
      { day: "Wednesday", time: "02:00 PM - 06:00 PM" },
      { day: "Friday", time: "10:00 AM - 02:00 PM" }
    ],
    modules: [
      "Advanced Preoperative Planning with AI",
      "Cutting-edge Implant Technologies",
      "Robotic-Assisted Joint Replacement Mastery",
      "Minimally Invasive Techniques for Complex Cases",
      "Personalized Patient-Specific Implants",
      "Advanced Postoperative Care and Rehabilitation Protocols",
      "Complication Management in High-Risk Patients"
    ],
    features: [
      "One-on-one mentoring with world-renowned surgeons",
      "Access to state-of-the-art simulation labs",
      "Observership at top international orthopedic centers",
      "Exclusive industry partnerships for early access to new technologies",
      "Publication support in high-impact journals"
    ]
  },
  {
    id: "pediatric-orthopedics-excellence",
    name: "Pediatric Orthopedic Surgery Excellence Program",
    description: "A comprehensive, elite-level training program focusing on advanced pediatric orthopedic surgeries and innovative treatment approaches for complex congenital deformities.",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop",
    duration: "18 months",
    enrolledStudents: 20,
    rating: 4.8,
    price: 30000,
    startDate: "2024-10-15",
    schedule: [
      { day: "Tuesday", time: "08:00 AM - 12:00 PM" },
      { day: "Thursday", time: "01:00 PM - 05:00 PM" },
      { day: "Saturday", time: "09:00 AM - 01:00 PM" }
    ],
    modules: [
      "Advanced Pediatric Musculoskeletal Imaging and Analysis",
      "Innovative Approaches to Congenital Deformities",
      "Complex Pediatric Fracture Management",
      "Cutting-edge Treatments for Neuromuscular Disorders",
      "Advanced Pediatric Sports Medicine",
      "3D Printing Applications in Pediatric Orthopedics",
      "Ethical Considerations in Pediatric Orthopedic Care"
    ],
    features: [
      "Hands-on workshops with leading pediatric orthopedic surgeons",
      "Virtual reality surgical planning sessions",
      "International rotations at prestigious pediatric hospitals",
      "Collaborative research opportunities with global partners",
      "Advanced training in patient and family-centered care"
    ]
  },
  {
    id: "advanced-spine-surgery",
    name: "Advanced Spine Surgery Innovation Program",
    description: "An elite program at the forefront of spine surgery, covering the most advanced techniques in minimally invasive and robotic spine surgeries, complex deformity corrections, and emerging technologies.",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop",
    duration: "15 months",
    enrolledStudents: 15,
    rating: 4.9,
    price: 35000,
    startDate: "2024-11-01",
    schedule: [
      { day: "Monday", time: "10:00 AM - 02:00 PM" },
      { day: "Wednesday", time: "03:00 PM - 07:00 PM" },
      { day: "Friday", time: "08:00 AM - 12:00 PM" }
    ],
    modules: [
      "Advanced Spinal Biomechanics and Pathophysiology",
      "Cutting-edge Minimally Invasive Spine Surgery Techniques",
      "Robotic Spine Surgery Mastery",
      "Complex Spinal Deformity Correction Strategies",
      "Emerging Technologies in Spine Surgery",
      "Advanced Spinal Oncology Management",
      "Regenerative Therapies in Spine Treatment"
    ],
    features: [
      "Exclusive access to next-generation spine surgery simulators",
      "Personalized mentorship by pioneering spine surgeons",
      "Participation in groundbreaking clinical trials",
      "Advanced training in AI-assisted surgical planning",
      "Immersive AR/VR spine anatomy and surgical technique modules"
    ]
  }
]

const blogPosts: BlogPost[] = [
  {
    id: "ai-orthopedics",
    title: "The Future of Orthopedics: AI and Robotic Surgeries",
    excerpt: "Explore how artificial intelligence and robotics are revolutionizing orthopedic surgeries, improving precision and patient outcomes.",
    author: "Dr. Arun Sharma",
    date: "2024-05-15",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop",
    category: "Technology"
  },
  {
    id: "pediatric-innovations",
    title: "Breakthrough Innovations in Pediatric Orthopedics",
    excerpt: "Discover the latest advancements in treating complex congenital deformities and improving the quality of life for young patients.",
    author: "Dr. Meera Patel",
    date: "2024-06-02",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop",
    category: "Pediatrics"
  },
  {
    id: "spine-surgery-advancements",
    title: "Next-Gen Spine Surgery: Minimally Invasive Techniques",
    excerpt: "Learn about cutting-edge minimally invasive spine surgery techniques that are transforming patient recovery and outcomes.",
    author: "Dr. Rajiv Singh",
    date: "2024-06-20",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop",
    category: "Surgical Techniques"
  }
]

const faqs: FAQ[] = [
  {
    question: "What are the admission requirements for the DNB Orthopedics program?",
    answer: "Admission to our DNB Orthopedics program requires completion of MBBS, a valid medical license, and clearing the NEET-PG examination. International applicants may have additional requirements. Shortlisted candidates will undergo an interview process."
  },
  {
    question: "How long is the DNB Orthopedics course?",
    answer: "The DNB Orthopedics course is typically a 3-year full-time program. However, some of our specialized courses, like the Advanced Spine Surgery Innovation Program, may have different durations tailored to the specific curriculum."
  },
  {
    question: "What career opportunities are available after completing the DNB Orthopedics program?",
    answer: "Graduates of our DNB Orthopedics program have diverse career opportunities, including positions in leading hospitals, academic institutions, research centers, and private practice. Many of our alumni have gone on to become renowned surgeons, researchers, and leaders in the field of orthopedics."
  },
  {
    question: "Are there opportunities for international exposure during the program?",
    answer: "Yes, our program offers various international exposure opportunities, including observerships at top global orthopedic centers, participation in international conferences, and collaborative research projects with international partners."
  },
  {
    question: "What kind of research opportunities are available in the program?",
    answer: "Our program emphasizes research as a crucial component of advanced orthopedic training. Students have opportunities to engage in cutting-edge research, access state-of-the-art laboratories, and receive mentorship from leading researchers. We also provide support for publishing in high-impact journals and presenting at international conferences."
  }
]

export default function AdvancedOrthopedicsDNB() {
  const [blogs, setBlogs] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const doctorsRef = useRef<HTMLDivElement>(null)
  const coursesRef = useRef<HTMLDivElement>(null)
  const faqsRef = useRef<HTMLDivElement>(null)
  const blogRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }



  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

        setBlogs(formattedBlogs.slice(0, 3)); // Limit to the first 6 blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterSpecialty === "" || doctor.specialty === filterSpecialty)
  )

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX }}
      />
      

      {/* Hero Section with Video Background */}
      <motion.div 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <video
          autoPlay
          loop
          muted
          className="absolute w-auto min-w-full min-h-full max-w-none"
        >
          <source src="https://example.com/your-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-white bg-opacity-80" />
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
          >
            Advanced DNB Orthopedics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-700"
          >
            Elevate Your Expertise with World-Class Training
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-x-4"
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Explore Programs
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Virtual Tour
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-10 w-10 text-blue-600" />
        </motion.div>
      </motion.div>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
          >
            About Our Program
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-lg mb-6 text-gray-700">
                Our Advanced DNB Orthopedics program is designed to produce world-class orthopedic surgeons equipped with cutting-edge knowledge and skills. With a focus on innovation, research, and hands-on experience, we prepare our students for leadership roles in the rapidly evolving field of orthopedics.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Led by internationally renowned faculty and featuring state-of-the-art facilities, our program offers unparalleled opportunities for learning and growth. From advanced surgical techniques to groundbreaking research, we cover every aspect of modern orthopedic practice.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Learn More</Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="bg-white border-blue-200 border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-blue-600">25+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Years of Excellence</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-teal-200 border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-teal-600">500+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Successful Graduates</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-purple-200 border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-600">100%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Placement Rate</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-pink-200 border-2">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-pink-600">50+</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Research Publications</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expert Doctors Section */}
      <section ref={doctorsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
          >
            Our Expert Faculty
          </motion.h2>
          {/* <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <Input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs bg-white border-gray-300 text-gray-900"
            />
            <Select onValueChange={setFilterSpecialty} defaultValue="">
              <SelectTrigger className="w-[180px] bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="Filter by specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="Joint Replacement & Arthroscopy">Joint Replacement & Arthroscopy</SelectItem>
                <SelectItem value="Pediatric Orthopedics">Pediatric Orthopedics</SelectItem>
                <SelectItem value="Spine Surgery">Spine Surgery</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white border-blue-200 border-2 overflow-hidden hover:shadow-lg hover:shadow-blue-100 transition-all duration-300">
                    <div className="relative h-64">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        layout="fill"
                        objectFit="cover"
                        
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-blue-600">{doctor.specialty}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{doctor.experience} experience</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-semibold">{doctor.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-3">{doctor.bio}</p>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t border-gray-200">
                      <Button onClick={() => setSelectedDoctor(doctor)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Profile</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section ref={coursesRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
          >
            Our Advanced Courses
          </motion.h2>
          {/* <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs bg-white border-gray-300 text-gray-900"
            />
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white border-teal-200 border-2 overflow-hidden hover:shadow-lg hover:shadow-teal-100 transition-all duration-300">
                    <div className="relative h-48">
                      <Image
                        src={course.image}
                        alt={course.name}
                        layout="fill"
                        objectFit="cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-teal-600 mr-1" />
                          <span className="text-sm text-gray-600">{course.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-teal-600 mr-1" />
                          <span className="text-sm text-gray-600">{course.enrolledStudents} enrolled</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                        </div>
                        <span className="text-lg font-bold text-teal-600">RS {course.price.toLocaleString()}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-gray-50 border-t border-gray-200">
                      <Button onClick={() => setSelectedCourse(course)} className="w-full bg-teal-600 hover:bg-teal-700 text-white">Course Details</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section ref={faqsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
          >
            Frequently Asked Questions
          </motion.h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Blog Section */}
      <section ref={blogRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-600"
          >
            Latest from Our Blog
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                 <Link href={`/blog/${post._id}`}>
                <Card className="bg-white border-blue-200 border-2 overflow-hidden hover:shadow-lg hover:shadow-blue-100 transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">{post.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{post.author}</span>
                      <span>{post.publishDate}</span>
                    </div>
                  </CardContent>
                 
                </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Profile Dialog */}
      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="bg-white text-gray-900 max-w-3xl">
          {selectedDoctor && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-blue-600">{selectedDoctor.name}</DialogTitle>
                <DialogDescription className="text-gray-700">{selectedDoctor.specialty}</DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Image
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    width={400}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-4">{selectedDoctor.bio}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-blue-600 mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {selectedDoctor.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-2">Availability:</h4>
                    <div className="flex gap-2">
                      {selectedDoctor.availability.map((day) => (
                        <Badge key={day} className="bg-blue-100 text-blue-600">{day}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsBookingOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Book Appointment
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Course Details Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="bg-white text-gray-900 max-w-5xl">
          {selectedCourse && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-teal-600">{selectedCourse.name}</DialogTitle>
                <DialogDescription className="text-gray-700">{selectedCourse.description}</DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Image
                    src={selectedCourse.image}
                    alt={selectedCourse.name}
                    width={500}
                    height={300}
                    className="rounded-lg"
                  />
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-teal-600 mb-2">Duration:</h4>
                      <p className="text-gray-700">{selectedCourse.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-600 mb-2">Enrolled:</h4>
                      <p className="text-gray-700">{selectedCourse.enrolledStudents} students</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-600 mb-2">Rating:</h4>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-gray-700">{selectedCourse.rating}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-teal-600 mb-2">Price:</h4>
                      <p className="text-gray-700">${selectedCourse.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-teal-600 mb-2">Course Modules:</h4>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    {selectedCourse.modules.map((module, index) => (
                      <li key={index}>{module}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-teal-600 mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    {selectedCourse.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-teal-600 mb-2">Schedule:</h4>
                  <ul className="text-gray-700">
                    {selectedCourse.schedule.map((slot, index) => (
                      <li key={index}>{slot.day}: {slot.time}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Enroll Now
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="bg-white text-gray-900">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-600">Book an Appointment</DialogTitle>
            <DialogDescription className="text-gray-700">
              Select a date and time for your appointment with {selectedDoctor?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date" className="text-gray-700">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time" className="text-gray-700">
                Time
              </Label>
              <Select>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="14:00">02:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                  <SelectItem value="16:00">04:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}