<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppointmentController extends Controller
{
    // Method to create a new online appointment
    public function createAppointment(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'ConsultantID' => 'required|integer|exists:gen_consultants,ConsultantID',
            'MRNo' => 'required|string|exists:mr_master,MRNo',
            'RegistrationID' => 'required|integer',
            'ConsultationDate' => 'required|date',
            'SlotID' => 'required|integer|exists:opd_doctorslots,SlotID',
            'SlotToken' => 'required|string|max:50',
            'ShiftID' => 'required|integer|exists:gen_shifts,ShiftID',
            'Remarks' => 'nullable|string|max:50',
            'Pending' => 'required|boolean',
            'PatientName' => 'required|string|max:50',
            'MobileNo' => 'required|string|max:10',
            'TransactionID' => 'nullable|string|max:50',
            'CreatedBy' => 'required|integer',
        ]);

        // Create a new appointment
        $appointment = Appointment::create($validated);

        return response()->json(['message' => 'Appointment created successfully.', 'appointment' => $appointment], 201);
    }

    // Method to update an existing appointment
    public function updateAppointment(Request $request, $id)
    {
        // Find the appointment by ID
        $appointment = Appointment::find($id);

        // Return error response if appointment not found
        if (!$appointment) {
            return response()->json(['error' => 'Appointment not found.'], 404);
        }

        // Validate incoming request
        $validated = $request->validate([
            'ConsultantID' => 'required|integer|exists:gen_consultants,ConsultantID',
            'MRNo' => 'required|string|exists:mr_master,MRNo',
            'RegistrationID' => 'required|integer',
            'ConsultationDate' => 'required|date',
            'SlotID' => 'required|integer|exists:opd_doctorslots,SlotID',
            'SlotToken' => 'required|string|max:50',
            'ShiftID' => 'required|integer|exists:gen_shifts,ShiftID',
            'Remarks' => 'nullable|string|max:50',
            'Pending' => 'required|boolean',
            'PatientName' => 'required|string|max:50',
            'MobileNo' => 'required|string|max:10',
            'CreatedBy' => 'required|integer',
        ]);
        // Update the appointment with validated data
        $appointment->update($validated);

        return response()->json(['message' => 'Appointment updated successfully.', 'appointment' => $appointment], 200);
    }

    // Method to search appointments by mobile number or OPDOnlineAppointmentID
    public function searchAppointments(Request $request)
    {
        // Validate input for searching
        $request->validate([
            'MobileNo' => 'nullable|string|max:10',
            'OPDOnlineAppointmentID' => 'nullable|integer',
        ]);

        // Create a query for appointments
        $query = Appointment::query();

        // Apply filters based on user input
        if ($request->has('MobileNo')) {
            $query->where('MobileNo', $request->input('MobileNo'));
        }

        if ($request->has('OPDOnlineAppointmentID')) {
            $query->orWhere('OPDOnlineAppointmentID', $request->input('OPDOnlineAppointmentID'));
        }

        // Execute the query and get results
        $appointments = $query->get();

        // Return appointments or a not found message
        if ($appointments->isEmpty()) {
            return response()->json(['message' => 'No appointments found.'], 404);
        }

        return response()->json(['appointments' => $appointments], 200);
    }

    // Method to get all appointments (optional)
    public function getAllAppointments()
    {
        $appointments = Appointment::all();
        return response()->json(['appointments' => $appointments], 200);
    }
}
