// src/routes/departmentRoutes.js
const express = require('express');
const {
    addDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
} = require('../../controllers/V1/departmentController');
const { validateDepartment } = require('../../validators/validateDepartment');
const { limiter } = require('../../middlewares/rateLimiter');

const router = express.Router();

router.post('/', limiter, validateDepartment, addDepartment);
router.get('/', getDepartments);
router.put('/:id', limiter, validateDepartment, updateDepartment);
router.delete('/:id', limiter, deleteDepartment);

module.exports = router;


