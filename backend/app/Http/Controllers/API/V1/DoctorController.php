<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\Consultant;
use App\Models\ConsultantShift;
use App\Models\OpdRegistration;
use App\Models\DoctorSlot; 
use Illuminate\Http\Request;
use Carbon\Carbon;

class DoctorController extends Controller
{
    // Fetch doctors based on department
    public function index($departmentId)
    {
        $doctors = Consultant::where('DepartmentID', $departmentId)
            ->with('consultantShift') // Eager load the consultant shift to get the fee
            ->get();
    
        // Transform the data to include fee information
        $doctorData = $doctors->map(function ($doctor) {
            return [
                'ConsultantID' => $doctor->ConsultantID,
                'ConsultantName' => $doctor->ConsultantName,
                'Fee' => optional($doctor->consultantShift)->Fee, // Safely access Fee
            ];
        });
    
        return response()->json($doctorData, 200);
    }

}
