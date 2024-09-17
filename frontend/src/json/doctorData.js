const doctorData = [
    {
        departments: [
            {
                id: 1,
                name: "Cardiology",
                doctors: [
                    {
                        id: 101,
                        name: "Dr.",
                        availableSlots: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"]
                    },
                    {
                        id: 102,
                        name: "Dr. Jane Smith",
                        availableSlots: ["11:00 AM - 12:00 PM", "1:00 PM - 2:00 PM"]
                    }
                ]
            },
            {
                id: 2,
                name: "Neurology",
                doctors: [
                    {
                        id: 103,
                        name: "Dr. Alice Brown",
                        availableSlots: ["9:00 AM - 10:00 AM", "2:00 PM - 3:00 PM"]
                    },
                    {
                        id: 104,
                        name: "Dr. Bob White",
                        availableSlots: ["10:00 AM - 11:00 AM", "3:00 PM - 4:00 PM"]
                    }
                ],
            }
        ],



        speciality: [
            {
                id: 1,
                name: 'Endocrinology'
            },
            {
                id: 2,
                name: 'Paediatric Medicine'
            },
            {
                id: 3,
                name: 'Urology'
            },
            {
                id: 4,
                name: 'Cardiology'
            },
            {
                id: 5,
                name: 'Neurology'
            },
            {
                id: 6,
                name: 'Urology'
            },
            {
                id: 7,
                name: 'Gynecology'
            },
            {
                id: 8,
                name: 'Pediatrical'
            },
            {
                id: 9,
                name: 'Laboratory'
            }

        ],



    },

]

export default doctorData;