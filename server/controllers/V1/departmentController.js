const apiResponse = require('../../utils/apiResponse');
const prisma = require('../../config/prisma');

// Add a new department
exports.addDepartment = async (req, res) => {
    const { name, code, description } = req.body;

    try {
        // Check if the department already exists
        const existingDepartment = await prisma.department.findUnique({
            where: { code } // or you can check by name if needed
        });

        if (existingDepartment) {
            return apiResponse.error(res, 'Department with this code already exists.', 400);
        }

        // Create a new department
        const department = await prisma.department.create({
            data: { name, code, description }
        });

        return apiResponse.success(res, 'Department added successfully', department, 201);
    } catch (error) {
        return apiResponse.error(res, 'Error adding department', 500);
    }
};

// Get all departments
// Get all departments with their associated doctors
exports.getDepartments = async (req, res) => {
    try {
        const departments = await prisma.department.findMany({
            include: {
                doctors: true, // Include the related doctors
            },
        });
        return apiResponse.success(res, 'Departments retrieved successfully', departments);
    } catch (error) {
        return apiResponse.error(res, 'Error retrieving departments', 500);
    }
};


// Update a department
exports.updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, code, description } = req.body;

    try {
        const department = await prisma.department.update({
            where: { id: parseInt(id) },
            data: { name, code, description }
        });
        return apiResponse.success(res, 'Department updated successfully', department);
    } catch (error) {
        return apiResponse.error(res, 'Error updating department', 500);
    }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.department.delete({
            where: { id: parseInt(id) }
        });
        return apiResponse.success(res, 'Department deleted successfully');
    } catch (error) {
        return apiResponse.error(res, 'Error deleting department', 500);
    }
};
