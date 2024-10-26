

const departmentData = [
    {
        id: 1,
        name: "ORTHOPEDICS",
        description: 'The correction of deformities of bones or muscles.',
        icon: "/speciality/icons/orthopaedic.svg.svg",
        category: "Surgery",
        indepartment: {
            redirect: "/inDepartment/orthopaedics"
        }
    },
    {
        id: 2,
        name: "OPHTHALMOLOGY (EYE)",
        description: 'Treatment of disorders and diseases of the eye.',
        icon: "/speciality/icons/ophthalmology.svg.svg",
        category: "Specialty",
        indepartment: {
            redirect: "/inDepartment/ophthalmology"
        }
    },
    {
        id: 3,
        name: "GENERAL MEDICINE",
        description: 'All infections related diseases.',
        icon: "/speciality/icons/ent.svg.svg",
        category: "Internal Medicine",
        indepartment: {
            redirect: "/inDepartment/generalMedicine"
        }
    },
    {
        id: 4,
        name: "GENERAL & LAPAROSCOPIC SURGERY",
        description: 'Surgical management of diseases.',
        icon: "/speciality/icons/neonatology.svg.svg",
        category: "Surgery",
        indepartment: {
            redirect: "/inDepartment/generalSurgery"
        }
    },
    {
        id: 5,
        name: "NEUROSURGERY",
        description: 'Treatment of diseases related to nerves.',
        icon: "/speciality/icons/neurology.svg.svg",
        category: "Surgery",
        indepartment: {
            redirect: "/inDepartment/neuroSurgery"
        }
    },
    {
        id: 6,
        name: "NEPHROLOGY & DIALYSIS",
        description: 'Treatment of kidney-related diseases.',
        icon: "/speciality/icons/nephrology.svg.svg",
        category: "Internal Medicine",
        indepartment: {
            redirect: "/inDepartment/nephrology"
        }
    },
    {
        id: 7,
        name: "CARDIOLOGY",
        description: 'Treatment of heart-related diseases.',
        icon: "/speciality/icons/cardiology_icon.svg.svg",
        category: "Internal Medicine",
        indepartment: {
            redirect: "/inDepartment/cardiology"
        }
    },
    {
        id: 8,
        name: "PHYSIOTHERAPY",
        description: 'Rehabilitation and therapy (muscles/joints).',
        icon: "/speciality/icons/psychiatry.svg.svg",
        category: "Rehabilitation",
        indepartment: {
            redirect: "/inDepartment/physiotherapy"
        }
    },
    {
        id: 9,
        name: "RADIOLOGY",
        description: 'Diagnosis with X-ray, USG, ECHO, and CT-Scan.',
        icon: "/speciality/icons/radiology.svg fill.svg",
        category: "Diagnostic",
        indepartment: {
            redirect: "/inDepartment/radiology"
        }
    },
    {
        id: 10,
        name: "PATHOLOGY",
        description: 'Laboratory examination of samples (blood & tissue).',
        icon: "/speciality/icons/radiology.svg fill.svg",
        category: "Diagnostic",
        indepartment: {
            redirect: "/inDepartment/pathology"
        }
    },
    {
        id: 11,
        name: "EMERGENCY SERVICES",
        description: 'For all trauma and medical emergency care.',
        icon: "/speciality/icons/ent.svg.svg",
        category: "Emergency",
        indepartment: {
            redirect: "/inDepartment/emergencyservices"
        }
    },
    {
        id: 12,
        name: "CRITICAL CARE UNIT",
        description: 'For intensive treatment of serious illnesses.',
        icon: "/speciality/icons/neonatology.svg.svg",
        category: "Critical Care",
        indepartment: {
            redirect: "/inDepartment/criticalCare"
        }
    },
    {
        id: 13,
        name: "UROLOGY",
        description: 'Empowering urinary wellness: breakthroughs await.',
        icon: "/speciality/icons/urology.svg.svg",
        category: "Internal Medicine",
        indepartment: {
            redirect: "/inDepartment/urology"
        }
    },
    {
        id: 14,
        name: "OBS & GYNAE",
        description: 'Empowering women\'s health: leaders in obstetrics & gynecology.',
        icon: "/speciality/icons/gynecology.svg.svg",
        category: "Women’s Health",
        indepartment: {
            redirect: "/inDepartment/obsGynae"
        }
    },
];


export default departmentData