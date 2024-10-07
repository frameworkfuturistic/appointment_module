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

Route::group(['prefix' => 'v1', 'namespace' => 'App\Http\Controllers\API\V1'], function () {

    // Patient Management
    Route::post('/patients', [PatientController::class, 'createPatient']);
    Route::get('/patients/{mrNo}', [PatientController::class, 'getPatient']);

    // Department and Doctor Management
    Route::get('/departments', [DepartmentController::class, 'index']);
    Route::get('/doctors/{departmentId}', [DoctorController::class, 'index']);

    // Slot Management
    Route::get('slots/{doctorId}/{date}', [SlotController::class, 'availableSlots']); 
    Route::post('slots', [SlotController::class, 'addSlotsDay']);
    Route::post('slots-range', [SlotController::class, 'addSlotsRange']);
    Route::get('slots/all', [SlotController::class, 'getAllSlots']);
    Route::get('slots/{doctorId}', [SlotController::class, 'getAllDoctorSlots']);

    // Appointment Management
    Route::post('appointments', [AppointmentController::class, 'createAppointment']);
    Route::put('appointments/{id}', [AppointmentController::class, 'updateAppointment']);
    Route::post('search', [AppointmentController::class, 'searchAppointments']);
    Route::get('appointments', [AppointmentController::class, 'getAllAppointments']);

    // Payment Management
    Route::post('payments', [PaymentController::class, 'createPayment']); // Create payment
    Route::post('payments/callback', [PaymentController::class, 'handlePaymentCallback']); // Handle payment callback
    Route::get('payments/{paymentId}', [PaymentController::class, 'getPaymentById']); // Get payment by ID
    Route::get('payments/history', [PaymentController::class, 'getPaymentHistory']); // Get payment history
});
