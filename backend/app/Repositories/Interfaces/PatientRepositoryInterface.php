<?php

namespace App\Repositories\Interfaces;

interface PatientRepositoryInterface
{
    public function create(array $patientData);
    public function find($id);
    public function getAll();
    
}