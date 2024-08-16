<?php

/**
 * Controller for APIs related to appointments 
 * Opened by: Junaid
 * Open Date: 26-08-2024
 * Status: Open
 */

namespace App\Http\API\V1;

use App\Http\Requests\BookAppointmentRequest;
use App\Http\Requests\AppointmentListRequest;
use App\Http\Requests\AppointmentShowRequest;
use App\Http\Requests\AppointmentHistoryByPatientIdRequest;
use App\Http\Requests\AppointmentsByDoctorIdRequest;
use App\Http\Requests\PatientAppointmentByIdRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\AppointmentCollection;
use App\Services\AppointmentService;
use App\Repositories\AppointmentRepository;
use App\Services\RazorpayService;

class AppointmentController extends Controller
{
    protected $appointmentService;
    protected $apiVersion;
    protected $apiCodes;
    protected $httpMessages;

    public function __construct()
    {
        // Instantiate the AppointmentService directly
        $appointmentRepository = new AppointmentRepository();
        $razorpayService = new RazorpayService();
        $this->appointmentService = new AppointmentService($appointmentRepository, $razorpayService);

        // Load configurations
        $this->apiVersion = config('api_codes.version');
        $this->apiCodes = config('api_codes.v1');
        $this->httpMessages = config('api_responses');
    }

    // Method to book a new appointment
    public function book(BookAppointmentRequest $request)
    {
        // Retrieve validation errors, if any
        $validationErrors = $request->getValidationErrors();

        // If there are validation errors, return them in the response
        if (!empty($validationErrors)) {
            //dd('requesterrorresponse', $validationErrors);
            return responseMsg(
                'validation_error',
                $validationErrors,
                null,
                $this->apiCodes['API_1.1.1'],
                $this->apiVersion['v1'],
            );
        }

        try {
            // Attempt to book an appointment
            $result = $this->appointmentService->bookAppointment(
                $request->patient_id,
                $request->doctor_id,
                $request->appointment_time,
                $request->amount
            );

            // Handle repository errors
            if ($result['status'] === 'error') {
                return responseMsg(
                    'error',
                    $result['message'],
                    null,
                    config('api_code.v1.API_1'),
                    config('api_code.v1.version')
                );
            }

            // Convert the main data to an object, including nested arrays/objects
            $objects = array_to_object($result);

            return responseMsg(
                'success',
                config('http_response_messages.success.appointment_booked'),
                $objects,
                config('api_code.v1.API_1'),
                config('api_code.v1.version')
            );

        } catch (\Exception $e) {
            // Handle other exceptions
            return responseMsg(
                'error',
                'An unexpected error occurred',
                null,
                config('api_code.v1.API_1'),
                config('api_code.v1.version')
            );
        }
    }


    // Method to list all appointments
    public function list(AppointmentListRequest $request)
    {
        $appointments = $this->appointmentService->getAllAppointments();
        if (count($appointments) === 0) {
            return responseMsg('not_found', $this->httpMessages['not_found']['no_appointments_found'], null, $this->apiCodes['API_2'], $this->apiVersion);
        }
        return responseMsg('success', $this->httpMessages['success']['appointments_retrieved'], new AppointmentCollection($appointments), $this->apiCodes['API_2'], $this->apiVersion);
    }

    // Method to show a specific appointment by ID
    public function show(AppointmentShowRequest $request)
    {
        $appointmentId = $request->route('appointment_id');
        $appointment = $this->appointmentService->getAppointmentById($appointmentId);

        if ($appointment === null) {
            return responseMsg('not_found', $this->httpMessages['not_found']['appointment_not_found'], null, $this->apiCodes['API_3'], $this->apiVersion);
        }

        return responseMsg('success', $this->httpMessages['success']['appointment_retrieved'], new AppointmentResource($appointment), $this->apiCodes['API_3'], $this->apiVersion);
    }

    // Method to get appointment history by patient ID
    public function historyByPatientId(AppointmentHistoryByPatientIdRequest $request)
    {
        $patientId = $request->route('patient_id');
        $appointments = $this->appointmentService->getHistoryByPatientId($patientId);

        if (count($appointments) === 0) {
            return responseMsg('not_found', $this->httpMessages['not_found']['appointment_not_found'], null, $this->apiCodes['API_4'], $this->apiVersion);
        }

        return responseMsg('success', $this->httpMessages['success']['appointments_retrieved'], new AppointmentCollection($appointments), $this->apiCodes['API_4'], $this->apiVersion);
    }

    // Method to get appointments by doctor ID
    public function appointmentsByDoctorId(AppointmentsByDoctorIdRequest $request)
    {
        $doctorId = $request->input('doctor_id');
        $appointments = $this->appointmentService->getAppointmentsByDoctorId($doctorId);
        return responseMsg('success', $this->httpMessages['success']['appointments_retrieved'], new AppointmentCollection($appointments), $this->apiCodes['API_5'], $this->apiVersion);
    }

    // Method to get a specific patient's appointment by patient ID and appointment ID
    public function patientAppointmentById(PatientAppointmentByIdRequest $request)
    {
        $patientId = $request->input('patient_id');
        $appointmentId = $request->input('appointment_id');
        $appointment = $this->appointmentService->getPatientAppointmentById($patientId, $appointmentId);

        if (!$appointment) {
            return responseMsg('not_found', $this->httpMessages['not_found']['appointment_not_found'], null, $this->apiCodes['API_6'], $this->apiVersion);
        }

        return responseMsg('success', $this->httpMessages['success']['appointment_retrieved'], new AppointmentResource($appointment), $this->apiCodes['API_6'], $this->apiVersion);
    }
}
