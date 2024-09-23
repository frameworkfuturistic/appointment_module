<?php

namespace App\Repositories\Interfaces;

interface DoctorRepositoryInterface
{
    public function getAll();
    public function getById($id);
}
