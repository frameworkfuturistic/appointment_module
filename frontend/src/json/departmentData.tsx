import { Shield, Leaf, HardHat, Heart, Brain, Bone, Microscope, Baby, Eye, Stethoscope } from 'lucide-react'

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  specialties: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  image: string;
  specialization: string;
  experience: string;
  education: string[];
  availability: {
    days: string;
    hours: string;
  }[];
  languages: string[];
  achievements: string[];
}

export interface Treatment {
  name: string;
  description: string;
  duration: string;
  preparation: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface DepartmentDetail {
  id: string;
  name: string;
  description: string;
  image: string;
  overview: string;
  features: string[];
  contactInfo: {
    phone: string;
    email: string;
    location: string;
    hours: string;
  };
  doctors: Doctor[];
  treatments: Treatment[];
  faqs: FAQ[];
}

export const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "World-class care for your heart",
    icon: <Heart className="h-8 w-8 text-red-500" />,
    image: "/placeholder.svg?height=400&width=600",
    specialties: ["Interventional Cardiology", "Electrophysiology", "Heart Failure"]
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Advanced care for brain and nervous system",
    icon: <Brain className="h-8 w-8 text-blue-500" />,
    image: "/placeholder.svg?height=400&width=600",
    specialties: ["Stroke Care", "Neurosurgery", "Epilepsy Treatment"]
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Comprehensive care for bones and joints",
    icon: <Bone className="h-8 w-8 text-green-500" />,
    image: "/placeholder.svg?height=400&width=600",
    specialties: ["Joint Replacement", "Sports Medicine", "Spine Surgery"]
  },
  {
    id: "oncology",
    name: "Oncology",
    description: "Cutting-edge cancer treatments",
    icon: <Microscope className="h-8 w-8 text-purple-500" />,
    image: "/placeholder.svg?height=400&width=600",
    specialties: ["Medical Oncology", "Radiation Oncology", "Surgical Oncology"]
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Specialized care for children",
    icon: <Baby className="h-8 w-8 text-pink-500" />,
    image: "/placeholder.svg?height=400&width=600",
    specialties: ["Neonatology", "Pediatric Surgery", "Child Development"]
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    description: "Expert care for your vision",
    icon: <Eye className="h-8 w-8 text-amber-500" />,
    image: "/placeholder.svg?height=400&width=600",
    specialties: ["Cataract Surgery", "Glaucoma Treatment", "Retinal Disorders"]
  },
  {
    id: "pulmonology",
    name: "Pulmonology",
    description: "Advanced respiratory care",
    icon: <Shield className="h-8 w-8 text-cyan-500" />,
    image: "/placeholder.svg?height=400&width=600",
    specialties: ["Asthma Management", "COPD Treatment", "Sleep Disorders"]
  },
  {
    id: "nephrology",
    name: "Nephrology",
    description: "Comprehensive kidney care",
    icon: <Shield className="h-8 w-8 text-orange-500" />,
    image: "/placeholder.svg?height=400&width=600",
    specialties: ["Dialysis", "Kidney Transplant", "Hypertension Management"]
  }
]

export const departmentDetails: { [key: string]: DepartmentDetail } = {
  cardiology: {
    id: "cardiology",
    name: "Cardiology Department",
    description: "World-class cardiac care with advanced technology and expert physicians",
    image: "/placeholder.svg?height=1080&width=1920",
    overview: "Our Cardiology Department is equipped with state-of-the-art technology and staffed by world-renowned heart specialists. We provide comprehensive care for all types of cardiovascular conditions, from preventive screenings to complex surgical procedures.",
    features: [
      "Advanced Cardiac Imaging",
      "24/7 Emergency Care",
      "Minimally Invasive Procedures",
      "Cardiac Rehabilitation",
      "Heart Failure Management",
      "Electrophysiology Services"
    ],
    contactInfo: {
      phone: "+1 (555) 123-4567",
      email: "cardiology@hospital.com",
      location: "Floor 3, East Wing",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM"
    },
    doctors: [
      {
        id: "dr-smith",
        name: "Dr. Sarah Smith",
        title: "Senior Consultant",
        image: "/placeholder.svg?height=400&width=400",
        specialization: "Cardiology",
        experience: "15+ years",
        education: [
          "MBBS - Harvard Medical School",
          "MD - Johns Hopkins University",
          "Fellowship in Cardiology - Mayo Clinic"
        ],
        availability: [
          { days: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
          { days: "Saturday", hours: "9:00 AM - 1:00 PM" }
        ],
        languages: ["English", "Spanish", "French"],
        achievements: [
          "Best Cardiologist Award 2022",
          "Published 50+ research papers",
          "Performed 1000+ successful surgeries"
        ]
      },
      {
        id: "dr-johnson",
        name: "Dr. Michael Johnson",
        title: "Interventional Cardiologist",
        image: "/placeholder.svg?height=400&width=400",
        specialization: "Interventional Cardiology",
        experience: "12+ years",
        education: [
          "MBBS - Stanford University",
          "MD - Yale School of Medicine",
          "Fellowship in Interventional Cardiology - Cleveland Clinic"
        ],
        availability: [
          { days: "Monday - Thursday", hours: "10:00 AM - 6:00 PM" },
          { days: "Friday", hours: "10:00 AM - 2:00 PM" }
        ],
        languages: ["English", "German"],
        achievements: [
          "Pioneer in minimally invasive cardiac procedures",
          "Developed new stent technology",
          "Trained over 100 cardiologists"
        ]
      }
    ],
    treatments: [
      {
        name: "Coronary Angioplasty",
        description: "A procedure to open blocked or narrowed heart arteries",
        duration: "1-2 hours",
        preparation: [
          "Fast for 6-8 hours before the procedure",
          "Stop certain medications as advised",
          "Arrange for someone to drive you home"
        ]
      },
      {
        name: "Echocardiogram",
        description: "An ultrasound test to evaluate heart structure and function",
        duration: "30-60 minutes",
        preparation: [
          "No special preparation needed",
          "Wear comfortable, loose-fitting clothing",
          "Avoid caffeinated beverages 24 hours before the test"
        ]
      }
    ],
    faqs: [
      {
        question: "What are the common symptoms of heart disease?",
        answer: "Common symptoms include chest pain, shortness of breath, irregular heartbeat, fatigue, and dizziness. However, symptoms can vary between individuals and some people may not show any symptoms at all."
      },
      {
        question: "How often should I have my heart checked?",
        answer: "It's recommended to have a heart health check-up at least once a year, especially if you're over 40 or have risk factors such as high blood pressure, high cholesterol, or a family history of heart disease. Your doctor can advise on the appropriate frequency based on your individual health status."
      }
    ]
  },
  neurology: {
    id: "neurology",
    name: "Neurology Department",
    description: "Advanced care for brain and nervous system disorders",
    image: "/placeholder.svg?height=1080&width=1920",
    overview: "Our Neurology Department offers comprehensive care for a wide range of neurological conditions. Our team of expert neurologists and neurosurgeons use cutting-edge technology to diagnose and treat disorders of the brain, spine, and nervous system.",
    features: [
      "State-of-the-art Neuroimaging",
      "Specialized Stroke Center",
      "Epilepsy Monitoring Unit",
      "Neurosurgery Suite",
      "Neurorehabilitation Services",
      "Movement Disorders Clinic"
    ],
    contactInfo: {
      phone: "+1 (555) 234-5678",
      email: "neurology@hospital.com",
      location: "Floor 4, West Wing",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM"
    },
    doctors: [
      {
        id: "dr-patel",
        name: "Dr. Anita Patel",
        title: "Head of Neurology",
        image: "/placeholder.svg?height=400&width=400",
        specialization: "Neurology",
        experience: "20+ years",
        education: [
          "MBBS - University of Cambridge",
          "MD - Oxford University",
          "Fellowship in Neurology - Mayo Clinic"
        ],
        availability: [
          { days: "Monday - Wednesday", hours: "9:00 AM - 5:00 PM" },
          { days: "Thursday", hours: "9:00 AM - 12:00 PM" }
        ],
        languages: ["English", "Hindi", "Gujarati"],
        achievements: [
          "Pioneered new treatment for Parkinson's disease",
          "Published over 100 research papers",
          "Recipient of the National Award for Excellence in Neurology"
        ]
      }
    ],
    treatments: [
      {
        name: "Deep Brain Stimulation",
        description: "A neurosurgical procedure to treat movement disorders",
        duration: "4-6 hours",
        preparation: [
          "Undergo comprehensive neurological evaluation",
          "Stop certain medications as advised",
          "Arrange for extended hospital stay and post-operative care"
        ]
      }
    ],
    faqs: [
      {
        question: "What conditions does the Neurology Department treat?",
        answer: "Our department treats a wide range of conditions including stroke, epilepsy, Parkinson's disease, Alzheimer's disease, multiple sclerosis, headaches, brain tumors, and other neurological disorders."
      }
    ]
  },
  orthopedics: {
    id: "orthopedics",
    name: "Orthopedics Department",
    description: "Comprehensive care for bones, joints, and muscles",
    image: "/placeholder.svg?height=1080&width=1920",
    overview: "Our Orthopedics Department provides expert care for all musculoskeletal conditions. From sports injuries to joint replacements, our team of skilled orthopedic surgeons and specialists offers the latest treatments to help you regain mobility and improve your quality of life.",
    features: [
      "Advanced Joint Replacement Center",
      "Sports Medicine Clinic",
      "Spine Surgery Unit",
      "Pediatric Orthopedics",
      "Trauma Care",
      "Orthopedic Rehabilitation"
    ],
    contactInfo: {
      phone: "+1 (555) 345-6789",
      email: "orthopedics@hospital.com",
      location: "Floor 2, North Wing",
      hours: "Mon-Fri: 8:30 AM - 5:30 PM"
    },
    doctors: [
      {
        id: "dr-rodriguez",
        name: "Dr. Carlos Rodriguez",
        title: "Chief of Orthopedic Surgery",
        image: "/placeholder.svg?height=400&width=400",
        specialization: "Orthopedic Surgery",
        experience: "18+ years",
        education: [
          "MD - University of California, Los Angeles",
          "Residency in Orthopedic Surgery - Hospital for Special Surgery",
          "Fellowship in Sports Medicine - Andrews Institute"
        ],
        availability: [
          { days: "Monday, Wednesday, Friday", hours: "9:00 AM - 5:00 PM" },
          { days: "Tuesday", hours: "1:00 PM - 7:00 PM" }
        ],
        languages: ["English", "Spanish"],
        achievements: [
          "Developed innovative techniques in minimally invasive joint replacement",
          "Team physician for professional sports teams",
          "Recipient of the Orthopedic Surgeon of the Year Award"
        ]
      }
    ],
    treatments: [
      {
        name: "Total Knee Replacement",
        description: "Surgical procedure to replace a damaged knee joint with artificial components",
        duration: "1-2 hours",
        preparation: [
          "Complete pre-operative physical examination",
          "Attend pre-surgery education class",
          "Prepare home for post-surgery recovery",
          "Arrange for physical therapy sessions"
        ]
      }
    ],
    faqs: [
      {
        question: "How long is the recovery period after a joint replacement surgery?",
        answer: "Recovery time varies depending on the specific procedure and individual factors. Generally, patients can expect to return to most daily activities within 6-8 weeks, with full recovery taking 3-6 months. However, your surgeon will provide a more personalized timeline based on your specific case."
      }
    ]
  },
  oncology: {
    id: "oncology",
    name: "Oncology Department",
    description: "Cutting-edge cancer care and research",
    image: "/placeholder.svg?height=1080&width=1920",
    overview: "Our Oncology Department is at the forefront of cancer treatment and research. We offer a multidisciplinary approach to cancer care, combining the latest therapies with compassionate support to provide the best possible outcomes for our patients.",
    features: [
      "Precision Medicine Program",
      "Advanced Radiation Therapy",
      "Immunotherapy Center",
      "Clinical Trials Unit",
      "Cancer Genetics Clinic",
      "Supportive Care Services"
    ],
    contactInfo: {
      phone: "+1 (555) 456-7890",
      email: "oncology@hospital.com",
      location: "Floor 5, South Wing",
      hours: "Mon-Fri:  7:00 AM - 7:00 PM"
    },
    doctors: [
      {
        id: "dr-chen",
        name: "Dr. Li Chen",
        title: "Director of Medical Oncology",
        image: "/placeholder.svg?height=400&width=400",
        specialization: "Medical Oncology",
        experience: "22+ years",
        education: [
          "MD/PhD - Stanford University",
          "Residency in Internal Medicine - Massachusetts General Hospital",
          "Fellowship in Hematology/Oncology - Dana-Farber Cancer Institute"
        ],
        availability: [
          { days: "Monday - Thursday", hours: "8:00 AM - 5:00 PM" },
          { days: "Friday", hours: "8:00 AM - 12:00 PM" }
        ],
        languages: ["English", "Mandarin", "Cantonese"],
        achievements: [
          "Led groundbreaking research in cancer immunotherapy",
          "Principal investigator on multiple NIH-funded studies",
          "Elected to the National Academy of Medicine"
        ]
      }
    ],
    treatments: [
      {
        name: "Immunotherapy",
        description: "Treatment that uses the body's immune system to fight cancer",
        duration: "Varies depending on the specific treatment plan",
        preparation: [
          "Undergo comprehensive health evaluation",
          "Complete necessary imaging and lab tests",
          "Discuss potential side effects and management strategies",
          "Consider joining a support group"
        ]
      }
    ],
    faqs: [
      {
        question: "What types of cancer does your department treat?",
        answer: "Our Oncology Department treats all types of cancer, including but not limited to breast, lung, colorectal, prostate, leukemia, lymphoma, melanoma, and brain cancers. We also offer specialized programs for rare cancers and provide second opinion services."
      }
    ]
  },
  pediatrics: {
    id: "pediatrics",
    name: "Pediatrics Department",
    description: "Specialized care for children from newborns to adolescents",
    image: "/placeholder.svg?height=1080&width=1920",
    overview: "Our Pediatrics Department is dedicated to providing comprehensive, family-centered care for children of all ages. From routine check-ups to complex medical conditions, our team of pediatric specialists ensures the health and well-being of your child.",
    features: [
      "Neonatal Intensive Care Unit (NICU)",
      "Pediatric Emergency Department",
      "Child Development Center",
      "Pediatric Surgery",
      "Adolescent Medicine Clinic",
      "Childhood Cancer Center"
    ],
    contactInfo: {
      phone: "+1 (555) 567-8901",
      email: "pediatrics@hospital.com",
      location: "Floor 1, Children's Wing",
      hours: "24/7 Emergency Care, Regular Clinics: Mon-Fri: 8:00 AM - 6:00 PM"
    },
    doctors: [
      {
        id: "dr-thompson",
        name: "Dr. Emily Thompson",
        title: "Chief of Pediatrics",
        image: "/placeholder.svg?height=400&width=400",
        specialization: "General Pediatrics",
        experience: "16+ years",
        education: [
          "MD - Johns Hopkins University School of Medicine",
          "Residency in Pediatrics - Children's Hospital of Philadelphia",
          "Fellowship in Pediatric Critical Care - Boston Children's Hospital"
        ],
        availability: [
          { days: "Monday, Wednesday, Friday", hours: "9:00 AM - 5:00 PM" },
          { days: "Tuesday", hours: "9:00 AM - 12:00 PM" }
        ],
        languages: ["English", "French"],
        achievements: [
          "Developed innovative pediatric care protocols",
          "Recipient of the Pediatrician of the Year Award",
          "Led successful community outreach programs for child health"
        ]
      }
    ],
    treatments: [
      {
        name: "Childhood Immunizations",
        description: "Comprehensive vaccination program to protect children against various diseases",
        duration: "Ongoing, following recommended schedule",
        preparation: [
          "Review child's medical history",
          "Discuss any concerns with the pediatrician",
          "Bring immunization records to appointments",
          "Prepare child for the visit to reduce anxiety"
        ]
      }
    ],
    faqs: [
      {
        question: "How often should my child have check-ups?",
        answer: "The frequency of check-ups depends on your child's age. Newborns typically need more frequent visits, while older children may only need annual check-ups. Our pediatricians follow the American Academy of Pediatrics guidelines and will provide a personalized schedule for your child."
      }
    ]
  }
}