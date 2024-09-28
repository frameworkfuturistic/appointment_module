const prisma = require('../../config/prisma');
const apiResponse = require('../../utils/apiResponse');

// Add a new doctor
exports.addDoctor = async (req, res) => {
    const { name, email, phone, bio, profileImg, specialization, departmentId } = req.body;

    try {
        // Check if a doctor with the same email or phone already exists
        const existingDoctor = await prisma.doctor.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            }
        });

        if (existingDoctor) {
            return apiResponse.error(res, 'Doctor with the same email or phone number already exists.', 409);
        }

        const doctor = await prisma.doctor.create({
            data: { name, email, phone, bio, profileImg, specialization, departmentId }
        });
        return apiResponse.success(res, 'Doctor added successfully', doctor, 201);
    } catch (error) {
        return apiResponse.error(res, 'Error adding doctor', 500);
    }
};

// Get all doctors
exports.getDoctors = async (req, res) => {
    try {
        const doctors = await prisma.doctor.findMany({
            include: {
                slots: true, // Include the related doctors
            },
    });
        return apiResponse.success(res, 'Doctors fetched successfully', doctors);
    } catch (error) {
        return apiResponse.error(res, 'Error fetching doctors', 500);
    }
};

// Fetch doctors by department ID
exports.getDoctorsByDepartment = async (req, res) => {
    const { departmentId } = req.params;
    try {
      const doctors = await prisma.doctor.findMany({
       
        where: { departmentId: parseInt(departmentId) },
      });
      return res.status(200).json({ data: doctors });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch doctors" });
    }
  };

  // Fetch doctors by slote ID
exports.getDoctorsBySlote = async (req, res) => {
    const { doctorId } = req.params;
    try {
      const doctors = await prisma.doctor.findMany({
        include: {
            slots: true, // Include the related doctors
        },
        where: { doctorId: parseInt(doctorId) },
      });
      return res.status(200).json({ data: doctors });
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch doctors" });
    }
  };
  

// Update a doctor
exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, bio, profileImg, specialization, departmentId } = req.body;

    try {
        const doctor = await prisma.doctor.update({
            where: { id: Number(id) },
            data: { name, email, phone, bio, profileImg, specialization, departmentId }
        });
        return apiResponse.success(res, 'Doctor updated successfully', doctor);
    } catch (error) {
        return apiResponse.error(res, 'Error updating doctor', 500);
    }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.doctor.delete({ where: { id: Number(id) } });
        return apiResponse.success(res, 'Doctor deleted successfully');
    } catch (error) {
        return apiResponse.error(res, 'Error deleting doctor', 500);
    }
};
