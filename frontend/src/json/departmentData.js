import { redirect } from "next/dist/server/api-utils"
import Link from "next/link"

const departmentData = [
    {
        id: 1,
        name: "ORTHOPEDICS",
        description: 'The correction of deformities of bones or muscles.',
        indepartment: {
            redirect: "/inDepartment/orthopaedics"
        }
    },  
    {
        id: 2,
        name: "OPHTHALMOLOGY (EYE)",
        description: 'Treatment of disorders and diseases of the eye.',
        indepartment: {
            redirect: "/inDepartment/ophthalmology"
        }
    },
    {
        id: 3,
        name: "GENERAL MEDICINE",
        description: 'All infections related diseases',
        indepartment: {
            redirect: "/inDepartment/generalMedicine"
        }
    },
    {
        id: 4,
        name: "GENERAL & LAPROSCOPIC SURGERY",
        description: 'Surgical management of diseases.',
        indepartment: {
            redirect: "/inDepartment/generalSurgery"
        }
    },
    {
        id: 5,
        name: "NEUROSURGERY ",
        description: 'Treatment of diseases related with nurves.',
        indepartment: {
            redirect: "/inDepartment/neuroSurgery"
        }
    },
    {
        id: 6,
        name: "NEPHROLOGY & DIALYSIS",
        description: 'Treatment of kidney related diseases.',
        indepartment: {
            redirect: "/inDepartment/nephrology"
        }
    },
    {
        id: 7,
        name: "CARDIOLOGY",
        description: 'Treatment of Heart related diseases.',
        indepartment: {
            redirect: "/inDepartment/cardiology"
        }
    },
    {
        id: 8,
        name: "PHYSIOTHERAPY",
        description: 'Rehabilitation and Therapy (muscles/joints).',
        indepartment: {
            redirect: "/inDepartment/physiotherapy"
        }
    },
    {
        id: 9,
        name: "RADIOLOGY",
        description: 'Diagnosis of with X-ray,USG,ECHO and CT-Scan.',
        indepartment: {
            redirect: "/inDepartment/radiology"
        }
    },
    {
        id: 10,
        name: "PATHOLOGY",
        description: 'Laboratory examination of samples(blood & tissue.)',
        indepartment: {
            redirect: "/inDepartment/pathology"
        }
    },
    {
        id: 11,
        name: "EMERGENCY SERVICES",
        description: 'For all trauma and medical emergency care.',
        indepartment: {
            redirect: "/inDepartment/emergencyservices"
        }
    },
    {
        id: 12,
        name: "CRITICAL CARE UNIT",
        description: 'For intensive treatment of serious illnesses.',
        indepartment: {
            redirect: "/inDepartment/criticalCare"
        }
    },
    {
        id: 13,
        name: "UROLOGY",
        description: 'Empowering Urinary Wellness: Breakthroughs Await.',
        indepartment: {
            redirect: "/inDepartment/urology"
        }
    },
    {
        id: 14,
        name: "OBS & GYNAE",
        description: 'Empowering Womens Health: Leaders in Obstetrics & Gynecology.',
        indepartment: {
            redirect: "/inDepartment/obsGynae"
        }
    },
]

export default departmentData