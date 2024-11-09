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
    id: "orthopedics",
    name: "ORTHOPEDICS",
    description: "Comprehensive care for bones and joints",
    icon: <Bone className="h-8 w-8 text-green-500" />,
    image: "/department/orthopedic-min.jpg?height=400&width=600",
    specialties: ["Joint Replacement", "Sports Medicine", "Spine Surgery"]
  },
  {
    id: "ophthalmology",
    name: "OPHTHALMOLOGY ",
    description: "Expert care for your vision",
    icon: <Eye className="h-8 w-8 text-amber-500" />,
    image: "/department/ophthalmology.webp?height=400&width=600",
    specialties: ["Cataract Surgery", "Glaucoma Treatment", "Retinal Disorders"]
  },
  {
    id: "generalmedicine",
    name: "GENERAL MEDICINE",
    description: "All infections related diseases.",
    icon: <Shield className="h-8 w-8 text-amber-500" />,
    image: "/department/General Medicine.jpg?height=400&width=600",
    specialties: ["Cataract Surgery", "Glaucoma Treatment", "Retinal Disorders"]
  }, 
  {
    id: "laproscopic",
    name: "LAPROSCOPIC SURGERY",
    description: "World-class care for your heart",
    icon: <Heart className="h-8 w-8 text-red-500" />,
    image: "/department/lap.jpg?height=400&width=600",
    specialties: ["Interventional Cardiology", "Electrophysiology", "Heart Failure"]
  },
  {
    id: "cardiology",
    name: "CARDIOLOGY",
    description: "World-class care for your heart",
    icon: <Heart className="h-8 w-8 text-red-500" />,
    image: "/department/Cardiology.jpg?height=400&width=600",
    specialties: ["Interventional Cardiology", "Electrophysiology", "Heart Failure"]
  },
  {
    id: "neurology",
    name: "NEUROLOGY",
    description: "Advanced care for brain and nervous system",
    icon: <Brain className="h-8 w-8 text-blue-500" />,
    image: "/department/Neurology.jpeg?height=400&width=600",
    specialties: ["Stroke Care", "Neurosurgery", "Epilepsy Treatment"]
  },
  {
    id: "oncology",
    name: "ONCOLOGY",
    description: "Cutting-edge cancer treatments",
    icon: <Microscope className="h-8 w-8 text-purple-500" />,
    image: "/department/onco.jpg?height=400&width=600",
    specialties: ["Medical Oncology", "Radiation Oncology", "Surgical Oncology"]
  },
  {
    id: "pediatrics",
    name: "PEDIATRICS",
    description: "Specialized care for children",
    icon: <Baby className="h-8 w-8 text-pink-500" />,
    image: "/department/Pediatric-Care-min.jpg?height=400&width=600",
    specialties: ["Neonatology", "Pediatric Surgery", "Child Development"]
  },
  {
    id: "pulmonology",
    name: "PULMONOLOGY",
    description: "Advanced respiratory care",
    icon: <Shield className="h-8 w-8 text-cyan-500" />,
    image: "/department/pul.jpg?height=400&width=600",
    specialties: ["Asthma Management", "COPD Treatment", "Sleep Disorders"]
  },
  {
    id: "nephrology",
    name: "NEPHROLOGY",
    description: "Comprehensive kidney care",
    icon: <Shield className="h-8 w-8 text-orange-500" />,
    image: "/department/Nephrology.jpg?height=400&width=600",
    specialties: ["Dialysis", "Kidney Transplant", "Hypertension Management"]
  },
  {
    id: "criticalcare",
    name: "CRITICAL CARE UNIT",
    description: "For intensive treatment of serious illnesses.",
    icon: <Shield className="h-8 w-8 text-orange-500" />,
    image: "/department/Nephrology.jpg?height=400&width=600",
    specialties: ["Dialysis", "Kidney Transplant", "Hypertension Management"]
  },
  {
    id: "physiotherapy",
    name: "PHYSIOTHERAPY",
    description: "For intensive treatment of serious illnesses.",
    icon: <Shield className="h-8 w-8 text-orange-500" />,
    image: "/department/Nephrology.jpg?height=400&width=600",
    specialties: ["Dialysis", "Kidney Transplant", "Hypertension Management"]
  }
]

export const departmentDetails: { [key: string]: DepartmentDetail } = {
  cardiology: {
    id: "cardiology",
    name: "Cardiology Department",
    description: "World-class cardiac care with advanced technology and expert physicians",
    image: "/department/Cardiology.jpg?height=1080&width=1920",
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
      phone: "+91 8987999200",
      email: "sjhrc.ranchi@gmail.com",
      location: "(Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001)",
      hours: "Mon-Sat: Sunday CLOSED"
    },
    doctors: [
      {
        id: "dr-Ashutosh",
        name: "Dr. Ashutosh Charan",
        title: "Senior Consultant",
        image: "/departmentHeads/ashutosh.jpg?height=400&width=400",
        specialization: "Cardiology",
        experience: "15+ years",
        education: [
          "M.B.B.S.(), M.D.()"
        ],
        achievements: [
          "Best Cardiologist in Ranchi",
        ]
      },
     
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
    image: "/department/Neurology.jpeg?height=1080&width=1920",
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
      phone: "+91 8987999200",
      email: "sjhrc.ranchi@gmail.com",
      location: "(Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001)",
      hours: "Mon-Sat: Sunday CLOSED"
    },
    doctors: [
      {
        id: "dr-Adukia",
        name: "Dr. Tarun Kumar Adukia",
        title: "Visiting Senior Consultant",
        image: "/departmentHeads/adukia-min.png?height=400&width=400",
        specialization: "Neurology",
        experience: "20+ years",
        education: [
          "M.B.B.S.(B.H.U.), M.S.(General Surgery), B.H.U., M.C.H.(Neurosurgery), Post Graduate Institute of Medical Education & Research"
        ],
        achievements: [
          "Pioneered new treatment for Parkinson's disease",
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
    image: "/department/orthopedic-bn.jpg?height=1080&width=1920",
    overview: "Our Orthopedics Department provides expert care for all musculoskeletal conditions. From sports injuries to joint replacements, our team of skilled orthopedic surgeons and specialists offers the latest treatments to help you regain mobility and improve your quality of life.",
    features: [
      "Key Hole Fracture Fixation",
      "Complex Trauma Surgery for Bones & Joints, including:Acetabulum, Pelvis, Scapula.",
      "Hand Reconstructive Surgery",
      "Spine Surgery",
      "Endoscopic Assisted Spinal Surgery",
      "Minimal Invasive Fixation of Spine",
      "Video Assisted Thoracic Spine Surgery.",
      "Deformities Correction for Spine",
      "Tumor Surgery for Reconstruction",
      "Micro Vascular and Micro Neural Surgery.",
      "Complex Reconstructive Surgery for Composite Tissue loss.",
      "Endoscopic Assisted Surgery for Joint and Cavities.",
      "Deformities Correction/Limb Lengthening.",
      "Total Knee and Hip Replacement/Small Joint Replacement.",
      "Revision Total Knee and Hip Replacement Arthoplasty.",
    ],
    contactInfo: {
      phone: "+91 7677111010",
      email: "sjhrc.ranchi@gmail.com",
      location: "Mayor Road, Behind Machhli Ghar, Ranchi",
      hours: "Mon-Sat, Sunday CLOSED"
    },
    doctors: [
      {
        id: "dr-Sudhir-Kumar",
        name: "Prof.(Dr.) Sudhir Kumar",
        title: "Senior Consultant (Orthopaedics)",
        image: "/departmentHeads/sudhir.png?height=400&width=400",
        specialization: "Orthopedic Surgery",
        experience: "18+ years",
        education: [
          "M.B.B.S (B.H.U), M.S. Ortho. (B.H.U) Fellow in Hand (Bombay ortho. Society) Fellow in spine (world Ortho. Concern) Consultant in Orthopedics & Traumatology Hand, Spine and Micro-reconstructive surgeon"
        ],

        achievements: [
          "Professor in Orthopedics Rims",
          "Ranchi Specialist & Incharge in Orthopedics HEC Hospital",
          "Ranchi Reader in Orthopedics Mahatma Gandhi Institute of Medical Science",
          "Wardha Lecturer (Jr.) Hand Reconstructive Surgery CMC Vellore, Tamil Nadu"
        ]
      },
      {
        id: "dr-Ajay-Kumar-Verma",
        name: "Prof. (Dr.) Ajay Kumar Verma",
        title: "Senior Consultant (Orthopaedics)",
        image: "/departmentHeads/Drverma.jpg?height=400&width=400",
        specialization: "Orthopedics",
        experience: "18+ years",
        education: [
          "M.B.B.S.(L.N.M.University), M.S.(Ranchi University)"
        ],

        achievements: [
          " Medical Officer(Orthopaedics) in Bihar/Jharkhand",
          "Registrar(RIMS)",
          "Assistant Professor in Orthopaedics (RIMS)",
          "Professor Orthopaedics (RIMS)"
        ]
      },
      {
        id: "dr-Nilay-Kumar",
        name: "Dr. Nilay Kumar",
        title: "Specialist & Consultant (Orthopedics)",
        image: "/departmentHeads/Dr Nilay.jpg?height=400&width=400",
        specialization: "Orthopedic Surgery",
        experience: "18+ years",
        education: [
          " M.B.B.S.(M.U.H.S. Nashik), M.S.()"
        ],

        achievements: [
          ""
        ]
      },
      {
        id: "dr-bk",
        name: "Dr. B.K. Sinha",
        title: "Senior Medical Officer (Orhtopedics)",
        image: "/departmentHeads/bksingh.jpg?height=400&width=400",
        specialization: "Orthopedic Surgery",
        experience: "18+ years",
        education: [
          "M.B.B.S.Magadh University)"
        ],

        achievements: [
          "Medical Officer (Sanctoria Hospital, West Bengal)",
          "Medical Supritendent (CCL, Central Hospital Ramgarh)",
          "Dy. Chief Medical Officer (CCL Central Hospital, Ramgarh)",
          "HOD, Central Medical Stores (CCL Central Hospital, Ramgarh)",
          "Member of various Medical Boards of ECL and CCL"
        ]
      },
      {
        id: "dr-Hargave",
        name: "Dr. B.V. Hargave",
        title: "(MBBS, DNB Resident) (Orhtopedics)",
        image: "/departmentHeads/hargave.jpg?height=400&width=400",
        specialization: "Orthopedic",
        experience: "18+ years",
        education: [
          "M.B.B.S.(Magadh University)"
        ],

        achievements: [
          "Medical Supritendent in Gandhi Nagar Hospital, Ranchi"
        ]
      },
      {
        id: "dr-Danish",
        name: "Dr Danish Ejaj",
        title: "(MBBS DNB Resident)",
        image: "/departmentHeads/Dr Danish Ejaz (MBBS DNB Resident).jpg?height=400&width=400",
        specialization: "Orthopedic Surgery",
        experience: "18+ years",
        education: [
          ""
        ],

        achievements: [
          ""
        ]
      }, {
        id: "dr-Satyam",
        name: "Dr.Satyam kr Singh",
        title: "(MBBS,DNB Resident)",
        image: "/departmentHeads/Dr Satyam Kr Singh (MBBS DNB Resident).jpg?height=400&width=400",
        specialization: "Orthopedic",
        experience: "18+ years",
        education: [
          ""],

        achievements: [
          ""
        ]
      }, {
        id: "dr-Tirkey",
        name: "Dr. Nand Kishore Tirkey",
        title: "(MBBS,DNB Resident)",
        image: "/departmentHeads/doctors.jpg?height=400&width=400",
        specialization: "Orthopedic ",
        experience: "18+ years",
        education: [
          ""
        ],

        achievements: [

          ""]
      }
    ],
    treatments: [
      {
        name: "musculoskeletal system",
        description: "Surgical procedure to replace a damaged joint with artificial components",
        duration: "1-2 hours",
        preparation: [
          "Advance C-arm Reducing the Radiation Exposure.",
          "Ultramodern Endoscope and International Quality Implants Assuring Quality Specification.",
          "Multiple C-arm to Reduce the Duration of Surgery and to Improve 3-D precision for implant Placement.",
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
  ophthalmology: {
    id: "ophthalmology",
    name: "OPHTHALMOLOGY ",
    description: "Treatment of disorders and diseases of the eye.",
    image: "/department/Ophthalmology-min.png?height=1080&width=1920",
    overview: "In Shree Jagannath Hospital & Research Centre,the department of Ophthalmology is dedicated to providing state of the art medical and surgical care in all aspects of adult and pediatric ophthalmology. We provide patient oriented management of ophthalmic problems by integrating and leveraging our combined expertise. The centre performs advanced surgical procedures which include most current surgical and reconstructive techniques. We have a team of highly experienced surgeons which are supported by most advanced medical equipment and techniques. Ophthalmology is the branch of medicine which deals with the diseases and surgery of the visual pathways, including the eye, brain and areas surrounding the eye such as the lacrimal system and eyelids.",
    features: [
      "IOL MICS for Cataract (PHACO-Infinity Alcon).",
      "Squint Surgery.",
      "Oculoplastic Surgery.",
      "Glaucoma Surgery",
      "Perimetry",
      "Gonioscopy",
      "Non Contact Tonometry.",
      "Nd Yag Laser (Capsulotomy / Iridotomy)",
      "Fundus Photography & Fluorescein Angiography.",
      "Retinal Laser Photo Coagulation with Green Laser.",
      "Intravitreal Injections.",
      "Retinal Surgery",
      "Special Diabetic Clinic",
      "O.C.T. (Topcon).",
      "Retinopathy of Permaturity Screening with Retcam.",
      "Laser for ROP."
    ],
    contactInfo: {
      phone: "+91 7677111010",
      email: "sjhrc.ranchi@gmail.com",
      location: "Mayor Road, Behind Machhli Ghar, Ranchi",
      hours: "Mon-Sat, Sunday CLOSED"
    },
    doctors: [
      {
        id: "dr-Vandana-Prasad",
        name: "Dr. Vandana Prasad",
        title: "Senior Consultant (Ophthalmology)",
        image: "/departmentHeads/vandana.png?height=400&width=400",
        specialization: "Ophthalmology",
        experience: "18+ years",
        education: [
        "M.B.B.S (B.H.U), M.S. Ophthalmology. (B.H.U)"
      ],

        achievements: [
       "Lecturer, Dept. of Ophthalmology (MGIMS)", 
       "Sevagram, Wardha H.O.D dept. Eye", 
       "HEC Plant Hospital, Dhurwa, Ranchi" ]
      },
      {
        id: "dr-Neeraj-Kumar",
        name: "Dr. Neeraj Kumar",
        title: "Specialist (Retina) & Senior Consultant (Ophthalmology)",
        image: "/departmentHeads/doctors.jpg?height=400&width=400",
        specialization: "Ophthalmology",
        experience: "18+ years",
        education: [
          "M.B.B.S.(), M.S.()"
        ],

        achievements: [
          " "
        ]
      },
      {
        id: "dr-Abhishek",
        name: "Dr. Kumar Abhishek",
        title: "Specialist & Senior Consultant (Ophthalmology)",
        image: "/departmentHeads/doctors.jpg?height=400&width=400",
        specialization: "Ophthalmology",
        experience: "18+ years",
        education: [
          " M.B.B.S.(Seth G.S. Medical College, Mumbai)", 
          "M.S.(Patna Medical College, Patna)", 
          "ECFMG (USA)"
        ],

        achievements: [
          "Consultant, Mirlay Eye Care Banglore(2016-19)",
          "Consultant, Aravind Eye Hospital Madurai(2015-16)",
          "Fellowship in Anterior Segment and Intraocular lens microsurgery including phacoemulsification, Aravind Eye Hospital(2006-09)",
          
        ]
      },
      {
        id: "dr-Pallavi",
        name: "Dr. Sururchi Pallavi",
        title: "Senior Medical Officer (Orhtopedics)",
        image: "/departmentHeads/Dr Suruchi Pallavi.jpg?height=400&width=400",
        specialization: "Ophthalmology",
        experience: "18+ years",
        education: [
          "MBBS MS (Ophthalmology)"
        ],

        achievements: [
          ""
        ]
      },
     
    ],
    treatments: [
      {
        name: "Equipped",
        description: "Surgical procedure to replace a damaged with artificial components",
        duration: "1-2 hours",
        preparation: [
          "Autorefractokeratometer",
          "Non Contact Tonometer (Topcon)",
          "Slit Lamp Biomicroscope",

          "Perimeter (Zeiss)",
          "IOL Master (Zeiss)",

          "A-Scan Biometry",
          "OCT (Topcon)",
          "Yag Laser (Nidek)",
          "Green Laser (Nidek)",
          "Fundus Fluorescein Angiography (Topcon)",
          "Indirect Green Laser",

          "ROP Screening RetCam (Trinethra)",
          "Zeiss Operating Microscope",
          "Alcon Infinity phacoemulsification Machine",
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
  laproscopic: {
    id: "laproscopic",
    name: "LAPROSCOPIC SURGERY ",
    description: "Surgical management of diseases.",
    image: "/department/Laparoscopy.jpg?height=1080&width=1920",
    overview: "The field of general surgery involves evaluation and surgery of the full range of complex general surgery problems including surgical conditions of the breast, endocrine system, gastrointestinal tract, colon, liver, pancreas and rectum. Services includes:",
    features: [
      "All types of Minimal Invasive & General Surgeries.",
      "Laparoscopic procedures.",
      "Endo-urological procedures.",
      "Thoracic Endoscopy and thoracic procedures.",
      "Surgical Oncology",
      "Upper and Lower GI Endoscopy(Diagnostic/Biopsy)",
      "Therapeutic Endoscopy."
     
    ],
    contactInfo: {
      phone: "+91 7677111010",
      email: "sjhrc.ranchi@gmail.com",
      location: "Mayor Road, Behind Machhli Ghar, Ranchi",
      hours: "Mon-Sat, Sunday CLOSED"
    },
    doctors: [
      {
        id: "dr-rr",
        name: "Dr. R.R. Sinha",
        title: "Senior Consultant (Gen. Surgery)",
        image: "/departmentHeads/rrsinha.jpg?height=400&width=400",
        specialization: "Gen. Surgery",
        experience: "18+ years",
        education: [
        "M.B.B.S.(AMU, Aligarh), M.S.(AMU, Aligarh)"
      ],

        achievements: [
       "H.O.D.,Surgery (Gandhinagar Hospital, CCL)", 
       "Chief of Medical Services(CCL a subsidiary of CIL)", 
        ]
      },
    
     
    ],
    treatments: [
      {
        name: "",
        description: "",
        duration: "1-2 hours",
        preparation: [
          "",

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
  generalmedicine: {
    id: "generalmedicine",
    name: "GENERAL MEDICINE",
    description: "Surgical management of diseases.",
    image: "/department/General Medicine.jpg?height=1080&width=1920",
    overview: "At Shree Jagannath Hospital & Research Centre, in the department of internal medicine / general medicine, we are providing comprehensive medical care for the treatment of various medical coditions which incorporates medical diagnosis and treatment of mediacal diseases which covers a wide range of conditions affecting the internal organs of the body including prevention of various medical conditions. The facilities under Internal Medicine are :",

    features: [
      "general Medicine clinic",
      "Diabetes Mellitus Clinic",
      "Non-Invasive Cardiology (ECG, ECHO, TMT, HOLTER Monitor, Biochemical monitoring).",
      "Temporary & Permanent Pacemaker Implatation",
      "Critical care",
      "Intensive care treatment and management of critically ill/compromised patients, infectious diseases, drug overdose and poisoning and other medical emergencies like Septicaemia, diabetic ketoacidosis, shock of any kind, meningitis, pneumonia etc.",
      "Management of chronic diseases",
      "Infectious diseases like Malaria, Typhoid fever, Tuberculosis, HIV/AIDS, Dengue fever, influenza etc.",
      "Management of drug overdoses and poisoning: Efficient nursing care",
      "Pre-employment checks",
      "Preventive Health: * It deals with various types of preventive health checkups. * A comprehensive and extremely personalized health check for you and your family have been designed",
     
    ],
    contactInfo: {
      phone: "+91 7677111010",
      email: "sjhrc.ranchi@gmail.com",
      location: "Mayor Road, Behind Machhli Ghar, Ranchi",
      hours: "Mon-Sat, Sunday CLOSED"
    },
    doctors: [
      {
        id: "dr-Arya",
        name: "Dr. Rakesh Arya",
        title: "Senior Consultant",
        image: "/departmentHeads/rakesh.png?height=400&width=400",
        specialization: "Senior Consultant",
        experience: "18+ years",
        education: [
        "M.B.B.S (G.R.M.C, Gwalior) M.D. (G.R.M.C, Gwalior)"
      ],

        achievements: [
       "Teacher in G.R medical College, (Gwalior) Specialist in Coal India Ltd.", 
       "Chief of Medical services, CCL, Ranchi Executive Director medical services Coal India Ltd.", 
        ]
      },
      {
        id: "dr-dp-singh",
        name: "Dr. D.P. Singh",
        title: "enior Medical Officer",
        image: "/departmentHeads/dpsingh.jpg?height=400&width=400",
        specialization: "Medical Officer",
        experience: "18+ years",
        education: [
        "M.B.B.S.(Madras University)"
      ],

        achievements: [
      "Medical Officer (CCL), Senior Medical Officer(CCL), Dy. Medical Supritendent(CCL), Medical Supritendent(CCL), Dy. Chief Medical Officer(CCL)" ]
      },
      {
        id: "dr-Pramod",
        name: "Dr. Pramod kumar Singh",
        title: "Medical Officer",
        image: "/departmentHeads/doctors.jpg?height=400&width=400",
        specialization: "Medical Officer",
        experience: "18+ years",
        education: [
        "M.B.B.S.(RANCHI University) DECEMBER , 2005"
      ],

        achievements: [
      "D.C.H (PATNA University ) , April 2010 M.D (GENERAL MEDICINE) RANCHI University , May ,2014"]
      },
    
     
    ],
    treatments: [
      {
        name: "",
        description: "",
        duration: "1-2 hours",
        preparation: [
          "",

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
    image: "/department/onco.jpg?height=1080&width=1920",
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
      phone: "+91 8987999200",
      email: "sjhrc.ranchi@gmail.com",
      location: "(Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001)",
      hours: "Mon-Sat: Sunday CLOSED"
    },
    doctors: [
      {
        id: "dr-chen",
        name: "Dr. Munmun",
        title: "Director of Medical Oncology",
        image: "/placeholder.svg?height=400&width=400",
        specialization: "Medical Oncology",
        experience: "22+ years",
        education: [
          "" ],
        achievements: [
          ""
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
      phone: "+91 8987999200",
      email: "sjhrc.ranchi@gmail.com",
      location: "(Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001)",
      hours: "Mon-Sat: Sunday CLOSED"
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