<?php

/**
 * Controller for APIs related to appointments 
 * Opened by: Junaid
 * Open Date: 26-08-2024
 * Status: Open
 */

namespace App\Http\Controllers\API\V1;

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
use App\Services\PatientService;
use App\Repositories\PatientRepository;

class AppointmentController extends Controller
{
    protected $appointmentService;
    protected $patientService;
    protected $apiVersion;
    protected $apiCodes;
    protected $httpMessages;

    public function __construct()
    {
        // Instantiate the Services directly
        $appointmentRepository = new AppointmentRepository();
        $patientRepository = new PatientRepository();
        $razorpayService = new RazorpayService();
        $this->patientService = new PatientService($patientRepository);
        $this->appointmentService = new AppointmentService($appointmentRepository, $razorpayService, );

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
                'false',
                $validationErrors,
                null,
                $this->apiCodes['API_1.1.1'],
                $this->apiVersion['v1'],
                null,
                'POST',
                null
            );
        }

        try {

            // Initialize patient ID variable
            $patientId = null;

            // Check if the patient is new or existing
            if ($request->is_new_patient) {
                // Prepare patient data
                $patientData = [
                    'name' => $request->patient_name,
                    'father_name' => $request->father_name,
                    'address' => $request->address,
                    'city' => $request->city,
                    'state' => $request->state,
                    'pincode' => $request->pincode,
                    'mobile' => $request->mobile,
                    'gender' => $request->gender,
                    'ref_by' => $request->ref_by,
                ];

                // Save new patient details via appointment service
                $result = $this->patientService->saveNewPatient($patientData);

                // Check for errors in saving patient
                if ($result['status'] === 'error') {
                    return responseMsg(
                        'false',
                        $result['message'],
                        null,
                        $this->apiCodes['API_1.1.1'],
                        $this->apiVersion['v1'],
                        null,
                        'POST',
                        null
                    );
                }

                // Retrieve and set new patient ID
                $patientId = $result['patient_id'];
            } else {
                // Handle existing patient scenario
                $patientId = $request->patient_id;

                // Validate that the patient exists
                $patient = $this->patientService->getPatientById($patientId);
                if (!$patient) {
                    return responseMsg(
                        'false',
                        'Patient not found.',
                        null,
                        $this->apiCodes['API_1.1.1'],
                        $this->apiVersion['v1'],
                        null,
                        'POST',
                        null
                    );
                }
            }

            // Prepare appointment data
            // $appointmentData = [
            //     'patient_id' => $patientId,
            //     'doctor_id' => $request->doctorId,
            //     'time_slot' => $request->timeSlot,
            //     'date' => $request->date,
            //     'amount' => $request->amount
            // ];

            // Save appointment details via appointment service
            $result = $this->appointmentService->bookAppointment(
                $request->$patientId,
                $request->doctorId,
                $request->timeSlot,
                $request->date,
                $request->amount
            );

            // Handle repository errors
            if ($result['status'] === 'error') {
                return responseMsg(
                    'false',
                    $result['message'],
                    null,
                    $this->apiCodes['API_1.1.1'],
                    $this->apiVersion['v1'],
                    null,
                    'POST',
                    null
                );
            }

            // Convert the main data to an object, including nested arrays/objects
            $objects = array_to_object($result);

            return responseMsg(
                'true',
                $this->httpMessages['success']['default'],
                $objects,
                $this->apiCodes['API_1.1.1'],
                $this->apiVersion['v1'],
                null,
                'POST',
                null
            );

        } catch (\Exception $e) {
            // Handle other exceptions
            return responseMsg(
                'false',
                $this->httpMessages['error']['default'],
                null,
                $this->apiCodes['API_1.1.1'],
                $this->apiVersion['v1'],
                null,
                'POST',
                null
            );
        }
    }


    // Method to list all appointments
    public function list(AppointmentListRequest $request)
    {
        $appointments = $this->appointmentService->getAllAppointments();
        if (count($appointments) === 0) {
            return responseMsg('false', $this->httpMessages['not_found']['no_appointments_found'], null, $this->apiCodes['API_1.1.2'], $this->apiVersion['v1'], null, 'GET', null);
        }
        return responseMsg('true', $this->httpMessages['success']['appointments_retrieved'], new AppointmentCollection($appointments), $this->apiCodes['API_1.1.2'], $this->apiVersion['v1'], null, 'GET', null);
    }

    // Method to show a specific appointment by ID
    public function show(AppointmentShowRequest $request)
    {
        $appointmentId = $request->route('appointment_id');
        $appointment = $this->appointmentService->getAppointmentById($appointmentId);

        if ($appointment === null) {
            return responseMsg('false', $this->httpMessages['not_found']['appointment_not_found'], null, $this->apiCodes['API_1.1.3'], $this->apiVersion['v1'], null, 'GET', null);
        }

        return responseMsg('true', $this->httpMessages['success']['appointment_retrieved'], new AppointmentResource($appointment), $this->apiCodes['API_1.1.3'], $this->apiVersion['v1'], null, 'GET', null);
    }

    // Method to get appointment history by patient ID
    public function historyByPatientId(AppointmentHistoryByPatientIdRequest $request)
    {
        $patientId = $request->route('patient_id');
        $appointments = $this->appointmentService->getHistoryByPatientId($patientId);

        if (count($appointments) === 0) {
            return responseMsg('false', $this->httpMessages['not_found']['appointment_not_found'], null, $this->apiCodes['API_1.1.4'], $this->apiVersion['v1'], null, 'GET', null);
        }

        return responseMsg('true', $this->httpMessages['success']['appointments_retrieved'], new AppointmentCollection($appointments), $this->apiCodes['API_1.1.4'], $this->apiVersion['v1'], null, 'GET', null);
    }

    // Method to get appointments by doctor ID
    public function appointmentsByDoctorId(AppointmentsByDoctorIdRequest $request)
    {
        $doctorId = $request->input('doctor_id');
        $appointments = $this->appointmentService->getAppointmentsByDoctorId($doctorId);

        if (count($appointments) === 0) {
            return responseMsg('false', $this->httpMessages['not_found']['appointment_not_found'], null, $this->apiCodes['API_1.1.5'], $this->apiVersion['v1'], null, 'GET', null);
        }

        return responseMsg('true', $this->httpMessages['success']['appointments_retrieved'], new AppointmentCollection($appointments), $this->apiCodes['API_1.1.5'], $this->apiVersion['v1'], null, 'GET', null);
    }

    // Method to get a specific patient's appointment by patient ID and appointment ID
    public function patientAppointmentById(PatientAppointmentByIdRequest $request)
    {
        $patientId = $request->input('patient_id');
        $appointmentId = $request->input('appointment_id');
        $appointment = $this->appointmentService->getPatientAppointmentById($patientId, $appointmentId);

        if (!$appointment) {
            return responseMsg('false', $this->httpMessages['not_found']['appointment_not_found'], null, $this->apiCodes['API_1.1.6'], $this->apiVersion['v1'], null, 'GET', null);
        }

        return responseMsg('true', $this->httpMessages['success']['appointment_retrieved'], new AppointmentResource($appointment), $this->apiCodes['API_1.1.6'], $this->apiVersion['v1'], null, 'GET', null);
    }
}
