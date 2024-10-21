<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Patient; // Include the Patient model
use Illuminate\Http\Request;
use Carbon\Carbon;

class PatientController extends Controller
{
    // Method to create a new patient
    public function createPatient(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'PatientName' => 'required|string|max:50',
            'Sex' => 'required|string|max:6',
            'DOB' => 'required|date',
            'Address1' => 'nullable|string|max:250',
            'City' => 'nullable|string|max:50',
            'State' => 'nullable|string|max:50',
            'Pin' => 'nullable|string|max:6',
            'MobileNo' => 'required|string|max:20',
        ]);

        // Generate base MRNo based on current date and time
        $currentDateTime = Carbon::now();
        $baseMRNo = 'OL' . $currentDateTime->format('mdHi'); // 'OLMMDDHHMM' (10 characters)

        // Initialize the MRNo and a counter
        $MRNo = $baseMRNo;
        $counter = 1;

        // Ensure the MRNo is unique
        while (Patient::where('MRNo', $MRNo)->exists()) {
            // Append the counter to the MRNo to make it unique
            $MRNo = $baseMRNo . $counter;

            // Limit the length to ensure it doesn't exceed 10 characters
            if (strlen($MRNo) > 10) {
                $MRNo = substr($MRNo, 0, 10); // Trim to 10 characters
            }

            $counter++;
            
            // If the counter goes beyond a certain threshold, reset it (to prevent infinite loop)
            if ($counter > 100) {
                return response()->json(['error' => 'Could not generate a unique MRNo. Please try again later.'], 500);
            }
        }

        // Add MRNo and current date to validated data
        $validated['MRNo'] = $MRNo;
        $validated['MRDate'] = $currentDateTime; // Current date for MRDate

        // Create a new patient
        $patient = Patient::create($validated);

        return response()->json(['message' => 'Patient created successfully.', 'patient' => $patient], 201);
    }

   // Method to retrieve a patient by MRNo or MobileNo
public function getPatient(Request $request)
{
    $searchQuery = $request->input('mrdOrMobile');

    // Attempt to find the patient by MRNo or MobileNo
    $patients = Patient::where('MRNo', $searchQuery)
        ->orWhere('MobileNo', $searchQuery)
        ->get();

    if ($patients->isEmpty()) {
        return response()->json(['message' => 'Patient not found'], 404);
    }

    return response()->json(['patients' => $patients], 200);
}

}
