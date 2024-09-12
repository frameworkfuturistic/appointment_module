<?php

/**
 * Controller for APIs related to patients 
 * Opened by: Junaid
 * Open Date: 10-09-2024
 * Status: Open
 */

namespace App\Http\Controllers\API\V1;

use App\Http\Requests\PatientListRequest;
use App\Http\Requests\PatientShowRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\OutPatientResource;
use App\Http\Resources\OutPatientCollection;
use App\Services\PatientService;
use App\Repositories\PatientRepository;

class PatientController extends Controller
{
    protected $patientService;
    protected $apiVersion;
    protected $apiCodes;
    protected $httpMessages;

    public function __construct()
    {
        // Instantiate the PatientService directly
        $patientRepository = new PatientRepository();
        $this->patientService = new PatientService($patientRepository);

        // Load configurations
        $this->apiVersion = config('api_codes.version');
        $this->apiCodes = config('api_codes.v1');
        $this->httpMessages = config('api_responses');
    }

    // Method to list all patients
    public function list(PatientListRequest $request)
    {
        $patients = $this->patientService->getAllPatients();
        if (count($patients) === 0) {
            return responseMsg('not_found', $this->httpMessages['not_found']['no_patients_found'], null, $this->apiCodes['API_1.1.2'], $this->apiVersion);
        }
        return responseMsg('success', $this->httpMessages['success']['patients_retrieved'], new OutPatientCollection($patients), $this->apiCodes['API_1.1.2'], $this->apiVersion);
    }

    // Method to show a specific patient by ID
    public function show(PatientShowRequest $request)
    {
        $patientId = $request->route('patient_id');
        $patient = $this->patientService->getPatientById($patientId);

        if ($patient === null) {
            return responseMsg('not_found', $this->httpMessages['not_found']['patient_not_found'], null, $this->apiCodes['API_3'], $this->apiVersion);
        }

        return responseMsg('success', $this->httpMessages['success']['patient_retrieved'], new OutPatientResource($patient), $this->apiCodes['API_3'], $this->apiVersion);
    }
}