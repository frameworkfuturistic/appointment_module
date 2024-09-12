<?php

namespace App\Repositories\Interfaces;

interface PatientRepositoryInterface
{
  
    public function find($id);
    public function getAll();
    
}