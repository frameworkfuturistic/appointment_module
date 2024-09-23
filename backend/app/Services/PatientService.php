<?php

/**
 * Service Class for APIs related to appointments 
 * Opened by: Junaid
 * Open Date: 26-08-2024
 * Status: Open
 */

namespace App\Services;

use App\Repositories\Interfaces\PatientRepositoryInterface;

class PatientService
{
    protected $patientRepository;

    // Initialize with repository
    public function __construct(PatientRepositoryInterface $patientRepository)
    {
        $this->patientRepository = $patientRepository;
    }

    // Save new patient data using the repository
    public function saveNewPatient(array $patientData)
    {
        $patient = $this->patientRepository->create($patientData);
        return ['status' => 'success', 'patient_id' => $patient->id];
    }

    // Retrieve all patients
    public function getAllPatients()
    {
        return $this->patientRepository->getAll();
    }

    // Retrieve patient details by ID
    public function getPatientById($id)
    {
        return $this->patientRepository->find($id);
    }
}