<?php

namespace App\Repositories;

use App\Models\Doctor;
use App\Repositories\Interfaces\DoctorRepositoryInterface;

class DoctorRepository implements DoctorRepositoryInterface
{
    public function getAll()
    {
        return Doctor::all();
    }

    public function getById($id)
    {
        return Doctor::findOrFail($id);
    }
}
