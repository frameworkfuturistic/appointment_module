<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\AppointmentController;
use App\Http\Controllers\API\V1\PaymentController;
use App\Http\Controllers\API\V1\PatientController;
use App\Http\Controllers\API\V1\DoctorController;
use App\Http\Controllers\API\V1\DepartmentController;
use App\Http\Controllers\API\V1\SlotController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\API\V1'],function () {

// Version 1 APIs for appointments
Route::get('/departments', [DepartmentController::class, 'index']);
Route::get('/doctors/{departmentId}', [DoctorController::class, 'index']);
Route::post('/add', [SlotController::class, 'addSlots']);
Route::get('/slots/{doctorId}/{date}', [SlotController::class, 'availableSlots']); // Fetch available slots for doctor by date

 // Create a new appointment
 Route::post('/appointments', [AppointmentController::class, 'store'])->name('store');
 
   // Get all appointments with optional filtering and pagination
   Route::get('appointments', [AppointmentController::class, 'index'])
   ->name('appointments.index');
   // Get appointment by ID

 
  

    // Version 1 APIs for doctors


    // 1.1.9 Show details of a specific patient
    Route::get('patients/{patient_id}', [PatientController::class, 'show'])
        ->name('patients.show');
    // 1.1.10 List all patients
    Route::get('patients', [PatientController::class, 'list'])
        ->name('patients.list');
});

    



