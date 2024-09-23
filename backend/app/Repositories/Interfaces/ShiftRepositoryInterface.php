<?php

namespace App\Repositories\Interfaces;

interface ShiftRepositoryInterface
{
    public function getAll();
    public function getById($id);
}
