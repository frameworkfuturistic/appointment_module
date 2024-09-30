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
        $doctors = Consultant::where('DepartmentID', $departmentId)->get();
        return response()->json($doctors, 200);
    }

}
