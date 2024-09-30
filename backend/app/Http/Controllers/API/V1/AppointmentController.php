<?php

/**
 * Controller for APIs related to appointments 
 * Opened by: Junaid
 * Open Date: 26-08-2024
 * Status: Open
 */

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Consultant; 
use App\Models\Shift; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppointmentController extends Controller
{
   // Create a new appointment
   public function store(Request $request)
{
    // Validate incoming request
    $validator = Validator::make($request->all(), [
        'ConsultantID' => 'required|integer',
        'RegistrationID' => 'required|integer',
        'ConsultationDate' => 'required|date',
        'PatientName' => 'required|string|max:50',
        'MobileNo' => 'required|string|max:10',
        'Address' => 'nullable|string|max:255',
        'ShiftID' => 'nullable|integer',
        'TokenNo' => 'nullable|string|max:50',
        'Remarks' => 'nullable|string|max:50',
        'Pending' => 'nullable|boolean',
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Fetch Consultant data from gen_consultants table
    $consultant = Consultant::find($request->ConsultantID);  // Find consultant by ConsultantID

    if (!$consultant) {
        return response()->json(['error' => 'Consultant not found'], 404);
    }

    // Fetch Shift data from gen_shifts table
    $shift = Shift::find($request->ShiftID);  // Find shift by ShiftID

    if (!$shift) {
        return response()->json(['error' => 'Shift not found'], 404);
    }

    // Prepare appointment data
    $appointmentData = $request->only([
        'ConsultantID',
        'RegistrationID',
        'ConsultationDate',
        'ShiftID',
        'TokenNo',
        'Remarks',
        'Pending',
        'PatientName',
        'MobileNo',
        'Address',
    ]);

    // Create the appointment
    $appointment = Appointment::create($appointmentData);

    // Add Consultant and Shift data in the response
    $response = [
        'OPDConsultationID' => $appointment->OPDConsultationID,
        'ConsultantID' => $appointment->ConsultantID,
        'RegistrationID' => $appointment->RegistrationID,
        'ConsultationDate' => $appointment->ConsultationDate,
        'ShiftID' => $appointment->ShiftID,
        'TokenNo' => $appointment->TokenNo,
        'Remarks' => $appointment->Remarks,
        'Pending' => $appointment->Pending,
        'PatientName' => $appointment->PatientName,
        'MobileNo' => $appointment->MobileNo,
        'Address' => $appointment->Address,
        'consultant' => [
            'ConsultantID' => $consultant->ConsultantID,
            'ConsultantName' => $consultant->ConsultantName,
            'ConsultantType' => $consultant->ConsultantType,
            'Specialization' => $consultant->Specialization,
            // Add other consultant fields you want
        ],
        'shift' => [
            'ShiftID' => $shift->ShiftID,
            'ShiftName' => $shift->ShiftName,
            'StartTime' => $shift->StartTime,
            'EndTime' => $shift->EndTime,
            // Add other shift fields you want
        ]
    ];

    return response()->json($response, 201);
}

   


   // Get all appointments with optional filtering and pagination
   public function index(Request $request)
   {
       $query = Appointment::with('consultant', 'shift');

       if ($request->filled('status')) {
           $query->where('status', $request->status);
       }

       if ($request->filled('search')) {
           $query->where('PatientName', 'like', '%' . $request->search . '%');
       }

       $appointments = $query->paginate($request->input('per_page', 10));
       return response()->json($appointments);
   }

    // Get appointment by ID
    public function show($id)
    {
        $appointment = Appointment::with('consultant', 'shift')->find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }
        return response()->json($appointment);
    }

    // Update appointment by ID
    public function update(Request $request, $id)
    {
        $appointment = Appointment::find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'ConsultantID' => 'sometimes|required|integer',
            'RegistrationID' => 'sometimes|required|integer',
            'ConsultationDate' => 'sometimes|required|date',
            'PatientName' => 'sometimes|required|string|max:50',
            'MobileNo' => 'sometimes|required|string|max:10',
            'ShiftID' => 'sometimes|nullable|integer',
            'Remarks' => 'sometimes|nullable|string|max:50',
            'status' => 'sometimes|in:pending,confirmed,canceled', // Validation for status
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update the appointment with the validated data
        $appointment->update($request->all());
        return response()->json($appointment);
    }

    // Soft delete appointment by ID
    public function destroy($id)
    {
        $appointment = Appointment::find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        $appointment->delete(); // Soft delete
        return response()->json(['message' => 'Appointment deleted successfully'], 200);
    }

    // Restore a soft-deleted appointment
    public function restore($id)
    {
        $appointment = Appointment::withTrashed()->find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        $appointment->restore();
        return response()->json(['message' => 'Appointment restored successfully'], 200);
    }
}
