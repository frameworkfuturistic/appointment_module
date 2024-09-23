<?php

namespace App\Repositories;

use App\Models\Department;
use App\Repositories\Interfaces\DepartmentRepositoryInterface;

class DepartmentRepository implements DepartmentRepositoryInterface
{
    public function getAll()
    {
        return Department::all();
    }

    public function getById($id)
    {
        return Department::findOrFail($id);
    }
}
