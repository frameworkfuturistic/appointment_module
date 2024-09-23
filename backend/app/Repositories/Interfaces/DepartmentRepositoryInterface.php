<?php

namespace App\Repositories\Interfaces;

interface DepartmentRepositoryInterface
{
    public function getAll();
    public function getById($id);
}
