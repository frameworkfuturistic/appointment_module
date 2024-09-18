<?php

/**
 * Repository for handling patient-related data operations.
 * File opened by Juniad on 10-09-2024.
 * Status: Open
 * --------------------------------------
 */

namespace App\Repositories;

use App\Models\OutPatient;
use App\Repositories\Interfaces\PatientRepositoryInterface;

class PatientRepository implements PatientRepositoryInterface
{
    // Create a new appointment with the given data
    public function create(array $data)
    {
        return OutPatient::create($data);
    }

    // Find an patient by its ID, including related patient, doctor, and payment details
    public function find($id)
    {
        return OutPatient::findOrFail($id);
    }

    // Retrieve all patients, including related patient, doctor, and payment details
    public function getAll()
    {
        return OutPatient::all();
    }
}