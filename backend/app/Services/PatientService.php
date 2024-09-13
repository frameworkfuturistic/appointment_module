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

    // Retrieve all patients
    public function getAllPatients()
    {
        return $this->patientRepository->getAll();
    }

    // Retrieve patient details by ID
    public function getPatientById($patientId)
    {
        return $this->patientRepository->find($patientId);
    }
}