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
    
        // Check if the date is within the next 30 days
        $maxDate = Carbon::now()->addDays(30)->format('Y-m-d');
        if (Carbon::parse($date)->greaterThan($maxDate)) {
            return response()->json(['message' => 'You cannot book appointments more than 30 days in advance.'], 400);
        }
    
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
                'isBooked' => $slot->isBooked,
                'AppointmentID' => $slot->AppointmentID,
            ];
        });
    
        return response()->json($availableSlots);
    }
    

    

    // Method to add as a particular date slots for a doctor
    public function addSlotsDay(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'consultant_id' => 'required|integer|exists:gen_consultants,ConsultantID',
            'shift_id' => 'required|integer|exists:gen_shifts,ShiftID',
            'date' => 'required|date',
            'num_slots' => 'integer|min:1', // Allow num_slots to be optional
        ]);
    
        $consultantId = $validated['consultant_id'];
        $shiftId = $validated['shift_id'];
        $date = $validated['date'];
        $numSlots = $validated['num_slots'] ?? 50; // Default to 50 slots if not provided
    
        // Fetch shift details to determine start and end time
        $shift = Shift::find($shiftId);
    
        if (!$shift) {
            return response()->json(['error' => 'Shift not found.'], 404);
        }
    
        // Calculate start and end time
        $startTime = Carbon::createFromFormat('h:i A', $shift->StartTime . ' ' . $shift->StartTimeAMPM);
        $endTime = Carbon::createFromFormat('h:i A', $shift->EndTime . ' ' . $shift->EndTimeAMPM);
    
        // Calculate the interval between slots
        $slotInterval = 8; // You can customize this based on requirements (e.g., 30-minute intervals)
    
        // Generate slots
        $slots = [];
        for ($i = 0; $i < $numSlots; $i++) {
            $slotTime = $startTime->copy()->addMinutes($slotInterval * $i); // Create slots at intervals
            if ($slotTime->greaterThan($endTime)) {
                break; // Stop creating slots if past end time
            }
    
            $slotToken = str_replace('-', '', $date) . $slotTime->format('Hi') . str_pad($i + 1, 2, '0', STR_PAD_LEFT); // Unique SlotToken
    
            // Ensure SlotToken is unique
            while (TimeSlot::where('SlotToken', $slotToken)->exists()) {
                $slotToken = str_replace('-', '', $date) . $slotTime->format('Hi') . str_pad(++$i, 2, '0', STR_PAD_LEFT);
            }
    
            $slots[] = [
                'ConsultantID' => $consultantId,
                'ShiftID' => $shiftId,
                'ConsultationDate' => $date,
                'SlotTime' => $slotTime->format('H:i'),
                'SlotToken' => $slotToken,
                'MaxSlots' => 1, // Set max slots per time slot (customize if needed)
                'AvailableSlots' => 1,
                'isBooked' => 0, // Slot initially not booked
            ];
        }
    
        // Save slots in the database
        foreach ($slots as $slot) {
            TimeSlot::create($slot);
        }
    
        return response()->json(['message' => 'Slots created successfully.', 'slots' => $slots], 201);
    }
    

    public function addSlotsRange(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'consultant_id' => 'required|integer|exists:gen_consultants,ConsultantID',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'interval_minutes' => 'required|integer|min:1',
            'daily_slots' => 'required|array',
            'daily_slots.*.date' => 'required|date',
            'daily_slots.*.num_slots' => 'required|integer|min:1',
        ]);
    
        $consultantId = $validated['consultant_id'];
        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);
        $intervalMinutes = $validated['interval_minutes'];
        $dailySlots = $validated['daily_slots'];
    
        // Ensure start date is before end date
        if ($startDate->greaterThan($endDate)) {
            return response()->json(['error' => 'Start date must be before end date.'], 400);
        }
    
        // Initialize an array to hold the generated slots
        $slots = [];
    
        // Loop through each entry in the daily slots array
        foreach ($dailySlots as $dailySlot) {
            $date = Carbon::parse($dailySlot['date']);
            $numSlots = $dailySlot['num_slots']; // Total slots for this day
    
            // Fetch shift details to determine start and end time
            $shift = Shift::first(); // Adjust this logic based on your requirements
            if (!$shift) {
                return response()->json(['error' => 'No shift found for the consultant.'], 404);
            }
    
            // Calculate start and end time for the slots based on the shift
            $startTime = Carbon::createFromFormat('h:i A', $shift->StartTime . ' ' . $shift->StartTimeAMPM);
            $endTime = Carbon::createFromFormat('h:i A', $shift->EndTime . ' ' . $shift->EndTimeAMPM);
    
            // Ensure the date is within the specified range
            if ($date->lessThan($startDate) || $date->greaterThan($endDate)) {
                return response()->json(['error' => 'Date must be within the specified date range.'], 400);
            }
    
            // Generate slots for the specified date
            $currentTime = $startTime->copy(); // Start from the beginning of the shift
            $slotsCreated = 0; // Counter for the number of slots created
    
            while ($currentTime->lessThan($endTime) && $slotsCreated < $numSlots) {
                // Generate the base SlotToken
                $baseSlotToken = str_replace('-', '', $date->format('Y-m-d')) . $currentTime->format('Hi');
                $slotToken = $baseSlotToken . str_pad($slotsCreated + 1, 2, '0', STR_PAD_LEFT); // Add padding for unique tokens
    
                // Check for SlotToken uniqueness
                $attempt = 1;
                while (TimeSlot::where('SlotToken', $slotToken)->exists()) {
                    // Modify the token if it exists (append attempt number)
                    $slotToken = $baseSlotToken . '-' . $attempt;
                    $attempt++;
                }
    
                // Prepare the slot data for insertion
                $slots[] = [
                    'ConsultantID' => $consultantId,
                    'ConsultationDate' => $date->format('Y-m-d'),
                    'SlotTime' => $currentTime->format('H:i:s'),
                    'SlotToken' => $slotToken,
                    'MaxSlots' => 1,
                    'AvailableSlots' => 1,
                    'isBooked' => 0,
                ];
    
                // Increment the counter and time for the next slot
                $slotsCreated++;
                $currentTime->addMinutes($intervalMinutes);
            }
        }
    
        // Save slots in the database
        TimeSlot::insert($slots);
    
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
