<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\AppointmentController;
use App\Http\Controllers\API\V1\PaymentController;
use App\Http\Controllers\API\V1\PatientController;
use App\Http\Controllers\API\V1\DoctorController;
use App\Http\Controllers\API\V1\DepartmentController;
use App\Http\Controllers\API\V1\SlotController;

/*
|----------------------------------------------------------------------
| API Routes
|----------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\API\V1'], function () {

    // Add Patient
    Route::post('/patients', [PatientController::class, 'createPatient']);

    // Retrieve Patient by MRNo
    Route::get('/patients/{mrNo}', [PatientController::class, 'getPatient']);

    // Version 1 APIs for departments and doctors
    Route::get('/departments', [DepartmentController::class, 'index']);
    Route::get('/doctors/{departmentId}', [DoctorController::class, 'index']);

    // Slot management
    // Fetch available slots for a specific doctor on a given date
    Route::get('slots/{doctorId}/{date}', [SlotController::class, 'availableSlots']); 

    // Add slots for a doctor
    Route::post('slots', [SlotController::class, 'addSlots']);

    // Get all OPD doctor slots
    Route::get('slots/all', [SlotController::class, 'getAllSlots']);

    // Fetch all available slots for a specific doctor across multiple dates
    Route::get('slots/{doctorId}', [SlotController::class, 'getAllDoctorSlots']);

    // Version 1 APIs for online appointments
    Route::post('appointments', [AppointmentController::class, 'createAppointment']);

    Route::put('appointments/{id}', [AppointmentController::class, 'updateAppointment']);
    Route::get('search', [AppointmentController::class, 'searchAppointments']);
    Route::get('appointments', [AppointmentController::class, 'getAllAppointments']); // Optional
  

   
    // Version 1 APIs for payments (add as necessary)
    // Route::post('payments', [PaymentController::class, 'store'])->name('payments.store');
});
