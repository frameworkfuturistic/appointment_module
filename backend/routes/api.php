<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\AppointmentController;
use App\Http\Controllers\API\V1\PaymentController;
use App\Http\Controllers\API\V1\PatientController;



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

    // 1.1.1 Book a new appointment and initiate payment
    Route::post('appointments/book', [AppointmentController::class, 'book'])
        ->name('appointments.book'); 

    // 1.1.2 List all appointments
    Route::get('appointments', [AppointmentController::class, 'list'])
        ->name('appointments.list');

    // 1.1.3 Show details of a specific appointment
    Route::get('appointments/{appointment_id}', [AppointmentController::class, 'show'])
        ->name('appointments.show');

    // 1.1.4 Get appointment history by patient ID
    Route::get('appointments/history/{patient_id}', [AppointmentController::class, 'historyByPatientId'])
        ->name('appointments.historyByPatientId');

    // 1.1.5 Get all appointments for a specific doctor by doctor ID
    Route::get('appointments/doctor/{doctor_id}', [AppointmentController::class, 'appointmentsByDoctorId'])
        ->name('appointments.appointmentsByDoctorId');

    // 1.1.6 Get a specific patient appointment by patient ID and appointment ID
    Route::get('appointments/patient/{patient_id}/appointment/{appointment_id}', [AppointmentController::class, 'patientAppointmentById'])
        ->name('appointments.patientAppointmentById');
    
    // 1.1.7 WEBHOOK : Callback for Razorpay payment   
    Route::post('payment/callback', [PaymentController::class, 'handlePaymentCallback']);

    // 1.1.8 Get all data to pre-fill before appointment   
    Route::get('book/prefill', [AppointmentController::class, 'fetchPrefillData'])
        ->name('book.prefill');

// Version 1 APIs for doctors

    // 1.1.9 Show details of a specific patient
    Route::get('patients/{patient_id}', [PatientController::class, 'show'])
        ->name('patients.show');
    // 1.1.10 List all patients
    Route::get('patients', [PatientController::class, 'list'])
        ->name('patients.list');
});

    



