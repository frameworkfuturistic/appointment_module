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
            return responseMsg('false', $this->httpMessages['not_found']['records_not_found'], null, $this->apiCodes['API_1.1.9'], $this->apiVersion['v1'], null, 'GET', null);
        }
        return responseMsg('true', $this->httpMessages['success']['records_retrieved'], new OutPatientCollection($patients), $this->apiCodes['API_1.1.9'], $this->apiVersion['v1'], null, 'GET', null);
    }

    // Method to show a specific patient by ID
    public function show(PatientShowRequest $request)
    {
        $id = $request->route('patient_id');
        $patient = $this->patientService->getPatientById($id);

        if ($patient === null) {
            return responseMsg('false', $this->httpMessages['not_found']['records_not_found'], null, $this->apiCodes['API_1.1.10'], $this->apiVersion['v1'], null, 'GET', null);
        }

        return responseMsg('true', $this->httpMessages['success']['records_retrieved'], new OutPatientResource($patient), $this->apiCodes['API_1.1.10'], $this->apiVersion['v1'], null, 'GET', null);
    }
}