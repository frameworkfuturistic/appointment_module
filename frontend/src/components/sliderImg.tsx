import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronRight,
  Heart,
  Activity,
  Stethoscope,
  Users,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Heart, title: "Cardiology", description: "Expert heart care", color: "bg-red-500" },
  { icon: Activity, title: "Emergency", description: "24/7 urgent care", color: "bg-yellow-500" },
  { icon: Stethoscope, title: "General Medicine", description: "Comprehensive health", color: "bg-green-500" },
  { icon: Users, title: "Family Care", description: "For all ages", color: "bg-blue-500" },
]

const testimonials = [
  {
    name: "John Doe",
    text: "The care I received was exceptional. The staff went above and beyond!",
    image: "/doctors/image-4.png?height=100&width=100",
  },
  {
    name: "Jane Smith",
    text: "Professional staff and state-of-the-art facilities. Highly recommended!",
    image: "/sliderPic/sjhrchos1.png?height=100&width=100",
  },
  {
    name: "Alex Johnson",
    text: "Quick, efficient, and compassionate service. They saved my life!",
    image: "/sliderPic/sjhrchos1.png?height=100&width=100",
  },
];

const heroImages = [
  "/sliderPic/newicu.png?height=300&width=800",
  "/sliderPic/newreception.png?height=300&width=800",
];

export function CarouselDemo() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    const heroImageTimer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    return () => {
      clearInterval(testimonialTimer);
      clearInterval(heroImageTimer);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[200px] md:min-h-[650px] overflow-hidden">
      {/* Hero image background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentHeroImage}
            src={heroImages[currentHeroImage]}
            alt="Hospital Hero"
            className="object-cover w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-50" />
      </motion.div>

      {/* Service List */}
      <div className=" absolute z-10 container mx-auto px-4 py-8  hidden md:flex justify-end   right-10 ">
        {/* Hide service list on small devices */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {services.map((service, index) => (
               <motion.div
               key={service.title}
               className="flex items-center space-x-4 p-4 rounded-xl backdrop-blur-3xl  shadow-md transition-all duration-300 hover:shadow-xl"
               whileHover={{ scale: 1.05 }}
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
             >
               <div className={`p-3 rounded-full ${service.color}`}>
                 <service.icon className="w-6 h-6 text-white" />
               </div>
               <div>
                 <h3 className="text-md font-semibold text-gray-100">{service.title}</h3>
                 <p className="text-gray-300 text-sm">{service.description}</p>
               </div>
             </motion.div>
            ))}
          </motion.div>
      </div>

      {/* Scroll down icon */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-800"
          onClick={() =>
            setCurrentHeroImage(
              (prev) => (prev - 1 + heroImages.length) % heroImages.length
            )
          }
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-800"
          onClick={() =>
            setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
          }
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
