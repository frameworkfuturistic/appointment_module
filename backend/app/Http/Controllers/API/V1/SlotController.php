<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\ConsultantShift;
use App\Models\Shift;
use App\Models\TimeSlot;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SlotController extends Controller
{
    // Fetch available slots for a specific doctor on a given date
    public function availableSlots($doctorId, $date)
    {
        // Log the input parameters
        \Log::info("Fetching available slots for Doctor ID: {$doctorId} on Date: {$date}");
    
        // Fetch shifts for the doctor
        $shifts = ConsultantShift::where('ConsultantID', $doctorId)->get();
    
        // Log fetched shifts
        \Log::info("Fetched Shifts: ", $shifts->toArray());
    
        $availableSlots = [];
        foreach ($shifts as $shift) {
            // Log the shift times to check their values
            \Log::info("Shift StartTime: {$shift->StartTime} {$shift->StartTimeAMPM}");
            \Log::info("Shift EndTime: {$shift->EndTime} {$shift->EndTimeAMPM}");
    
            // Check if start and end times are empty
            if (empty($shift->StartTime) || empty($shift->EndTime) || empty($shift->StartTimeAMPM) || empty($shift->EndTimeAMPM)) {
                \Log::error("Shift time data is incomplete for ShiftID: {$shift->ShiftID}");
                continue; // Skip this shift if data is incomplete
            }
    
            try {
                // Parse the start and end times
                $startTime = Carbon::createFromFormat('h:i A', $shift->StartTime . ' ' . $shift->StartTimeAMPM);
                $endTime = Carbon::createFromFormat('h:i A', $shift->EndTime . ' ' . $shift->EndTimeAMPM);
            } catch (\Exception $e) {
                \Log::error("Error parsing time: " . $e->getMessage());
                return response()->json(['error' => 'Invalid time format.'], 400);
            }
    
            // Get booked slots for the date
            $bookedSlots = $this->getBookedSlots($doctorId, $date);
    
            // Generate time slots
            for ($time = $startTime->copy(); $time->lessThanOrEqualTo($endTime); $time->addMinutes(30)) {
                if (!in_array($time->format('H:i A'), $bookedSlots)) {
                    $availableSlots[] = [
                        'time' => $time->format('H:i A'),
                        'shift_id' => $shift->ShiftID,
                        'fee' => $shift->Fee,
                    ];
                }
            }
        }
    
        // Log the available slots before returning
        \Log::info("Available Slots: ", $availableSlots);
    
        return response()->json(['available_slots' => $availableSlots]);
    }
    
    
    
    

    // Fetch booked slots for the doctor on that date
    private function getBookedSlots($doctorId, $date)
    {
        return Appointment::where('ConsultantID', $doctorId)
            ->whereDate('ConsultationDate', $date)
            ->pluck('SlotTime') // Adjust based on how you store booked slots
            ->toArray();
    }

    // Method to add slots for a doctor
    public function addSlots(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'consultant_id' => 'required|integer|exists:gen_consultants,ConsultantID', // Ensure consultant exists
            'shift_id' => 'required|integer|exists:gen_shifts,ShiftID', // Ensure shift exists
            'date' => 'required|date',
            'num_slots' => 'required|integer|min:1',
        ]);

        // Extract the data from the request
        $consultantId = $validated['consultant_id'];
        $shiftId = $validated['shift_id'];
        $date = $validated['date'];
        $numSlots = $validated['num_slots'];

        // Fetch shift details to determine start and end time
        $shift = Shift::find($shiftId); // Ensure you have a Shift model

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
                $slots[] = [
                    'ConsultantID' => $consultantId,
                    'ShiftID' => $shiftId,
                    'ConsultationDate' => $date,
                    'SlotTime' => $slotTime->format('H:i'),
                    'SlotToken' => $slotToken,
                    'MaxSlots' => 1, // Set maximum slots per time slot
                    'AvailableSlots' => 1, // Set available slots initially
                ];
            }
        }

        // Save the slots in the database
        foreach ($slots as $slot) {
            TimeSlot::create($slot); // Ensure you have a Slot model and migration
        }

        return response()->json(['message' => 'Slots created successfully.', 'slots' => $slots], 201);
    }
}
