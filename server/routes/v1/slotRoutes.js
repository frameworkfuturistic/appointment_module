const express = require('express');
const {
    createSlots,
    getAvailableSlotsByDoctor,
    bookSlot,
    cancelSlotBooking,
    updateSlot,
} = require('../../controllers/V1/slotController');
const { validateSlotCreation, validateSlotBooking } = require('../../validators/slotValidation');

const router = express.Router();

// Create slots for a doctor (with validation)
router.post('/create', validateSlotCreation, createSlots);

// Get available slots for a specific doctor on a given date
router.get('/:doctorId/:date', getAvailableSlotsByDoctor);

// Book a slot for an appointment (with validation)
router.post('/book', validateSlotBooking, bookSlot);

// Cancel a slot booking by ID
router.delete('/cancel/:slotId', cancelSlotBooking);

// Update slot details by slot ID
router.put('/:slotId', updateSlot);

module.exports = router;
