

export const departmentDetails = {
  // ... other departments ...

  orthopedics: {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Comprehensive care for musculoskeletal conditions and injuries",
    image: "/placeholder.svg?height=1080&width=1920",
    overview: "Our Orthopedics Department is dedicated to diagnosing, treating, and preventing disorders of the musculoskeletal system. Our team of highly skilled orthopedic surgeons and specialists use state-of-the-art technology and innovative techniques to provide comprehensive care for a wide range of conditions affecting bones, joints, ligaments, tendons, muscles, and nerves.",
    features: [
      "Advanced diagnostic imaging including MRI and CT scans",
      "Minimally invasive arthroscopic procedures",
      "Joint replacement and reconstruction surgery",
      "Sports medicine and injury rehabilitation",
      "Pediatric orthopedic care",
      "Spine surgery and treatment for back pain",
      "Hand and upper extremity surgery",
      "Foot and ankle surgery"
    ],
    contactInfo: {
      phone: "+1 (555) 123-4567",
      email: "orthopedics@example-hospital.com",
      location: "Main Hospital, 3rd Floor, Wing B",
      hours: "Monday to Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 1:00 PM"
    },
    doctors: [
      {
        id: "dr-smith",
        name: "Dr. Emily Smith",
        title: "Head of Orthopedic Surgery",
        image: "/placeholder.svg?height=400&width=400",
        specialization: "Joint Replacement",
        experience: "20+ years of surgical experience",
        education: [
          "MD from Johns Hopkins University School of Medicine",
          "Residency in Orthopedic Surgery at Mayo Clinic",
          "Fellowship in Adult Reconstruction at Hospital for Special Surgery"
        ],
        availability: [
          { days: "Monday, Wednesday", hours: "9:00 AM - 5:00 PM" },
          { days: "Friday", hours: "10:00 AM - 4:00 PM" }
        ],
        languages: ["English", "Spanish"],
        achievements: [
          "Pioneered minimally invasive hip replacement technique",
          "Published over 50 peer-reviewed articles in orthopedic journals",
          "Recipient of the American Academy of Orthopaedic Surgeons' Kappa Delta Award"
        ],
        rating: 4.9
      },
      {
        id: "dr-johnson",
        name: "Dr. Michael Johnson",
        title: "Sports Medicine Specialist",
        image: "/placeholder.svg?height=400&width=400",
        specialization: "Sports Injuries and Arthroscopy",
        experience: "15+ years in sports medicine",
        education: [
          "MD from Stanford University School of Medicine",
          "Residency in Orthopedic Surgery at UCSF",
          "Fellowship in Sports Medicine at Andrews Institute"
        ],
        availability: [
          { days: "Tuesday, Thursday", hours: "8:00 AM - 4:00 PM" },
          { days: "Saturday", hours: "9:00 AM - 1:00 PM" }
        ],
        languages: ["English", "French"],
        achievements: [
          "Team physician for professional sports teams",
          "Developed innovative ACL reconstruction technique",
          "Regular speaker at international sports medicine conferences"
        ],
        rating: 4.8
      },
      {
        id: "dr-patel",
        name: "Dr. Anita Patel",
        title: "Pediatric Orthopedic Surgeon",
        image: "/placeholder.svg?height=400&width=400",
        specialization: "Pediatric Orthopedics",
        experience: "12+ years specializing in pediatric cases",
        education: [
          "MD from University of Pennsylvania School of Medicine",
          "Residency in Orthopedic Surgery at Children's Hospital of Philadelphia",
          "Fellowship in Pediatric Orthopedics at Boston Children's Hospital"
        ],
        availability: [
          { days: "Monday, Wednesday, Friday", hours: "8:30 AM - 3:30 PM" }
        ],
        languages: ["English", "Hindi", "Gujarati"],
        achievements: [
          "Developed new treatment protocols for pediatric scoliosis",
          "Led multiple medical missions to provide orthopedic care in developing countries",
          "Recipient of the Pediatric Orthopedic Society of North America's Angela M. Kuo Memorial Award"
        ],
        rating: 4.9
      }
    ],
    treatments: [
      {
        name: "Total Joint Replacement",
        description: "Surgical procedure to replace damaged joints with artificial implants, commonly performed on hips and knees.",
        duration: "2-3 hours for surgery, 3-6 months for full recovery",
        preparation: [
          "Complete pre-operative physical examination",
          "Discontinue certain medications as advised",
          "Arrange for post-operative care and home modifications",
          "Fast for 8 hours before surgery",
          "Follow specific instructions provided by your surgeon"
        ]
      },
      {
        name: "Arthroscopic Surgery",
        description: "Minimally invasive procedure using a small camera and instruments to diagnose and treat joint problems.",
        duration: "30 minutes to 2 hours, depending on the procedure",
        preparation: [
          "Inform your doctor about any medications you're taking",
          "Stop eating and drinking 8 hours before the procedure",
          "Wear loose, comfortable clothing on the day of surgery",
          "Arrange for someone to drive you home post-procedure",
          "Follow any specific instructions given by your surgeon"
        ]
      },
      {
        name: "Spinal Fusion",
        description: "Surgical procedure to permanently connect two or more vertebrae in the spine, eliminating motion between them.",
        duration: "3-6 hours for surgery, 3-6 months for full recovery",
        preparation: [
          "Undergo necessary imaging studies (X-rays, MRI, CT scan)",
          "Complete pre-operative physical and lab tests",
          "Stop smoking and using nicotine products",
          "Adjust medications as directed by your doctor",
          "Prepare your home for post-operative recovery"
        ]
      },
      {
        name: "Fracture Repair",
        description: "Treatment of broken bones, which may involve casting, splinting, or surgical intervention with internal or external fixation devices.",
        duration: "Varies widely depending on the type and severity of the fracture",
        preparation: [
          "Seek immediate medical attention for suspected fractures",
          "Avoid eating or drinking in case surgery is needed",
          "Inform medical staff of any allergies or medical conditions",
          "Bring all relevant medical records and imaging studies",
          "Follow emergency department or orthopedic clinic instructions"
        ]
      }
    ],
    faqs: [
      {
        question: "How long is the recovery period after a joint replacement surgery?",
        answer: "Recovery time varies depending on the joint replaced and individual factors. Generally, patients can return to most daily activities within 6-12 weeks. Full recovery and return to more demanding activities may take 3-6 months. Your orthopedic surgeon will provide a more specific timeline based on your particular case."
      },
      {
        question: "What is the difference between a sprain and a fracture?",
        answer: "A sprain is an injury to a ligament (the tissue that connects bones), while a fracture is a break in the bone itself. Sprains often result from twisting or stretching a joint beyond its normal range of motion, while fractures occur when a bone is subjected to more force than it can withstand. Proper diagnosis through physical examination and imaging is crucial for appropriate treatment."
      },
      {
        question: "When should I see an orthopedic doctor for back pain?",
        answer: "You should consider seeing an orthopedic doctor for back pain if: 1) The pain persists for more than a few weeks, 2) The pain is severe or getting worse, 3) You experience numbness, tingling, or weakness in your legs, 4) The pain is affecting your daily activities, or 5) You've had a recent injury or fall. Always seek immediate medical attention if you experience loss of bladder or bowel control, as this may indicate a serious condition."
      },
      {
        question: "Are there non-surgical treatments available for orthopedic conditions?",
        answer: "Yes, many orthopedic conditions can be treated non-surgically. Common non-surgical treatments include physical therapy, medications (such as anti-inflammatories), injections (like corticosteroids or viscosupplementation), bracing or orthotics, and lifestyle modifications. Your orthopedic specialist will recommend the most appropriate treatment plan based on your specific condition and needs."
      },
      {
        question: "How can I prevent sports injuries?",
        answer: "To prevent sports injuries: 1) Warm up properly before activity, 2) Use appropriate protective gear, 3) Practice proper technique, 4) Gradually increase intensity and duration of training, 5) Stay hydrated, 6) Listen to your body and don't push through pain, 7) Cross-train to prevent overuse injuries, 8) Maintain good overall fitness and flexibility, and 9) Get adequate rest and recovery time between activities. If you have concerns, consult with a sports medicine specialist for personalized advice."
      }
    ]
  },

  // ... other departments ...
}