// routes/consultantScheduleRoutes.js
const express = require('express');
const router = express.Router();
const consultantScheduleController = require('../../controllers/V1/consultantScheduleController');

router.post('/', consultantScheduleController.createConsultantSchedule);
router.post('/bulk', consultantScheduleController.createConsultantScheduleBulk);
router.get('/', consultantScheduleController.getAllConsultantSchedules);
router.get('/:id', consultantScheduleController.getConsultantScheduleById);
router.put('/:id', consultantScheduleController.updateConsultantSchedule);
router.delete('/:id', consultantScheduleController.deleteConsultantSchedule);

module.exports = router;
