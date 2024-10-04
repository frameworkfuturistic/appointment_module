<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\ConsultantShift;
use App\Models\Shift;
use App\Models\TimeSlot;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SlotController extends Controller
{
    // Fetch available slots for a specific doctor on a given date
    public function availableSlots($doctorId, $date)
    {
        // Convert date into the correct format
        $formattedDate = Carbon::parse($date)->format('Y-m-d');

        // Fetch slots for the doctor on the given date
        $slots = TimeSlot::where('ConsultantID', $doctorId)
            ->where('ConsultationDate', $formattedDate)
            ->orderBy('SlotTime', 'asc')
            ->get();

        if ($slots->isEmpty()) {
            return response()->json(['message' => 'No available slots for the given date.'], 404);
        }

        // Structure the slots response
        $availableSlots = $slots->map(function ($slot) {
            return [
                'SlotID' => $slot->SlotID,
                'ConsultationDate' => $slot->ConsultationDate,
                'SlotTime' => $slot->SlotTime,
                'AvailableSlots' => $slot->AvailableSlots,
                'MaxSlots' => $slot->MaxSlots,
                'SlotToken' => $slot->SlotToken,
                'isBooked' => $slot->isBooked, // Include booking status
                'AppointmentID' => $slot->AppointmentID,
            ];
        });

        return response()->json($availableSlots);
    }

    // Book a slot
    public function bookSlot(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'slot_id' => 'required|integer|exists:opd_doctorslots,SlotID',
            'mr_no' => 'required|string|exists:mr_master,MRNo',
        ]);
    
        // Fetch the slot and ensure it's available
        $slot = TimeSlot::find($validated['slot_id']);
        if (!$slot || !$slot->isAvailable()) {
            return response()->json(['message' => 'Slot is already booked or not available.'], 400);
        }
    
        // Start a DB transaction to ensure no race conditions
        DB::beginTransaction();
    
        try {
            // Check if the patient already has a booked slot
            $existingAppointment = Appointment::where('MRNo', $validated['mr_no'])
                ->where('Pending', 0) // Check for confirmed appointments
                ->first();
    
            if ($existingAppointment) {
                return response()->json(['message' => 'You already have a booked slot.'], 400);
            }
    
            // Mark the slot as booked by updating the AvailableSlots field
            $slot->AvailableSlots -= 1;
            $slot->isBooked = 1; // Mark slot as booked
            $slot->save();
    
    
            // Commit the transaction
            DB::commit();
            return response()->json(['message' => 'Slot booked successfully.', 'appointment' => $appointment], 201);
        } catch (\Exception $e) {
            // Rollback in case of any errors
            DB::rollBack();
            return response()->json(['message' => 'Error booking the slot: ' . $e->getMessage()], 500);
        }
    }
    
    
    

    // Method to add slots for a doctor
    public function addSlots(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'consultant_id' => 'required|integer|exists:gen_consultants,ConsultantID',
            'shift_id' => 'required|integer|exists:gen_shifts,ShiftID',
            'date' => 'required|date',
            'num_slots' => 'required|integer|min:1',
        ]);

        // Extract the data from the request
        $consultantId = $validated['consultant_id'];
        $shiftId = $validated['shift_id'];
        $date = $validated['date'];
        $numSlots = $validated['num_slots'];

        // Fetch shift details to determine start and end time
        $shift = Shift::find($shiftId);

        if (!$shift) {
            return response()->json(['error' => 'Shift not found.'], 404);
        }

        // Create slots
        $startTime = Carbon::createFromFormat('h:i A', $shift->StartTime . ' ' . $shift->StartTimeAMPM);
        $endTime = Carbon::createFromFormat('h:i A', $shift->EndTime . ' ' . $shift->EndTimeAMPM);
        
        // Generate slots
        $slots = [];
        for ($i = 0; $i < $numSlots; $i++) {
            $slotTime = $startTime->copy()->addMinutes(30 * $i); // Assuming 30-minute intervals
            if ($slotTime->lessThanOrEqualTo($endTime)) {
                $slotToken = str_replace('-', '', $date) . $slotTime->format('Hi') . str_pad($i + 1, 2, '0', STR_PAD_LEFT); // Unique slotToken
                
                // Check for duplicate SlotToken
                while (TimeSlot::where('SlotToken', $slotToken)->exists()) {
                    $slotToken = str_replace('-', '', $date) . $slotTime->format('Hi') . str_pad(++$i, 2, '0', STR_PAD_LEFT);
                }
                
                $slots[] = [
                    'ConsultantID' => $consultantId,
                    'ShiftID' => $shiftId,
                    'ConsultationDate' => $date,
                    'SlotTime' => $slotTime->format('H:i'),
                    'SlotToken' => $slotToken,
                    'MaxSlots' => 1, // Set maximum slots per time slot
                    'AvailableSlots' => 1, // Set available slots initially
                    'isBooked' => 0, // Initially not booked
                ];
            }
        }

        // Save the slots in the database
        foreach ($slots as $slot) {
            TimeSlot::create($slot);
        }

        return response()->json(['message' => 'Slots created successfully.', 'slots' => $slots], 201);
    }

    // Method to fetch all OPD doctor slots
    public function getAllSlots(Request $request)
    {
        $slots = TimeSlot::with('appointments')->get(); // Load slots with appointments if needed
        return response()->json($slots);
    }

    public function getAllDoctorSlots($doctorId)
    {
        // Fetch all slots for the doctor
        $slots = TimeSlot::where('ConsultantID', $doctorId)
            ->orderBy('ConsultationDate', 'asc')
            ->orderBy('SlotTime', 'asc')
            ->get();

        if ($slots->isEmpty()) {
            return response()->json(['message' => 'No slots available for this doctor.'], 404);
        }

        // Group slots by date
        $groupedSlots = $slots->groupBy('ConsultationDate')->map(function ($slotsForDate) {
            return $slotsForDate->map(function ($slot) {
                return [
                    'SlotID' => $slot->SlotID,
                    'ConsultationDate' => $slot->ConsultationDate,
                    'SlotTime' => $slot->SlotTime,
                    'AvailableSlots' => $slot->AvailableSlots,
                    'MaxSlots' => $slot->MaxSlots,
                    'SlotToken' => $slot->SlotToken,
                    'isBooked' => $slot->isBooked, // Include booking status
                    'AppointmentID' => $slot->AppointmentID,
                ];
            });
        });

        return response()->json($groupedSlots);
    }
}
